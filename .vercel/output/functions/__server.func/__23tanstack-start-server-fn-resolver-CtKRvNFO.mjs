//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CtKRvNFO.js
var manifest = {
	"2fb321b43f6b003b8ca785c2260edc7068ad1c70aac278dfa92bd763cabf0bc6": {
		functionName: "getSkills_createServerFn_handler",
		importer: () => import("./_ssr/skills.functions-YimfTW_7.mjs")
	},
	"3dfda32b07bc34834f3bf4b54f5b74c6458b41de4d19e97ea9950088b56b176f": {
		functionName: "deleteExperience_createServerFn_handler",
		importer: () => import("./_ssr/experiences.functions-Btdqkr5F.mjs")
	},
	"49f0c6936cdac5663c318a602a59f0268f6728ba59b5cb4a1d85ac68835476be": {
		functionName: "upsertCertification_createServerFn_handler",
		importer: () => import("./_ssr/certifications.functions-Bi5hYumt.mjs")
	},
	"61c3300f8ae96f64765099981f54d955b2d791620ce1b02dc444ceb7effa550a": {
		functionName: "upsertProject_createServerFn_handler",
		importer: () => import("./_ssr/projects.functions-yfuCfwqQ.mjs")
	},
	"625c87bd4dfdad80e91f28c248f82707b3beb3edc1a4a7df7a02de9ac87e3408": {
		functionName: "deleteCertification_createServerFn_handler",
		importer: () => import("./_ssr/certifications.functions-Bi5hYumt.mjs")
	},
	"845a1496741f66f2744d40e724f2a8e72b002d0055e5f0e638a5d8fd9a5939a2": {
		functionName: "deleteSkill_createServerFn_handler",
		importer: () => import("./_ssr/skills.functions-YimfTW_7.mjs")
	},
	"885abbe35bf98279b89420b73c0f90fd4e4dc5ab00cd0c64c76159ffc1197968": {
		functionName: "getProjects_createServerFn_handler",
		importer: () => import("./_ssr/projects.functions-yfuCfwqQ.mjs")
	},
	"9267913e50a7800b9921fd3126e264a649029e1ce772cda8926cb6bb942b5e53": {
		functionName: "deleteProject_createServerFn_handler",
		importer: () => import("./_ssr/projects.functions-yfuCfwqQ.mjs")
	},
	"933a29fe2b99d53d403b1144a8996b037335104d7207b94aefbb25bce7901a8d": {
		functionName: "getCertifications_createServerFn_handler",
		importer: () => import("./_ssr/certifications.functions-Bi5hYumt.mjs")
	},
	"9488c4c1b5cd7d668475f7d1146ce358bf27b125e273c78f0f69e7ae9e86ef18": {
		functionName: "toggleProjectFlag_createServerFn_handler",
		importer: () => import("./_ssr/projects.functions-yfuCfwqQ.mjs")
	},
	"c7f76f93ca2327c3911ab4c6438cc9e2a9d1c2785918e97b89b9e58c7e82723d": {
		functionName: "upsertExperience_createServerFn_handler",
		importer: () => import("./_ssr/experiences.functions-Btdqkr5F.mjs")
	},
	"e5407343b00687fa8903c2201b0c6fe3ea4d8abac4adb257e3b3018826e11138": {
		functionName: "getExperiences_createServerFn_handler",
		importer: () => import("./_ssr/experiences.functions-Btdqkr5F.mjs")
	},
	"fc5aa47057e154b69c944be09dfb82cc3a65939c9254f06cf274b32cad38262b": {
		functionName: "upsertSkill_createServerFn_handler",
		importer: () => import("./_ssr/skills.functions-YimfTW_7.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
