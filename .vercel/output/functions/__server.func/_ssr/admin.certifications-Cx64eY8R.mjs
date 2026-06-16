import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as Input, t as Button } from "./input-CEMa6_Eh.mjs";
import { E as ExternalLink, P as Award, d as Pencil, r as Trash2, u as Plus } from "../_libs/lucide-react.mjs";
import { n as getCertifications, r as upsertCertification, t as deleteCertification } from "./certifications.functions-aLrku6xC.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-B8mBdC_P.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.certifications-Cx64eY8R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = () => ({
	id: crypto.randomUUID(),
	name: "",
	institution: "",
	issueDate: "",
	credentialUrl: ""
});
function CertificationsAdmin() {
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const { data: certifications = [] } = useQuery({
		queryKey: ["certifications"],
		queryFn: () => getCertifications({ data: {} })
	});
	const upsertMutation = useMutation({
		mutationFn: (c) => upsertCertification({ data: c }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["certifications"] });
			toast.success(certifications.some((c) => c.id === editing?.id) ? "Certificação atualizada" : "Certificação criada");
			setOpen(false);
		},
		onError: () => toast.error("Erro ao salvar certificação")
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => deleteCertification({ data: { id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["certifications"] });
			toast.success("Certificação removida");
		},
		onError: () => toast.error("Erro ao remover certificação")
	});
	const save = () => {
		if (!editing) return;
		if (!editing.name.trim()) return toast.error("Nome é obrigatório");
		upsertMutation.mutate(editing);
	};
	const remove = (id) => {
		deleteMutation.mutate(id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Certificações"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-1",
				children: "Credenciais e cursos."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => {
							setEditing(empty());
							setOpen(true);
						},
						className: "shadow-glow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Nova certificação"]
					})
				}), editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing.name ? `Editar: ${editing.name}` : "Nova certificação" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: editing.name,
									onChange: (e) => setEditing({
										...editing,
										name: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Instituição" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: editing.institution,
									onChange: (e) => setEditing({
										...editing,
										institution: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Data (YYYY-MM)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "2024-08",
										value: editing.issueDate,
										onChange: (e) => setEditing({
											...editing,
											issueDate: e.target.value
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Link da credencial" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: editing.credentialUrl,
										onChange: (e) => setEditing({
											...editing,
											credentialUrl: e.target.value
										})
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: save,
						children: "Salvar"
					}) })
				] })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
			children: [certifications.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-10 text-center text-sm text-muted-foreground col-span-full",
				children: "Nenhuma certificação cadastrada."
			}), certifications.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 group hover:shadow-elegant transition-shadow",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-10 rounded-lg bg-(image:--gradient-brand) text-brand-foreground grid place-items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => {
									setEditing({ ...c });
									setOpen(true);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => remove(c.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold mt-4 leading-tight",
						children: c.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground mt-1",
						children: c.institution
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mt-4 pt-4 border-t text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-muted-foreground",
							children: c.issueDate
						}), c.credentialUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: c.credentialUrl,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-center gap-1 text-brand hover:underline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" }), " Credencial"]
						})]
					})
				]
			}, c.id))]
		})]
	});
}
//#endregion
export { CertificationsAdmin as component };
