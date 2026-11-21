import { handleApiError, requirePrincipal } from "@/lib/api";
import { withDatabaseRoute } from "@/lib/db";
import { NextResponse } from "next/server";

async function getCurrentUser() {
  try {
    return NextResponse.json({ user: await requirePrincipal() });
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = withDatabaseRoute(getCurrentUser);
