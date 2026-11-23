import { config } from "dotenv";
import path from "node:path";
import type { NextConfig } from "next";

const workspaceRoot = path.resolve(process.cwd(), "../..");
config({ path: path.join(workspaceRoot, ".env") });

const isDevelopment = process.env.NODE_ENV === "development";
const fallbackApiUrl = "http://localhost:3001";
const apiUrl = isDevelopment
  ? fallbackApiUrl
  : process.env.API_INTERNAL_URL ?? fallbackApiUrl;
if (!isDevelopment && !process.env.API_INTERNAL_URL) {
  console.warn("API_INTERNAL_URL is not configured; using localhost:3001 for this build.");
}
const apiOrigin = new URL(apiUrl).origin;
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  `img-src 'self' ${apiOrigin} data: blob:`,
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "script-src-elem 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://accounts.google.com",
  `connect-src 'self' ${apiOrigin} https://accounts.google.com${isDevelopment ? " ws://localhost:3000 ws://127.0.0.1:3000" : ""}`,
  "frame-src https://accounts.google.com",
  "font-src 'self'",
].join("; ");

const nextConfig: NextConfig = {
  env: {
    API_INTERNAL_URL: apiUrl,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
  },
  poweredByHeader: false,
  outputFileTracingRoot: workspaceRoot,
  transpilePackages: ["@clieto-fit/shared"],
  turbopack: { root: workspaceRoot },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
        ],
      },
    ];
  },
};

export default nextConfig;
