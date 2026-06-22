import "server-only";
import { saveLead, type SaveLeadInput } from "./leads";
import { sendMail, emailShell, row } from "./mailer";
import { FORM_ROUTING } from "./routing";

type Autoresponder = { subject: string; html: string };

/**
 * The single submission seam for all lead forms. Persists to Supabase and emails
 * the routed inbox in SEPARATE try/catch blocks — a failure in one path never
 * blocks the other, so a submission is never silently lost. Succeeds if either
 * path works. Optionally sends a confirmation to the submitter when
 * SEND_AUTORESPONDER=true.
 */
export async function handleSubmission(opts: {
  lead: SaveLeadInput;
  subject: string;
  html: string;
  replyTo?: string;
  autoresponder?: Autoresponder;
}) {
  let savedOk = false;
  let sentOk = false;

  try {
    await saveLead(opts.lead);
    savedOk = true;
  } catch (e) {
    console.error("[lead persist failed]", e);
  }

  try {
    await sendMail({
      to: FORM_ROUTING[opts.lead.type],
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    sentOk = true;
  } catch (e) {
    console.error("[lead notify failed]", e);
  }

  if (
    opts.autoresponder &&
    opts.lead.email &&
    process.env.SEND_AUTORESPONDER === "true"
  ) {
    try {
      await sendMail({
        to: opts.lead.email,
        subject: opts.autoresponder.subject,
        html: opts.autoresponder.html,
      });
    } catch (e) {
      console.error("[autoresponder failed]", e);
    }
  }

  return { ok: savedOk || sentOk, savedOk, sentOk };
}

/** Standard friendly confirmation body for the submitter. */
export function autoresponderHtml(name: string, lines: string[]) {
  return emailShell(
    "Thanks for reaching out",
    [
      row("Hi", name || "there"),
      ...lines.map((l) => row("", l)),
    ].join(""),
  );
}
