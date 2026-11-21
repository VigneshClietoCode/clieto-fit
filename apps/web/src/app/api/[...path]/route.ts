import { apiServerUrl } from "@/lib/api-server-url";
import type { NextRequest } from "next/server";

type RouteContext = { params: Promise<{ path: string[] }> };

async function proxyApiRequest(request: NextRequest, { params }: RouteContext): Promise<Response> {
  const { path } = await params;
  const target = new URL(
    `/api/${path.map(encodeURIComponent).join("/")}${request.nextUrl.search}`,
    apiServerUrl("/"),
  );
  const headers = new Headers(request.headers);
  for (const header of ["connection", "content-length", "host", "transfer-encoding", "upgrade"]) {
    headers.delete(header);
  }

  const requestBody =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.arrayBuffer();
  const fetchOptions: RequestInit = {
    method: request.method,
    headers,
    body: requestBody?.byteLength ? requestBody : undefined,
    cache: "no-store",
  };
  let response = await fetch(target, fetchOptions);
  if (
    request.method === "GET" &&
    path.length === 1 &&
    path[0] === "portal" &&
    response.status >= 500
  ) {
    await response.body?.cancel();
    await new Promise((resolve) => setTimeout(resolve, 200));
    response = await fetch(target, fetchOptions);
  }
  const responseHeaders = new Headers(response.headers);
  for (const header of ["connection", "content-encoding", "content-length", "transfer-encoding"]) {
    responseHeaders.delete(header);
  }
  responseHeaders.set("Cache-Control", "no-store");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxyApiRequest;
export const HEAD = proxyApiRequest;
export const POST = proxyApiRequest;
export const PUT = proxyApiRequest;
export const PATCH = proxyApiRequest;
export const DELETE = proxyApiRequest;
export const OPTIONS = proxyApiRequest;

export const dynamic = "force-dynamic";
