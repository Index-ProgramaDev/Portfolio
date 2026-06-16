import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getCertifications } from "./certifications.functions-aLrku6xC.mjs";
import { n as getExperiences } from "./experiences.functions-B1n-O3K2.mjs";
import { n as getProjects } from "./projects.functions-hyIEN2Ds.mjs";
import { n as getSkills } from "./skills.functions-BCqxI79Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B3dS3gva.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ThemeContext = (0, import_react.createContext)({
	theme: "dark",
	toggle: () => {}
});
function ThemeProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		const saved = window.localStorage.getItem("theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		setTheme(saved ?? (prefersDark ? "dark" : "light"));
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		window.localStorage.setItem("theme", theme);
	}, [theme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: {
			theme,
			toggle: () => setTheme((t) => t === "dark" ? "light" : "dark")
		},
		children
	});
}
var useTheme = () => (0, import_react.useContext)(ThemeContext);
var $$splitComponentImporter = () => import("./routes-BQ0FXQKM.mjs");
var Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Bernardo Daniel — Full Stack Developer" },
			{
				name: "description",
				content: "Portfolio de Bernardo Daniel — desenvolvedor full stack e micro-SaaS. React, TypeScript, Next.js, Supabase."
			},
			{
				property: "og:title",
				content: "Bernardo Daniel — Full Stack Developer"
			},
			{
				property: "og:description",
				content: "Desenvolvedor full stack e micro-SaaS. Aberto a novas oportunidades."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}]
	}),
	loader: async () => {
		const [projects, skills, experiences, certifications] = await Promise.all([
			getProjects({ data: { publishedOnly: true } }),
			getSkills({ data: {} }),
			getExperiences({ data: {} }),
			getCertifications({ data: {} })
		]);
		return {
			projects,
			skills,
			experiences,
			certifications
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { ThemeProvider as n, useTheme as r, Route as t };
