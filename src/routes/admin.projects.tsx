import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, StarOff, ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import type { Project } from "@/lib/admin-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, upsertProject, deleteProject, toggleProjectFlag } from "@/lib/api/projects.functions";

export const Route = createFileRoute("/admin/projects")({
  component: ProjectsAdmin,
});

const empty = (): Project => ({
  id: crypto.randomUUID(),
  title: "",
  slug: "",
  shortDescription: "",
  content: "",
  coverImage: "",
  technologies: [],
  category: "",
  githubUrl: "",
  liveUrl: "",
  featured: false,
  published: false,
  createdAt: new Date().toISOString(),
});

function ProjectsAdmin() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [filter, setFilter] = useState("");
  const [techInput, setTechInput] = useState("");

  // Query
  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects({ data: { publishedOnly: false } }),
  });

  // Mutations
  const upsertMutation = useMutation({
    mutationFn: (p: Project) => upsertProject({ data: p }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(projects.some(p => p.id === editing?.id) ? "Projeto atualizado" : "Projeto criado");
      setOpen(false);
    },
    onError: () => toast.error("Erro ao salvar projeto"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProject({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Projeto removido");
    },
    onError: () => toast.error("Erro ao remover projeto"),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, key, value }: { id: string; key: "featured" | "published"; value: boolean }) =>
      toggleProjectFlag({ data: { id, key, value } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => toast.error("Erro ao atualizar projeto"),
  });

  const startCreate = () => {
    setEditing(empty());
    setTechInput("");
    setOpen(true);
  };
  const startEdit = (p: Project) => {
    setEditing({ ...p });
    setTechInput(p.technologies.join(", "));
    setOpen(true);
  };

  const save = () => {
    if (!editing) return;
    if (!editing.title.trim()) return toast.error("Título é obrigatório");
    upsertMutation.mutate(editing);
  };

  const remove = (id: string) => {
    deleteMutation.mutate(id);
  };

  const toggle = (id: string, key: "featured" | "published") => {
    const project = projects.find(p => p.id === id);
    if (project) {
      toggleMutation.mutate({ id, key, value: !project[key] });
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.category.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os projetos exibidos no portfolio.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={startCreate} className="shadow-glow">
              <Plus className="size-4" /> Novo projeto
            </Button>
          </DialogTrigger>
          <ProjectDialog 
            editing={editing} 
            setEditing={setEditing} 
            onSave={save} 
            techInput={techInput} 
            setTechInput={setTechInput} 
          />
        </Dialog>
      </div>

      <Input
        placeholder="Buscar por título ou categoria..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card className="overflow-hidden hover:shadow-elegant transition-shadow group p-0">
              <div className="aspect-[16/9] bg-secondary overflow-hidden">
                {p.coverImage ? (
                  <img src={p.coverImage} alt="" className="size-full object-cover" />
                ) : (
                  <div className="size-full grid place-items-center text-muted-foreground text-xs">
                    Sem capa
                  </div>
                )}
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-brand">{p.category || "—"}</div>
                    <h3 className="font-semibold truncate">{p.title}</h3>
                  </div>
                  <div className="flex gap-1">
                    {p.featured && (
                      <span className="size-2 rounded-full bg-amber-500" title="Destaque" />
                    )}
                    <span
                      className={`size-2 rounded-full ${
                        p.published ? "bg-emerald-500" : "bg-muted-foreground/40"
                      }`}
                      title={p.published ? "Publicado" : "Rascunho"}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.shortDescription}</p>
                <div className="flex flex-wrap gap-1">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="px-1.5 py-0.5 text-[10px] rounded bg-secondary">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 pt-2 border-t">
                  <Button size="sm" variant="ghost" onClick={() => startEdit(p)}>
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggle(p.id, "published")}
                    title={p.published ? "Despublicar" : "Publicar"}
                  >
                    {p.published ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggle(p.id, "featured")}
                    title={p.featured ? "Remover destaque" : "Destacar"}
                  >
                    {p.featured ? <StarOff className="size-3.5" /> : <Star className="size-3.5" />}
                  </Button>
                  <div className="flex-1" />
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="size-8 grid place-items-center rounded-md hover:bg-accent">
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noreferrer" className="size-8 grid place-items-center rounded-md hover:bg-accent">
                      <Github className="size-3.5" />
                    </a>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                        <Trash2 className="size-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remover projeto?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita. "{p.title}" será removido permanentemente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => remove(p.id)}>Remover</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <Card className="p-10 text-center text-sm text-muted-foreground col-span-full">
            Nenhum projeto encontrado.
          </Card>
        )}
      </div>
    </div>
  );
}

function ProjectDialog({
  editing,
  setEditing,
  onSave,
  techInput,
  setTechInput,
}: {
  editing: Project | null;
  setEditing: (p: Project | null) => void;
  onSave: () => void;
  techInput: string;
  setTechInput: (s: string) => void;
}) {
  if (!editing) return null;
  const update = <K extends keyof Project>(k: K, v: Project[K]) =>
    setEditing({ ...editing, [k]: v });

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{editing.title ? `Editar: ${editing.title}` : "Novo projeto"}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-2">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Título</Label>
            <Input value={editing.title} onChange={(e) => update("title", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Slug</Label>
            <Input value={editing.slug} onChange={(e) => update("slug", e.target.value)} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Descrição curta</Label>
          <Input
            value={editing.shortDescription}
            onChange={(e) => update("shortDescription", e.target.value)}
            maxLength={160}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Descrição completa</Label>
          <Textarea
            rows={4}
            value={editing.content}
            onChange={(e) => update("content", e.target.value)}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Categoria</Label>
                    <Input value={editing.category} onChange={(e) => update("category", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Tecnologias (separadas por vírgula)</Label>
                    <Input
                      value={techInput}
                      onChange={(e) => {
                        const newInput = e.target.value;
                        setTechInput(newInput);
                        update(
                          "technologies",
                          newInput.split(",").map((s) => s.trim()).filter(Boolean),
                        );
                      }}
                    />
                  </div>
                </div>
        <div className="space-y-1.5">
          <Label>URL da capa</Label>
          <Input
            value={editing.coverImage}
            onChange={(e) => update("coverImage", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>GitHub URL</Label>
            <Input value={editing.githubUrl} onChange={(e) => update("githubUrl", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Demo URL</Label>
            <Input value={editing.liveUrl} onChange={(e) => update("liveUrl", e.target.value)} />
          </div>
        </div>
        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm">
            <Switch checked={editing.featured} onCheckedChange={(v) => update("featured", v)} />
            Destaque
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Switch checked={editing.published} onCheckedChange={(v) => update("published", v)} />
            Publicado
          </label>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={onSave}>Salvar</Button>
      </DialogFooter>
    </DialogContent>
  );
}
