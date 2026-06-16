import Link from "next/link";
import { locations } from "@/content/locations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function LocationSelector() {
  return (
    <section className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel className="justify-center">Two Homes</SectionLabel>
          <h2 className="mx-auto mt-5 max-w-2xl text-center font-display text-4xl font-light leading-tight text-parchment md:text-5xl">
            Find your <span className="italic text-brass">hallowed ground.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {locations.map((loc, i) => (
            <Reveal key={loc.slug} delay={i * 0.12}>
              <Link
                href={`/locations/${loc.slug}`}
                className="group relative block h-[26rem] overflow-hidden border border-brass/15"
              >
                <div
                  className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  style={{ backgroundImage: `url('${loc.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10 transition-opacity duration-700 group-hover:from-ink/95" />

                <div className="relative flex h-full flex-col justify-end p-8">
                  <p className="eyebrow mb-3">{loc.model}</p>
                  <h3 className="font-display text-3xl text-parchment md:text-4xl">
                    {loc.name}
                  </h3>
                  <p className="mt-3 text-sm text-parchment/65">
                    {loc.address.street}, {loc.address.city}
                  </p>
                  <p className="mt-1 text-sm text-parchment/50">
                    {loc.hours[0].days} · {loc.hours[0].time}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-brass">
                    Visit this location
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
