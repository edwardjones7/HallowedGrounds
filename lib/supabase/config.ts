// Shared Supabase config + a guard so the app builds and runs without secrets
// (mirrors the dev-fallback ethos of lib/mailer.ts).

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True when the public client can be created (URL + anon key present). */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
