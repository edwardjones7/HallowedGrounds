import { pillars } from "@/content/difference";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { GoldRule } from "@/components/ui/GoldRule";

export function DifferenceStrip() {
  return (
    <section className="relative border-y border-brass/15 bg-espresso/30 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          {/* Sticky intro */}
          <div className="md:sticky md:top-32 md:h-fit">
            <Reveal>
              <SectionLabel>The Difference</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-light leading-tight text-parchment md:text-5xl">
                The part most cafes keep in the{" "}
                <span className="italic text-brass">fine print.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-parchment/65">
                We built Hallowed Grounds around a simple, stubborn idea: that
                clean ingredients and real craft should be the standard, not the
                upsell. Here&apos;s what that actually means.
              </p>
            </Reveal>
          </div>

          {/* Pillars list */}
          <div>
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="py-7">
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-sm text-brass/70">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-parchment md:text-3xl">
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-parchment/60 md:text-base">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>
                {i < pillars.length - 1 && <GoldRule />}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
