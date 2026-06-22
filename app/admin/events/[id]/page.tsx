import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerClient } from "@/lib/supabase/server";
import type { EventRow } from "@/lib/supabase/types";
import { EventForm } from "../EventForm";
import { updateEvent } from "../actions";

export default async function EditEvent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await getServerClient();
  if (!supabase) {
    return <p className="text-parchment/60">Supabase isn&apos;t configured.</p>;
  }

  const [{ data: event }, { data: dbLocations }] = await Promise.all([
    supabase.from("events").select("*").eq("id", id).maybeSingle(),
    supabase.from("locations").select("id, name").order("sort_order"),
  ]);

  if (!event) notFound();

  return (
    <div>
      <Link href="/admin/events" className="text-sm text-parchment/50 hover:text-brass">
        ← All events
      </Link>
      <h1 className="mt-2 font-display text-4xl text-parchment">Edit event</h1>
      <div className="mt-8">
        <EventForm
          action={updateEvent}
          event={event as EventRow}
          dbLocations={dbLocations ?? []}
        />
      </div>
    </div>
  );
}
