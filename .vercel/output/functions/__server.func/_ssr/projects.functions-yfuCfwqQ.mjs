import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as objectType, n as booleanType, o as stringType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
import { n as getDb, t as createServerRpc } from "./db.server-DI5uFW9Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects.functions-yfuCfwqQ.js
function rowToProject(row) {
	let techs = [];
	if (Array.isArray(row.technologies)) techs = row.technologies;
	else if (typeof row.technologies === "string") try {
		techs = JSON.parse(row.technologies);
	} catch {
		techs = [];
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
		createdAt: String(row.created_at ?? (/* @__PURE__ */ new Date()).toISOString())
	};
}
var projectSchema = objectType({
	id: stringType(),
	title: stringType().min(1),
	slug: stringType(),
	shortDescription: stringType(),
	content: stringType(),
	coverImage: stringType(),
	technologies: arrayType(stringType()),
	category: stringType(),
	githubUrl: stringType(),
	liveUrl: stringType(),
	featured: booleanType(),
	published: booleanType(),
	createdAt: stringType()
});
var getProjects_createServerFn_handler = createServerRpc({
	id: "885abbe35bf98279b89420b73c0f90fd4e4dc5ab00cd0c64c76159ffc1197968",
	name: "getProjects",
	filename: "src/lib/api/projects.functions.ts"
}, (opts) => getProjects.__executeServer(opts));
var getProjects = createServerFn({ method: "GET" }).inputValidator(objectType({ publishedOnly: booleanType().optional().default(false) })).handler(getProjects_createServerFn_handler, async ({ data }) => {
	const sql = getDb();
	return (data.publishedOnly ? await sql`SELECT * FROM projects WHERE published = true ORDER BY created_at DESC` : await sql`SELECT * FROM projects ORDER BY created_at DESC`).map(rowToProject);
});
var upsertProject_createServerFn_handler = createServerRpc({
	id: "61c3300f8ae96f64765099981f54d955b2d791620ce1b02dc444ceb7effa550a",
	name: "upsertProject",
	filename: "src/lib/api/projects.functions.ts"
}, (opts) => upsertProject.__executeServer(opts));
var upsertProject = createServerFn({ method: "POST" }).inputValidator(projectSchema).handler(upsertProject_createServerFn_handler, async ({ data }) => {
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
var deleteProject_createServerFn_handler = createServerRpc({
	id: "9267913e50a7800b9921fd3126e264a649029e1ce772cda8926cb6bb942b5e53",
	name: "deleteProject",
	filename: "src/lib/api/projects.functions.ts"
}, (opts) => deleteProject.__executeServer(opts));
var deleteProject = createServerFn({ method: "POST" }).inputValidator(objectType({ id: stringType() })).handler(deleteProject_createServerFn_handler, async ({ data }) => {
	await getDb()`DELETE FROM projects WHERE id = ${data.id}`;
	return { success: true };
});
var toggleProjectFlag_createServerFn_handler = createServerRpc({
	id: "9488c4c1b5cd7d668475f7d1146ce358bf27b125e273c78f0f69e7ae9e86ef18",
	name: "toggleProjectFlag",
	filename: "src/lib/api/projects.functions.ts"
}, (opts) => toggleProjectFlag.__executeServer(opts));
var toggleProjectFlag = createServerFn({ method: "POST" }).inputValidator(objectType({
	id: stringType(),
	key: enumType(["featured", "published"]),
	value: booleanType()
})).handler(toggleProjectFlag_createServerFn_handler, async ({ data }) => {
	const sql = getDb();
	if (data.key === "featured") await sql`UPDATE projects SET featured = ${data.value} WHERE id = ${data.id}`;
	else await sql`UPDATE projects SET published = ${data.value} WHERE id = ${data.id}`;
	return { success: true };
});
//#endregion
export { deleteProject_createServerFn_handler, getProjects_createServerFn_handler, toggleProjectFlag_createServerFn_handler, upsertProject_createServerFn_handler };
