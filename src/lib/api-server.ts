import { cookies } from "next/headers";
import { apiUrl } from "@/lib/api-url";
import { SESSION_COOKIE_NAME } from "@/lib/session-constants";
import type { Principal } from "@/lib/auth-types";

export async function getPrincipalFromApi(): Promise<Principal | null> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const response = await fetch(apiUrl("/api/auth/me"), {
    headers: { Cookie: `${SESSION_COOKIE_NAME}=${token}` },
    cache: "no-store",
  });
  if (response.status === 401) return null;
  if (!response.ok) {
    throw new Error(`The API session check failed with status ${response.status}.`);
  }
  const result = (await response.json()) as { user: Principal };
  return result.user;
}
