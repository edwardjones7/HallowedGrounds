import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Shop & Gift Cards",
  description:
    "Give the gift of Hallowed Grounds. Gift cards, whole-bean coffee, and merch — coming online soon.",
};

// ⚠ CLIENT TO CONFIRM: gift-card provider URL (Square / Joe Coffee).
const giftCardUrl = "https://order.joe.coffee/store/hallowed-grounds-llc";

const products = [
  {
    name: "Whole-Bean Coffee",
    note: "Roasted in-house",
    status: "Soon",
  },
  {
    name: "Hallowed Grounds Mug",
    note: "Ceramic, brass-glazed",
    status: "Soon",
  },
  {
    name: "Tote & Apparel",
    note: "Wear the reverence",
    status: "Soon",
  },
];

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Give the gift of"
        accent="great coffee."
        intro="Gift cards are available now. Beans and merch are on the way — sign up for the mailing list to be first to know."
      />

      {/* Gift card hero card */}
      <section className="px-5 pb-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid overflow-hidden border border-brass/20 md:grid-cols-2">
              <div className="relative flex aspect-[4/3] items-center justify-center bg-espresso/40 p-10 md:aspect-auto">
                {/* Stylized gift-card mock */}
                <div className="w-full max-w-sm border border-brass/40 bg-ink/60 p-8 shadow-2xl">
                  <p className="font-display text-[0.55rem] uppercase tracking-[0.4em] text-brass">
                    Hallowed Grounds
                  </p>
                  <p className="mt-10 font-display text-3xl text-parchment">
                    Gift Card
                  </p>
                  <p className="mt-1 text-sm text-parchment/50">
                    Coffee Co. · South Jersey
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 className="font-display text-3xl text-parchment md:text-4xl">
                  Digital Gift Cards
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-parchment/65">
                  Delivered instantly, redeemable at both locations and for mobile
                  ordering. The easy yes for the coffee lover in your life.
                </p>
                <div className="mt-8">
                  <Button href={giftCardUrl} variant="solid" external>
                    Buy a Gift Card
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Coming soon merch */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className="group relative flex aspect-square flex-col justify-end overflow-hidden border border-brass/12 bg-ink-soft p-7">
                  <span className="absolute right-5 top-5 border border-brass/30 px-3 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-brass">
                    {p.status}
                  </span>
                  <h3 className="font-display text-2xl text-parchment">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-parchment/50">{p.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
