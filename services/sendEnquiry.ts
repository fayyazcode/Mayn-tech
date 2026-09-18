import type { EnquiryInput } from "@/lib/validation";

/**
 * Submits straight from the browser to a form service. No server of our own.
 *
 * Both providers below are designed for client-side use: the key is public by
 * design, rate limited and domain-locked in their dashboard. Never put a
 * private API key (Resend, SendGrid, SMTP credentials) in this file — it ships
 * to every visitor's browser.
 */
/**
 * Web3Forms access key. Public by design — it identifies the destination inbox
 * and cannot read anything. Restrict it to this domain in the Web3Forms
 * dashboard so nobody else can post through it.
 * Override with NEXT_PUBLIC_WEB3FORMS_KEY if you rotate it.
 */
const WEB3FORMS_DEFAULT_KEY = "6dcfa7e8-a990-4661-a37e-0d8e1a06dc60";

const FORMSPREE = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim();
const WEB3FORMS = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim() || WEB3FORMS_DEFAULT_KEY;

export function isConfigured(): boolean {
  return Boolean(FORMSPREE || WEB3FORMS);
}

export interface SendResult {
  ok: boolean;
  message: string;
}

const SUCCESS = "Thank you. Your message is on its way and you will have a reply within one business day.";
const FAILURE =
  "That did not send. Please email support@mayntechnologiesllc.com or call (224) 800-1175 and we will pick it up straight away.";

export async function sendEnquiry(input: EnquiryInput): Promise<SendResult> {
  if (!isConfigured()) {
    return {
      ok: false,
      message:
        "The form is not connected yet. Please email support@mayntechnologiesllc.com or call (224) 800-1175.",
    };
  }

  try {
    const response = WEB3FORMS ? await viaWeb3Forms(input) : await viaFormspree(input);
    if (!response.ok) return { ok: false, message: FAILURE };
    return { ok: true, message: SUCCESS };
  } catch {
    return { ok: false, message: FAILURE };
  }
}

function subjectLine(input: EnquiryInput) {
  return `Project enquiry from ${input.name}`;
}

async function viaFormspree(input: EnquiryInput) {
  return fetch(FORMSPREE as string, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      company: input.company || "—",
      service: input.service,
      budget: input.budget || "Not given",
      timeline: input.timeline || "Not given",
      message: input.message,
      _subject: subjectLine(input),
      _replyto: input.email,
    }),
  });
}

async function viaWeb3Forms(input: EnquiryInput) {
  return fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS,
      subject: subjectLine(input),
      from_name: "Mayn Technologies website",
      replyto: input.email,
      name: input.name,
      email: input.email,
      company: input.company || "—",
      service: input.service,
      budget: input.budget || "Not given",
      timeline: input.timeline || "Not given",
      message: input.message,
    }),
  });
}
