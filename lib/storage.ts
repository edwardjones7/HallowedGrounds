import "server-only";
import { getAdminClient } from "./supabase/admin";

export const RESUME_MAX_BYTES = 15 * 1024 * 1024; // 15 MB
export const RESUME_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export type UploadResult =
  | { ok: true; path: string | null }
  | { ok: false; error: string };

/**
 * Uploads a résumé to the private `resumes` bucket via the service-role client.
 * Validates size + MIME server-side. Returns { ok, path } — path is null when
 * Supabase isn't configured (dev) so the application still goes through.
 */
export async function uploadResume(file: File): Promise<UploadResult> {
  if (file.size > RESUME_MAX_BYTES) {
    return { ok: false, error: "Résumé must be under 15 MB." };
  }
  if (!RESUME_MIME.has(file.type)) {
    return { ok: false, error: "Résumé must be a PDF or Word document." };
  }

  const supabase = getAdminClient();
  if (!supabase) {
    console.log("[DEV RESUME — no Supabase]", file.name, file.size, file.type);
    return { ok: true, path: null };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "pdf";
  const safe = file.name.replace(/[^a-z0-9.\-_]+/gi, "_").slice(0, 60);
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}-${safe}.${ext}`;

  const { error } = await supabase.storage
    .from("resumes")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) return { ok: false, error: error.message };
  return { ok: true, path };
}

/**
 * Uploads an event image to the public `event-images` bucket and returns its
 * public URL. Returns null when Supabase isn't configured.
 */
export async function uploadEventImage(file: File): Promise<string | null> {
  const supabase = getAdminClient();
  if (!supabase) return null;
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("event-images")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from("event-images").getPublicUrl(path);
  return data.publicUrl;
}

/** Short-lived signed URL for downloading a résumé from the admin inbox. */
export async function getResumeSignedUrl(path: string, expiresIn = 120) {
  const supabase = getAdminClient();
  if (!supabase) return null;
  const { data } = await supabase.storage
    .from("resumes")
    .createSignedUrl(path, expiresIn);
  return data?.signedUrl ?? null;
}
