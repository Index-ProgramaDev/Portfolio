import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./About";
import type { Project } from "@/lib/admin-store";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const { t } = useTranslation();

  // Only show published projects, sorted by featured first, then newest first
  const published = [...projects]
    .filter((p) => p.published)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.createdAt.localeCompare(a.createdAt);
    });

  const categories = ["all", ...Array.from(new Set(published.map((p) => p.category)))];
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? published : published.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("projects.eyebrow")}
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                filter === c
                  ? "bg-foreground text-background shadow-elegant"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {c === "all" ? t("projects.all") : c}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 && (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-2 text-center text-muted-foreground py-16"
              >
                Nenhum projeto publicado ainda.
              </motion.p>
            )}
            {filtered.map((p, i) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative glass rounded-2xl overflow-hidden hover:shadow-glow transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden bg-secondary">
                  {p.coverImage ? (
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="size-full grid place-items-center text-muted-foreground text-sm">
                      Sem imagem
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="text-xs font-mono text-brand">{p.category}</div>
                        <div className="flex gap-1">
                          {p.featured && (
                            <span className="size-3 rounded-full bg-amber-500" title="Destaque" />
                          )}
                          {p.published && (
                            <span className="size-3 rounded-full bg-emerald-500" title="Publicado" />
                          )}
                        </div>
                      </div>
                      <h3 className="mt-1 text-xl font-semibold">{p.title}</h3>
                    </div>
                    <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:text-foreground group-hover:rotate-45 shrink-0" />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {p.shortDescription}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.technologies.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-3 text-sm">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-foreground hover:text-brand transition-colors"
                      >
                        <ExternalLink className="size-3.5" />
                        {t("projects.live")}
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="size-3.5" />
                        {t("projects.code")}
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
