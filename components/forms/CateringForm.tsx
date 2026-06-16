"use client";

import { useState } from "react";
import { catering } from "@/content/catering";
import { locations } from "@/content/locations";
import { Field, inputCls } from "@/components/forms/Field";

export function CateringForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const [addOns, setAddOns] = useState<string[]>([]);

  function toggleAddOn(item: string) {
    setAddOns((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      eventDate: fd.get("eventDate"),
      startTime: fd.get("startTime"),
      endTime: fd.get("endTime"),
      location: fd.get("location"),
      guestCount: fd.get("guestCount"),
      eventType: fd.get("eventType"),
      addOns,
      notes: fd.get("notes"),
    };
    try {
      const res = await fetch("/api/catering", {
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
        <p className="font-display text-3xl text-brass">Request received.</p>
        <p className="mt-3 text-parchment/65">
          We&apos;ll be in touch within 1–2 business days to craft your event.
          Keep an eye on your inbox.
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
        <Field label="Event Date" required>
          <input
            name="eventDate"
            type="date"
            required
            className={`${inputCls} [color-scheme:dark]`}
          />
        </Field>
        <Field label="Start Time">
          <input
            name="startTime"
            type="time"
            className={`${inputCls} [color-scheme:dark]`}
          />
        </Field>
        <Field label="End Time">
          <input
            name="endTime"
            type="time"
            className={`${inputCls} [color-scheme:dark]`}
          />
        </Field>
        <Field label="Location" required>
          <select name="location" required className={inputCls} defaultValue="">
            <option value="" disabled className="bg-ink">
              Choose…
            </option>
            {locations.map((l) => (
              <option key={l.slug} value={l.name} className="bg-ink">
                {l.name}
              </option>
            ))}
            <option value="Off-site / Mobile" className="bg-ink">
              Off-site / Mobile
            </option>
          </select>
        </Field>
        <Field label="Guest Count" required>
          <input
            name="guestCount"
            type="number"
            min="1"
            required
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Event Type" required>
        <select name="eventType" required className={inputCls} defaultValue="">
          <option value="" disabled className="bg-ink">
            Choose…
          </option>
          {catering.eventTypes.map((t) => (
            <option key={t} value={t} className="bg-ink">
              {t}
            </option>
          ))}
        </select>
      </Field>

      {/* Add-ons */}
      <fieldset>
        <legend className="mb-3 text-[0.68rem] uppercase tracking-[0.2em] text-parchment/55">
          Enhancements
        </legend>
        <div className="flex flex-wrap gap-2">
          {catering.addOns.map((item) => {
            const active = addOns.includes(item);
            return (
              <button
                type="button"
                key={item}
                onClick={() => toggleAddOn(item)}
                aria-pressed={active}
                className={`border px-4 py-2 text-sm transition-colors duration-300 ${
                  active
                    ? "border-brass bg-brass/15 text-brass"
                    : "border-brass/20 text-parchment/65 hover:border-brass/50"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field label="Tell us about your event">
        <textarea
          name="notes"
          rows={4}
          className={`${inputCls} resize-none`}
          placeholder="Theme, vibe, dietary needs, anything you'd like us to know…"
        />
      </Field>

      <p className="text-sm text-parchment/45">{catering.terms}</p>

      {error && <p className="text-sm text-red-300">{error}</p>}

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full bg-brass px-7 py-4 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-brass-bright disabled:opacity-60 sm:w-auto"
      >
        {state === "loading" ? "Sending…" : "Request a Quote →"}
      </button>
    </form>
  );
}
