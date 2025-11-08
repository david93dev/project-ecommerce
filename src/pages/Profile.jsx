import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Save, LogOut } from "lucide-react";

export default function Users() {
  const { id } = useParams(); // 👈 pega o ID da URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  // ✅ busca o usuário correspondente ao ID
  useEffect(() => {
    const stored = localStorage.getItem("usersData");
    if (!stored) {
      alert("Nenhum dado encontrado.");
      navigate("/gestao-usuarios");
      return;
    }

    const usersList = JSON.parse(stored);
    const found = usersList.find((u) => String(u.id) === String(id));

    if (!found) {
      alert("Usuário não encontrado.");
      navigate("/gestao-usuarios");
      return;
    }

    setUser(found);
    setEditedUser(found);
  }, [id, navigate]);

  // ✅ Atualiza campos
  const handleChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Salva alterações no localStorage
  const handleSave = () => {
    const stored = JSON.parse(localStorage.getItem("usersData")) || [];
    const updated = stored.map((u) => (u.id === editedUser.id ? editedUser : u));
    localStorage.setItem("usersData", JSON.stringify(updated));
    setUser(editedUser);
    alert("✅ Alterações salvas com sucesso!");
  };

  // ✅ Voltar
  const handleLogout = () => {
    navigate("/gestao-usuarios");
  };

  if (!user || !editedUser) return null;

  return (
    <div className="space-y-6 mt-10 max-w-3xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <Avatar className="h-24 w-24">
          <AvatarImage src={editedUser.avatar} />
          <AvatarFallback>
            {editedUser.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-2xl font-bold">{editedUser.name}</h2>
          <p className="text-sm text-muted-foreground">{editedUser.email}</p>
          <Badge
            variant={editedUser.status === "ativo" ? "default" : "secondary"}
            className="mt-1 capitalize"
          >
            {editedUser.status}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Dados do Usuário</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nome */}
          <div>
            <Label>Nome</Label>
            <Input
              value={editedUser.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              value={editedUser.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* Cargo */}
          <div>
            <Label>Cargo</Label>
            <Input
              value={editedUser.role}
              onChange={(e) => handleChange("role", e.target.value)}
            />
          </div>

          {/* Status */}
          <div>
            <Label>Status</Label>
            <select
              className="border rounded-md px-3 py-2 text-sm w-full"
              value={editedUser.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="ativo">Ativo</option>
              <option value="pendente">Pendente</option>
              <option value="bloqueado">Bloqueado</option>
            </select>
          </div>

          {/* Senha */}
          <div className="sm:col-span-2">
            <Label>Senha</Label>
            <Input
              type="password"
              placeholder="Digite uma nova senha"
              value={editedUser.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>

          {/* Último Login */}
          <div className="sm:col-span-2">
            <Label>Último Login</Label>
            <Input value={editedUser.ultimoLogin || "—"} readOnly />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3">
          <Button variant="secondary" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" /> Salvar Alterações
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Voltar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
