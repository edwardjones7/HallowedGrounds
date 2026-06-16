import { NextResponse } from "next/server";
import { cateringSchema } from "@/lib/validation";
import { sendMail, emailShell, row } from "@/lib/mailer";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = cateringSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check the form.";
    return NextResponse.json({ error: first }, { status: 422 });
  }

  const d = parsed.data;
  const html = emailShell(
    "New Catering Request",
    [
      row("Name", d.name),
      row("Email", d.email),
      row("Phone", d.phone),
      row("Event Date", d.eventDate),
      row("Time", [d.startTime, d.endTime].filter(Boolean).join(" – ")),
      row("Location", d.location),
      row("Guests", d.guestCount),
      row("Event Type", d.eventType),
      row("Enhancements", d.addOns),
      row("Notes", d.notes),
    ].join("")
  );

  try {
    await sendMail({
      subject: `Catering Request — ${d.name} (${d.eventDate})`,
      html,
      replyTo: d.email,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "We couldn't send your request. Please try again." },
      { status: 500 }
    );
  }
}
