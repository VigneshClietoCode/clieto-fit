export async function readApiJson<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("json")) {
    const rayId = response.headers.get("cf-ray");
    const rayDetails = rayId ? ` Cloudflare Ray ID: ${rayId}.` : "";
    throw new Error(
      `The API returned a non-JSON response (HTTP ${response.status}).${rayDetails}`,
    );
  }
  return (await response.json()) as T;
}
