//#region node_modules/.nitro/vite/services/ssr/assets/admin-store-CIZn7_8q.js
var AUTH_KEY = "admin_auth_v1";
var ADMIN_EMAIL = "admin@bernardo.dev";
var ADMIN_PASSWORD = "admin123";
function isAuthenticated() {
	if (typeof window === "undefined") return false;
	return window.localStorage.getItem(AUTH_KEY) === "1";
}
function signIn(email, password) {
	if (email.trim().toLowerCase() === "admin@bernardo.dev" && password === "admin123") {
		window.localStorage.setItem(AUTH_KEY, "1");
		return true;
	}
	return false;
}
function signOut() {
	window.localStorage.removeItem(AUTH_KEY);
}
//#endregion
export { signOut as a, signIn as i, ADMIN_PASSWORD as n, isAuthenticated as r, ADMIN_EMAIL as t };
