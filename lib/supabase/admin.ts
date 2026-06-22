import "server-only";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./config";

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/** True when the service-role client can be created (writes + private reads). */
export const isAdminConfigured = Boolean(SUPABASE_URL && serviceKey);

/**
 * Service-role client. SERVER ONLY — bypasses RLS. Used for lead inserts,
 * résumé uploads, signed URLs, and admin mutations. Returns null when the
 * service key is absent so write paths can degrade gracefully in dev.
 */
export function getAdminClient() {
  if (!isAdminConfigured) return null;
  return createClient(SUPABASE_URL, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
