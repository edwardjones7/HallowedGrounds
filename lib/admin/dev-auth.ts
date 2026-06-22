import { cookies } from "next/headers";
import { isSupabaseConfigured } from "@/lib/supabase/config";

// ⚠️⚠️⚠ LOCAL TESTING ONLY — REMOVE BEFORE PRODUCTION ⚠️⚠️⚠
// A hardcoded admin password so you can open /admin without Supabase wired up.
// This bypass AUTO-DISABLES the moment real Supabase auth is configured
// (NEXT_PUBLIC_SUPABASE_URL + ANON key present). Delete this file + its
// references once you have real staff accounts.
export const DEV_ADMIN_PASSWORD =
  process.env.ADMIN_DEV_PASSWORD || "grounds2026";
export const DEV_ADMIN_COOKIE = "hg_dev_admin";

/** Dev bypass is active only while no real auth backend is configured. */
export const isDevAdminEnabled = () => !isSupabaseConfigured;

/** True when the current request carries a valid dev-admin cookie. */
export async function hasDevAdminSession() {
  if (!isDevAdminEnabled()) return false;
  const store = await cookies();
  return store.get(DEV_ADMIN_COOKIE)?.value === "1";
}
