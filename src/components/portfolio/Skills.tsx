import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { SectionHeader } from "./About";
import { Code2, Server, Database, Cloud } from "lucide-react";
import type { Skill } from "@/lib/admin-store";

const icons = {
  frontend: Code2,
  backend: Server,
  database: Database,
  devops: Cloud,
};

const categoryLabel: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  devops: "DevOps & Cloud",
};

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  const { t } = useTranslation();

  // Group skills by category
  const categories = ["frontend", "backend", "database", "devops"] as const;
  const groups = categories.map((cat) => ({
    cat,
    items: skills.filter((s) => s.category === cat),
  }));

  // If no skills in store yet, show nothing or placeholder
  const hasSkills = skills.length > 0;

  return (
    <section id="skills" className="py-24 sm:py-32 px-6 relative">
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("skills.eyebrow")}
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
        />
        {!hasSkills && (
          <p className="mt-12 text-center text-muted-foreground">
            Nenhuma skill cadastrada ainda.
          </p>
        )}
        {hasSkills && (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {groups.map((group, idx) => {
              const Icon = icons[group.cat];
              if (group.items.length === 0) return null;
              return (
                <motion.div
                  key={group.cat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-6 hover:shadow-glow transition-all"
                >
                  <div className="size-10 rounded-xl bg-(image:--gradient-brand) grid place-items-center text-brand-foreground mb-4 shadow-glow">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-semibold mb-3">
                    {t(`skills.categories.${group.cat}`, {
                      defaultValue: categoryLabel[group.cat],
                    })}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((s) => (
                      <li key={s.id} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="text-base leading-none">{s.icon}</span>
                        <span>{s.name}</span>
                        <span className="ml-auto text-xs font-mono text-brand">{s.level}%</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
