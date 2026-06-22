import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Download Joe" conversion band. Drop anywhere — home, menu, location pages.
 * Links to the Joe Coffee app stores (mobile ordering + loyalty).
 */
export function DownloadJoe() {
  return (
    <section className="border-t border-brass/15 px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <Reveal>
          <div className="max-w-xl">
            <SectionLabel>Order Ahead</SectionLabel>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight text-parchment md:text-5xl">
              Skip the line with
              <span className="italic text-brass"> Joe.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-parchment/65">
              {site.joe.blurb}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-4">
            <Button href={site.joe.ios} variant="solid" external>
              App Store
            </Button>
            <Button href={site.joe.android} variant="outline" external>
              Google Play
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
