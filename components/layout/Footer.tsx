import Link from "next/link";
import { navLinks } from "@/content/nav";
import { locations } from "@/content/locations";
import { site } from "@/content/site";
import { GoldRule } from "@/components/ui/GoldRule";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  return (
    <footer className="relative border-t border-brass/15 bg-ink-soft px-5 pb-10 pt-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Newsletter band */}
        <div className="mb-16 grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow mb-4">The Mailing List</p>
            <h2 className="font-display text-3xl text-parchment md:text-4xl">
              Stay on hallowed ground.
            </h2>
            <p className="mt-3 max-w-md text-sm text-parchment/60">
              Seasonal specials, new roasts, and the occasional secret menu drop.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <GoldRule className="mb-16" />

        {/* Columns */}
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <span className="font-display text-xl text-parchment">
              Hallowed Grounds
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-parchment/55">
              {site.positioning}
            </p>
            <div className="mt-6 flex gap-5 text-[0.7rem] uppercase tracking-[0.2em] text-parchment/60">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brass"
              >
                Instagram
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brass"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Locations */}
          {locations.map((loc) => (
            <div key={loc.slug}>
              <p className="eyebrow mb-4">{loc.shortName}</p>
              <address className="not-italic text-sm leading-relaxed text-parchment/60">
                {loc.address.street}
                <br />
                {loc.address.city}, {loc.address.state} {loc.address.zip}
                <br />
                <span className="mt-2 inline-block text-parchment/45">
                  {loc.hours[0].days}: {loc.hours[0].time}
                </span>
              </address>
            </div>
          ))}

          {/* Explore */}
          <div>
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-2.5 text-sm text-parchment/60">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-brass"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <GoldRule className="my-12" />

        <div className="flex flex-col items-center justify-between gap-4 text-[0.7rem] uppercase tracking-[0.18em] text-parchment/40 md:flex-row">
          <span>
            © {new Date().getFullYear()} Hallowed Grounds Coffee Co.
          </span>
          <span>{site.social.handle}</span>
        </div>
      </div>
    </footer>
  );
}
