import bcrypt from "bcryptjs";
import { z } from "zod";
import {
  ApiError,
  handleApiError,
  readJson,
  requirePrincipal,
} from "@/lib/api";
import { createSession } from "@/lib/auth";
import { db, withDatabaseRoute } from "@/lib/db";
import { contactPhoneSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

const updateSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  phone: contactPhoneSchema.nullable().optional(),
  currentPassword: z.string().min(1).max(128).optional(),
  newPassword: z.string().min(12).max(128).optional(),
}).refine(
  (value) => Boolean(value.name || value.newPassword || value.phone !== undefined) &&
    (Boolean(value.currentPassword) === Boolean(value.newPassword)),
  { message: "Enter your current password to set a new password." },
);

async function updateAccount(request: Request) {
  try {
    const principal = await requirePrincipal();
    const input = updateSchema.parse(await readJson(request));
    if (input.newPassword && input.currentPassword) {
      const current = await db.user.findUnique({
        where: { id: principal.id },
        select: { passwordHash: true },
      });
      if (!current || !(await bcrypt.compare(input.currentPassword, current.passwordHash))) {
        throw new ApiError("Current password is incorrect.", 400);
      }
    }

    await db.user.update({
      where: { id: principal.id },
      data: {
        name: input.name,
        phone: input.phone,
        ...(input.newPassword ? { passwordHash: await bcrypt.hash(input.newPassword, 12) } : {}),
      },
    });
    if (input.newPassword) {
      await db.session.deleteMany({ where: { userId: principal.id } });
      await createSession(principal.id);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}

export const PATCH = withDatabaseRoute(updateAccount);
