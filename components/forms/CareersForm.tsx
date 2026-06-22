"use client";

import { useState } from "react";
import { locations } from "@/content/locations";
import { Field, inputCls } from "@/components/forms/Field";

const roles = [
  "Barista",
  "Kitchen / Line",
  "Baker",
  "Shift Lead",
  "Catering Staff",
  "Open to anything",
];

export function CareersForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    // Normalize the checkbox to a string the server schema accepts, then post
    // the FormData as-is (multipart) so the résumé file rides along.
    fd.set("over18", fd.get("over18") === "on" ? "true" : "false");
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        body: fd,
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
        <p className="font-display text-3xl text-brass">Thanks for applying.</p>
        <p className="mt-3 text-parchment/65">
          We review every application. If it&apos;s a fit, we&apos;ll reach out to
          set up a conversation.
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
        <Field label="Phone" required>
          <input name="phone" type="tel" required className={inputCls} />
        </Field>
        <Field label="Role" required>
          <select name="role" required className={inputCls} defaultValue="">
            <option value="" disabled className="bg-ink">
              Choose…
            </option>
            {roles.map((r) => (
              <option key={r} value={r} className="bg-ink">
                {r}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preferred Location" required>
          <select name="location" required className={inputCls} defaultValue="">
            <option value="" disabled className="bg-ink">
              Choose…
            </option>
            {locations.map((l) => (
              <option key={l.slug} value={l.name} className="bg-ink">
                {l.name}
              </option>
            ))}
            <option value="Either" className="bg-ink">
              Either
            </option>
          </select>
        </Field>
        <Field label="Availability" required>
          <input
            name="availability"
            required
            placeholder="e.g. Weekday mornings"
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Why Hallowed Grounds?">
        <textarea
          name="message"
          rows={4}
          className={`${inputCls} resize-none`}
          placeholder="Tell us a little about yourself and your experience…"
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-parchment/70">
        <input
          name="over18"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 accent-[var(--color-brass)]"
        />
        I confirm that I am 18 years of age or older.
      </label>

      <Field label="Résumé (PDF or Word, optional)">
        <input
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="block w-full text-sm text-parchment/70 file:mr-4 file:border file:border-brass/30 file:bg-transparent file:px-4 file:py-2 file:text-[0.7rem] file:uppercase file:tracking-[0.18em] file:text-brass hover:file:border-brass/60"
        />
        <span className="mt-1 block text-xs text-parchment/40">
          Up to 15 MB.
        </span>
      </Field>

      {error && <p className="text-sm text-red-300">{error}</p>}

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full bg-brass px-7 py-4 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-brass-bright disabled:opacity-60 sm:w-auto"
      >
        {state === "loading" ? "Sending…" : "Submit Application →"}
      </button>
    </form>
  );
}
