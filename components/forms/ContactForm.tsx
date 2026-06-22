"use client";

import { useState } from "react";
import { Field, inputCls } from "@/components/forms/Field";

const topics = [
  "General question",
  "Catering",
  "Careers",
  "Press / Media",
  "Feedback",
  "Something else",
];

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      subject: fd.get("subject"),
      message: fd.get("message"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <div className="border border-brass/30 bg-espresso/30 p-10 text-center">
        <p className="font-display text-3xl text-brass">Message sent.</p>
        <p className="mt-3 text-parchment/65">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" required>
          <input name="name" required className={inputCls} />
        </Field>
        <Field label="Email" required>
          <input name="email" type="email" required className={inputCls} />
        </Field>
        <Field label="Phone">
          <input name="phone" type="tel" className={inputCls} />
        </Field>
        <Field label="Topic" required>
          <select name="subject" required className={inputCls} defaultValue="">
            <option value="" disabled className="bg-ink">
              Choose…
            </option>
            {topics.map((t) => (
              <option key={t} value={t} className="bg-ink">
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" required>
        <textarea
          name="message"
          rows={5}
          required
          className={`${inputCls} resize-none`}
          placeholder="How can we help?"
        />
      </Field>

      {error && <p className="text-sm text-red-300">{error}</p>}

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full bg-brass px-7 py-4 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-brass-bright disabled:opacity-60 sm:w-auto"
      >
        {state === "loading" ? "Sending…" : "Send Message →"}
      </button>
    </form>
  );
}
