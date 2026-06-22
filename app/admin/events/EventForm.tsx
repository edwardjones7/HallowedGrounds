import { inputCls } from "@/components/forms/Field";
import type { EventRow } from "@/lib/supabase/types";

function toLocalInput(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventForm({
  action,
  event,
  dbLocations,
}: {
  action: (formData: FormData) => void;
  event?: EventRow;
  dbLocations: { id: string; name: string }[];
}) {
  return (
    <form action={action} className="grid max-w-2xl gap-4">
      {event && <input type="hidden" name="id" value={event.id} />}
      <label className="block">
        <span className="mb-1 block text-xs uppercase tracking-[0.18em] text-parchment/55">
          Title
        </span>
        <input name="title" required defaultValue={event?.title} className={inputCls} />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs uppercase tracking-[0.18em] text-parchment/55">
          Slug
        </span>
        <input name="slug" required defaultValue={event?.slug} className={inputCls} />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs uppercase tracking-[0.18em] text-parchment/55">
          Description
        </span>
        <textarea
          name="description"
          rows={4}
          defaultValue={event?.description ?? ""}
          className={`${inputCls} resize-none`}
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-[0.18em] text-parchment/55">
            Starts
          </span>
          <input
            name="starts_at"
            type="datetime-local"
            required
            defaultValue={toLocalInput(event?.starts_at)}
            className={`${inputCls} [color-scheme:dark]`}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-[0.18em] text-parchment/55">
            Ends (optional)
          </span>
          <input
            name="ends_at"
            type="datetime-local"
            defaultValue={toLocalInput(event?.ends_at)}
            className={`${inputCls} [color-scheme:dark]`}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-xs uppercase tracking-[0.18em] text-parchment/55">
          Location (optional)
        </span>
        <select
          name="location_id"
          defaultValue={event?.location_id ?? ""}
          className={inputCls}
        >
          <option value="" className="bg-ink">
            Both / All
          </option>
          {dbLocations.map((l) => (
            <option key={l.id} value={l.id} className="bg-ink">
              {l.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-xs uppercase tracking-[0.18em] text-parchment/55">
          Ticket / RSVP link (optional)
        </span>
        <input
          name="ticket_url"
          defaultValue={event?.ticket_url ?? ""}
          placeholder="https://eventbrite.com/…"
          className={inputCls}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs uppercase tracking-[0.18em] text-parchment/55">
          Image {event?.image_url ? "(replace)" : "(optional)"}
        </span>
        <input
          name="image"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-parchment/70 file:mr-4 file:border file:border-brass/30 file:bg-transparent file:px-4 file:py-2 file:text-[0.7rem] file:uppercase file:tracking-[0.18em] file:text-brass"
        />
        {event?.image_url && (
          <span className="mt-1 block text-xs text-parchment/40">
            Current image will be kept unless you upload a new one.
          </span>
        )}
      </label>
      <button className="mt-2 bg-brass px-7 py-3 text-xs uppercase tracking-[0.15em] text-ink hover:bg-brass-bright">
        {event ? "Save Event" : "Create Event"}
      </button>
    </form>
  );
}
