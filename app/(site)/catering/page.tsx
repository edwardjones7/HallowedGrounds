import type { Metadata } from "next";
import { catering } from "@/content/catering";
import { notable } from "@/content/press";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Link from "next/link";
import { CateringForm } from "@/components/forms/CateringForm";

export const metadata: Metadata = {
  title: "Catering & Mobile Coffee Bar",
  description:
    "Mobile coffee catering for weddings, corporate events, and schools across South Jersey. Espresso bars, signature drinks, and baristas who care. Packages from $550.",
};

export default function CateringPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catering & Mobile Coffee"
        title="We bring the bar"
        accent="to you."
        intro={catering.intro}
      />

      {/* Packages */}
      <section className="px-5 pb-8 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {catering.packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.08}>
              <article className="flex h-full flex-col border border-brass/15 bg-ink-soft p-8">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-2xl text-parchment">
                    {pkg.name}
                  </h2>
                </div>
                <p className="mt-2 text-sm text-brass">
                  {pkg.from === "Custom"
                    ? "Custom quote"
                    : `From $${pkg.from}`}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-parchment/65">
                  {pkg.description}
                </p>
                <ul className="mt-6 space-y-2 border-t border-brass/12 pt-6">
                  {pkg.includes.map((inc) => (
                    <li
                      key={inc}
                      className="flex items-center gap-3 text-sm text-parchment/70"
                    >
                      <span className="text-brass">✦</span>
                      {inc}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* In-store tray orders pointer */}
      <section className="px-5 pb-4 pt-2 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link
              href="/catering/tray"
              className="flex flex-col gap-2 border border-brass/20 bg-ink-soft p-6 transition-colors hover:border-brass/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>
                <span className="font-display text-xl text-parchment">
                  Just need trays for pickup?
                </span>
                <span className="mt-1 block text-sm text-parchment/60">
                  Coffee boxes, pastry trays, and breakfast platters for offices
                  and small gatherings — order for in-store pickup.
                </span>
              </span>
              <span className="whitespace-nowrap text-sm text-brass">
                Order trays →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Notable band */}
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="font-display text-2xl font-light leading-snug text-parchment md:text-3xl">
              {notable}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="border-t border-brass/15 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <Reveal>
            <div className="md:sticky md:top-32 md:h-fit">
              <SectionLabel>Request a Quote</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-light leading-tight text-parchment md:text-5xl">
                Let&apos;s plan
                <span className="italic text-brass"> your event.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-parchment/65">
                Share the details and we&apos;ll build a custom proposal. The more
                you tell us, the better we can tailor the experience.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <CateringForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
