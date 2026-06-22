import { unstable_cache } from "next/cache";
import { getPublicClient } from "../supabase/public";

export type PublicEvent = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  startsAt: string;
  endsAt?: string;
  imageUrl?: string;
  ticketUrl?: string;
  locationName?: string;
};

async function fetchEvents(): Promise<PublicEvent[]> {
  const supabase = getPublicClient();
  if (!supabase) return []; // no static fallback — events are DB-only

  const { data } = await supabase
    .from("events")
    .select(
      "id, title, slug, description, starts_at, ends_at, image_url, ticket_url, location_id, locations(name)",
    )
    .eq("is_published", true)
    .order("starts_at", { ascending: true });

  return (data ?? []).map((e) => {
    const loc = e.locations as { name?: string } | { name?: string }[] | null;
    const locationName = Array.isArray(loc) ? loc[0]?.name : loc?.name;
    return {
      id: e.id,
      title: e.title,
      slug: e.slug,
      description: e.description ?? undefined,
      startsAt: e.starts_at,
      endsAt: e.ends_at ?? undefined,
      imageUrl: e.image_url ?? undefined,
      ticketUrl: e.ticket_url ?? undefined,
      locationName: locationName ?? undefined,
    };
  });
}

/** Cached published-events read; revalidated by admin writes via the `events` tag. */
export function getPublishedEvents() {
  return unstable_cache(() => fetchEvents(), ["events"], {
    tags: ["events"],
    revalidate: 3600,
  })();
}
