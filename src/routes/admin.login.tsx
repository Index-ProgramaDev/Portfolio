import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { signIn, isAuthenticated, ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) navigate({ to: "/admin" });
  }, [navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (signIn(email, password)) {
        toast.success("Bem-vindo de volta!");
        navigate({ to: "/admin" });
      } else {
        toast.error("Credenciais inválidas");
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen grid place-items-center px-6 relative overflow-hidden bg-mesh">
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Voltar ao site
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex size-12 rounded-2xl bg-(image:--gradient-brand) shadow-glow items-center justify-center text-brand-foreground font-bold mb-4">
            BD
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Painel administrativo</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Acesse para gerenciar conteúdo do portfolio.
          </p>
        </div>

        <form onSubmit={submit} className="glass rounded-2xl p-6 sm:p-8 space-y-5 shadow-elegant">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bernardo.dev"
                required
                className="pl-9"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="pl-9"
              />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full shadow-glow" size="lg">
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          <div className="text-xs text-muted-foreground p-3 rounded-md bg-secondary/50 border">
            <div className="font-medium mb-1">Demo (frontend apenas)</div>
            <div>Email: <code className="text-foreground">{ADMIN_EMAIL}</code></div>
            <div>Senha: <code className="text-foreground">{ADMIN_PASSWORD}</code></div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
