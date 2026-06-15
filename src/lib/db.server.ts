import { neon } from "@neondatabase/serverless";

// .server.ts suffix keeps this file out of the client bundle.
// The neon() HTTP client is stateless — cheap to create per-request.

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL environment variable is not set");
  return neon(url);
}
