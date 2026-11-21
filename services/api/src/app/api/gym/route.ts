import { z } from "zod";
import {
  ApiError,
  handleApiError,
  readJson,
  requirePrincipal,
  requireRoles,
} from "@/lib/api";
import { db, withDatabaseRoute } from "@/lib/db";
import { NextResponse } from "next/server";

async function getGym() {
  try {
    const principal = await requirePrincipal();
    requireRoles(principal, ["ADMIN"]);
    if (!principal.gymId) throw new ApiError("Gym access is required.", 403);
    const gym = await db.gym.findUnique({
      where: { id: principal.gymId },
      select: { id: true, name: true, slug: true, timezone: true, logoUrl: true },
    });
    if (!gym) throw new ApiError("Gym not found.", 404);
    return NextResponse.json({ gym });
  } catch (error) {
    return handleApiError(error);
  }
}

const updateSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  timezone: z.string().trim().min(1).max(80).optional(),
}).refine((value) => value.name || value.timezone);

async function updateGym(request: Request) {
  try {
    const principal = await requirePrincipal();
    requireRoles(principal, ["ADMIN"]);
    if (!principal.gymId) throw new ApiError("Gym access is required.", 403);
    const input = updateSchema.parse(await readJson(request));
    if (input.timezone) {
      try {
        new Intl.DateTimeFormat("en-US", { timeZone: input.timezone });
      } catch {
        throw new ApiError("Enter a valid IANA timezone.", 400);
      }
    }
    const gym = await db.gym.update({
      where: { id: principal.gymId },
      data: input,
      select: { id: true, name: true, slug: true, timezone: true, logoUrl: true },
    });
    return NextResponse.json({ gym });
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = withDatabaseRoute(getGym);
export const PATCH = withDatabaseRoute(updateGym);
