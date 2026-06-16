import type { Metadata } from "next";
import { story } from "@/content/story";
import { pillars } from "@/content/difference";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "From a farmers' market stand to a farm-to-table roastery — the story of Hallowed Grounds Coffee Co. and our seed-oil-free, clean-food standard.",
};

export default function StoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="Good food is"
        accent="sacred."
        intro={story.intro}
      />

      {/* Chapters */}
      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-4xl">
          {story.chapters.map((ch, i) => (
            <Reveal key={ch.title} delay={i * 0.05}>
              <article className="grid gap-6 border-t border-brass/15 py-14 md:grid-cols-[0.4fr_1fr] md:gap-12">
                <div>
                  <p className="eyebrow">{ch.kicker}</p>
                  <h2 className="mt-3 font-display text-2xl leading-tight text-parchment md:text-3xl">
                    {ch.title}
                  </h2>
                </div>
                <p className="text-base leading-relaxed text-parchment/70 md:text-lg">
                  {ch.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Manifesto pull-quote */}
      <section className="relative overflow-hidden border-y border-brass/15 bg-espresso/30 px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="font-display text-6xl text-brass/40">&ldquo;</span>
            <p className="font-display text-3xl font-light leading-snug text-parchment md:text-5xl">
              {story.manifesto}
            </p>
            <p className="mt-8 text-[0.72rem] uppercase tracking-[0.25em] text-brass">
              {story.founders} · Founders
            </p>
          </Reveal>
        </div>
      </section>

      {/* The standard / pillars recap */}
      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>The Standard</SectionLabel>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-light leading-tight text-parchment md:text-5xl">
              What clean food{" "}
              <span className="italic text-brass">actually means.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="h-full border border-brass/12 bg-ink-soft p-8">
                  <span className="font-display text-sm text-brass/70">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-2xl text-parchment">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-parchment/60">
                    {p.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Farm partners */}
          <Reveal>
            <div className="mt-12 flex flex-col items-start gap-4 border-t border-brass/15 pt-10 md:flex-row md:items-center md:justify-between">
              <p className="text-parchment/65">
                Proudly sourced from{" "}
                {story.farms.map((f, i) => (
                  <span key={f} className="text-brass">
                    {f}
                    {i < story.farms.length - 1 ? " · " : ""}
                  </span>
                ))}
              </p>
              <Button href="/menu" variant="ghost">
                See what we make
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
