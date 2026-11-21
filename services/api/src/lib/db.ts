import { AsyncLocalStorage } from "node:async_hooks";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const requestClient = new AsyncLocalStorage<PrismaClient>();
const globalForPrisma = globalThis as unknown as {
  localClient?: PrismaClient;
  localConnectionString?: string;
};

declare global {
  interface CloudflareEnv {
    HYPERDRIVE?: { connectionString: string };
  }
}

function isCloudflareWorker(): boolean {
  return (
    typeof navigator !== "undefined" &&
    navigator.userAgent.includes("Cloudflare-Workers")
  );
}

function getConnectionString(): string {
  if (isCloudflareWorker()) {
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

function createClient(connectionString: string): PrismaClient {
  return new PrismaClient({
    adapter: new PrismaPg(
      {
        connectionString,
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

function getLocalClient(): PrismaClient {
  const connectionString = getConnectionString();
  if (globalForPrisma.localClient) {
    if (globalForPrisma.localConnectionString !== connectionString) {
      throw new Error("The database client is already initialized for another environment.");
    }
    return globalForPrisma.localClient;
  }

  globalForPrisma.localConnectionString = connectionString;
  globalForPrisma.localClient = createClient(connectionString);
  return globalForPrisma.localClient;
}

export async function withRequestDatabase<T>(run: () => Promise<T>): Promise<T> {
  if (!isCloudflareWorker()) {
    getLocalClient();
    return run();
  }

  const client = createClient(getConnectionString());
  try {
    return await requestClient.run(client, run);
  } finally {
    await client.$disconnect();
  }
}

export function withDatabaseRoute<TArgs extends unknown[], TResult>(
  handler: (...args: TArgs) => Promise<TResult>,
): (...args: TArgs) => Promise<TResult> {
  return (...args) => withRequestDatabase(() => handler(...args));
}

export const db = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = requestClient.getStore() ?? globalForPrisma.localClient;
    if (!client) {
      throw new Error("Database has not been initialized for this request.");
    }
    const value = Reflect.get(client, property, client) as unknown;
    return typeof value === "function" ? value.bind(client) : value;
  },
});
