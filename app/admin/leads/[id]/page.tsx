import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerClient } from "@/lib/supabase/server";
import { getResumeSignedUrl } from "@/lib/storage";
import type { LeadRow } from "@/lib/supabase/types";
import { setLeadStatus } from "../actions";

const fmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export default async function LeadDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await getServerClient();
  if (!supabase) {
    return <p className="text-parchment/60">Supabase isn&apos;t configured.</p>;
  }

  const { data } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  const lead = data as LeadRow;

  // Mark as read on first view.
  if (lead.status === "new") {
    await supabase.from("leads").update({ status: "read" }).eq("id", id);
  }

  const resumeUrl = lead.resume_path
    ? await getResumeSignedUrl(lead.resume_path)
    : null;

  const entries = Object.entries(lead.payload ?? {});

  return (
    <div className="max-w-2xl">
      <Link href="/admin/leads" className="text-sm text-parchment/50 hover:text-brass">
        ← Inbox
      </Link>
      <h1 className="mt-2 font-display text-4xl text-parchment">
        {lead.name || "Submission"}
      </h1>
      <p className="mt-1 text-sm text-parchment/50">
        <span className="text-brass">{lead.type}</span> · {lead.source} ·{" "}
        {fmt.format(new Date(lead.created_at))}
      </p>

      <div className="mt-8 border border-brass/15 bg-ink-soft p-6">
        <dl className="space-y-3">
          {lead.email && (
            <Row label="Email">
              <a href={`mailto:${lead.email}`} className="text-brass hover:underline">
                {lead.email}
              </a>
            </Row>
          )}
          {lead.phone && <Row label="Phone">{lead.phone}</Row>}
          {lead.location_slug && <Row label="Location">{lead.location_slug}</Row>}
          {entries.map(([k, v]) => (
            <Row key={k} label={k}>
              {Array.isArray(v) ? v.join(", ") : String(v ?? "—")}
            </Row>
          ))}
          {lead.resume_path && (
            <Row label="Résumé">
              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brass hover:underline"
                >
                  Download (link valid ~2 min)
                </a>
              ) : (
                <span className="text-parchment/50">
                  Stored — configure Supabase to download.
                </span>
              )}
            </Row>
          )}
        </dl>
      </div>

      <div className="mt-6 flex gap-3">
        {(["new", "read", "archived"] as const).map((s) => (
          <form key={s} action={setLeadStatus}>
            <input type="hidden" name="id" value={lead.id} />
            <input type="hidden" name="status" value={s} />
            <button
              className={`border px-4 py-2 text-xs uppercase tracking-[0.12em] transition-colors ${
                lead.status === s
                  ? "border-brass bg-brass/15 text-brass"
                  : "border-brass/20 text-parchment/60 hover:border-brass/50"
              }`}
            >
              {s}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3 border-t border-brass/10 pt-3 first:border-0 first:pt-0">
      <dt className="text-xs uppercase tracking-[0.15em] text-parchment/45">
        {label}
      </dt>
      <dd className="text-sm text-parchment/85">{children}</dd>
    </div>
  );
}
