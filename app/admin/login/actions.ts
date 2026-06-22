"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  DEV_ADMIN_PASSWORD,
  DEV_ADMIN_COOKIE,
  isDevAdminEnabled,
} from "@/lib/admin/dev-auth";

// ⚠ LOCAL TESTING ONLY — see lib/admin/dev-auth.ts
export async function devLogin(formData: FormData) {
  if (!isDevAdminEnabled()) redirect("/admin/login");
  const pw = String(formData.get("password") ?? "");
  if (pw !== DEV_ADMIN_PASSWORD) redirect("/admin/login?error=1");
  const store = await cookies();
  store.set(DEV_ADMIN_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  redirect("/admin");
}
