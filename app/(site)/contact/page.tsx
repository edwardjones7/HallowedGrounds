import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/forms/ContactForm";
import { locations } from "@/content/locations";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hallowed Grounds Coffee Co. — questions, catering, press, or feedback. Visit us in Washington Twp. or Merchantville, NJ.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say"
        accent="hello."
        intro="Questions, catering, press, or just want to share some love? Reach out — we read every message."
      />

      <section className="px-5 pb-4 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((l, i) => (
            <Reveal key={l.slug} delay={i * 0.06}>
              <div className="h-full border border-brass/15 bg-ink-soft p-6">
                <h2 className="font-display text-xl text-parchment">{l.name}</h2>
                <p className="mt-2 text-sm text-parchment/60">
                  {l.address.street}
                  <br />
                  {l.address.city}, {l.address.state} {l.address.zip}
                </p>
                <p className="mt-3 text-sm text-parchment/60">
                  {l.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}
                </p>
                <Link
                  href={`/locations/${l.slug}`}
                  className="mt-4 inline-block text-sm text-brass underline-offset-4 hover:underline"
                >
                  Location details →
                </Link>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.12}>
            <div className="h-full border border-brass/15 bg-ink-soft p-6">
              <h2 className="font-display text-xl text-parchment">Online</h2>
              {site.contact.email && (
                <p className="mt-2 text-sm text-parchment/60">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="hover:text-brass"
                  >
                    {site.contact.email}
                  </a>
                </p>
              )}
              <p className="mt-3 flex gap-4 text-sm text-brass">
                <a href={site.social.instagram} className="hover:underline">
                  Instagram
                </a>
                <a href={site.social.facebook} className="hover:underline">
                  Facebook
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <Reveal>
            <div className="md:sticky md:top-32 md:h-fit">
              <SectionLabel>Send a Message</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-light leading-tight text-parchment md:text-5xl">
                Drop us
                <span className="italic text-brass"> a line.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-parchment/65">
                For catering, use the{" "}
                <Link href="/catering" className="text-brass hover:underline">
                  catering form
                </Link>{" "}
                so we capture the right details. Everything else, right here.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
