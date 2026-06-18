import { useTranslation } from "react-i18next";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t mt-8">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>
          © {new Date().getFullYear()} Bernardo Daniel. {t("footer.rights")}
        </div>
        <div className="text-xs">{t("footer.built")}</div>
        <div className="flex gap-2">
          <a href="https://github.com/Index-ProgramaDev" target="_blank" rel="noreferrer" aria-label="GitHub" className="size-8 grid place-items-center rounded-md hover:bg-accent transition-colors">
            <Github className="size-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="size-8 grid place-items-center rounded-md hover:bg-accent transition-colors">
            <Linkedin className="size-4" />
          </a>
          <a href="mailto:hello@example.com" aria-label="Email" className="size-8 grid place-items-center rounded-md hover:bg-accent transition-colors">
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
