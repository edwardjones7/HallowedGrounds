import Link from "next/link";
import { locations } from "@/content/locations";

export default function AdminMenuIndex() {
  return (
    <div>
      <h1 className="font-display text-4xl text-parchment">Menus</h1>
      <p className="mt-3 text-sm text-parchment/60">
        Choose a location to edit its menu, prices, and availability.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {locations.map((l) => (
          <Link
            key={l.slug}
            href={`/admin/menu/${l.slug}`}
            className="border border-brass/15 bg-ink-soft p-6 transition-colors hover:border-brass/40"
          >
            <p className="font-display text-2xl text-parchment">{l.name}</p>
            <p className="mt-1 text-sm text-parchment/55">{l.model}</p>
            <span className="mt-4 inline-block text-sm text-brass">
              Edit menu →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
