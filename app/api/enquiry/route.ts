import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { saveEnquiry } from "@/services/enquiry";

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; reset: number }>();

function limited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

  if (ip && limited(ip)) {
    return NextResponse.json(
      { ok: false, message: "That is a lot of messages at once. Try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Could not read that request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot filled means a bot: answer as if it worked, store nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, message: "Thank you." });
  }

  try {
    await saveEnquiry(parsed.data, ip);
    return NextResponse.json({
      ok: true,
      message: "Thank you. Your message is with us and you will have a reply within one business day.",
    });
  } catch (error) {
    console.error("Enquiry failed", error);
    return NextResponse.json(
      { ok: false, message: "Something broke on our side. Please email support@mayntechnologiesllc.com or call (224) 800-1175." },
      { status: 500 },
    );
  }
}
