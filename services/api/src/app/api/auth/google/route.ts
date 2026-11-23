import { OAuth2Client } from "google-auth-library";
import { z } from "zod";
import { ApiError, handleApiError, readJson } from "@/lib/api";
import { createSession } from "@/lib/auth";
import { db, withDatabaseRoute } from "@/lib/db";
import { NextResponse } from "next/server";

function googleClientId(): string {
  const id = process.env.GOOGLE_CLIENT_ID;
  if (!id) throw new Error("GOOGLE_CLIENT_ID environment variable is not set.");
  return id;
}

const bodySchema = z.object({
  idToken: z.string().min(1),
  client: z.enum(["web", "mobile"]).default("web"),
});

async function googleLogin(request: Request) {
  try {
    const clientId = googleClientId();
    const input = bodySchema.parse(await readJson(request));

    // Verify the Google ID token
    const oauth2Client = new OAuth2Client(clientId);
    let ticket;
    try {
      ticket = await oauth2Client.verifyIdToken({
        idToken: input.idToken,
        audience: clientId,
      });
    } catch {
      throw new ApiError("Google sign-in failed. Please try again.", 401);
    }

    const payload = ticket.getPayload();
    if (!payload?.email) {
      throw new ApiError("Google sign-in failed. No email returned.", 401);
    }

    const email = payload.email.toLowerCase();

    // Look up user by email — only existing accounts may sign in via Google
    const user = await db.user.findUnique({
      where: { email },
      include: { gym: true },
    });

    if (!user || user.status !== "ACTIVE") {
      throw new ApiError(
        "No active account found for this Google account. Contact your gym administrator.",
        401,
      );
    }

    if (user.role !== "SUPER_ADMIN" && user.gym?.status !== "ACTIVE") {
      throw new ApiError(
        "No active account found for this Google account. Contact your gym administrator.",
        401,
      );
    }

    if (input.client === "mobile") {
      const { createBearerSession } = await import("@/lib/auth");
      const session = await createBearerSession(user.id);
      return NextResponse.json({
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        accessToken: session.token,
        tokenType: "Bearer",
        expiresAt: session.expiresAt,
      });
    }

    await createSession(user.id);
    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      redirectTo: "/dashboard",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export const POST = withDatabaseRoute(googleLogin);
