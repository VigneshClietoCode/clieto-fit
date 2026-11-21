import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

declare global {
  interface CloudflareEnv {
    HYPERDRIVE?: { connectionString: string };
  }
}

function getConnectionString(): string {
  if (
    typeof navigator !== "undefined" &&
    navigator.userAgent.includes("Cloudflare-Workers")
  ) {
    const connectionString = getCloudflareContext().env.HYPERDRIVE?.connectionString;
    if (!connectionString) {
      throw new Error("The HYPERDRIVE binding must be configured for the API Worker.");
    }
    return connectionString;
  }

  const connectionString = process.env.SUPABASE_URL;
  if (!connectionString) {
    throw new Error("SUPABASE_URL must be configured for local API development.");
  }
  return connectionString;
}

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      adapter: new PrismaPg(
        {
          connectionString: getConnectionString(),
          max: 5,
          connectionTimeoutMillis: 10_000,
          idleTimeoutMillis: 30_000,
          query_timeout: 10_000,
          statement_timeout: 10_000,
          keepAlive: true,
        },
        {
          onPoolError: (error) =>
            console.error(JSON.stringify({ event: "postgres_pool_error", name: error.name })),
          onConnectionError: (error) =>
            console.error(JSON.stringify({ event: "postgres_connection_error", name: error.name })),
        },
      ),
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  }

  return globalForPrisma.prisma;
}

export const db = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = getPrismaClient();
    const value = Reflect.get(client, property, client) as unknown;
    return typeof value === "function" ? value.bind(client) : value;
  },
});
