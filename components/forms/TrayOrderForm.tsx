"use client";

import { useState } from "react";
import { locations } from "@/content/locations";
import { Field, inputCls } from "@/components/forms/Field";

export function TrayOrderForm() {
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
      pickupLocation: fd.get("pickupLocation"),
      pickupDate: fd.get("pickupDate"),
      pickupTime: fd.get("pickupTime"),
      items: fd.get("items"),
      quantity: fd.get("quantity"),
      dietaryNotes: fd.get("dietaryNotes"),
    };
    try {
      const res = await fetch("/api/tray", {
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
        <p className="font-display text-3xl text-brass">Order received.</p>
        <p className="mt-3 text-parchment/65">
          We&apos;ll confirm availability and your pickup time shortly. Check your
          inbox for details.
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
        <Field label="Pickup Location" required>
          <select
            name="pickupLocation"
            required
            className={inputCls}
            defaultValue=""
          >
            <option value="" disabled className="bg-ink">
              Choose…
            </option>
            {locations.map((l) => (
              <option key={l.slug} value={l.name} className="bg-ink">
                {l.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Pickup Date" required>
          <input
            name="pickupDate"
            type="date"
            required
            className={`${inputCls} [color-scheme:dark]`}
          />
        </Field>
        <Field label="Pickup Time">
          <input
            name="pickupTime"
            type="time"
            className={`${inputCls} [color-scheme:dark]`}
          />
        </Field>
        <Field label="Quantity" required>
          <input
            name="quantity"
            placeholder="e.g. 2 dozen, serves 20"
            required
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="What would you like to order?" required>
        <textarea
          name="items"
          rows={4}
          required
          className={`${inputCls} resize-none`}
          placeholder="Pastry trays, coffee boxes, breakfast sandwiches…"
        />
      </Field>

      <Field label="Dietary notes">
        <textarea
          name="dietaryNotes"
          rows={3}
          className={`${inputCls} resize-none`}
          placeholder="Allergies, gluten-free, dairy-free, etc."
        />
      </Field>

      {error && <p className="text-sm text-red-300">{error}</p>}

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full bg-brass px-7 py-4 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-brass-bright disabled:opacity-60 sm:w-auto"
      >
        {state === "loading" ? "Sending…" : "Submit Tray Order →"}
      </button>
    </form>
  );
}
