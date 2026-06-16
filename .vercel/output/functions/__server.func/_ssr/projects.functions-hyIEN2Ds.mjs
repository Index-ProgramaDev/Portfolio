import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B8EDn7Os.mjs";
import { a as objectType, n as booleanType, o as stringType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects.functions-hyIEN2Ds.js
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
var getProjects = createServerFn({ method: "GET" }).inputValidator(objectType({ publishedOnly: booleanType().optional().default(false) })).handler(createSsrRpc("885abbe35bf98279b89420b73c0f90fd4e4dc5ab00cd0c64c76159ffc1197968"));
var upsertProject = createServerFn({ method: "POST" }).inputValidator(projectSchema).handler(createSsrRpc("61c3300f8ae96f64765099981f54d955b2d791620ce1b02dc444ceb7effa550a"));
var deleteProject = createServerFn({ method: "POST" }).inputValidator(objectType({ id: stringType() })).handler(createSsrRpc("9267913e50a7800b9921fd3126e264a649029e1ce772cda8926cb6bb942b5e53"));
var toggleProjectFlag = createServerFn({ method: "POST" }).inputValidator(objectType({
	id: stringType(),
	key: enumType(["featured", "published"]),
	value: booleanType()
})).handler(createSsrRpc("9488c4c1b5cd7d668475f7d1146ce358bf27b125e273c78f0f69e7ae9e86ef18"));
//#endregion
export { upsertProject as i, getProjects as n, toggleProjectFlag as r, deleteProject as t };
