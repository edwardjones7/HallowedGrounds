import { NextResponse } from "next/server";
import { trayOrderSchema } from "@/lib/validation";
import { emailShell, row } from "@/lib/mailer";
import { handleSubmission, autoresponderHtml } from "@/lib/submit";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = trayOrderSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check the form.";
    return NextResponse.json({ error: first }, { status: 422 });
  }
  const d = parsed.data;

  const html = emailShell(
    "New In-Store Tray Order",
    [
      row("Name", d.name),
      row("Email", d.email),
      row("Phone", d.phone),
      row("Pickup Location", d.pickupLocation),
      row("Pickup Date", d.pickupDate),
      row("Pickup Time", d.pickupTime),
      row("Items", d.items),
      row("Quantity", d.quantity),
      row("Dietary Notes", d.dietaryNotes),
    ].join(""),
  );

  const { ok } = await handleSubmission({
    lead: {
      type: "tray",
      source: "tray_page",
      name: d.name,
      email: d.email,
      phone: d.phone,
      locationSlug: d.pickupLocation,
      payload: d,
    },
    subject: `Tray Order — ${d.name} (${d.pickupDate})`,
    html,
    replyTo: d.email,
    autoresponder: {
      subject: "We got your tray order — Hallowed Grounds",
      html: autoresponderHtml(d.name, [
        "Thanks for your order! We'll confirm availability and pickup details shortly.",
        `Pickup: ${d.pickupLocation} on ${d.pickupDate}`,
      ]),
    },
  });

  if (!ok) {
    return NextResponse.json(
      { error: "We couldn't send your order. Please try again." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
