import { NextResponse, type NextRequest } from "next/server";

const allowedOrigins = new Set([
  "https://clietofit.clietocode.com",
  "http://localhost:3000",
]);

function addCorsHeaders(response: Response, origin: string | null): Response {
  response.headers.append("Vary", "Origin");
  if (!origin || !allowedOrigins.has(origin)) return response;

  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Max-Age", "600");
  return response;
}

export function proxy(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (request.method === "OPTIONS") {
    return addCorsHeaders(new Response(null, { status: 204 }), origin);
  }

  return addCorsHeaders(NextResponse.next(), origin);
}

export const config = {
  matcher: "/api/:path*",
};
