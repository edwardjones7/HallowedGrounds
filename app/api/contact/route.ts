import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { emailShell, row } from "@/lib/mailer";
import { handleSubmission } from "@/lib/submit";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check the form.";
    return NextResponse.json({ error: first }, { status: 422 });
  }
  const d = parsed.data;

  const html = emailShell(
    "New Contact Message",
    [
      row("Name", d.name),
      row("Email", d.email),
      row("Phone", d.phone),
      row("Topic", d.subject),
      row("Message", d.message),
    ].join(""),
  );

  const { ok } = await handleSubmission({
    lead: {
      type: "contact",
      source: "contact_page",
      name: d.name,
      email: d.email,
      phone: d.phone,
      payload: d,
    },
    subject: `Contact — ${d.name} (${d.subject})`,
    html,
    replyTo: d.email,
  });

  if (!ok) {
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
