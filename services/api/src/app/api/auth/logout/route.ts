import { handleApiError } from "@/lib/api";
import { clearSession } from "@/lib/auth";
import { withDatabaseRoute } from "@/lib/db";
import { NextResponse } from "next/server";

async function logout() {
  try {
    await clearSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}

export const POST = withDatabaseRoute(logout);
