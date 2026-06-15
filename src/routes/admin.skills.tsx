import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Skill } from "@/lib/admin-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSkills, upsertSkill, deleteSkill } from "@/lib/api/skills.functions";

export const Route = createFileRoute("/admin/skills")({
  component: SkillsAdmin,
});

const empty = (): Skill => ({
  id: crypto.randomUUID(),
  name: "",
  category: "frontend",
  level: 80,
  icon: "✨",
});

const categoryLabel = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Banco de Dados",
  devops: "DevOps & Cloud",
};

function SkillsAdmin() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);

  // Query
  const { data: skills = [] } = useQuery({
    queryKey: ["skills"],
    queryFn: () => getSkills({ data: {} }),
  });

  // Mutations
  const upsertMutation = useMutation({
    mutationFn: (s: Skill) => upsertSkill({ data: s }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success(skills.some(s => s.id === editing?.id) ? "Skill atualizada" : "Skill criada");
      setOpen(false);
    },
    onError: () => toast.error("Erro ao salvar skill"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSkill({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill removida");
    },
    onError: () => toast.error("Erro ao remover skill"),
  });

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim()) return toast.error("Nome é obrigatório");
    upsertMutation.mutate(editing);
  };

  const remove = (id: string) => {
    deleteMutation.mutate(id);
  };

  const groups = (Object.keys(categoryLabel) as Skill["category"][]).map((cat) => ({
    cat,
    items: skills.filter((s) => s.category === cat),
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
          <p className="text-muted-foreground mt-1">Tecnologias exibidas no portfolio.</p>
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
              <Plus className="size-4" /> Nova skill
            </Button>
          </DialogTrigger>
          {editing && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editing.name ? `Editar: ${editing.name}` : "Nova skill"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid grid-cols-[1fr_80px] gap-3">
                  <div className="space-y-1.5">
                    <Label>Nome</Label>
                    <Input
                      value={editing.name}
                      onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Ícone</Label>
                    <Input
                      value={editing.icon}
                      onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Categoria</Label>
                  <Select
                    value={editing.category}
                    onValueChange={(v) =>
                      setEditing({ ...editing, category: v as Skill["category"] })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(categoryLabel) as Skill["category"][]).map((c) => (
                        <SelectItem key={c} value={c}>
                          {categoryLabel[c]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Nível: {editing.level}%</Label>
                  <Input
                    type="range"
                    min={0}
                    max={100}
                    value={editing.level}
                    onChange={(e) => setEditing({ ...editing, level: Number(e.target.value) })}
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

      <div className="grid md:grid-cols-2 gap-4">
        {groups.map((g) => (
          <Card key={g.cat} className="p-5">
            <h3 className="font-semibold mb-3">{categoryLabel[g.cat]}</h3>
            <div className="space-y-2">
              {g.items.length === 0 && (
                <div className="text-xs text-muted-foreground py-2">Nenhuma skill aqui.</div>
              )}
              {g.items.map((s) => (
                <div key={s.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent group">
                  <div className="size-8 grid place-items-center rounded bg-secondary text-sm">
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="h-1.5 mt-1 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-(image:--gradient-brand)"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground w-10 text-right">{s.level}%</div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditing({ ...s });
                        setOpen(true);
                      }}
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => remove(s.id)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
