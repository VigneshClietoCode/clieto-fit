import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const connectionString = process.env.SUPABASE_URL;
if (!connectionString) {
  throw new Error("SUPABASE_URL must be configured for the API.");
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(
      {
        connectionString,
        max: 1,
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

globalForPrisma.prisma = db;
