export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** Call this at runtime (not module-level) to validate env vars are present. */
export function assertSanityEnv() {
  if (!projectId) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID");
  }
  if (!dataset) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_SANITY_DATASET");
  }
}
