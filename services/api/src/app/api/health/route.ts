import { handleApiError } from "@/lib/api";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    return handleApiError(error);
  }
}
