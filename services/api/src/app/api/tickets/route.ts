import { z } from "zod";
import {
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
} from "@clieto-fit/shared/ticket-types";
import {
  ApiError,
  handleApiError,
  readJson,
  requirePrincipal,
  requireRoles,
} from "@/lib/api";
import { db, withDatabaseRoute } from "@/lib/db";
import { NextResponse } from "next/server";

const ticketInclude = {
  reporter: { select: { id: true, name: true, email: true, role: true } },
  assignedTo: { select: { id: true, name: true, email: true } },
  gym: { select: { id: true, name: true } },
  comments: {
    orderBy: { createdAt: "desc" as const },
    take: 100,
    include: { author: { select: { id: true, name: true, role: true } } },
  },
};

const createTicketSchema = z.object({
  subject: z.string().trim().min(4).max(120),
  description: z.string().trim().min(10).max(5000),
  category: z.enum(TICKET_CATEGORIES),
  subcategory: z.string().trim().max(80).optional(),
  priority: z.enum(TICKET_PRIORITIES).default("MEDIUM"),
});

async function getTickets() {
  try {
    const principal = await requirePrincipal();
    requireRoles(principal, ["SUPER_ADMIN", "ADMIN", "USER"]);
    const tickets = await db.ticket.findMany({
      where: principal.role === "SUPER_ADMIN" ? {} : { reporterId: principal.id },
      include: ticketInclude,
      orderBy: [{ updatedAt: "desc" }, { ticketNumber: "desc" }],
      take: 200,
    });
    return NextResponse.json({ tickets });
  } catch (error) {
    return handleApiError(error);
  }
}

async function createTicket(request: Request) {
  try {
    const principal = await requirePrincipal();
    requireRoles(principal, ["ADMIN", "USER"]);
    const gymId = principal.gymId;
    if (!gymId) throw new ApiError("Gym access is required.", 403);
    const input = createTicketSchema.parse(await readJson(request));
    const assignee = await db.user.findFirst({
      where: { role: "SUPER_ADMIN", status: "ACTIVE" },
      select: { id: true },
      orderBy: { createdAt: "asc" },
    });
    if (!assignee) {
      throw new ApiError("No active Super Admin is available to receive tickets.", 503);
    }

    const ticket = await db.$transaction(async (transaction) => {
      const created = await transaction.ticket.create({
        data: {
          gymId,
          reporterId: principal.id,
          assignedToId: assignee.id,
          subject: input.subject,
          description: input.description,
          category: input.category,
          subcategory: input.subcategory || null,
          priority: input.priority,
        },
        include: ticketInclude,
      });
      await transaction.auditLog.create({
        data: {
          actorId: principal.id,
          action: "ticket.created",
          entityType: "Ticket",
          entityId: created.id,
        },
      });
      return created;
    });

    return NextResponse.json({ ticket }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = withDatabaseRoute(getTickets);
export const POST = withDatabaseRoute(createTicket);
