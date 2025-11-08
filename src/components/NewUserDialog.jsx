import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";

export function NewUserDialog({ onAdded }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "USER",
    password: "",
  });

  // ✅ Cria e salva o novo usuário
  const handleSave = () => {
    if (!form.name || !form.email || !form.password) {
      alert("⚠️ Preencha todos os campos obrigatórios!");
      return;
    }

    // Busca lista existente
    const stored = localStorage.getItem("usersData");
    const users = stored ? JSON.parse(stored) : [];

    // Gera novo usuário
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      username: form.email.split("@")[0],
      password: form.password,
      role: form.role,
      name: form.name,
      email: form.email,
      status: "ativo",
      ultimoLogin: new Date().toLocaleString("pt-BR"),
      avatar: `https://i.pravatar.cc/80?u=${form.email}`,
    };

    // Adiciona e salva
    const updated = [...users, newUser];
    localStorage.setItem("usersData", JSON.stringify(updated));

    // Reseta e fecha
    setForm({ name: "", email: "", role: "USER", password: "" });
    setOpen(false);

    // Notifica componente pai (ManagerUsers)
    if (onAdded) onAdded();

    alert("✅ Usuário criado com sucesso!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Novo Usuário
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Usuário</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label>Nome</Label>
            <Input
              placeholder="Nome completo"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="email@empresa.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <Label>Senha</Label>
            <Input
              type="password"
              placeholder="Defina uma senha"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div>
            <Label>Cargo</Label>
            <select
              className="w-full border rounded-md p-2 text-sm"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="USER">Usuário</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
