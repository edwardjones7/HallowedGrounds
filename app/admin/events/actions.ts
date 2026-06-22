"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerClient } from "@/lib/supabase/server";
import { uploadEventImage } from "@/lib/storage";

async function client() {
  const supabase = await getServerClient();
  if (!supabase) throw new Error("Supabase not configured.");
  return supabase;
}

function refresh() {
  revalidateTag("events");
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

function toIso(v: FormDataEntryValue | null): string | null {
  if (!v || !String(v).trim()) return null;
  return new Date(String(v)).toISOString();
}

async function imageUrlFrom(formData: FormData): Promise<string | null> {
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    return uploadEventImage(file);
  }
  const url = formData.get("image_url");
  return url ? String(url) : null;
}

async function fields(formData: FormData) {
  return {
    title: String(formData.get("title")),
    slug: String(formData.get("slug")),
    description: (formData.get("description") as string) || null,
    starts_at: toIso(formData.get("starts_at")),
    ends_at: toIso(formData.get("ends_at")),
    ticket_url: (formData.get("ticket_url") as string) || null,
    location_id: (formData.get("location_id") as string) || null,
  };
}

export async function createEvent(formData: FormData) {
  const supabase = await client();
  const image_url = await imageUrlFrom(formData);
  await supabase.from("events").insert({
    ...(await fields(formData)),
    image_url,
    is_published: false,
  });
  refresh();
  redirect("/admin/events");
}

export async function updateEvent(formData: FormData) {
  const supabase = await client();
  const image_url = await imageUrlFrom(formData);
  const base = await fields(formData);
  await supabase
    .from("events")
    .update(image_url ? { ...base, image_url } : base)
    .eq("id", String(formData.get("id")));
  refresh();
  redirect("/admin/events");
}

export async function togglePublish(formData: FormData) {
  const supabase = await client();
  await supabase
    .from("events")
    .update({ is_published: formData.get("publish") === "true" })
    .eq("id", String(formData.get("id")));
  refresh();
}

export async function deleteEvent(formData: FormData) {
  const supabase = await client();
  await supabase.from("events").delete().eq("id", String(formData.get("id")));
  refresh();
}
