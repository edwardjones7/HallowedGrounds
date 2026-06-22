"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserClient } from "@/lib/supabase/browser";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Field, inputCls } from "@/components/forms/Field";

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!isSupabaseConfigured) {
      setError("Supabase isn't configured yet. Add the env vars to sign in.");
      return;
    }
    setState("loading");
    const fd = new FormData(e.currentTarget);
    const supabase = getBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(fd.get("email")),
      password: String(fd.get("password")),
    });
    if (error) {
      setState("idle");
      setError(error.message);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <p className="font-display text-2xl text-brass">Hallowed Grounds</p>
        <h1 className="mt-1 text-sm uppercase tracking-[0.2em] text-parchment/50">
          Admin Sign In
        </h1>
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <Field label="Email" required>
            <input name="email" type="email" required className={inputCls} />
          </Field>
          <Field label="Password" required>
            <input
              name="password"
              type="password"
              required
              className={inputCls}
            />
          </Field>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button
            type="submit"
            disabled={state === "loading"}
            className="w-full bg-brass px-7 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-brass-bright disabled:opacity-60"
          >
            {state === "loading" ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
