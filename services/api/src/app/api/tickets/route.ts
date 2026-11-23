import { ZodError, z } from "zod";
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
import { contactPhoneSchema } from "@/lib/validation";
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
  contactPhone: contactPhoneSchema.optional(),
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
  let actorRole = "UNKNOWN";
  try {
    const principal = await requirePrincipal();
    actorRole = principal.role;
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
      const reporter = await transaction.user.findUnique({
        where: { id: principal.id },
        select: { phone: true },
      });
      if (!reporter) throw new ApiError("Your account could not be found.", 404);
      const contactPhone = reporter.phone ?? input.contactPhone;
      if (!contactPhone) {
        throw new ApiError("Enter a contact number so the Super Admin team can follow up.", 400);
      }
      if (!reporter.phone) {
        await transaction.user.update({
          where: { id: principal.id },
          data: { phone: contactPhone },
        });
      }
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
          contactPhone,
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
    if (!(error instanceof ApiError) && !(error instanceof ZodError)) {
      const code =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
          ? error.code
          : undefined;
      console.error(JSON.stringify({
        event: "ticket_create_failed",
        role: actorRole,
        errorName: error instanceof Error ? error.name : "UnknownError",
        ...(code ? { code } : {}),
      }));
    }
    return handleApiError(error);
  }
}

export const GET = withDatabaseRoute(getTickets);
export const POST = withDatabaseRoute(createTicket);
