import "server-only";
import { getAdminClient } from "./supabase/admin";
import type { LeadType } from "./supabase/types";

export type SaveLeadInput = {
  type: LeadType;
  source: string;
  name?: string;
  email?: string;
  phone?: string;
  locationSlug?: string;
  resumePath?: string;
  payload: Record<string, unknown>;
};

/**
 * Persists a form submission to the `leads` table via the service-role client.
 * No-ops (logs) when Supabase isn't configured, so forms stay testable in dev.
 * Throws on a real insert error so callers can decide how to surface it — but
 * routes wrap this so a DB failure never blocks the email notification.
 */
export async function saveLead(input: SaveLeadInput) {
  const supabase = getAdminClient();
  if (!supabase) {
    console.log("\n──────── [DEV LEAD — no SUPABASE_SERVICE_ROLE_KEY] ────────");
    console.log("Type:", input.type, "| Source:", input.source);
    console.log("Contact:", input.name, input.email, input.phone);
    console.log("Payload:", JSON.stringify(input.payload));
    console.log("───────────────────────────────────────────────────────────\n");
    return { ok: true, dev: true };
  }

  const { error } = await supabase.from("leads").insert({
    type: input.type,
    source: input.source,
    name: input.name ?? null,
    email: input.email ?? null,
    phone: input.phone ?? null,
    location_slug: input.locationSlug ?? null,
    resume_path: input.resumePath ?? null,
    payload: input.payload,
  });

  if (error) throw new Error(error.message);
  return { ok: true };
}

/**
 * Upserts a newsletter subscriber, merging tags on conflict so a repeat signup
 * from a different page accumulates source tags instead of overwriting.
 */
export async function saveSubscriber(input: {
  email: string;
  phone?: string;
  tags?: string[];
  source?: string;
}) {
  const supabase = getAdminClient();
  if (!supabase) {
    console.log("[DEV SUBSCRIBER — no Supabase]", input.email, input.tags);
    return { ok: true, dev: true };
  }

  // Merge tags with any existing row.
  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("tags")
    .eq("email", input.email)
    .maybeSingle();

  const mergedTags = Array.from(
    new Set([...(existing?.tags ?? []), ...(input.tags ?? [])]),
  );

  const { error } = await supabase.from("newsletter_subscribers").upsert(
    {
      email: input.email,
      phone: input.phone ?? null,
      tags: mergedTags,
      source: input.source ?? null,
      is_active: true,
    },
    { onConflict: "email" },
  );

  if (error) throw new Error(error.message);
  return { ok: true };
}
