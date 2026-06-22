import { NextResponse } from "next/server";
import { careersSchema } from "@/lib/validation";
import { emailShell, row } from "@/lib/mailer";
import { handleSubmission, autoresponderHtml } from "@/lib/submit";
import { uploadResume } from "@/lib/storage";

export async function POST(req: Request) {
  // Careers uses multipart/form-data so a résumé file can ride along.
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const fields = Object.fromEntries(
    Array.from(form.entries()).filter(([, v]) => typeof v === "string"),
  );

  const parsed = careersSchema.safeParse(fields);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check the form.";
    return NextResponse.json({ error: first }, { status: 422 });
  }
  const d = parsed.data;

  // Optional résumé upload (validated server-side for size + type).
  let resumePath: string | undefined;
  const file = form.get("resume");
  if (file instanceof File && file.size > 0) {
    const up = await uploadResume(file);
    if (!up.ok) {
      return NextResponse.json({ error: up.error }, { status: 422 });
    }
    resumePath = up.path ?? undefined;
  }

  const html = emailShell(
    "New Job Application",
    [
      row("Name", d.name),
      row("Email", d.email),
      row("Phone", d.phone),
      row("Role", d.role),
      row("Location", d.location),
      row("18 or older", "Yes"),
      row("Availability", d.availability),
      row("Message", d.message),
      row("Résumé", resumePath ? "Attached (see admin inbox)" : "Not provided"),
    ].join(""),
  );

  const { ok } = await handleSubmission({
    lead: {
      type: "careers",
      source: "careers_page",
      name: d.name,
      email: d.email,
      phone: d.phone,
      locationSlug: d.location,
      resumePath,
      payload: d,
    },
    subject: `Job Application — ${d.name} (${d.role})`,
    html,
    replyTo: d.email,
    autoresponder: {
      subject: "Thanks for applying — Hallowed Grounds",
      html: autoresponderHtml(d.name, [
        "Thanks for your interest in joining the team. We review every application and will reach out if there's a fit.",
      ]),
    },
  });

  if (!ok) {
    return NextResponse.json(
      { error: "We couldn't submit your application. Please try again." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
