import { useState, useMemo } from "react"
import { Search, MoreHorizontal, Eye, Pencil, Ban, Trash2 } from "lucide-react"
import {
  Input
} from "@/components/ui/input"
import {
  Button
} from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

export default function ManagerUsers() {
  const [busca, setBusca] = useState("")
  const [cargo, setCargo] = useState("all")
  const [status, setStatus] = useState("all")

  const usuarios = [
    {
      id: 1,
      nome: "Ana Souza",
      email: "ana@empresa.com",
      cargo: "Admin",
      status: "ativo",
      ultimoLogin: "2025-11-04 10:22",
      avatar: "https://i.pravatar.cc/80?img=1"
    },
    {
      id: 2,
      nome: "Bruno Lima",
      email: "bruno@empresa.com",
      cargo: "Operador",
      status: "bloqueado",
      ultimoLogin: "2025-11-03 14:18",
      avatar: "https://i.pravatar.cc/80?img=2"
    },
    {
      id: 3,
      nome: "Catarina Alves",
      email: "cat@empresa.com",
      cargo: "Cliente",
      status: "pendente",
      ultimoLogin: "2025-11-02 08:41",
      avatar: "https://i.pravatar.cc/80?img=3"
    },
    {
      id: 4,
      nome: "Diego Santos",
      email: "diego@empresa.com",
      cargo: "Operador",
      status: "ativo",
      ultimoLogin: "2025-11-05 09:10",
      avatar: "https://i.pravatar.cc/80?img=4"
    }
  ]

  const filtrados = useMemo(() => {
    return usuarios.filter(u => 
      (cargo === "all" || u.cargo === cargo) &&
      (status === "all" || u.status === status) &&
      (u.nome.toLowerCase().includes(busca.toLowerCase()) || u.email.toLowerCase().includes(busca.toLowerCase()))
    )
  }, [busca, cargo, status])

  function corStatus(st) {
    if (st === "ativo") return "bg-green-100 text-green-700"
    if (st === "pendente") return "bg-yellow-100 text-yellow-700"
    if (st === "bloqueado") return "bg-red-100 text-red-700"
  }

  return (
    <div className="space-y-6 mt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Usuários</h2>
        <Button className="rounded-xl">Novo Usuário</Button>
      </div>

      {/* Filtros */}
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

        <select
          className="rounded-xl border border-input bg-background px-3 py-2 text-sm"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
        >
          <option value="all">Todos cargos</option>
          <option value="Admin">Admin</option>
          <option value="Operador">Operador</option>
          <option value="Cliente">Cliente</option>
        </select>

        <select
          className="rounded-xl border border-input bg-background px-3 py-2 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">Todos status</option>
          <option value="ativo">Ativo</option>
          <option value="pendente">Pendente</option>
          <option value="bloqueado">Bloqueado</option>
        </select>
      </div>

      {/* Tabela */}
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
            {filtrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-4">
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            )}

            {filtrados.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={u.avatar}
                      alt="avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="font-medium">{u.nome}</span>
                  </div>
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.cargo}</TableCell>
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
                    <DropdownMenuContent>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Eye className="h-4 w-4" /> Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Pencil className="h-4 w-4" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Ban className="h-4 w-4 text-yellow-600" /> Bloquear
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                        <Trash2 className="h-4 w-4" /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
