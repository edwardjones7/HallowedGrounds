// Per-form email routing. Each address falls back to CONTACT_TO_EMAIL when unset
// so the site keeps working before all client inboxes are provided.

import type { LeadType } from "./supabase/types";

const fallback = process.env.CONTACT_TO_EMAIL || "hello@hallowedgroundscoffeeco.com";
const catering = process.env.CATERING_TO_EMAIL || fallback;
const kyle = process.env.KYLE_EMAIL || fallback;
const hiring = process.env.HIRING_TO_EMAIL || fallback;

/** Recipients for each form type. Tray orders go to catering AND Kyle. */
export const FORM_ROUTING: Record<LeadType, string[]> = {
  catering: [catering],
  tray: Array.from(new Set([catering, kyle])),
  careers: [hiring],
  contact: [fallback],
};
