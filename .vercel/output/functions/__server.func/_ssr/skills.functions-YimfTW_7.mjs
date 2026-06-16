import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as objectType, i as numberType, o as stringType, r as enumType } from "../_libs/zod.mjs";
import { n as getDb, t as createServerRpc } from "./db.server-DI5uFW9Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/skills.functions-YimfTW_7.js
function rowToSkill(row) {
	return {
		id: String(row.id),
		name: String(row.name ?? ""),
		category: row.category ?? "frontend",
		level: Number(row.level ?? 80),
		icon: String(row.icon ?? "")
	};
}
var skillSchema = objectType({
	id: stringType(),
	name: stringType().min(1),
	category: enumType([
		"frontend",
		"backend",
		"database",
		"devops"
	]),
	level: numberType().min(0).max(100),
	icon: stringType()
});
var getSkills_createServerFn_handler = createServerRpc({
	id: "2fb321b43f6b003b8ca785c2260edc7068ad1c70aac278dfa92bd763cabf0bc6",
	name: "getSkills",
	filename: "src/lib/api/skills.functions.ts"
}, (opts) => getSkills.__executeServer(opts));
var getSkills = createServerFn({ method: "GET" }).inputValidator(objectType({})).handler(getSkills_createServerFn_handler, async () => {
	return (await getDb()`SELECT * FROM skills ORDER BY name ASC`).map(rowToSkill);
});
var upsertSkill_createServerFn_handler = createServerRpc({
	id: "fc5aa47057e154b69c944be09dfb82cc3a65939c9254f06cf274b32cad38262b",
	name: "upsertSkill",
	filename: "src/lib/api/skills.functions.ts"
}, (opts) => upsertSkill.__executeServer(opts));
var upsertSkill = createServerFn({ method: "POST" }).inputValidator(skillSchema).handler(upsertSkill_createServerFn_handler, async ({ data }) => {
	await getDb()`
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
var deleteSkill_createServerFn_handler = createServerRpc({
	id: "845a1496741f66f2744d40e724f2a8e72b002d0055e5f0e638a5d8fd9a5939a2",
	name: "deleteSkill",
	filename: "src/lib/api/skills.functions.ts"
}, (opts) => deleteSkill.__executeServer(opts));
var deleteSkill = createServerFn({ method: "POST" }).inputValidator(objectType({ id: stringType() })).handler(deleteSkill_createServerFn_handler, async ({ data }) => {
	await getDb()`DELETE FROM skills WHERE id = ${data.id}`;
	return { success: true };
});
//#endregion
export { deleteSkill_createServerFn_handler, getSkills_createServerFn_handler, upsertSkill_createServerFn_handler };
