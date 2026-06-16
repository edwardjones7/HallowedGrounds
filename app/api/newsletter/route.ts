import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { sendMail, emailShell, row } from "@/lib/mailer";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid email." },
      { status: 422 }
    );
  }

  try {
    await sendMail({
      subject: `Newsletter Signup — ${parsed.data.email}`,
      html: emailShell("New Subscriber", row("Email", parsed.data.email)),
      replyTo: parsed.data.email,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Couldn't subscribe right now. Please try again." },
      { status: 500 }
    );
  }
}
