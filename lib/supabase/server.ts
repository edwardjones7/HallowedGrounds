import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

/**
 * Cookie-bound server client for the AUTHENTICATED admin session (Server
 * Components, Route Handlers, Server Actions). Reads/writes the session cookie
 * so middleware-refreshed auth stays in sync. Returns null when unconfigured.
 */
export async function getServerClient() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component — cookie writes are handled by
          // middleware in that case. Safe to ignore.
        }
      },
    },
  });
}
