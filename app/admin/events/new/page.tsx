import Link from "next/link";
import { getServerClient } from "@/lib/supabase/server";
import { EventForm } from "../EventForm";
import { createEvent } from "../actions";

export default async function NewEvent() {
  const supabase = await getServerClient();
  const { data: dbLocations } = supabase
    ? await supabase.from("locations").select("id, name").order("sort_order")
    : { data: [] };

  return (
    <div>
      <Link href="/admin/events" className="text-sm text-parchment/50 hover:text-brass">
        ← All events
      </Link>
      <h1 className="mt-2 font-display text-4xl text-parchment">New event</h1>
      <div className="mt-8">
        <EventForm action={createEvent} dbLocations={dbLocations ?? []} />
      </div>
    </div>
  );
}
