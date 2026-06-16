import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B8EDn7Os.mjs";
import { a as objectType, i as numberType, o as stringType, r as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/skills.functions-BCqxI79Y.js
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
var getSkills = createServerFn({ method: "GET" }).inputValidator(objectType({})).handler(createSsrRpc("2fb321b43f6b003b8ca785c2260edc7068ad1c70aac278dfa92bd763cabf0bc6"));
var upsertSkill = createServerFn({ method: "POST" }).inputValidator(skillSchema).handler(createSsrRpc("fc5aa47057e154b69c944be09dfb82cc3a65939c9254f06cf274b32cad38262b"));
var deleteSkill = createServerFn({ method: "POST" }).inputValidator(objectType({ id: stringType() })).handler(createSsrRpc("845a1496741f66f2744d40e724f2a8e72b002d0055e5f0e638a5d8fd9a5939a2"));
//#endregion
export { getSkills as n, upsertSkill as r, deleteSkill as t };
