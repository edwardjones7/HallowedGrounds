import { NextResponse } from "next/server";
import { careersSchema } from "@/lib/validation";
import { sendMail, emailShell, row } from "@/lib/mailer";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = careersSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check the form.";
    return NextResponse.json({ error: first }, { status: 422 });
  }

  const d = parsed.data;
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
    ].join("")
  );

  try {
    await sendMail({
      subject: `Job Application — ${d.name} (${d.role})`,
      html,
      replyTo: d.email,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "We couldn't submit your application. Please try again." },
      { status: 500 }
    );
  }
}
