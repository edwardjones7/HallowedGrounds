import type { Metadata } from "next";
import Link from "next/link";
import { locations } from "@/content/locations";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Visit Hallowed Grounds Coffee Co. in Washington Township and Merchantville, NJ. Hours, directions, and online ordering.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visit Us"
        title="Two homes in"
        accent="South Jersey."
        intro="One company, two distinct experiences. Come sit a while."
      />

      <div className="px-5 pb-28 md:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {locations.map((loc, i) => (
            <Reveal key={loc.slug} delay={i * 0.08}>
              <div className="group grid overflow-hidden border border-brass/15 md:grid-cols-2">
                <Link
                  href={`/locations/${loc.slug}`}
                  className="relative h-72 overflow-hidden md:h-auto"
                >
                  <div
                    className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    style={{ backgroundImage: `url('${loc.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                </Link>

                <div className="flex flex-col justify-center p-8 md:p-12">
                  <p className="eyebrow mb-3">{loc.model}</p>
                  <h2 className="font-display text-3xl text-parchment md:text-4xl">
                    {loc.name}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-parchment/65">
                    {loc.blurb}
                  </p>
                  <div className="mt-6 space-y-1 text-sm text-parchment/55">
                    <p>
                      {loc.address.street}, {loc.address.city},{" "}
                      {loc.address.state} {loc.address.zip}
                    </p>
                    <p>
                      {loc.hours[0].days} · {loc.hours[0].time}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button href={loc.orderUrl} variant="solid" external>
                      Order Ahead
                    </Button>
                    <Button href={`/locations/${loc.slug}`} variant="outline">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
