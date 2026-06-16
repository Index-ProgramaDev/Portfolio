import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as FolderKanban, F as ArrowUpRight, N as Briefcase, P as Award, a as Star, n as TrendingUp, s as Sparkles } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Route } from "./admin.index-D-xlRl_3.mjs";
import { r as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-BN9fDI_2.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const { projects, skills, experiences, certifications } = Route.useLoaderData();
	const stats = [
		{
			label: "Total de Projetos",
			value: projects.length,
			icon: FolderKanban,
			to: "/admin/projects"
		},
		{
			label: "Em Destaque",
			value: projects.filter((p) => p.featured).length,
			icon: Star,
			to: "/admin/projects"
		},
		{
			label: "Skills",
			value: skills.length,
			icon: Sparkles,
			to: "/admin/skills"
		},
		{
			label: "Experiências",
			value: experiences.length,
			icon: Briefcase,
			to: "/admin/experiences"
		},
		{
			label: "Certificações",
			value: certifications.length,
			icon: Award,
			to: "/admin/certifications"
		},
		{
			label: "Publicados",
			value: projects.filter((p) => p.published).length,
			icon: TrendingUp,
			to: "/admin/projects"
		}
	];
	const recent = [...projects].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl mx-auto space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-1",
				children: "Visão geral do conteúdo do portfolio."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
				children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: i * .05 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: s.to,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "p-5 hover:shadow-glow hover:border-brand/40 transition-all group cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground",
									children: s.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-3xl font-bold mt-2 tracking-tight",
									children: s.value
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-10 rounded-lg bg-secondary grid place-items-center group-hover:bg-(image:--gradient-brand) group-hover:text-brand-foreground transition-all",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-5" })
								})]
							})
						})
					})
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Projetos recentes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Últimas atualizações no portfolio."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/projects",
						className: "text-sm text-brand hover:underline inline-flex items-center gap-1",
						children: ["Ver todos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y",
					children: [recent.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "Nenhum projeto ainda. Crie o primeiro!"
					}), recent.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-3 flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-10 rounded-md bg-secondary overflow-hidden shrink-0",
								children: p.coverImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.coverImage,
									alt: "",
									className: "size-full object-cover"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium truncate",
									children: p.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground truncate",
									children: p.shortDescription
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs",
								children: [p.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2 py-0.5 rounded bg-brand/10 text-brand font-medium",
									children: "Destaque"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `px-2 py-0.5 rounded ${p.published ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`,
									children: p.published ? "Publicado" : "Rascunho"
								})]
							})
						]
					}, p.id))]
				})]
			})
		]
	});
}
//#endregion
export { DashboardPage as component };
