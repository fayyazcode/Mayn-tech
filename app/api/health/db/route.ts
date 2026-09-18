import { NextResponse } from "next/server";
import { checkDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/health/db
 * Reports whether the database is reachable, and why not if it is not.
 * Returns no credentials — safe to hit from a browser while debugging.
 */
export async function GET() {
  const result = await checkDatabase();
  return NextResponse.json(result, { status: result.ok ? 200 : 503 });
}
