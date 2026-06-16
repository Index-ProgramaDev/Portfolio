import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getCertifications } from "./certifications.functions-aLrku6xC.mjs";
import { n as getExperiences } from "./experiences.functions-B1n-O3K2.mjs";
import { n as getProjects } from "./projects.functions-hyIEN2Ds.mjs";
import { n as getSkills } from "./skills.functions-BCqxI79Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-D-xlRl_3.js
var $$splitComponentImporter = () => import("./admin.index-BN9fDI_2.mjs");
var Route = createFileRoute("/admin/")({
	ssr: false,
	loader: async () => {
		const [projects, skills, experiences, certifications] = await Promise.all([
			getProjects({ data: { publishedOnly: false } }),
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
export { Route as t };
