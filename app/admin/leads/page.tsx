import Link from "next/link";
import { getServerClient } from "@/lib/supabase/server";
import type { LeadRow } from "@/lib/supabase/types";

const TYPES = ["all", "catering", "tray", "careers", "contact"] as const;

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export default async function AdminLeads({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const active = TYPES.includes((type ?? "all") as (typeof TYPES)[number])
    ? (type ?? "all")
    : "all";

  const supabase = await getServerClient();
  if (!supabase) {
    return <p className="text-parchment/60">Supabase isn&apos;t configured.</p>;
  }

  let query = supabase
    .from("leads")
    .select("id, type, name, email, status, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (active !== "all") query = query.eq("type", active);
  const { data: leads } = await query;

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-4xl text-parchment">Inbox</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <Link
            key={t}
            href={`/admin/leads?type=${t}`}
            className={`border px-4 py-1.5 text-xs uppercase tracking-[0.12em] transition-colors ${
              t === active
                ? "border-brass bg-brass/15 text-brass"
                : "border-brass/20 text-parchment/60 hover:border-brass/50"
            }`}
          >
            {t}
          </Link>
        ))}
      </div>

      <div className="mt-8 space-y-2">
        {(leads ?? []).length === 0 && (
          <p className="text-sm text-parchment/55">No submissions yet.</p>
        )}
        {((leads ?? []) as Pick<
          LeadRow,
          "id" | "type" | "name" | "email" | "status" | "created_at"
        >[]).map((l) => (
          <Link
            key={l.id}
            href={`/admin/leads/${l.id}`}
            className="flex items-center justify-between gap-4 border border-brass/15 bg-ink-soft px-4 py-3 transition-colors hover:border-brass/40"
          >
            <div className="min-w-0">
              <p className="truncate text-parchment">
                <span className="text-brass">{l.type}</span> · {l.name || "—"}
              </p>
              <p className="truncate text-xs text-parchment/45">{l.email}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-parchment/45">
                {fmt.format(new Date(l.created_at))}
              </p>
              {l.status === "new" && (
                <span className="text-[0.6rem] uppercase tracking-[0.15em] text-brass">
                  New
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
