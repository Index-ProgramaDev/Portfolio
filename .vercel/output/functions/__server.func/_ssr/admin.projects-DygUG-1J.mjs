import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime, a as Overlay2, c as Title2, i as Description2, l as Trigger2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as Input, r as buttonVariants, t as Button } from "./input-CEMa6_Eh.mjs";
import { E as ExternalLink, S as Github, T as EyeOff, a as Star, d as Pencil, o as StarOff, r as Trash2, u as Plus, w as Eye } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-B8mBdC_P.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { i as upsertProject, n as getProjects, r as toggleProjectFlag, t as deleteProject } from "./projects.functions-hyIEN2Ds.mjs";
import { r as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects-DygUG-1J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
var empty = () => ({
	id: crypto.randomUUID(),
	title: "",
	slug: "",
	shortDescription: "",
	content: "",
	coverImage: "",
	technologies: [],
	category: "",
	githubUrl: "",
	liveUrl: "",
	featured: false,
	published: false,
	createdAt: (/* @__PURE__ */ new Date()).toISOString()
});
function ProjectsAdmin() {
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("");
	const [techInput, setTechInput] = (0, import_react.useState)("");
	const { data: projects = [] } = useQuery({
		queryKey: ["projects"],
		queryFn: () => getProjects({ data: { publishedOnly: false } })
	});
	const upsertMutation = useMutation({
		mutationFn: (p) => upsertProject({ data: p }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast.success(projects.some((p) => p.id === editing?.id) ? "Projeto atualizado" : "Projeto criado");
			setOpen(false);
		},
		onError: () => toast.error("Erro ao salvar projeto")
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => deleteProject({ data: { id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast.success("Projeto removido");
		},
		onError: () => toast.error("Erro ao remover projeto")
	});
	const toggleMutation = useMutation({
		mutationFn: ({ id, key, value }) => toggleProjectFlag({ data: {
			id,
			key,
			value
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
		onError: () => toast.error("Erro ao atualizar projeto")
	});
	const startCreate = () => {
		setEditing(empty());
		setTechInput("");
		setOpen(true);
	};
	const startEdit = (p) => {
		setEditing({ ...p });
		setTechInput(p.technologies.join(", "));
		setOpen(true);
	};
	const save = () => {
		if (!editing) return;
		if (!editing.title.trim()) return toast.error("Título é obrigatório");
		upsertMutation.mutate(editing);
	};
	const remove = (id) => {
		deleteMutation.mutate(id);
	};
	const toggle = (id, key) => {
		const project = projects.find((p) => p.id === id);
		if (project) toggleMutation.mutate({
			id,
			key,
			value: !project[key]
		});
	};
	const filtered = projects.filter((p) => p.title.toLowerCase().includes(filter.toLowerCase()) || p.category.toLowerCase().includes(filter.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight",
					children: "Projetos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mt-1",
					children: "Gerencie os projetos exibidos no portfolio."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open,
					onOpenChange: setOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: startCreate,
							className: "shadow-glow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Novo projeto"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectDialog, {
						editing,
						setEditing,
						onSave: save,
						techInput,
						setTechInput
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "Buscar por título ou categoria...",
				value: filter,
				onChange: (e) => setFilter(e.target.value),
				className: "max-w-sm"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
				children: [filtered.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: i * .03 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "overflow-hidden hover:shadow-elegant transition-shadow group p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-[16/9] bg-secondary overflow-hidden",
							children: p.coverImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.coverImage,
								alt: "",
								className: "size-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-full grid place-items-center text-muted-foreground text-xs",
								children: "Sem capa"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-mono text-brand",
											children: p.category || "—"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-semibold truncate",
											children: p.title
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-1",
										children: [p.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "size-2 rounded-full bg-amber-500",
											title: "Destaque"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `size-2 rounded-full ${p.published ? "bg-emerald-500" : "bg-muted-foreground/40"}`,
											title: p.published ? "Publicado" : "Rascunho"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground line-clamp-2",
									children: p.shortDescription
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1",
									children: p.technologies.slice(0, 4).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-1.5 py-0.5 text-[10px] rounded bg-secondary",
										children: t
									}, t))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 pt-2 border-t",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											onClick: () => startEdit(p),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											onClick: () => toggle(p.id, "published"),
											title: p.published ? "Despublicar" : "Publicar",
											children: p.published ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											onClick: () => toggle(p.id, "featured"),
											title: p.featured ? "Remover destaque" : "Destacar",
											children: p.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarOff, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
										p.liveUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: p.liveUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "size-8 grid place-items-center rounded-md hover:bg-accent",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })
										}),
										p.githubUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: p.githubUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "size-8 grid place-items-center rounded-md hover:bg-accent",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "ghost",
												className: "text-destructive hover:text-destructive",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Remover projeto?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
											"Esta ação não pode ser desfeita. \"",
											p.title,
											"\" será removido permanentemente."
										] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
											onClick: () => remove(p.id),
											children: "Remover"
										})] })] })] })
									]
								})
							]
						})]
					})
				}, p.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "p-10 text-center text-sm text-muted-foreground col-span-full",
					children: "Nenhum projeto encontrado."
				})]
			})
		]
	});
}
function ProjectDialog({ editing, setEditing, onSave, techInput, setTechInput }) {
	if (!editing) return null;
	const update = (k, v) => setEditing({
		...editing,
		[k]: v
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: "max-w-2xl max-h-[90vh] overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing.title ? `Editar: ${editing.title}` : "Novo projeto" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Título" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.title,
								onChange: (e) => update("title", e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Slug" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.slug,
								onChange: (e) => update("slug", e.target.value)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição curta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: editing.shortDescription,
							onChange: (e) => update("shortDescription", e.target.value),
							maxLength: 160
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição completa" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 4,
							value: editing.content,
							onChange: (e) => update("content", e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoria" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.category,
								onChange: (e) => update("category", e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tecnologias (separadas por vírgula)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: techInput,
								onChange: (e) => {
									const newInput = e.target.value;
									setTechInput(newInput);
									update("technologies", newInput.split(",").map((s) => s.trim()).filter(Boolean));
								}
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "URL da capa" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: editing.coverImage,
							onChange: (e) => update("coverImage", e.target.value),
							placeholder: "https://..."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "GitHub URL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.githubUrl,
								onChange: (e) => update("githubUrl", e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Demo URL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.liveUrl,
								onChange: (e) => update("liveUrl", e.target.value)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-6 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: editing.featured,
								onCheckedChange: (v) => update("featured", v)
							}), "Destaque"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: editing.published,
								onCheckedChange: (v) => update("published", v)
							}), "Publicado"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: onSave,
				children: "Salvar"
			}) })
		]
	});
}
//#endregion
export { ProjectsAdmin as component };
