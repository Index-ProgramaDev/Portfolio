import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FolderKanban, Star, Sparkles, Briefcase, Award, TrendingUp, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getProjects } from "@/lib/api/projects.functions";
import { getSkills } from "@/lib/api/skills.functions";
import { getExperiences } from "@/lib/api/experiences.functions";
import { getCertifications } from "@/lib/api/certifications.functions";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  loader: async () => {
    const [projects, skills, experiences, certifications] = await Promise.all([
      getProjects({ data: { publishedOnly: false } }),
      getSkills({ data: {} }),
      getExperiences({ data: {} }),
      getCertifications({ data: {} }),
    ]);
    return { projects, skills, experiences, certifications };
  },
  component: DashboardPage,
});

function DashboardPage() {
  const { projects, skills, experiences, certifications } = Route.useLoaderData();

  const stats = [
    { label: "Total de Projetos", value: projects.length, icon: FolderKanban, to: "/admin/projects" },
    { label: "Em Destaque", value: projects.filter((p) => p.featured).length, icon: Star, to: "/admin/projects" },
    { label: "Skills", value: skills.length, icon: Sparkles, to: "/admin/skills" },
    { label: "Experiências", value: experiences.length, icon: Briefcase, to: "/admin/experiences" },
    { label: "Certificações", value: certifications.length, icon: Award, to: "/admin/certifications" },
    { label: "Publicados", value: projects.filter((p) => p.published).length, icon: TrendingUp, to: "/admin/projects" },
  ];

  const recent = [...projects]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Visão geral do conteúdo do portfolio.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={s.to}>
              <Card className="p-5 hover:shadow-glow hover:border-brand/40 transition-all group cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">{s.label}</div>
                    <div className="text-3xl font-bold mt-2 tracking-tight">{s.value}</div>
                  </div>
                  <div className="size-10 rounded-lg bg-secondary grid place-items-center group-hover:bg-(image:--gradient-brand) group-hover:text-brand-foreground transition-all">
                    <s.icon className="size-5" />
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Projetos recentes</h2>
            <p className="text-sm text-muted-foreground">Últimas atualizações no portfolio.</p>
          </div>
          <Link to="/admin/projects" className="text-sm text-brand hover:underline inline-flex items-center gap-1">
            Ver todos <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <div className="divide-y">
          {recent.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Nenhum projeto ainda. Crie o primeiro!
            </div>
          )}
          {recent.map((p) => (
            <div key={p.id} className="py-3 flex items-center gap-4">
              <div className="size-10 rounded-md bg-secondary overflow-hidden shrink-0">
                {p.coverImage && <img src={p.coverImage} alt="" className="size-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{p.title}</div>
                <div className="text-xs text-muted-foreground truncate">{p.shortDescription}</div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {p.featured && (
                  <span className="px-2 py-0.5 rounded bg-brand/10 text-brand font-medium">Destaque</span>
                )}
                <span className={`px-2 py-0.5 rounded ${p.published ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}>
                  {p.published ? "Publicado" : "Rascunho"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
