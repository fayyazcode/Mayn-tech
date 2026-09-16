import { createHash } from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import { Enquiry } from "@/lib/models/Enquiry";
import type { EnquiryInput } from "@/lib/validation";

/** Hash the IP rather than storing it: enough to spot abuse, not personal data at rest. */
function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

export async function saveEnquiry(input: EnquiryInput, ip: string | null) {
  await connectToDatabase();

  const enquiry = await Enquiry.create({
    name: input.name,
    email: input.email,
    company: input.company || null,
    service: input.service,
    message: input.message,
    ipHash: hashIp(ip),
  });

  await notify(input).catch((error) => {
    // A failed notification must never lose the enquiry: it is already stored.
    console.error("Enquiry notification failed", error);
  });

  return enquiry;
}

async function notify(input: EnquiryInput) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!key || !to) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Website <onboarding@resend.dev>",
      to: [to],
      reply_to: input.email,
      subject: `Project enquiry from ${input.name}`,
      text: [
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        `Company: ${input.company || "—"}`,
        `Service: ${input.service}`,
        "",
        input.message,
      ].join("\n"),
    }),
  });
}

export async function recentEnquiries(limit = 50) {
  await connectToDatabase();
  return Enquiry.find().sort({ createdAt: -1 }).limit(limit).lean();
}
