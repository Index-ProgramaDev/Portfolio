import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as Input, t as Button } from "./input-CEMa6_Eh.mjs";
import { D as Database, E as ExternalLink, F as ArrowUpRight, I as ArrowRight, N as Briefcase, O as CodeXml, P as Award, S as Github, c as Server, g as Mail, h as MessageCircle, i as Sun, k as Cloud, l as Send, m as Moon, p as MousePointer2, x as Languages, y as Linkedin } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { i as AnimatePresence, n as useScroll, r as motion, t as useSpring } from "../_libs/framer-motion.mjs";
import { r as useTheme, t as Route } from "./routes-B3dS3gva.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BQ0FXQKM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sections = [
	{
		id: "about",
		key: "nav.about"
	},
	{
		id: "skills",
		key: "nav.skills"
	},
	{
		id: "experience",
		key: "nav.experience"
	},
	{
		id: "projects",
		key: "nav.projects"
	},
	{
		id: "contact",
		key: "nav.contact"
	}
];
function Header() {
	const { t, i18n } = useTranslation();
	const { theme, toggle } = useTheme();
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30
	});
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 16);
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const switchLang = () => {
		const next = i18n.language === "pt-BR" ? "en" : "pt-BR";
		i18n.changeLanguage(next);
		window.localStorage.setItem("lang", next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		style: { scaleX },
		className: "fixed top-0 left-0 right-0 h-[2px] bg-(image:--gradient-brand) origin-left z-50"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "glass shadow-elegant" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 h-16 flex items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: "flex items-center gap-2 group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-8 rounded-lg bg-(image:--gradient-brand) shadow-glow grid place-items-center text-brand-foreground font-bold text-sm",
						children: "BD"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold tracking-tight hidden sm:inline",
						children: "Bernardo Daniel"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden md:flex items-center gap-1",
					children: sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#${s.id}`,
						className: "px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md",
						children: t(s.key)
					}, s.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: switchLang,
							"aria-label": "Switch language",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs ml-1 font-medium",
								children: i18n.language === "pt-BR" ? "PT" : "EN"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: toggle,
							"aria-label": "Toggle theme",
							children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://github.com",
								target: "_blank",
								rel: "noreferrer",
								"aria-label": "GitHub",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-4" })
							})
						})
					]
				})
			]
		})
	})] });
}
var avatar_default = "/assets/avatar-B6VFfS1g.jpg";
function Hero() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-mesh pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.07]",
				style: {
					backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
					backgroundSize: "60px 60px",
					maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 70%)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				animate: { y: [
					0,
					-20,
					0
				] },
				transition: {
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut"
				},
				className: "absolute top-1/4 -left-20 size-72 rounded-full bg-brand/20 blur-3xl pointer-events-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				animate: { y: [
					0,
					20,
					0
				] },
				transition: {
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut"
				},
				className: "absolute bottom-1/4 -right-20 size-72 rounded-full bg-brand-2/20 blur-3xl pointer-events-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-6xl px-6 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .6 },
						className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex size-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full size-2 bg-emerald-500" })]
						}), t("hero.badge")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .7,
							delay: .1
						},
						className: "mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]",
						children: [t("hero.title"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient",
							children: t("hero.titleAccent")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .7,
							delay: .2
						},
						className: "mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed",
						children: t("hero.subtitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .7,
							delay: .3
						},
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "group shadow-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#projects",
								children: [t("hero.ctaProjects"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform group-hover:translate-x-1" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#contact",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), t("hero.ctaContact")]
							})
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .9
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: {
						duration: .8,
						delay: .2
					},
					className: "relative justify-self-center lg:justify-self-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-(image:--gradient-brand) blur-3xl opacity-40 -z-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative size-64 sm:size-80 rounded-3xl overflow-hidden ring-1 ring-border shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: avatar_default,
							alt: "Bernardo Daniel",
							width: 768,
							height: 768,
							className: "size-full object-cover"
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
				href: "#about",
				initial: { opacity: 0 },
				animate: {
					opacity: 1,
					y: [
						0,
						8,
						0
					]
				},
				transition: {
					opacity: { delay: 1 },
					y: {
						duration: 2,
						repeat: Infinity
					}
				},
				className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MousePointer2, { className: "size-3" }), t("hero.scroll")]
			})
		]
	});
}
function SectionHeader({ eyebrow, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				initial: {
					opacity: 0,
					y: 8
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-80px"
				},
				className: "text-xs font-mono uppercase tracking-[0.2em] text-brand",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
				initial: {
					opacity: 0,
					y: 12
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-80px"
				},
				transition: { delay: .05 },
				className: "mt-3 text-3xl sm:text-4xl font-bold tracking-tight",
				children: title
			}),
			subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				initial: {
					opacity: 0,
					y: 12
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-80px"
				},
				transition: { delay: .1 },
				className: "mt-3 text-muted-foreground",
				children: subtitle
			})
		]
	});
}
function About() {
	const { t } = useTranslation();
	const stats = [
		{
			value: "2+",
			label: t("about.stats.years")
		},
		{
			value: "15+",
			label: t("about.stats.projects")
		},
		{
			value: "20+",
			label: t("about.stats.stack")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "py-24 sm:py-32 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: t("about.eyebrow"),
				title: t("about.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid lg:grid-cols-2 gap-12 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					className: "space-y-5 text-lg text-muted-foreground leading-relaxed",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("about.p1") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("about.p2") })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid sm:grid-cols-3 lg:grid-cols-1 gap-4",
					children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 16
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: {
							once: true,
							margin: "-80px"
						},
						transition: { delay: i * .08 },
						className: "glass rounded-2xl p-6 hover:shadow-glow transition-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-4xl font-bold text-gradient",
							children: s.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm text-muted-foreground",
							children: s.label
						})]
					}, s.label))
				})]
			})]
		})
	});
}
var icons = {
	frontend: CodeXml,
	backend: Server,
	database: Database,
	devops: Cloud
};
var categoryLabel = {
	frontend: "Frontend",
	backend: "Backend",
	database: "Database",
	devops: "DevOps & Cloud"
};
function Skills({ skills }) {
	const { t } = useTranslation();
	const groups = [
		"frontend",
		"backend",
		"database",
		"devops"
	].map((cat) => ({
		cat,
		items: skills.filter((s) => s.category === cat)
	}));
	const hasSkills = skills.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "skills",
		className: "py-24 sm:py-32 px-6 relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-mesh opacity-50 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: t("skills.eyebrow"),
					title: t("skills.title"),
					subtitle: t("skills.subtitle")
				}),
				!hasSkills && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-12 text-center text-muted-foreground",
					children: "Nenhuma skill cadastrada ainda."
				}),
				hasSkills && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4",
					children: groups.map((group, idx) => {
						const Icon = icons[group.cat];
						if (group.items.length === 0) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: true,
								margin: "-80px"
							},
							transition: { delay: idx * .08 },
							whileHover: { y: -4 },
							className: "glass rounded-2xl p-6 hover:shadow-glow transition-all",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-10 rounded-xl bg-(image:--gradient-brand) grid place-items-center text-brand-foreground mb-4 shadow-glow",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold mb-3",
									children: t(`skills.categories.${group.cat}`, { defaultValue: categoryLabel[group.cat] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2",
									children: group.items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "text-sm text-muted-foreground flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-base leading-none",
												children: s.icon
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.name }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "ml-auto text-xs font-mono text-brand",
												children: [s.level, "%"]
											})
										]
									}, s.id))
								})
							]
						}, group.cat);
					})
				})
			]
		})]
	});
}
function Experience({ experiences }) {
	const { t } = useTranslation();
	const sortedExperiences = [...experiences].sort((a, b) => b.startDate.localeCompare(a.startDate));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "experience",
		className: "py-24 sm:py-32 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: t("experience.eyebrow"),
					title: t("experience.title")
				}),
				sortedExperiences.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-12 text-center text-muted-foreground",
					children: "Nenhuma experiência cadastrada ainda."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 relative",
					children: [sortedExperiences.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-brand via-border to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-8",
						children: sortedExperiences.map((exp, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: -20
							},
							whileInView: {
								opacity: 1,
								x: 0
							},
							viewport: {
								once: true,
								margin: "-80px"
							},
							transition: { delay: i * .1 },
							className: "relative pl-12 sm:pl-16",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute left-0 sm:left-2 top-1 size-8 rounded-full bg-(image:--gradient-brand) grid place-items-center shadow-glow",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-4 text-brand-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-6 hover:shadow-elegant transition-shadow",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-baseline justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-semibold",
											children: exp.role
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-mono text-muted-foreground",
											children: [
												exp.startDate,
												" — ",
												exp.endDate ?? t("experience.current", { defaultValue: "Atual" })
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-brand font-medium mt-1",
										children: exp.company
									}),
									exp.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-muted-foreground leading-relaxed",
										children: exp.description
									}),
									exp.technologies.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 flex flex-wrap gap-1.5",
										children: exp.technologies.map((tech) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-2.5 py-1 text-xs rounded-md bg-secondary text-secondary-foreground",
											children: tech
										}, tech))
									})
								]
							})]
						}, exp.id))
					})]
				})
			]
		})
	});
}
function Projects({ projects }) {
	const { t } = useTranslation();
	const published = [...projects].filter((p) => p.published).sort((a, b) => {
		if (a.featured && !b.featured) return -1;
		if (!a.featured && b.featured) return 1;
		return b.createdAt.localeCompare(a.createdAt);
	});
	const categories = ["all", ...Array.from(new Set(published.map((p) => p.category)))];
	const [filter, setFilter] = (0, import_react.useState)("all");
	const filtered = filter === "all" ? published : published.filter((p) => p.category === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "projects",
		className: "py-24 sm:py-32 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: t("projects.eyebrow"),
					title: t("projects.title"),
					subtitle: t("projects.subtitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 flex flex-wrap gap-2",
					children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFilter(c),
						className: `px-3 py-1.5 text-sm rounded-full transition-all ${filter === c ? "bg-foreground text-background shadow-elegant" : "glass text-muted-foreground hover:text-foreground"}`,
						children: c === "all" ? t("projects.all") : c
					}, c))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					layout: true,
					className: "mt-8 grid md:grid-cols-2 gap-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
						mode: "popLayout",
						children: [filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							exit: { opacity: 0 },
							className: "col-span-2 text-center text-muted-foreground py-16",
							children: "Nenhum projeto publicado ainda."
						}, "empty"), filtered.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
							layout: true,
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								scale: .95
							},
							transition: { delay: i * .05 },
							whileHover: { y: -4 },
							className: "group relative glass rounded-2xl overflow-hidden hover:shadow-glow transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[16/10] overflow-hidden bg-secondary",
								children: p.coverImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.coverImage,
									alt: p.title,
									loading: "lazy",
									className: "size-full object-cover transition-transform duration-700 group-hover:scale-105"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-full grid place-items-center text-muted-foreground text-sm",
									children: "Sem imagem"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs font-mono text-brand",
													children: p.category
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-1",
													children: [p.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "size-3 rounded-full bg-amber-500",
														title: "Destaque"
													}), p.published && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "size-3 rounded-full bg-emerald-500",
														title: "Publicado"
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-1 text-xl font-semibold",
												children: p.title
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-5 text-muted-foreground transition-all group-hover:text-foreground group-hover:rotate-45 shrink-0" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-muted-foreground leading-relaxed",
										children: p.shortDescription
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 flex flex-wrap gap-1.5",
										children: p.technologies.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-2 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground",
											children: tag
										}, tag))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 flex gap-3 text-sm",
										children: [p.liveUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: p.liveUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "inline-flex items-center gap-1.5 text-foreground hover:text-brand transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), t("projects.live")]
										}), p.githubUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: p.githubUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-3.5" }), t("projects.code")]
										})]
									})
								]
							})]
						}, p.id))]
					})
				})
			]
		})
	});
}
function Certifications({ certifications }) {
	const { t } = useTranslation();
	if (certifications.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "certifications",
		className: "py-24 sm:py-32 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: t("certifications.eyebrow"),
				title: t("certifications.title"),
				subtitle: t("certifications.subtitle")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
				children: certifications.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: i * .05 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5 group hover:shadow-elegant transition-shadow h-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-start justify-between gap-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-10 rounded-lg bg-(image:--gradient-brand) text-brand-foreground grid place-items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-5" })
								})
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
					})
				}, c.id))
			})]
		})
	});
}
function Contact() {
	const { t } = useTranslation();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		subject: "",
		message: ""
	});
	const [sending, setSending] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		if (!form.name || !form.email || !form.message) {
			toast.error(t("contact.error"));
			return;
		}
		setSending(true);
		const body = `${form.message}\n\n— ${form.name} (${form.email})`;
		window.location.href = `mailto:hello@example.com?subject=${encodeURIComponent(form.subject || "Contact")}&body=${encodeURIComponent(body)}`;
		setTimeout(() => {
			setSending(false);
			toast.success(t("contact.success"));
			setForm({
				name: "",
				email: "",
				subject: "",
				message: ""
			});
		}, 600);
	};
	const links = [
		{
			icon: Mail,
			label: "Email",
			href: "mailto:hello@example.com"
		},
		{
			icon: Github,
			label: "GitHub",
			href: "https://github.com"
		},
		{
			icon: Linkedin,
			label: "LinkedIn",
			href: "https://linkedin.com"
		},
		{
			icon: MessageCircle,
			label: "WhatsApp",
			href: "https://wa.me/"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "contact",
		className: "py-24 sm:py-32 px-6 relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-mesh opacity-40 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: t("contact.eyebrow"),
				title: t("contact.title"),
				subtitle: t("contact.subtitle")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					className: "space-y-3",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: l.href,
						target: "_blank",
						rel: "noreferrer",
						className: "group flex items-center gap-4 p-4 glass rounded-xl hover:shadow-glow hover:border-brand/50 transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-10 rounded-lg bg-secondary grid place-items-center group-hover:bg-(image:--gradient-brand) group-hover:text-brand-foreground transition-all",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(l.icon, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-sm",
								children: l.label
							})
						})]
					}, l.label))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
					onSubmit: submit,
					initial: {
						opacity: 0,
						y: 16
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					className: "glass rounded-2xl p-6 sm:p-8 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-muted-foreground",
								children: t("contact.name")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								}),
								className: "mt-1.5",
								maxLength: 100
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-muted-foreground",
								children: t("contact.email")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								value: form.email,
								onChange: (e) => setForm({
									...form,
									email: e.target.value
								}),
								className: "mt-1.5",
								maxLength: 255
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium text-muted-foreground",
							children: t("contact.subject")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.subject,
							onChange: (e) => setForm({
								...form,
								subject: e.target.value
							}),
							className: "mt-1.5",
							maxLength: 150
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium text-muted-foreground",
							children: t("contact.message")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 5,
							value: form.message,
							onChange: (e) => setForm({
								...form,
								message: e.target.value
							}),
							className: "mt-1.5",
							maxLength: 1e3
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "lg",
							disabled: sending,
							className: "w-full shadow-glow",
							children: sending ? t("contact.sending") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [t("contact.send"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })] })
						})
					]
				})]
			})]
		})]
	});
}
function Footer() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t mt-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Bernardo Daniel. ",
					t("footer.rights")
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs",
					children: t("footer.built")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://github.com",
							target: "_blank",
							rel: "noreferrer",
							"aria-label": "GitHub",
							className: "size-8 grid place-items-center rounded-md hover:bg-accent transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://linkedin.com",
							target: "_blank",
							rel: "noreferrer",
							"aria-label": "LinkedIn",
							className: "size-8 grid place-items-center rounded-md hover:bg-accent transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:hello@example.com",
							"aria-label": "Email",
							className: "size-8 grid place-items-center rounded-md hover:bg-accent transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" })
						})
					]
				})
			]
		})
	});
}
function Index() {
	const { projects, skills, experiences, certifications } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skills, { skills }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experience, { experiences }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, { projects }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Certifications, { certifications }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Index as component };
