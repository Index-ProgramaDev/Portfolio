import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { SectionHeader } from "./About";
import { Briefcase } from "lucide-react";
import type { Experience as ExperienceType } from "@/lib/admin-store";

interface ExperienceProps {
  experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
  const { t } = useTranslation();

  const sortedExperiences = [...experiences].sort((a, b) =>
    b.startDate.localeCompare(a.startDate),
  );

  return (
    <section id="experience" className="py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow={t("experience.eyebrow")} title={t("experience.title")} />
        {sortedExperiences.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            Nenhuma experiência cadastrada ainda.
          </p>
        )}
        <div className="mt-12 relative">
          {sortedExperiences.length > 0 && (
            <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-brand via-border to-transparent" />
          )}
          <div className="space-y-8">
            {sortedExperiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-12 sm:pl-16"
              >
                <div className="absolute left-0 sm:left-2 top-1 size-8 rounded-full bg-(image:--gradient-brand) grid place-items-center shadow-glow">
                  <Briefcase className="size-4 text-brand-foreground" />
                </div>
                <div className="glass rounded-2xl p-6 hover:shadow-elegant transition-shadow">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <span className="text-xs font-mono text-muted-foreground">
                      {exp.startDate} — {exp.endDate ?? t("experience.current", { defaultValue: "Atual" })}
                    </span>
                  </div>
                  <div className="text-sm text-brand font-medium mt-1">{exp.company}</div>
                  {exp.description && (
                    <p className="mt-3 text-muted-foreground leading-relaxed">{exp.description}</p>
                  )}
                  {exp.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
