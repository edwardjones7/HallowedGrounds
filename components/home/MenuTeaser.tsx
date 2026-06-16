import { drinkMenu, monthlySpecials } from "@/content/menu";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function MenuTeaser() {
  const signatures = drinkMenu.find((c) => c.id === "signature")?.items ?? [];

  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionLabel>From the Bar</SectionLabel>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-light leading-tight text-parchment md:text-5xl">
              Signature drinks &amp; the{" "}
              <span className="italic text-brass">specials board.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/menu" variant="ghost">
              See full menu
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {signatures.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <article className="group flex h-full flex-col border border-brass/15 bg-ink-soft p-7 transition-colors duration-500 hover:border-brass/40">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl text-parchment">
                    {item.name}
                  </h3>
                  {item.price && (
                    <span className="font-display text-lg text-brass">
                      ${item.price}
                    </span>
                  )}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-parchment/60">
                  {item.description}
                </p>
                {item.tags?.[0] && (
                  <span className="mt-5 inline-block w-fit border border-brass/30 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-brass">
                    {item.tags[0]}
                  </span>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* Monthly specials band */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col gap-4 border border-dashed border-brass/25 bg-espresso/20 p-7 md:flex-row md:items-center md:gap-10">
            <span className="eyebrow whitespace-nowrap">This Month</span>
            <div className="flex flex-1 flex-col gap-4 md:flex-row md:gap-10">
              {monthlySpecials.map((s) => (
                <div key={s.name}>
                  <p className="font-display text-lg text-parchment">{s.name}</p>
                  <p className="text-sm text-parchment/55">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
