import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

/**
 * Anon, cookie-less client for PUBLIC reads (menus, events). Gated by RLS —
 * only sees active/published rows. Returns null when Supabase isn't configured
 * so callers can fall back to static content in local dev.
 */
export function getPublicClient() {
  if (!isSupabaseConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}
