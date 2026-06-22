"use client";

import { useState } from "react";

export function NewsletterForm({
  source = "footer",
  withPhone = false,
}: {
  source?: string;
  withPhone?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, source }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setState("done");
      setEmail("");
      setPhone("");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <p className="font-display text-xl text-brass">
        Welcome to the table. Check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 border-b border-brass/30 bg-transparent px-1 py-3 text-parchment placeholder:text-parchment/35 focus:border-brass focus:outline-none"
      />
      {withPhone && (
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone (optional)"
          className="flex-1 border-b border-brass/30 bg-transparent px-1 py-3 text-parchment placeholder:text-parchment/35 focus:border-brass focus:outline-none"
        />
      )}
      <button
        type="submit"
        disabled={state === "loading"}
        className="whitespace-nowrap bg-brass px-7 py-3 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-brass-bright disabled:opacity-60"
      >
        {state === "loading" ? "…" : "Subscribe"}
      </button>
      {error && (
        <p className="text-sm text-red-300 sm:absolute sm:mt-14">{error}</p>
      )}
    </form>
  );
}
