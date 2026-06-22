"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { getServerClient } from "@/lib/supabase/server";

function parsePrice(v: FormDataEntryValue | null): number | null {
  if (!v) return null;
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && String(v).trim() !== "" ? n : null;
}

function parseTags(v: FormDataEntryValue | null): string[] {
  if (!v) return [];
  return String(v)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

async function client() {
  const supabase = await getServerClient();
  if (!supabase) throw new Error("Supabase not configured.");
  return supabase;
}

function refresh(locationSlug: string) {
  revalidateTag("menu");
  revalidateTag(`menu:${locationSlug}`);
  revalidatePath(`/admin/menu/${locationSlug}`);
}

export async function createCategory(formData: FormData) {
  const supabase = await client();
  const locationId = String(formData.get("locationId"));
  const locationSlug = String(formData.get("locationSlug"));
  await supabase.from("menu_categories").insert({
    location_id: locationId,
    slug: String(formData.get("slug")),
    title: String(formData.get("title")),
    note: (formData.get("note") as string) || null,
    kind: (formData.get("kind") as string) || "drink",
    sort_order: Number(formData.get("sort_order") || 0),
  });
  refresh(locationSlug);
}

export async function deleteCategory(formData: FormData) {
  const supabase = await client();
  await supabase
    .from("menu_categories")
    .delete()
    .eq("id", String(formData.get("id")));
  refresh(String(formData.get("locationSlug")));
}

export async function createItem(formData: FormData) {
  const supabase = await client();
  await supabase.from("menu_items").insert({
    category_id: String(formData.get("categoryId")),
    name: String(formData.get("name")),
    description: (formData.get("description") as string) || null,
    price: parsePrice(formData.get("price")),
    tags: parseTags(formData.get("tags")),
    sort_order: Number(formData.get("sort_order") || 0),
  });
  refresh(String(formData.get("locationSlug")));
}

export async function updateItem(formData: FormData) {
  const supabase = await client();
  await supabase
    .from("menu_items")
    .update({
      name: String(formData.get("name")),
      description: (formData.get("description") as string) || null,
      price: parsePrice(formData.get("price")),
      tags: parseTags(formData.get("tags")),
    })
    .eq("id", String(formData.get("id")));
  refresh(String(formData.get("locationSlug")));
}

export async function toggleSoldOut(formData: FormData) {
  const supabase = await client();
  await supabase
    .from("menu_items")
    .update({ is_sold_out: formData.get("soldOut") === "true" })
    .eq("id", String(formData.get("id")));
  refresh(String(formData.get("locationSlug")));
}

export async function deleteItem(formData: FormData) {
  const supabase = await client();
  await supabase
    .from("menu_items")
    .delete()
    .eq("id", String(formData.get("id")));
  refresh(String(formData.get("locationSlug")));
}
