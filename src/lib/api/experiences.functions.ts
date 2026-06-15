import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "../db.server";
import type { Experience } from "../admin-store";

// ── Mapper ────────────────────────────────────────────────────────────────
function rowToExperience(row: Record<string, unknown>): Experience {
  let techs: string[] = [];
  if (Array.isArray(row.technologies)) {
    techs = row.technologies as string[];
  } else if (typeof row.technologies === "string") {
    try {
      techs = JSON.parse(row.technologies);
    } catch {
      techs = [];
    }
  }
  return {
    id: String(row.id),
    company: String(row.company ?? ""),
    role: String(row.role ?? ""),
    description: String(row.description ?? ""),
    startDate: String(row.start_date ?? ""),
    endDate: row.end_date != null ? String(row.end_date) : null,
    technologies: techs,
  };
}

// ── Validator ─────────────────────────────────────────────────────────────
const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1),
  role: z.string().min(1),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  technologies: z.array(z.string()),
});

// ── Queries ───────────────────────────────────────────────────────────────
export const getExperiences = createServerFn({ method: "GET" })
  .inputValidator(z.object({}))
  .handler(async () => {
    const sql = getDb();
    const rows = await sql`SELECT * FROM experiences ORDER BY start_date DESC`;
    return rows.map(rowToExperience);
  });

// ── Mutations ─────────────────────────────────────────────────────────────
export const upsertExperience = createServerFn({ method: "POST" })
  .inputValidator(experienceSchema)
  .handler(async ({ data }) => {
    const sql = getDb();
    const tech = JSON.stringify(data.technologies);
    await sql`
      INSERT INTO experiences (id, company, role, description, start_date, end_date, technologies)
      VALUES (
        ${data.id}, ${data.company}, ${data.role}, ${data.description},
        ${data.startDate}, ${data.endDate}, ${tech}::jsonb
      )
      ON CONFLICT (id) DO UPDATE SET
        company      = EXCLUDED.company,
        role         = EXCLUDED.role,
        description  = EXCLUDED.description,
        start_date   = EXCLUDED.start_date,
        end_date     = EXCLUDED.end_date,
        technologies = EXCLUDED.technologies
    `;
    return { success: true };
  });

export const deleteExperience = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const sql = getDb();
    await sql`DELETE FROM experiences WHERE id = ${data.id}`;
    return { success: true };
  });
