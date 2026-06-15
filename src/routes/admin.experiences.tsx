import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import type { Experience } from "@/lib/admin-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getExperiences, upsertExperience, deleteExperience } from "@/lib/api/experiences.functions";

export const Route = createFileRoute("/admin/experiences")({
  component: ExperiencesAdmin,
});

const empty = (): Experience => ({
  id: crypto.randomUUID(),
  company: "",
  role: "",
  description: "",
  startDate: "",
  endDate: null,
  technologies: [],
});

function ExperiencesAdmin() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [current, setCurrent] = useState(false);
  const [techInput, setTechInput] = useState("");

  // Query
  const { data: experiences = [] } = useQuery({
    queryKey: ["experiences"],
    queryFn: () => getExperiences({ data: {} }),
  });

  // Mutations
  const upsertMutation = useMutation({
    mutationFn: (e: Experience) => upsertExperience({ data: e }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success(experiences.some(x => x.id === editing?.id) ? "Experiência atualizada" : "Experiência criada");
      setOpen(false);
    },
    onError: () => toast.error("Erro ao salvar experiência"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteExperience({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Experiência removida");
    },
    onError: () => toast.error("Erro ao remover experiência"),
  });

  const startCreate = () => {
    setEditing(empty());
    setCurrent(true);
    setTechInput("");
    setOpen(true);
  };
  const startEdit = (e: Experience) => {
    setEditing({ ...e });
    setCurrent(e.endDate === null);
    setTechInput(e.technologies.join(", "));
    setOpen(true);
  };

  const save = () => {
    if (!editing) return;
    if (!editing.company.trim() || !editing.role.trim())
      return toast.error("Empresa e cargo são obrigatórios");
    const final = { ...editing, endDate: current ? null : editing.endDate };
    upsertMutation.mutate(final);
  };

  const remove = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Experiência</h1>
          <p className="text-muted-foreground mt-1">Timeline profissional.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={startCreate} className="shadow-glow">
              <Plus className="size-4" /> Nova experiência
            </Button>
          </DialogTrigger>
          {editing && (
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editing.company ? `Editar: ${editing.company}` : "Nova experiência"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Empresa</Label>
                    <Input
                      value={editing.company}
                      onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Cargo</Label>
                    <Input
                      value={editing.role}
                      onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Início (YYYY-MM)</Label>
                    <Input
                      placeholder="2024-01"
                      value={editing.startDate}
                      onChange={(e) => setEditing({ ...editing, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Fim (YYYY-MM)</Label>
                    <Input
                      placeholder="2025-06"
                      disabled={current}
                      value={editing.endDate ?? ""}
                      onChange={(e) => setEditing({ ...editing, endDate: e.target.value || null })}
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <Switch checked={current} onCheckedChange={setCurrent} />
                  Cargo atual
                </label>
                <div className="space-y-1.5">
                  <Label>Descrição</Label>
                  <Textarea
                    rows={4}
                    value={editing.description}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Tecnologias (separadas por vírgula)</Label>
                  <Input
                    value={techInput}
                    onChange={(e) => {
                      const newInput = e.target.value;
                      setTechInput(newInput);
                      setEditing({
                        ...editing,
                        technologies: newInput
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      });
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={save}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>

      <div className="space-y-3">
        {experiences.length === 0 && (
          <Card className="p-10 text-center text-sm text-muted-foreground">
            Nenhuma experiência cadastrada.
          </Card>
        )}
        {experiences.map((x) => (
          <Card key={x.id} className="p-5">
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-lg bg-(image:--gradient-brand) text-brand-foreground grid place-items-center shrink-0">
                <Briefcase className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold">{x.role}</h3>
                  <span className="text-xs font-mono text-muted-foreground">
                    {x.startDate} — {x.endDate ?? "Atual"}
                  </span>
                </div>
                <div className="text-sm text-brand">{x.company}</div>
                <p className="text-sm text-muted-foreground mt-2">{x.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {x.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-xs rounded bg-secondary">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => startEdit(x)}>
                  <Pencil className="size-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => remove(x.id)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
