import { useTranslation } from "react-i18next";
import { motion, useScroll, useSpring } from "motion/react";
import { Moon, Sun, Languages, Github } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const sections = [
  { id: "about", key: "nav.about" },
  { id: "skills", key: "nav.skills" },
  { id: "experience", key: "nav.experience" },
  { id: "projects", key: "nav.projects" },
  { id: "contact", key: "nav.contact" },
];

export function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLang = () => {
    const next = i18n.language === "pt-BR" ? "en" : "pt-BR";
    void i18n.changeLanguage(next);
    window.localStorage.setItem("lang", next);
  };

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-(image:--gradient-brand) origin-left z-50"
      />
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "glass shadow-elegant" : ""
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <div className="size-8 rounded-lg bg-(image:--gradient-brand) shadow-glow grid place-items-center text-brand-foreground font-bold text-sm">
              BD
            </div>
            <span className="font-semibold tracking-tight hidden sm:inline">Bernardo Daniel</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
              >
                {t(s.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={switchLang} aria-label="Switch language">
              <Languages className="size-4" />
              <span className="text-xs ml-1 font-medium">
                {i18n.language === "pt-BR" ? "PT" : "EN"}
              </span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/Index-ProgramaDev" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
