import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { sendMail, emailShell, row } from "@/lib/mailer";
import { saveSubscriber } from "@/lib/leads";

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

  const { email, phone, source } = parsed.data;

  let savedOk = false;
  let sentOk = false;

  try {
    await saveSubscriber({ email, phone, source, tags: [source] });
    savedOk = true;
  } catch (e) {
    console.error("[subscriber persist failed]", e);
  }

  try {
    await sendMail({
      subject: `Newsletter Signup — ${email}`,
      html: emailShell(
        "New Subscriber",
        [row("Email", email), row("Phone", phone), row("Source", source)].join("")
      ),
      replyTo: email,
    });
    sentOk = true;
  } catch (e) {
    console.error("[subscriber notify failed]", e);
  }

  if (!savedOk && !sentOk) {
    return NextResponse.json(
      { error: "Couldn't subscribe right now. Please try again." },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}
