import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B8EDn7Os.mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certifications.functions-aLrku6xC.js
var certificationSchema = objectType({
	id: stringType(),
	name: stringType().min(1),
	institution: stringType(),
	issueDate: stringType(),
	credentialUrl: stringType()
});
var getCertifications = createServerFn({ method: "GET" }).inputValidator(objectType({})).handler(createSsrRpc("933a29fe2b99d53d403b1144a8996b037335104d7207b94aefbb25bce7901a8d"));
var upsertCertification = createServerFn({ method: "POST" }).inputValidator(certificationSchema).handler(createSsrRpc("49f0c6936cdac5663c318a602a59f0268f6728ba59b5cb4a1d85ac68835476be"));
var deleteCertification = createServerFn({ method: "POST" }).inputValidator(objectType({ id: stringType() })).handler(createSsrRpc("625c87bd4dfdad80e91f28c248f82707b3beb3edc1a4a7df7a02de9ac87e3408"));
//#endregion
export { getCertifications as n, upsertCertification as r, deleteCertification as t };
