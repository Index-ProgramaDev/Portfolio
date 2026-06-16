import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B8EDn7Os.mjs";
import { a as objectType, o as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experiences.functions-B1n-O3K2.js
var experienceSchema = objectType({
	id: stringType(),
	company: stringType().min(1),
	role: stringType().min(1),
	description: stringType(),
	startDate: stringType(),
	endDate: stringType().nullable(),
	technologies: arrayType(stringType())
});
var getExperiences = createServerFn({ method: "GET" }).inputValidator(objectType({})).handler(createSsrRpc("e5407343b00687fa8903c2201b0c6fe3ea4d8abac4adb257e3b3018826e11138"));
var upsertExperience = createServerFn({ method: "POST" }).inputValidator(experienceSchema).handler(createSsrRpc("c7f76f93ca2327c3911ab4c6438cc9e2a9d1c2785918e97b89b9e58c7e82723d"));
var deleteExperience = createServerFn({ method: "POST" }).inputValidator(objectType({ id: stringType() })).handler(createSsrRpc("3dfda32b07bc34834f3bf4b54f5b74c6458b41de4d19e97ea9950088b56b176f"));
//#endregion
export { getExperiences as n, upsertExperience as r, deleteExperience as t };
