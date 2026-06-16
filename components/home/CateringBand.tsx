import { notable } from "@/content/press";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function CateringBand() {
  return (
    <section className="relative overflow-hidden px-5 py-28 md:px-8 md:py-40">
      <div
        className="absolute inset-0 -z-10 scale-105 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2000&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-ink/82" />

      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <SectionLabel className="justify-center">
            Mobile Coffee Catering
          </SectionLabel>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-light leading-tight text-parchment md:text-6xl">
            We bring the bar{" "}
            <span className="italic text-brass">to you.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-parchment/70 md:text-lg">
            {notable} Tell us about your event and we&apos;ll craft a menu — and a
            moment — your guests won&apos;t forget.
          </p>
          <div className="mt-10 flex justify-center">
            <Button href="/catering" variant="solid">
              Request a Quote
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
