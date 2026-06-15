import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Award, ExternalLink } from "lucide-react";
import { SectionHeader } from "./About";
import { Card } from "@/components/ui/card";
import type { Certification } from "@/lib/admin-store";

interface CertificationsProps {
  certifications: Certification[];
}

export function Certifications({ certifications }: CertificationsProps) {
  const { t } = useTranslation();

  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("certifications.eyebrow")}
          title={t("certifications.title")}
          subtitle={t("certifications.subtitle")}
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-5 group hover:shadow-elegant transition-shadow h-full">
                <div className="flex items-start justify-between gap-3">
                  <div className="size-10 rounded-lg bg-(image:--gradient-brand) text-brand-foreground grid place-items-center">
                    <Award className="size-5" />
                  </div>
                </div>
                <h3 className="font-semibold mt-4 leading-tight">{c.name}</h3>
                <div className="text-sm text-muted-foreground mt-1">{c.institution}</div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t text-xs">
                  <span className="font-mono text-muted-foreground">{c.issueDate}</span>
                  {c.credentialUrl && (
                    <a
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-brand hover:underline"
                    >
                      <ExternalLink className="size-3" /> Credencial
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
