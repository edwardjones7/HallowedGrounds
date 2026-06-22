"use server";

import { revalidatePath } from "next/cache";
import { getServerClient } from "@/lib/supabase/server";
import type { LeadStatus } from "@/lib/supabase/types";

export async function setLeadStatus(formData: FormData) {
  const supabase = await getServerClient();
  if (!supabase) throw new Error("Supabase not configured.");
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as LeadStatus;
  await supabase.from("leads").update({ status }).eq("id", id);
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
}
