const apiBaseUrl =
  process.env.API_INTERNAL_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3001" : undefined);

export function apiUrl(path: string): string {
  if (!apiBaseUrl) {
    throw new Error("API_INTERNAL_URL must be configured for the web app.");
  }
  return new URL(path, apiBaseUrl).toString();
}
