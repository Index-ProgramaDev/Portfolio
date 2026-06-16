import { i as TSS_SERVER_FUNCTION } from "./esm-Dova13aH.mjs";
import { t as cs } from "../_libs/neondatabase__serverless.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/db.server-DI5uFW9Z.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function getDb() {
	const url = process.env.DATABASE_URL;
	if (!url) throw new Error("DATABASE_URL environment variable is not set");
	return cs(url);
}
//#endregion
export { getDb as n, createServerRpc as t };
