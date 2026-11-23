import {
  TICKET_PRIORITIES,
  TICKET_STATUSES,
} from "@clieto-fit/shared/ticket-types";
import { z } from "zod";
import {
  ApiError,
  handleApiError,
  readJson,
  requirePrincipal,
  requireRoles,
} from "@/lib/api";
import { db, withDatabaseRoute } from "@/lib/db";
import { canTransitionTicketStatus } from "@/lib/policies";
import { NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

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

const updateTicketSchema = z.object({
  status: z.enum(TICKET_STATUSES).optional(),
  priority: z.enum(TICKET_PRIORITIES).optional(),
  resolutionNotes: z.string().trim().min(2).max(4000).optional(),
  comment: z.string().trim().min(1).max(2000).optional(),
}).strict().refine((value) => Object.keys(value).length > 0);

async function updateTicket(request: Request, context: RouteContext) {
  try {
    const principal = await requirePrincipal();
    requireRoles(principal, ["SUPER_ADMIN", "ADMIN", "USER"]);
    const { id } = await context.params;
    const input = updateTicketSchema.parse(await readJson(request));
    const existing = await db.ticket.findUnique({
      where: { id },
      select: {
        id: true,
        reporterId: true,
        status: true,
        priority: true,
        resolutionNotes: true,
        resolvedAt: true,
      },
    });
    if (!existing || (principal.role !== "SUPER_ADMIN" && existing.reporterId !== principal.id)) {
      throw new ApiError("Ticket not found.", 404);
    }

    const isSuperAdmin = principal.role === "SUPER_ADMIN";
    if (!isSuperAdmin && (input.status || input.priority || input.resolutionNotes)) {
      throw new ApiError("Only a Super Admin can change ticket status or priority.", 403);
    }
    if (!isSuperAdmin && !input.comment) {
      throw new ApiError("Add a comment to update this ticket.", 400);
    }
    if (
      existing.status === "CLOSED" &&
      (input.comment || input.status || input.priority || input.resolutionNotes)
    ) {
      throw new ApiError("Closed tickets cannot be changed.", 409);
    }

    const currentStatus = TICKET_STATUSES.find(
      (status) => status === existing.status,
    );
    if (!currentStatus) throw new ApiError("Ticket status is invalid.", 500);
    const nextStatus = input.status ?? currentStatus;
    if (!canTransitionTicketStatus(currentStatus, nextStatus)) {
      throw new ApiError(
        `A ticket cannot move from ${currentStatus} to ${nextStatus}.`,
        409,
      );
    }
    const reopening = currentStatus === "RESOLVED" && nextStatus === "IN_PROGRESS";
    const resolutionNotes = reopening ? null : input.resolutionNotes ?? existing.resolutionNotes;
    if ((nextStatus === "RESOLVED" || nextStatus === "CLOSED") && !resolutionNotes) {
      throw new ApiError("Resolution notes are required before resolving or closing a ticket.", 400);
    }
    if (nextStatus === "CLOSED" && currentStatus !== "RESOLVED") {
      throw new ApiError("Resolve the ticket before closing it.", 409);
    }

    await db.$transaction(async (transaction) => {
      await transaction.ticket.update({
        where: { id },
        data: {
          status: nextStatus,
          priority: isSuperAdmin ? input.priority ?? existing.priority : existing.priority,
          resolutionNotes,
          resolvedAt:
            nextStatus === "RESOLVED"
              ? existing.resolvedAt ?? new Date()
              : nextStatus === "CLOSED"
                ? existing.resolvedAt
                : null,
          updatedAt: new Date(),
        },
      });
      if (input.comment) {
        await transaction.ticketComment.create({
          data: { ticketId: id, authorId: principal.id, body: input.comment },
        });
      }
      if (
        isSuperAdmin &&
        (nextStatus !== existing.status || (input.priority && input.priority !== existing.priority))
      ) {
        await transaction.auditLog.create({
          data: {
            actorId: principal.id,
            action: "ticket.updated",
            entityType: "Ticket",
            entityId: id,
          },
        });
      }
    });

    const ticket = await db.ticket.findUniqueOrThrow({
      where: { id },
      include: ticketInclude,
    });
    return NextResponse.json({ ticket });
  } catch (error) {
    return handleApiError(error);
  }
}

export const PATCH = withDatabaseRoute(updateTicket);
