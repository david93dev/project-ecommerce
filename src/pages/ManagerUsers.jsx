import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewUserDialog } from "@/components/NewUserDialog"; // ✅ Modal reutilizável
import { usersData as defaultUsersData } from "@/data/usersData"; // Dados base (mock inicial)

// =======================================================================
// 🧩 Componente principal
// =======================================================================
export default function ManagerUsers() {
  const [users, setUsers] = useState([]);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  // ✅ Carrega dados do localStorage ou do mock
  useEffect(() => {
    const stored = localStorage.getItem("usersData");
    if (stored) {
      setUsers(JSON.parse(stored));
    } else {
      setUsers(defaultUsersData);
      localStorage.setItem("usersData", JSON.stringify(defaultUsersData));
    }
  }, []);

  // ✅ Função auxiliar para recarregar usuários (usada pelo modal)
  const reloadUsers = () => {
    const stored = localStorage.getItem("usersData");
    if (stored) setUsers(JSON.parse(stored));
  };

  // ✅ Função de filtro
  const filtrados = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(busca.toLowerCase()) ||
        u.email.toLowerCase().includes(busca.toLowerCase())
    );
  }, [busca, users]);

  // ✅ Excluir usuário
  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir este usuário?")) {
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      localStorage.setItem("usersData", JSON.stringify(updated));
    }
  };

  // ✅ Cor dos status
  function corStatus(st) {
    if (st === "ativo") return "bg-green-100 text-green-700";
    if (st === "pendente") return "bg-yellow-100 text-yellow-700";
    if (st === "bloqueado") return "bg-red-100 text-red-700";
  }

  // =======================================================================
  // 🧭 Renderização
  // =======================================================================
  return (
    <div className="space-y-6 mt-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">
          Gerenciamento de Usuários
        </h2>

        {/* ✅ Modal para adicionar usuário */}
        <NewUserDialog onAdded={reloadUsers} />
      </div>

      {/* Filtro de busca */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou email..."
            className="pl-8"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      {/* Tabela de usuários */}
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último login</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtrados.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-sm text-muted-foreground py-4"
                >
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtrados.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt="avatar"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </TableCell>

                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${corStatus(
                        u.status
                      )}`}
                    >
                      {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                    </span>
                  </TableCell>

                  <TableCell>{u.ultimoLogin}</TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none">
                        <MoreHorizontal className="cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* Editar Perfil */}
                        <DropdownMenuItem
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => navigate(`/perfil/${u.id}`)}
                        >
                          <Pencil className="h-4 w-4" /> Editar Perfil
                        </DropdownMenuItem>

                        {/* Excluir */}
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-red-600 cursor-pointer"
                          onClick={() => handleDelete(u.id)}
                        >
                          <Trash2 className="h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
