/**
 * Seeds locations + per-location menus into Supabase from the static content
 * modules. Idempotent: upserts locations by slug, and replaces each location's
 * menu so re-running reflects edits to content/menu.ts.
 *
 * Run:  npx tsx --env-file=.env.local supabase/seed.ts
 * Needs: NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in the env.
 */
import { createClient } from "@supabase/supabase-js";
import { locations } from "../content/locations";
import {
  drinkMenu,
  foodMenu,
  monthlySpecials,
  type MenuCategory,
} from "../content/menu";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
      "Run with: npx tsx --env-file=.env.local supabase/seed.ts",
  );
  process.exit(1);
}

const db = createClient(url, key, {
  auth: { persistSession: false },
});

const toPrice = (p?: string) => {
  if (!p) return null;
  const n = Number(p.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : null;
};

async function seedLocation(slug: string, name: string, sortOrder: number) {
  const { data, error } = await db
    .from("locations")
    .upsert({ slug, name, sort_order: sortOrder, is_active: true }, { onConflict: "slug" })
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}

async function seedCategories(
  locationId: string,
  cats: MenuCategory[],
  kind: "drink" | "food",
  startOrder: number,
) {
  let order = startOrder;
  for (const cat of cats) {
    const { data, error } = await db
      .from("menu_categories")
      .upsert(
        {
          location_id: locationId,
          slug: cat.id,
          title: cat.title,
          note: cat.note ?? null,
          kind,
          sort_order: order++,
          is_active: true,
        },
        { onConflict: "location_id,slug" },
      )
      .select("id")
      .single();
    if (error) throw error;
    const categoryId = data.id as string;

    // Replace items for this category to keep the seed idempotent.
    await db.from("menu_items").delete().eq("category_id", categoryId);
    const rows = cat.items.map((it, i) => ({
      category_id: categoryId,
      name: it.name,
      description: it.description ?? null,
      price: toPrice(it.price),
      tags: it.tags ?? [],
      sort_order: i,
    }));
    if (rows.length) {
      const { error: itemErr } = await db.from("menu_items").insert(rows);
      if (itemErr) throw itemErr;
    }
  }
  return order;
}

async function seedSpecials(locationId: string) {
  const { data, error } = await db
    .from("menu_categories")
    .upsert(
      {
        location_id: locationId,
        slug: "specials",
        title: "Barista Specials",
        note: "This month's rotating creations.",
        kind: "drink",
        sort_order: -1, // surface first
        is_active: true,
      },
      { onConflict: "location_id,slug" },
    )
    .select("id")
    .single();
  if (error) throw error;
  const categoryId = data.id as string;
  await db.from("menu_items").delete().eq("category_id", categoryId);
  const rows = monthlySpecials.map((it, i) => ({
    category_id: categoryId,
    name: it.name,
    description: it.description ?? null,
    price: toPrice(it.price),
    tags: it.tags ?? [],
    sort_order: i,
  }));
  if (rows.length) {
    const { error: itemErr } = await db.from("menu_items").insert(rows);
    if (itemErr) throw itemErr;
  }
}

async function main() {
  for (let i = 0; i < locations.length; i++) {
    const loc = locations[i];
    const id = await seedLocation(loc.slug, loc.name, i);
    await seedSpecials(id);
    let order = await seedCategories(id, drinkMenu, "drink", 0);
    // Merchantville is a coffee bar — food is handled by Thyme Kitchen.
    if (loc.slug !== "merchantville") {
      await seedCategories(id, foodMenu, "food", order);
    }
    console.log(`✓ Seeded ${loc.name}`);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
