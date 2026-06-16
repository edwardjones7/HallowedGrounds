import { reviews, rating } from "@/content/reviews";
import { press } from "@/content/press";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { StarRating } from "@/components/ui/StarRating";

export function SocialProof() {
  return (
    <section className="border-t border-brass/15 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Press badges */}
        <Reveal>
          <div className="flex flex-col items-center">
            <SectionLabel className="justify-center">As Seen In</SectionLabel>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {press.map((p) => (
                <a
                  key={p.title}
                  href={p.url}
                  target={p.url !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center text-center"
                >
                  <span className="font-display text-2xl text-parchment transition-colors duration-500 group-hover:text-brass md:text-3xl">
                    {p.outlet}
                  </span>
                  <span className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-parchment/45">
                    {p.year}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="my-16 hairline" />

        {/* Rating + reviews */}
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <Reveal>
            <div className="md:sticky md:top-32 md:h-fit">
              <div className="flex items-end gap-4">
                <span className="font-display text-7xl leading-none text-brass md:text-8xl">
                  {rating.score}
                </span>
                <div className="pb-2">
                  <StarRating score={rating.score} />
                  <p className="mt-2 text-sm text-parchment/55">
                    {rating.count}+ reviews · {rating.source}
                  </p>
                </div>
              </div>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-parchment/65">
                Our regulars say it better than we could. Here&apos;s a taste of
                what keeps them coming back.
              </p>
            </div>
          </Reveal>

          <div className="space-y-px">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <figure className="border-t border-brass/12 py-7 first:border-t-0">
                  <StarRating className="mb-4" />
                  <blockquote className="font-display text-xl font-light leading-snug text-parchment md:text-2xl">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-[0.7rem] uppercase tracking-[0.2em] text-parchment/45">
                    {r.author} · {r.source}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
