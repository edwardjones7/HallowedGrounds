import type { Metadata } from "next";
import Link from "next/link";
import { locations, getLocation } from "@/content/locations";
import {
  getMenuForLocation,
  type PublicMenuCategory,
} from "@/lib/queries/menu";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DownloadJoe } from "@/components/ui/DownloadJoe";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Signature lattes, espresso, cold brew, and scratch-made food — seed-oil free and house-made daily at Hallowed Grounds Coffee Co.",
};

function MenuColumn({
  heading,
  categories,
}: {
  heading: string;
  categories: PublicMenuCategory[];
}) {
  return (
    <div>
      <h2 className="font-display text-3xl text-brass md:text-4xl">{heading}</h2>
      <div className="mt-8 space-y-12">
        {categories.map((cat) => (
          <Reveal key={cat.id}>
            <div>
              <div className="flex items-baseline justify-between border-b border-brass/20 pb-2">
                <h3 className="font-display text-xl text-parchment">
                  {cat.title}
                </h3>
              </div>
              {cat.note && (
                <p className="mt-2 text-sm italic text-parchment/45">
                  {cat.note}
                </p>
              )}
              <ul className="mt-5 space-y-5">
                {cat.items.map((item) => (
                  <li
                    key={item.id}
                    className={`flex flex-col ${item.isSoldOut ? "opacity-45" : ""}`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-lg text-parchment">
                        {item.name}
                      </span>
                      {item.isSoldOut ? (
                        <span className="text-[0.58rem] uppercase tracking-[0.18em] text-parchment/50">
                          Sold out
                        </span>
                      ) : (
                        item.tags?.[0] && (
                          <span className="text-[0.58rem] uppercase tracking-[0.18em] text-brass">
                            {item.tags[0]}
                          </span>
                        )
                      )}
                      <span className="mx-1 hidden flex-1 translate-y-[-3px] border-b border-dotted border-brass/25 sm:block" />
                      {item.price && (
                        <span className="font-display text-brass">
                          ${item.price}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="mt-1 max-w-md text-sm text-parchment/55">
                        {item.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ loc?: string }>;
}) {
  const { loc } = await searchParams;
  const active = getLocation(loc ?? "") ? loc! : locations[0].slug;
  const activeLocation = getLocation(active)!;
  const categories = await getMenuForLocation(active);

  const specials = categories.filter((c) => c.slug === "specials");
  const drinks = categories.filter(
    (c) => c.kind === "drink" && c.slug !== "specials",
  );
  const food = categories.filter((c) => c.kind === "food");

  return (
    <>
      <PageHeader
        eyebrow="The Menu"
        title="Made by hand,"
        accent="every morning."
        intro="Menus change throughout the day with what's fresh and available. Order ahead on Joe Coffee to skip the line."
      />

      {/* Location switcher */}
      <div className="px-5 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          {locations.map((l) => (
            <Link
              key={l.slug}
              href={`/menu?loc=${l.slug}`}
              className={`border px-5 py-2 text-sm transition-colors ${
                l.slug === active
                  ? "border-brass bg-brass/15 text-brass"
                  : "border-brass/20 text-parchment/65 hover:border-brass/50"
              }`}
            >
              {l.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Monthly specials */}
      {specials.length > 0 && specials[0].items.length > 0 && (
        <div className="mt-8 px-5 md:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="flex flex-col gap-4 border border-dashed border-brass/30 bg-espresso/20 p-7 md:flex-row md:items-center md:gap-10">
                <SectionLabel>Barista Specials</SectionLabel>
                <div className="flex flex-1 flex-col gap-4 md:flex-row md:gap-12">
                  {specials[0].items.map((s) => (
                    <div key={s.id}>
                      <p className="font-display text-lg text-parchment">
                        {s.name}
                      </p>
                      <p className="text-sm text-parchment/55">
                        {s.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      )}

      <section className="px-5 py-20 md:px-8">
        <div
          className={`mx-auto grid max-w-7xl gap-16 md:gap-20 ${
            food.length > 0 ? "md:grid-cols-2" : "md:max-w-3xl"
          }`}
        >
          <MenuColumn heading="Drinks" categories={drinks} />
          {food.length > 0 ? (
            <MenuColumn heading="Kitchen" categories={food} />
          ) : (
            <div className="self-start border border-brass/15 bg-ink-soft p-7">
              <p className="text-sm text-parchment/65">
                Food at {activeLocation.shortName} is made by our partners at
                Thyme Kitchen & Catering, served right alongside our coffee.
              </p>
            </div>
          )}
        </div>

        {/* Order CTA */}
        <div className="mx-auto mt-16 max-w-7xl">
          <Reveal>
            <div className="flex flex-col items-center gap-6 border-t border-brass/15 pt-12 text-center">
              <p className="max-w-md text-parchment/65">
                Ready when you are. Order ahead at either location:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {locations.map((l) => (
                  <Button
                    key={l.slug}
                    href={l.orderUrl}
                    variant="outline"
                    external
                  >
                    Order · {l.shortName}
                  </Button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <DownloadJoe />
    </>
  );
}
