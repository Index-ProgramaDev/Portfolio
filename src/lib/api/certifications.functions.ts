import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "../db.server";
import type { Certification } from "../admin-store";

// ── Mapper ────────────────────────────────────────────────────────────────
function rowToCertification(row: Record<string, unknown>): Certification {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    institution: String(row.institution ?? ""),
    issueDate: String(row.issue_date ?? ""),
    credentialUrl: String(row.credential_url ?? ""),
  };
}

// ── Validator ─────────────────────────────────────────────────────────────
const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  institution: z.string(),
  issueDate: z.string(),
  credentialUrl: z.string(),
});

// ── Queries ───────────────────────────────────────────────────────────────
export const getCertifications = createServerFn({ method: "GET" })
  .inputValidator(z.object({}))
  .handler(async () => {
    const sql = getDb();
    const rows = await sql`SELECT * FROM certifications ORDER BY issue_date DESC`;
    return rows.map(rowToCertification);
  });

// ── Mutations ─────────────────────────────────────────────────────────────
export const upsertCertification = createServerFn({ method: "POST" })
  .inputValidator(certificationSchema)
  .handler(async ({ data }) => {
    const sql = getDb();
    await sql`
      INSERT INTO certifications (id, name, institution, issue_date, credential_url)
      VALUES (${data.id}, ${data.name}, ${data.institution}, ${data.issueDate}, ${data.credentialUrl})
      ON CONFLICT (id) DO UPDATE SET
        name           = EXCLUDED.name,
        institution    = EXCLUDED.institution,
        issue_date     = EXCLUDED.issue_date,
        credential_url = EXCLUDED.credential_url
    `;
    return { success: true };
  });

export const deleteCertification = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const sql = getDb();
    await sql`DELETE FROM certifications WHERE id = ${data.id}`;
    return { success: true };
  });
