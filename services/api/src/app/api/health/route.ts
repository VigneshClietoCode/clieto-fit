import { handleApiError } from "@/lib/api";
import { db, withDatabaseRoute } from "@/lib/db";
import { NextResponse } from "next/server";

async function health() {
  try {
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = withDatabaseRoute(health);
