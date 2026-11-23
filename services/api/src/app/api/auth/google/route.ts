import { z } from "zod";
import { ApiError, handleApiError, readJson } from "@/lib/api";
import { createBearerSession, createSession } from "@/lib/auth";
import { db, withDatabaseRoute } from "@/lib/db";
import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Edge-compatible Google ID token verification
// Uses the Web Crypto API (fetch + SubtleCrypto) — works on Cloudflare Workers.
// ---------------------------------------------------------------------------

interface GoogleCertsResponse {
  keys: Array<{
    kid: string;
    n: string;
    e: string;
    alg: string;
    use: string;
  }>;
}

interface GoogleTokenPayload {
  iss: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  exp: number;
  iat: number;
  name?: string;
  picture?: string;
}

// Cache Google's public certs in-memory with their max-age
let certsCache: { keys: GoogleCertsResponse["keys"]; expiresAt: number } | null = null;

async function getGooglePublicKeys(): Promise<GoogleCertsResponse["keys"]> {
  const now = Date.now();
  if (certsCache && certsCache.expiresAt > now) return certsCache.keys;

  const response = await fetch("https://www.googleapis.com/oauth2/v3/certs");
  if (!response.ok) throw new Error("Failed to fetch Google public keys.");

  // Respect Cache-Control max-age so we don't refetch on every request
  const cacheControl = response.headers.get("cache-control") ?? "";
  const maxAgeMatch = /max-age=(\d+)/.exec(cacheControl);
  const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) * 1000 : 3_600_000;

  const data = (await response.json()) as GoogleCertsResponse;
  certsCache = { keys: data.keys, expiresAt: now + maxAge };
  return data.keys;
}

function base64urlToUint8Array(base64url: string): Uint8Array {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

async function verifyGoogleIdToken(
  idToken: string,
  clientId: string,
): Promise<GoogleTokenPayload> {
  const parts = idToken.split(".");
  if (parts.length !== 3) throw new ApiError("Invalid Google ID token format.", 401);

  const [rawHeader, rawPayload, rawSignature] = parts;

  // Decode header to find the key ID
  const header = JSON.parse(atob(rawHeader.replace(/-/g, "+").replace(/_/g, "/"))) as {
    kid?: string;
    alg?: string;
  };
  if (header.alg !== "RS256") {
    throw new ApiError("Unsupported Google token algorithm.", 401);
  }

  // Decode payload
  const payload = JSON.parse(
    atob(rawPayload.replace(/-/g, "+").replace(/_/g, "/")),
  ) as GoogleTokenPayload;

  // Validate standard claims before touching crypto
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) throw new ApiError("Google token has expired.", 401);
  if (payload.iat > now + 60) throw new ApiError("Google token issued in the future.", 401);
  if (!["accounts.google.com", "https://accounts.google.com"].includes(payload.iss)) {
    throw new ApiError("Invalid Google token issuer.", 401);
  }
  if (payload.aud !== clientId) {
    throw new ApiError("Google token audience mismatch.", 401);
  }
  if (!payload.email_verified) {
    throw new ApiError("Google account email is not verified.", 401);
  }

  // Find the matching public key by kid
  const keys = await getGooglePublicKeys();
  const jwk = header.kid ? keys.find((k) => k.kid === header.kid) : keys[0];
  if (!jwk) throw new ApiError("Google public key not found.", 401);

  // Import the RSA public key
  const cryptoKey = await crypto.subtle.importKey(
    "jwk",
    { kty: "RSA", n: jwk.n, e: jwk.e, alg: "RS256", use: "sig" },
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"],
  );

  // Verify signature over `header.payload`
  const signedData = new TextEncoder().encode(`${rawHeader}.${rawPayload}`);
  const signature = base64urlToUint8Array(rawSignature);

  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    signature,
    signedData,
  );

  if (!valid) throw new ApiError("Google token signature is invalid.", 401);

  return payload;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

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

    let payload: GoogleTokenPayload;
    try {
      payload = await verifyGoogleIdToken(input.idToken, clientId);
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError("Google sign-in failed. Please try again.", 401);
    }

    const email = payload.email.toLowerCase();

    // Only existing active accounts may sign in via Google — no auto-registration
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
