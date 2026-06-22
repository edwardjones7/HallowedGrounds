import Link from "next/link";
import { getServerClient } from "@/lib/supabase/server";

async function count(table: string, filter?: (q: any) => any) {
  const supabase = await getServerClient();
  if (!supabase) return null;
  let q = supabase.from(table).select("*", { count: "exact", head: true });
  if (filter) q = filter(q);
  const { count } = await q;
  return count ?? 0;
}

export default async function AdminDashboard() {
  const [newLeads, items, events, subs] = await Promise.all([
    count("leads", (q) => q.eq("status", "new")),
    count("menu_items"),
    count("events", (q) => q.eq("is_published", true)),
    count("newsletter_subscribers"),
  ]);

  const cards = [
    { label: "New leads", value: newLeads, href: "/admin/leads" },
    { label: "Menu items", value: items, href: "/admin/menu" },
    { label: "Published events", value: events, href: "/admin/events" },
    { label: "Subscribers", value: subs, href: "/admin/leads" },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl text-parchment">Dashboard</h1>
      {newLeads === null && (
        <p className="mt-4 max-w-xl text-sm text-parchment/60">
          Supabase isn&apos;t configured in this environment. Add the env vars
          and run the migration to see live data.
        </p>
      )}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="border border-brass/15 bg-ink-soft p-6 transition-colors hover:border-brass/40"
          >
            <p className="text-3xl font-light text-brass">{c.value ?? "—"}</p>
            <p className="mt-2 text-sm text-parchment/60">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
