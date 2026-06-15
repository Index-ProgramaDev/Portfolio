import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Certification } from "@/lib/admin-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCertifications, upsertCertification, deleteCertification } from "@/lib/api/certifications.functions";

export const Route = createFileRoute("/admin/certifications")({
  component: CertificationsAdmin,
});

const empty = (): Certification => ({
  id: crypto.randomUUID(),
  name: "",
  institution: "",
  issueDate: "",
  credentialUrl: "",
});

function CertificationsAdmin() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Certification | null>(null);

  // Query
  const { data: certifications = [] } = useQuery({
    queryKey: ["certifications"],
    queryFn: () => getCertifications({ data: {} }),
  });

  // Mutations
  const upsertMutation = useMutation({
    mutationFn: (c: Certification) => upsertCertification({ data: c }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certifications"] });
      toast.success(certifications.some(c => c.id === editing?.id) ? "Certificação atualizada" : "Certificação criada");
      setOpen(false);
    },
    onError: () => toast.error("Erro ao salvar certificação"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCertification({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certifications"] });
      toast.success("Certificação removida");
    },
    onError: () => toast.error("Erro ao remover certificação"),
  });

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim()) return toast.error("Nome é obrigatório");
    upsertMutation.mutate(editing);
  };

  const remove = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certificações</h1>
          <p className="text-muted-foreground mt-1">Credenciais e cursos.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditing(empty());
                setOpen(true);
              }}
              className="shadow-glow"
            >
              <Plus className="size-4" /> Nova certificação
            </Button>
          </DialogTrigger>
          {editing && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editing.name ? `Editar: ${editing.name}` : "Nova certificação"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="space-y-1.5">
                  <Label>Nome</Label>
                  <Input
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Instituição</Label>
                  <Input
                    value={editing.institution}
                    onChange={(e) => setEditing({ ...editing, institution: e.target.value })}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Data (YYYY-MM)</Label>
                    <Input
                      placeholder="2024-08"
                      value={editing.issueDate}
                      onChange={(e) => setEditing({ ...editing, issueDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Link da credencial</Label>
                    <Input
                      value={editing.credentialUrl}
                      onChange={(e) => setEditing({ ...editing, credentialUrl: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={save}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.length === 0 && (
          <Card className="p-10 text-center text-sm text-muted-foreground col-span-full">
            Nenhuma certificação cadastrada.
          </Card>
        )}
        {certifications.map((c) => (
          <Card key={c.id} className="p-5 group hover:shadow-elegant transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="size-10 rounded-lg bg-(image:--gradient-brand) text-brand-foreground grid place-items-center">
                <Award className="size-5" />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="ghost" onClick={() => { setEditing({ ...c }); setOpen(true); }}>
                  <Pencil className="size-3.5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(c.id)}>
                  <Trash2 className="size-3.5" />
                </Button>
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
        ))}
      </div>
    </div>
  );
}
