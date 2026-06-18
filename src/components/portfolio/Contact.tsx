import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "./About";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(t("contact.error"));
      return;
    }
    setSending(true);
    // Mailto fallback (Phase 1: no backend)
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:hello@example.com?subject=${encodeURIComponent(
      form.subject || "Contact",
    )}&body=${encodeURIComponent(body)}`;
    setTimeout(() => {
      setSending(false);
      toast.success(t("contact.success"));
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 600);
  };

  const links = [
    { icon: Mail, label: "Email", href: "mailto:danielbernardoinv@gmail.com" },
    { icon: Github, label: "GitHub", href: "https://github.com/Index-ProgramaDev" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/558198714983" },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 relative">
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("contact.eyebrow")}
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />
        <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 p-4 glass rounded-xl hover:shadow-glow hover:border-brand/50 transition-all"
              >
                <div className="size-10 rounded-lg bg-secondary grid place-items-center group-hover:bg-(image:--gradient-brand) group-hover:text-brand-foreground transition-all">
                  <l.icon className="size-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{l.label}</div>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 sm:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">{t("contact.name")}</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1.5"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">{t("contact.email")}</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1.5"
                  maxLength={255}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">{t("contact.subject")}</label>
              <Input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="mt-1.5"
                maxLength={150}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">{t("contact.message")}</label>
              <Textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1.5"
                maxLength={1000}
              />
            </div>
            <Button type="submit" size="lg" disabled={sending} className="w-full shadow-glow">
              {sending ? t("contact.sending") : (<>{t("contact.send")}<Send className="size-4" /></>)}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
