import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "../db.server";
import type { Skill } from "../admin-store";

// ── Mapper ────────────────────────────────────────────────────────────────
function rowToSkill(row: Record<string, unknown>): Skill {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    category: (row.category as Skill["category"]) ?? "frontend",
    level: Number(row.level ?? 80),
    icon: String(row.icon ?? ""),
  };
}

// ── Validator ─────────────────────────────────────────────────────────────
const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  category: z.enum(["frontend", "backend", "database", "devops"]),
  level: z.number().min(0).max(100),
  icon: z.string(),
});

// ── Queries ───────────────────────────────────────────────────────────────
export const getSkills = createServerFn({ method: "GET" })
  .inputValidator(z.object({}))
  .handler(async () => {
    const sql = getDb();
    const rows = await sql`SELECT * FROM skills ORDER BY name ASC`;
    return rows.map(rowToSkill);
  });

// ── Mutations ─────────────────────────────────────────────────────────────
export const upsertSkill = createServerFn({ method: "POST" })
  .inputValidator(skillSchema)
  .handler(async ({ data }) => {
    const sql = getDb();
    await sql`
      INSERT INTO skills (id, name, category, level, icon)
      VALUES (${data.id}, ${data.name}, ${data.category}, ${data.level}, ${data.icon})
      ON CONFLICT (id) DO UPDATE SET
        name     = EXCLUDED.name,
        category = EXCLUDED.category,
        level    = EXCLUDED.level,
        icon     = EXCLUDED.icon
    `;
    return { success: true };
  });

export const deleteSkill = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const sql = getDb();
    await sql`DELETE FROM skills WHERE id = ${data.id}`;
    return { success: true };
  });
