import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { locations, getLocation } from "@/content/locations";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GoldRule } from "@/components/ui/GoldRule";
import { LocalBusinessSchema } from "@/lib/schema";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  return {
    title: `${loc.name} — ${loc.model}`,
    description: loc.blurb,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const other = locations.find((l) => l.slug !== slug);

  return (
    <>
      <LocalBusinessSchema slug={slug} />

      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden">
        <div
          className="absolute inset-0 -z-10 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `url('${loc.image}')` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 md:px-8">
          <SectionLabel>{loc.model}</SectionLabel>
          <h1 className="mt-5 font-display text-5xl font-light leading-none text-parchment md:text-8xl">
            {loc.name}
          </h1>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[1.3fr_0.7fr]">
          {/* Left: story + highlights */}
          <Reveal>
            <p className="max-w-xl font-display text-2xl font-light leading-relaxed text-parchment md:text-3xl">
              {loc.blurb}
            </p>

            <div className="mt-12 grid gap-px sm:grid-cols-2">
              {loc.highlights.map((h, i) => (
                <div
                  key={h}
                  className="flex items-baseline gap-4 border-t border-brass/12 py-5"
                >
                  <span className="font-display text-sm text-brass/70">
                    0{i + 1}
                  </span>
                  <span className="text-parchment/80">{h}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: details card */}
          <Reveal delay={0.1}>
            <aside className="border border-brass/20 bg-ink-soft p-8">
              <p className="eyebrow mb-5">Visit</p>
              <address className="not-italic leading-relaxed text-parchment/80">
                {loc.address.street}
                <br />
                {loc.address.city}, {loc.address.state} {loc.address.zip}
              </address>

              <GoldRule className="my-6" />

              <p className="eyebrow mb-3">Hours</p>
              {loc.hours.map((h) => (
                <p key={h.days} className="text-parchment/80">
                  {h.days}
                  <span className="block text-parchment/55">{h.time}</span>
                </p>
              ))}
              {loc.hoursNote && (
                <p className="mt-3 text-sm text-parchment/50">{loc.hoursNote}</p>
              )}

              <GoldRule className="my-6" />

              <div className="flex flex-col gap-3">
                <Button href={loc.orderUrl} variant="solid" external>
                  Order Ahead
                </Button>
                <Button href={loc.mapUrl} variant="outline" external>
                  Get Directions
                </Button>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Other location */}
      {other && (
        <section className="border-t border-brass/15 px-5 py-16 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="eyebrow mb-2">Also Visit</p>
              <Link
                href={`/locations/${other.slug}`}
                className="font-display text-3xl text-parchment transition-colors hover:text-brass md:text-4xl"
              >
                {other.name} →
              </Link>
            </div>
            <p className="max-w-xs text-sm text-parchment/55">{other.model}</p>
          </div>
        </section>
      )}
    </>
  );
}
