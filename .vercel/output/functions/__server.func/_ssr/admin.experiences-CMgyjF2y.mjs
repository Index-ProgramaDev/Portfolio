import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as Input, t as Button } from "./input-CEMa6_Eh.mjs";
import { N as Briefcase, d as Pencil, r as Trash2, u as Plus } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-B8mBdC_P.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as getExperiences, r as upsertExperience, t as deleteExperience } from "./experiences.functions-B1n-O3K2.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.experiences-CMgyjF2y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = () => ({
	id: crypto.randomUUID(),
	company: "",
	role: "",
	description: "",
	startDate: "",
	endDate: null,
	technologies: []
});
function ExperiencesAdmin() {
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [current, setCurrent] = (0, import_react.useState)(false);
	const [techInput, setTechInput] = (0, import_react.useState)("");
	const { data: experiences = [] } = useQuery({
		queryKey: ["experiences"],
		queryFn: () => getExperiences({ data: {} })
	});
	const upsertMutation = useMutation({
		mutationFn: (e) => upsertExperience({ data: e }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["experiences"] });
			toast.success(experiences.some((x) => x.id === editing?.id) ? "Experiência atualizada" : "Experiência criada");
			setOpen(false);
		},
		onError: () => toast.error("Erro ao salvar experiência")
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => deleteExperience({ data: { id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["experiences"] });
			toast.success("Experiência removida");
		},
		onError: () => toast.error("Erro ao remover experiência")
	});
	const startCreate = () => {
		setEditing(empty());
		setCurrent(true);
		setTechInput("");
		setOpen(true);
	};
	const startEdit = (e) => {
		setEditing({ ...e });
		setCurrent(e.endDate === null);
		setTechInput(e.technologies.join(", "));
		setOpen(true);
	};
	const save = () => {
		if (!editing) return;
		if (!editing.company.trim() || !editing.role.trim()) return toast.error("Empresa e cargo são obrigatórios");
		const final = {
			...editing,
			endDate: current ? null : editing.endDate
		};
		upsertMutation.mutate(final);
	};
	const remove = (id) => {
		deleteMutation.mutate(id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl mx-auto space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Experiência"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-1",
				children: "Timeline profissional."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: startCreate,
						className: "shadow-glow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Nova experiência"]
					})
				}), editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing.company ? `Editar: ${editing.company}` : "Nova experiência" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Empresa" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: editing.company,
											onChange: (e) => setEditing({
												...editing,
												company: e.target.value
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cargo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: editing.role,
											onChange: (e) => setEditing({
												...editing,
												role: e.target.value
											})
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Início (YYYY-MM)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "2024-01",
											value: editing.startDate,
											onChange: (e) => setEditing({
												...editing,
												startDate: e.target.value
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Fim (YYYY-MM)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "2025-06",
											disabled: current,
											value: editing.endDate ?? "",
											onChange: (e) => setEditing({
												...editing,
												endDate: e.target.value || null
											})
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: current,
										onCheckedChange: setCurrent
									}), "Cargo atual"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										rows: 4,
										value: editing.description,
										onChange: (e) => setEditing({
											...editing,
											description: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tecnologias (separadas por vírgula)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: techInput,
										onChange: (e) => {
											const newInput = e.target.value;
											setTechInput(newInput);
											setEditing({
												...editing,
												technologies: newInput.split(",").map((s) => s.trim()).filter(Boolean)
											});
										}
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: save,
							children: "Salvar"
						}) })
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [experiences.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-10 text-center text-sm text-muted-foreground",
				children: "Nenhuma experiência cadastrada."
			}), experiences.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-10 rounded-lg bg-(image:--gradient-brand) text-brand-foreground grid place-items-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold",
										children: x.role
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-mono text-muted-foreground",
										children: [
											x.startDate,
											" — ",
											x.endDate ?? "Atual"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-brand",
									children: x.company
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mt-2",
									children: x.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1 mt-3",
									children: x.technologies.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2 py-0.5 text-xs rounded bg-secondary",
										children: t
									}, t))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => startEdit(x),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => remove(x.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
							})]
						})
					]
				})
			}, x.id))]
		})]
	});
}
//#endregion
export { ExperiencesAdmin as component };
