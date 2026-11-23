import {
  ApiError,
  handleApiError,
  requirePrincipal,
  requireRoles,
} from "@/lib/api";
import { db, withDatabaseRoute } from "@/lib/db";
import { ticketNotificationWhere } from "@/lib/policies";
import { NextResponse } from "next/server";

async function getTicketNotifications(request: Request) {
  try {
    const principal = await requirePrincipal();
    requireRoles(principal, ["SUPER_ADMIN", "ADMIN", "USER"]);

    const sinceValue = new URL(request.url).searchParams.get("since");
    const since = sinceValue ? new Date(sinceValue) : null;
    if (!since || Number.isNaN(since.getTime())) {
      throw new ApiError("A valid notification cursor is required.", 400);
    }

    const count = await db.ticket.count({
      where: ticketNotificationWhere(principal, since),
    });
    return NextResponse.json({ count });
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = withDatabaseRoute(getTicketNotifications);
