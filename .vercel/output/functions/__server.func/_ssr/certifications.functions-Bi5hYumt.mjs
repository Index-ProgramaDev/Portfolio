import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
import { n as getDb, t as createServerRpc } from "./db.server-DI5uFW9Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certifications.functions-Bi5hYumt.js
function rowToCertification(row) {
	return {
		id: String(row.id),
		name: String(row.name ?? ""),
		institution: String(row.institution ?? ""),
		issueDate: String(row.issue_date ?? ""),
		credentialUrl: String(row.credential_url ?? "")
	};
}
var certificationSchema = objectType({
	id: stringType(),
	name: stringType().min(1),
	institution: stringType(),
	issueDate: stringType(),
	credentialUrl: stringType()
});
var getCertifications_createServerFn_handler = createServerRpc({
	id: "933a29fe2b99d53d403b1144a8996b037335104d7207b94aefbb25bce7901a8d",
	name: "getCertifications",
	filename: "src/lib/api/certifications.functions.ts"
}, (opts) => getCertifications.__executeServer(opts));
var getCertifications = createServerFn({ method: "GET" }).inputValidator(objectType({})).handler(getCertifications_createServerFn_handler, async () => {
	return (await getDb()`SELECT * FROM certifications ORDER BY issue_date DESC`).map(rowToCertification);
});
var upsertCertification_createServerFn_handler = createServerRpc({
	id: "49f0c6936cdac5663c318a602a59f0268f6728ba59b5cb4a1d85ac68835476be",
	name: "upsertCertification",
	filename: "src/lib/api/certifications.functions.ts"
}, (opts) => upsertCertification.__executeServer(opts));
var upsertCertification = createServerFn({ method: "POST" }).inputValidator(certificationSchema).handler(upsertCertification_createServerFn_handler, async ({ data }) => {
	await getDb()`
      INSERT INTO certifications (id, name, institution, issue_date, credential_url)
      VALUES (${data.id}, ${data.name}, ${data.institution}, ${data.issueDate}, ${data.credentialUrl})
      ON CONFLICT (id) DO UPDATE SET
        name           = EXCLUDED.name,
        institution    = EXCLUDED.institution,
        issue_date     = EXCLUDED.issue_date,
        credential_url = EXCLUDED.credential_url
    `;
	return { success: true };
});
var deleteCertification_createServerFn_handler = createServerRpc({
	id: "625c87bd4dfdad80e91f28c248f82707b3beb3edc1a4a7df7a02de9ac87e3408",
	name: "deleteCertification",
	filename: "src/lib/api/certifications.functions.ts"
}, (opts) => deleteCertification.__executeServer(opts));
var deleteCertification = createServerFn({ method: "POST" }).inputValidator(objectType({ id: stringType() })).handler(deleteCertification_createServerFn_handler, async ({ data }) => {
	await getDb()`DELETE FROM certifications WHERE id = ${data.id}`;
	return { success: true };
});
//#endregion
export { deleteCertification_createServerFn_handler, getCertifications_createServerFn_handler, upsertCertification_createServerFn_handler };
