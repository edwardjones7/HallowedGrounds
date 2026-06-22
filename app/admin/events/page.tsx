import Link from "next/link";
import { getServerClient } from "@/lib/supabase/server";
import { togglePublish, deleteEvent } from "./actions";

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export default async function AdminEvents() {
  const supabase = await getServerClient();
  if (!supabase) {
    return <p className="text-parchment/60">Supabase isn&apos;t configured.</p>;
  }

  const { data: events } = await supabase
    .from("events")
    .select("id, title, slug, starts_at, is_published")
    .order("starts_at", { ascending: true });

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl text-parchment">Events</h1>
        <Link
          href="/admin/events/new"
          className="bg-brass px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-ink hover:bg-brass-bright"
        >
          + New event
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {(events ?? []).length === 0 && (
          <p className="text-sm text-parchment/55">No events yet.</p>
        )}
        {(events ?? []).map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between gap-4 border border-brass/15 bg-ink-soft p-4"
          >
            <div className="min-w-0">
              <Link
                href={`/admin/events/${e.id}`}
                className="font-display text-lg text-parchment hover:text-brass"
              >
                {e.title}
              </Link>
              <p className="text-xs text-parchment/45">
                {fmt.format(new Date(e.starts_at))}
                {e.is_published ? " · Published" : " · Draft"}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <form action={togglePublish}>
                <input type="hidden" name="id" value={e.id} />
                <input
                  type="hidden"
                  name="publish"
                  value={(!e.is_published).toString()}
                />
                <button className="text-xs uppercase tracking-[0.12em] text-brass hover:underline">
                  {e.is_published ? "Unpublish" : "Publish"}
                </button>
              </form>
              <form action={deleteEvent}>
                <input type="hidden" name="id" value={e.id} />
                <button className="text-xs text-red-300/70 hover:text-red-300">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
