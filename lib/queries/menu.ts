import { unstable_cache } from "next/cache";
import { getPublicClient } from "../supabase/public";
import {
  drinkMenu,
  foodMenu,
  monthlySpecials,
  type MenuCategory as StaticCategory,
} from "@/content/menu";

export type PublicMenuItem = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  tags: string[];
  isAvailable: boolean;
  isSoldOut: boolean;
};

export type PublicMenuCategory = {
  id: string;
  slug: string;
  title: string;
  note?: string;
  kind: "drink" | "food";
  items: PublicMenuItem[];
};

const fmtPrice = (p: number | null | undefined) =>
  p === null || p === undefined ? undefined : p.toFixed(2);

// ── Static fallback (dev / before Supabase is configured) ──────────
// Mirrors the seed: Merchantville is a coffee bar, so food is omitted there.
function staticMenu(slug: string): PublicMenuCategory[] {
  const toCat = (
    c: StaticCategory,
    kind: "drink" | "food",
  ): PublicMenuCategory => ({
    id: c.id,
    slug: c.id,
    title: c.title,
    note: c.note,
    kind,
    items: c.items.map((it, i) => ({
      id: `${c.id}-${i}`,
      name: it.name,
      description: it.description,
      price: it.price,
      tags: it.tags ?? [],
      isAvailable: true,
      isSoldOut: false,
    })),
  });

  const specials: PublicMenuCategory = {
    id: "specials",
    slug: "specials",
    title: "Barista Specials",
    note: "This month's rotating creations.",
    kind: "drink",
    items: monthlySpecials.map((it, i) => ({
      id: `specials-${i}`,
      name: it.name,
      description: it.description,
      price: it.price,
      tags: it.tags ?? [],
      isAvailable: true,
      isSoldOut: false,
    })),
  };

  const drinks = [specials, ...drinkMenu.map((c) => toCat(c, "drink"))];
  if (slug === "merchantville") return drinks;
  return [...drinks, ...foodMenu.map((c) => toCat(c, "food"))];
}

async function fetchMenu(slug: string): Promise<PublicMenuCategory[]> {
  const supabase = getPublicClient();
  if (!supabase) return staticMenu(slug);

  const { data: loc } = await supabase
    .from("locations")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (!loc) return [];

  const { data: cats } = await supabase
    .from("menu_categories")
    .select("id, slug, title, note, kind, sort_order")
    .eq("location_id", loc.id)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (!cats?.length) return [];

  const { data: items } = await supabase
    .from("menu_items")
    .select(
      "id, category_id, name, description, price, tags, is_available, is_sold_out, sort_order",
    )
    .in(
      "category_id",
      cats.map((c) => c.id),
    )
    .order("sort_order", { ascending: true });

  return cats.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    note: c.note ?? undefined,
    kind: c.kind as "drink" | "food",
    items: (items ?? [])
      .filter((it) => it.category_id === c.id && it.is_available)
      .map((it) => ({
        id: it.id,
        name: it.name,
        description: it.description ?? undefined,
        price: fmtPrice(it.price),
        tags: it.tags ?? [],
        isAvailable: it.is_available,
        isSoldOut: it.is_sold_out,
      })),
  }));
}

/** Cached per-location menu read; revalidated by admin writes via tags. */
export function getMenuForLocation(slug: string) {
  return unstable_cache(() => fetchMenu(slug), ["menu", slug], {
    tags: ["menu", `menu:${slug}`],
    revalidate: 3600,
  })();
}
