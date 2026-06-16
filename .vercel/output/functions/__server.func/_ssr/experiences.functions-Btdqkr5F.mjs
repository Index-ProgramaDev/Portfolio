import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as objectType, o as stringType, t as arrayType } from "../_libs/zod.mjs";
import { n as getDb, t as createServerRpc } from "./db.server-DI5uFW9Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experiences.functions-Btdqkr5F.js
function rowToExperience(row) {
	let techs = [];
	if (Array.isArray(row.technologies)) techs = row.technologies;
	else if (typeof row.technologies === "string") try {
		techs = JSON.parse(row.technologies);
	} catch {
		techs = [];
	}
	return {
		id: String(row.id),
		company: String(row.company ?? ""),
		role: String(row.role ?? ""),
		description: String(row.description ?? ""),
		startDate: String(row.start_date ?? ""),
		endDate: row.end_date != null ? String(row.end_date) : null,
		technologies: techs
	};
}
var experienceSchema = objectType({
	id: stringType(),
	company: stringType().min(1),
	role: stringType().min(1),
	description: stringType(),
	startDate: stringType(),
	endDate: stringType().nullable(),
	technologies: arrayType(stringType())
});
var getExperiences_createServerFn_handler = createServerRpc({
	id: "e5407343b00687fa8903c2201b0c6fe3ea4d8abac4adb257e3b3018826e11138",
	name: "getExperiences",
	filename: "src/lib/api/experiences.functions.ts"
}, (opts) => getExperiences.__executeServer(opts));
var getExperiences = createServerFn({ method: "GET" }).inputValidator(objectType({})).handler(getExperiences_createServerFn_handler, async () => {
	return (await getDb()`SELECT * FROM experiences ORDER BY start_date DESC`).map(rowToExperience);
});
var upsertExperience_createServerFn_handler = createServerRpc({
	id: "c7f76f93ca2327c3911ab4c6438cc9e2a9d1c2785918e97b89b9e58c7e82723d",
	name: "upsertExperience",
	filename: "src/lib/api/experiences.functions.ts"
}, (opts) => upsertExperience.__executeServer(opts));
var upsertExperience = createServerFn({ method: "POST" }).inputValidator(experienceSchema).handler(upsertExperience_createServerFn_handler, async ({ data }) => {
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
var deleteExperience_createServerFn_handler = createServerRpc({
	id: "3dfda32b07bc34834f3bf4b54f5b74c6458b41de4d19e97ea9950088b56b176f",
	name: "deleteExperience",
	filename: "src/lib/api/experiences.functions.ts"
}, (opts) => deleteExperience.__executeServer(opts));
var deleteExperience = createServerFn({ method: "POST" }).inputValidator(objectType({ id: stringType() })).handler(deleteExperience_createServerFn_handler, async ({ data }) => {
	await getDb()`DELETE FROM experiences WHERE id = ${data.id}`;
	return { success: true };
});
//#endregion
export { deleteExperience_createServerFn_handler, getExperiences_createServerFn_handler, upsertExperience_createServerFn_handler };
