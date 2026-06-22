import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CareersForm } from "@/components/forms/CareersForm";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Hallowed Grounds Coffee Co. team. We're hiring baristas, kitchen, and catering staff across our South Jersey locations.",
};

const values = [
  {
    title: "Hospitality first",
    body: "We treat every guest like a regular. The little things — eye contact, a remembered order — are the whole job.",
  },
  {
    title: "Craft you can taste",
    body: "We make things the hard way on purpose. You'll learn to roast, pull, and bake to a standard you'll be proud of.",
  },
  {
    title: "A real team",
    body: "Family-run, tight-knit, and growing. We promote from within and we mean it.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join Our Team"
        title="Pour with"
        accent="purpose."
        intro="We're always looking for warm, dependable people who care about quality as much as we do."
      />

      {/* Values */}
      <section className="px-5 pb-12 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-px sm:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="h-full border-t border-brass/15 py-8 pr-6">
                <span className="font-display text-sm text-brass/70">
                  0{i + 1}
                </span>
                <h2 className="mt-3 font-display text-2xl text-parchment">
                  {v.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-parchment/60">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="border-t border-brass/15 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <Reveal>
            <div className="md:sticky md:top-32 md:h-fit">
              <SectionLabel>Apply</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-light leading-tight text-parchment md:text-5xl">
                Tell us about
                <span className="italic text-brass"> yourself.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-parchment/65">
                A few quick details to start. We read every application
                personally.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <CareersForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
