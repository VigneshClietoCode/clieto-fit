import { createHmac, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export const SESSION_COOKIE = "clieto_fit_session";
export const SESSION_DAYS = 7;

export type Role = "SUPER_ADMIN" | "ADMIN" | "USER";

export type Principal = {
  id: string;
  email: string;
  name: string;
  role: Role;
  gymId: string | null;
  gymName: string | null;
  gymTimezone: string | null;
  feeId: string | null;
};

function sessionSecret(): string {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) {
    throw new Error("SESSION_SECRET must contain at least 32 characters.");
  }
  return value;
}

function tokenDigest(token: string): string {
  return createHmac("sha256", sessionSecret()).update(token).digest("hex");
}

export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await db.session.create({
    data: { tokenHash: tokenDigest(token), userId, expiresAt },
  });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await db.session.deleteMany({ where: { tokenHash: tokenDigest(token) } });
  }
  cookieStore.delete(SESSION_COOKIE);
}

export async function getPrincipal(): Promise<Principal | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { tokenHash: tokenDigest(token) },
    include: { user: { include: { gym: true } } },
  });
  if (!session) return null;
  if (session.expiresAt <= new Date() || session.user.status !== "ACTIVE") {
    await db.session.deleteMany({ where: { id: session.id } });
    return null;
  }
  if (session.user.role !== "SUPER_ADMIN" && session.user.gym?.status !== "ACTIVE") {
    return null;
  }
  if (!["SUPER_ADMIN", "ADMIN", "USER"].includes(session.user.role)) return null;

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role as Role,
    gymId: session.user.gymId,
    gymName: session.user.gym?.name ?? null,
    gymTimezone: session.user.gym?.timezone ?? null,
    feeId: session.user.feeId,
  };
}

