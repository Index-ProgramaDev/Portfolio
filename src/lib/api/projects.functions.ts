import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "../db.server";
import type { Project } from "../admin-store";

// ── Mapper ────────────────────────────────────────────────────────────────
function rowToProject(row: Record<string, unknown>): Project {
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
    title: String(row.title ?? ""),
    slug: String(row.slug ?? ""),
    shortDescription: String(row.short_description ?? ""),
    content: String(row.content ?? ""),
    coverImage: String(row.cover_image ?? ""),
    technologies: techs,
    category: String(row.category ?? ""),
    githubUrl: String(row.github_url ?? ""),
    liveUrl: String(row.live_url ?? ""),
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    createdAt: String(row.created_at ?? new Date().toISOString()),
  };
}

// ── Validators ────────────────────────────────────────────────────────────
const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  slug: z.string(),
  shortDescription: z.string(),
  content: z.string(),
  coverImage: z.string(),
  technologies: z.array(z.string()),
  category: z.string(),
  githubUrl: z.string(),
  liveUrl: z.string(),
  featured: z.boolean(),
  published: z.boolean(),
  createdAt: z.string(),
});

// ── Queries ───────────────────────────────────────────────────────────────
export const getProjects = createServerFn({ method: "GET" })
  .inputValidator(z.object({ publishedOnly: z.boolean().optional().default(false) }))
  .handler(async ({ data }) => {
    const sql = getDb();
    const rows = data.publishedOnly
      ? await sql`SELECT * FROM projects WHERE published = true ORDER BY created_at DESC`
      : await sql`SELECT * FROM projects ORDER BY created_at DESC`;
    return rows.map(rowToProject);
  });

// ── Mutations ─────────────────────────────────────────────────────────────
export const upsertProject = createServerFn({ method: "POST" })
  .inputValidator(projectSchema)
  .handler(async ({ data }) => {
    const sql = getDb();
    const tech = JSON.stringify(data.technologies);
    await sql`
      INSERT INTO projects (id, title, slug, short_description, content, cover_image,
                            technologies, category, github_url, live_url, featured, published, created_at)
      VALUES (
        ${data.id}, ${data.title}, ${data.slug}, ${data.shortDescription}, ${data.content},
        ${data.coverImage}, ${tech}::jsonb, ${data.category}, ${data.githubUrl},
        ${data.liveUrl}, ${data.featured}, ${data.published}, ${data.createdAt}
      )
      ON CONFLICT (id) DO UPDATE SET
        title             = EXCLUDED.title,
        slug              = EXCLUDED.slug,
        short_description = EXCLUDED.short_description,
        content           = EXCLUDED.content,
        cover_image       = EXCLUDED.cover_image,
        technologies      = EXCLUDED.technologies,
        category          = EXCLUDED.category,
        github_url        = EXCLUDED.github_url,
        live_url          = EXCLUDED.live_url,
        featured          = EXCLUDED.featured,
        published         = EXCLUDED.published
    `;
    return { success: true };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const sql = getDb();
    await sql`DELETE FROM projects WHERE id = ${data.id}`;
    return { success: true };
  });

export const toggleProjectFlag = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({ id: z.string(), key: z.enum(["featured", "published"]), value: z.boolean() }),
  )
  .handler(async ({ data }) => {
    const sql = getDb();
    if (data.key === "featured") {
      await sql`UPDATE projects SET featured = ${data.value} WHERE id = ${data.id}`;
    } else {
      await sql`UPDATE projects SET published = ${data.value} WHERE id = ${data.id}`;
    }
    return { success: true };
  });
