import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TrayOrderForm } from "@/components/forms/TrayOrderForm";

export const metadata: Metadata = {
  title: "In-Store Tray Orders & Pickup Catering",
  description:
    "Order coffee boxes, pastry trays, and breakfast platters for pickup at Hallowed Grounds Coffee Co. Perfect for offices, classrooms, and small gatherings.",
};

export default function TrayOrderPage() {
  return (
    <>
      <PageHeader
        eyebrow="In-Store Catering"
        title="Trays & boxes,"
        accent="ready for pickup."
        intro="Coffee boxes, pastry trays, and breakfast platters made for your office, classroom, or get-together — ready to grab at the cafe. Planning a full event with a mobile bar instead?"
      />

      <section className="px-5 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link
              href="/catering"
              className="inline-flex items-center gap-2 text-sm text-brass underline-offset-4 hover:underline"
            >
              ← Looking for full-service event catering? Request a quote
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <Reveal>
            <div className="md:sticky md:top-32 md:h-fit">
              <SectionLabel>Place an Order</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-light leading-tight text-parchment md:text-5xl">
                Tell us what
                <span className="italic text-brass"> you need.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-parchment/65">
                Give us a day&apos;s notice when you can. We&apos;ll confirm
                availability and your pickup time by email.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <TrayOrderForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
