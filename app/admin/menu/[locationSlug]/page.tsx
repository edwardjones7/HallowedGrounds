import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocation } from "@/content/locations";
import { getServerClient } from "@/lib/supabase/server";
import { inputCls } from "@/components/forms/Field";
import {
  createCategory,
  deleteCategory,
  createItem,
  updateItem,
  toggleSoldOut,
  deleteItem,
} from "../actions";

export default async function AdminLocationMenu({
  params,
}: {
  params: Promise<{ locationSlug: string }>;
}) {
  const { locationSlug } = await params;
  const loc = getLocation(locationSlug);
  if (!loc) notFound();

  const supabase = await getServerClient();
  if (!supabase) {
    return (
      <p className="text-parchment/60">
        Supabase isn&apos;t configured in this environment.
      </p>
    );
  }

  const { data: locationRow } = await supabase
    .from("locations")
    .select("id")
    .eq("slug", locationSlug)
    .maybeSingle();

  if (!locationRow) {
    return (
      <div>
        <h1 className="font-display text-4xl text-parchment">{loc.name}</h1>
        <p className="mt-4 max-w-xl text-sm text-parchment/60">
          This location isn&apos;t in the database yet. Run the seed script
          (<code className="text-brass">npm run seed</code>) to import the
          starter menu, then refresh.
        </p>
      </div>
    );
  }

  const { data: categories } = await supabase
    .from("menu_categories")
    .select("id, slug, title, note, kind, sort_order")
    .eq("location_id", locationRow.id)
    .order("sort_order", { ascending: true });

  const { data: items } = await supabase
    .from("menu_items")
    .select("id, category_id, name, description, price, tags, is_sold_out, sort_order")
    .in("category_id", (categories ?? []).map((c) => c.id))
    .order("sort_order", { ascending: true });

  const itemsByCat = (catId: string) =>
    (items ?? []).filter((it) => it.category_id === catId);

  return (
    <div className="max-w-3xl">
      <Link href="/admin/menu" className="text-sm text-parchment/50 hover:text-brass">
        ← All menus
      </Link>
      <h1 className="mt-2 font-display text-4xl text-parchment">{loc.name}</h1>

      {/* Categories */}
      <div className="mt-10 space-y-10">
        {(categories ?? []).map((cat) => (
          <section key={cat.id} className="border border-brass/15 bg-ink-soft p-6">
            <div className="flex items-baseline justify-between">
              <div>
                <h2 className="font-display text-2xl text-parchment">
                  {cat.title}
                </h2>
                <p className="text-xs uppercase tracking-[0.15em] text-parchment/40">
                  {cat.kind} · {cat.slug}
                </p>
              </div>
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={cat.id} />
                <input type="hidden" name="locationSlug" value={locationSlug} />
                <button className="text-xs text-red-300/80 hover:text-red-300">
                  Delete category
                </button>
              </form>
            </div>

            {/* Items */}
            <ul className="mt-6 space-y-4">
              {itemsByCat(cat.id).map((it) => (
                <li key={it.id} className="border-t border-brass/10 pt-4">
                  <form
                    action={updateItem}
                    className="grid gap-2 sm:grid-cols-[1.4fr_0.5fr_1fr_auto]"
                  >
                    <input type="hidden" name="id" value={it.id} />
                    <input type="hidden" name="locationSlug" value={locationSlug} />
                    <input
                      name="name"
                      defaultValue={it.name}
                      className={inputCls}
                    />
                    <input
                      name="price"
                      defaultValue={it.price ?? ""}
                      placeholder="Price"
                      className={inputCls}
                    />
                    <input
                      name="tags"
                      defaultValue={(it.tags ?? []).join(", ")}
                      placeholder="Tags (comma sep)"
                      className={inputCls}
                    />
                    <button className="whitespace-nowrap bg-brass/90 px-3 text-xs uppercase tracking-[0.12em] text-ink hover:bg-brass">
                      Save
                    </button>
                    <input
                      name="description"
                      defaultValue={it.description ?? ""}
                      placeholder="Description"
                      className={`${inputCls} sm:col-span-4`}
                    />
                  </form>
                  <div className="mt-2 flex gap-4">
                    <form action={toggleSoldOut}>
                      <input type="hidden" name="id" value={it.id} />
                      <input
                        type="hidden"
                        name="locationSlug"
                        value={locationSlug}
                      />
                      <input
                        type="hidden"
                        name="soldOut"
                        value={(!it.is_sold_out).toString()}
                      />
                      <button
                        className={`text-xs ${it.is_sold_out ? "text-brass" : "text-parchment/50 hover:text-brass"}`}
                      >
                        {it.is_sold_out ? "● Sold out — mark available" : "Mark sold out"}
                      </button>
                    </form>
                    <form action={deleteItem}>
                      <input type="hidden" name="id" value={it.id} />
                      <input
                        type="hidden"
                        name="locationSlug"
                        value={locationSlug}
                      />
                      <button className="text-xs text-red-300/70 hover:text-red-300">
                        Delete
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>

            {/* Add item */}
            <form
              action={createItem}
              className="mt-6 grid gap-2 border-t border-dashed border-brass/20 pt-4 sm:grid-cols-[1.4fr_0.5fr_1fr_auto]"
            >
              <input type="hidden" name="categoryId" value={cat.id} />
              <input type="hidden" name="locationSlug" value={locationSlug} />
              <input
                type="hidden"
                name="sort_order"
                value={itemsByCat(cat.id).length}
              />
              <input name="name" required placeholder="New item name" className={inputCls} />
              <input name="price" placeholder="Price" className={inputCls} />
              <input name="tags" placeholder="Tags" className={inputCls} />
              <button className="whitespace-nowrap border border-brass/50 px-3 text-xs uppercase tracking-[0.12em] text-brass hover:bg-brass/10">
                + Add
              </button>
            </form>
          </section>
        ))}
      </div>

      {/* Add category */}
      <form
        action={createCategory}
        className="mt-10 grid gap-3 border border-dashed border-brass/25 p-6 sm:grid-cols-2"
      >
        <h2 className="font-display text-xl text-parchment sm:col-span-2">
          Add a category
        </h2>
        <input type="hidden" name="locationId" value={locationRow.id} />
        <input type="hidden" name="locationSlug" value={locationSlug} />
        <input
          type="hidden"
          name="sort_order"
          value={(categories ?? []).length}
        />
        <input name="title" required placeholder="Title (e.g. Signature Lattes)" className={inputCls} />
        <input name="slug" required placeholder="slug (e.g. signature)" className={inputCls} />
        <input name="note" placeholder="Note (optional)" className={inputCls} />
        <select name="kind" defaultValue="drink" className={inputCls}>
          <option value="drink" className="bg-ink">Drink</option>
          <option value="food" className="bg-ink">Food</option>
        </select>
        <button className="bg-brass px-5 py-3 text-xs uppercase tracking-[0.15em] text-ink hover:bg-brass-bright sm:col-span-2">
          Add Category
        </button>
      </form>
    </div>
  );
}
