import { createHmac, randomBytes } from "node:crypto";
import { SESSION_COOKIE_NAME } from "@clieto-fit/shared/session-constants";
import type { Principal, Role } from "@clieto-fit/shared/auth-types";
import { cookies, headers } from "next/headers";
import { db } from "@/lib/db";

export const SESSION_COOKIE = SESSION_COOKIE_NAME;
export const SESSION_DAYS = 7;

export type { Principal, Role } from "@clieto-fit/shared/auth-types";

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

async function issueSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await db.session.create({
    data: { tokenHash: tokenDigest(token), userId, expiresAt },
  });
  return { token, expiresAt };
}

export async function createSession(userId: string): Promise<void> {
  const { token, expiresAt } = await issueSession(userId);
  const cookieStore = await cookies();
  const domain = process.env.SESSION_COOKIE_DOMAIN?.trim();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
    ...(domain ? { domain } : {}),
  });
}

export async function createBearerSession(userId: string) {
  return issueSession(userId);
}

async function requestSessionToken(): Promise<string | undefined> {
  const authorization = (await headers()).get("authorization");
  if (authorization) {
    const bearer = /^Bearer ([A-Za-z0-9_-]+)$/.exec(authorization);
    return bearer?.[1];
  }
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function clearSession(): Promise<void> {
  const token = await requestSessionToken();
  (await cookies()).delete(SESSION_COOKIE);
  if (token) {
    await db.session.deleteMany({ where: { tokenHash: tokenDigest(token) } });
  }
}

export async function getPrincipal(): Promise<Principal | null> {
  const token = await requestSessionToken();
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { tokenHash: tokenDigest(token) },
    select: { id: true, userId: true, expiresAt: true },
  });
  if (!session) return null;

  const user = await db.user.findUnique({
    where: { id: session.userId },
    include: { gym: true },
  });
  if (!user) return null;
  if (session.expiresAt <= new Date() || user.status !== "ACTIVE") {
    await db.session.deleteMany({ where: { id: session.id } });
    return null;
  }
  if (user.role !== "SUPER_ADMIN" && user.gym?.status !== "ACTIVE") {
    return null;
  }
  if (!["SUPER_ADMIN", "ADMIN", "USER"].includes(user.role)) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as Role,
    gymId: user.gymId,
    gymName: user.gym?.name ?? null,
    gymTimezone: user.gym?.timezone ?? null,
    feeId: user.feeId,
  };
}

