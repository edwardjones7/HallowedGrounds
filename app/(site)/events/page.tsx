import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { getPublishedEvents } from "@/lib/queries/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Live music, tastings, pop-ups, and community gatherings at Hallowed Grounds Coffee Co. in South Jersey. See what's coming up.",
};

const dateFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "long",
  day: "numeric",
});
const timeFmt = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

export default async function EventsPage() {
  const events = await getPublishedEvents();

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Gather"
        accent="with us."
        intro="Live music, tastings, pop-ups, and community nights. Pull up a chair."
      />

      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          {events.length === 0 ? (
            <Reveal>
              <div className="border border-dashed border-brass/30 bg-espresso/20 p-12 text-center">
                <p className="font-display text-2xl text-parchment">
                  Nothing on the calendar right now.
                </p>
                <p className="mx-auto mt-3 max-w-md text-parchment/60">
                  We&apos;re planning our next gathering. Join the mailing list
                  or follow us to be the first to know.
                </p>
                <div className="mt-7 flex justify-center">
                  <Button href="/contact" variant="outline">
                    Get on the list
                  </Button>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e, i) => {
                const start = new Date(e.startsAt);
                return (
                  <Reveal key={e.id} delay={i * 0.06}>
                    <article className="flex h-full flex-col overflow-hidden border border-brass/15 bg-ink-soft">
                      {e.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={e.imageUrl}
                          alt={e.title}
                          className="aspect-[3/2] w-full object-cover"
                        />
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-sm text-brass">
                          {dateFmt.format(start)} · {timeFmt.format(start)}
                        </p>
                        <h2 className="mt-2 font-display text-2xl text-parchment">
                          {e.title}
                        </h2>
                        {e.locationName && (
                          <p className="mt-1 text-sm text-parchment/55">
                            {e.locationName}
                          </p>
                        )}
                        {e.description && (
                          <p className="mt-3 text-sm leading-relaxed text-parchment/65">
                            {e.description}
                          </p>
                        )}
                        {e.ticketUrl && (
                          <div className="mt-6 pt-2">
                            <Button
                              href={e.ticketUrl}
                              variant="solid"
                              external
                            >
                              Tickets & RSVP
                            </Button>
                          </div>
                        )}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
