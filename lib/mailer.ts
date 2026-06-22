import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const defaultTo =
  process.env.CONTACT_TO_EMAIL || "hello@hallowedgroundscoffeeco.com";
const from =
  process.env.CONTACT_FROM_EMAIL || "Hallowed Grounds <onboarding@resend.dev>";

const resend = apiKey ? new Resend(apiKey) : null;

type SendArgs = {
  subject: string;
  html: string;
  replyTo?: string;
  /** Recipient(s). Defaults to CONTACT_TO_EMAIL. */
  to?: string | string[];
};

/**
 * Sends an email via Resend. When no API key is configured (local dev),
 * it logs the message to the console and resolves successfully so forms
 * remain testable without secrets.
 */
export async function sendMail({ subject, html, replyTo, to }: SendArgs) {
  const recipients = to ?? defaultTo;

  if (!resend) {
    console.log("\n──────── [DEV MAIL — no RESEND_API_KEY] ────────");
    console.log("To:", Array.isArray(recipients) ? recipients.join(", ") : recipients);
    console.log("Subject:", subject);
    console.log("Reply-To:", replyTo ?? "—");
    console.log(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    console.log("────────────────────────────────────────────────\n");
    return { ok: true, dev: true };
  }

  const { error } = await resend.emails.send({
    from,
    to: recipients,
    subject,
    html,
    replyTo,
  });

  if (error) {
    throw new Error(error.message || "Email failed to send.");
  }
  return { ok: true };
}

export function row(label: string, value: unknown) {
  const v =
    Array.isArray(value) && value.length
      ? value.join(", ")
      : value || "—";
  return `<tr><td style="padding:6px 16px 6px 0;color:#a37e36;font-size:12px;text-transform:uppercase;letter-spacing:1px;vertical-align:top">${label}</td><td style="padding:6px 0;color:#1a1a1a">${v}</td></tr>`;
}

export function emailShell(title: string, rows: string) {
  return `<div style="font-family:Georgia,serif;background:#f3ede1;padding:32px">
    <h2 style="color:#241712;font-weight:400">${title}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:560px;font-family:Arial,sans-serif">${rows}</table>
    <p style="margin-top:24px;color:#888;font-size:12px;font-family:Arial,sans-serif">Sent from hallowedgroundscoffeeco.com</p>
  </div>`;
}
