import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, XCircle, CheckCircle2, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function Users() {
  const [tab, setTab] = useState("dados")
  const [bloqueado, setBloqueado] = useState(false)

  const usuario = {
    nome: "Ana Souza",
    email: "ana@empresa.com",
    telefone: "(11) 99888-1234",
    avatar: "https://i.pravatar.cc/100?img=1",
    permissoes: ["dashboard", "usuarios"],
  }

  const permissoes = [
    { key: "dashboard", label: "Acesso ao Dashboard" },
    { key: "produtos", label: "Gerenciar Produtos" },
    { key: "usuarios", label: "Gerenciar Usuários" },
    { key: "financeiro", label: "Visualizar Financeiro" },
  ]

  const sessoes = [
    { ip: "189.54.22.10", navegador: "Chrome", dispositivo: "Windows", ultima: "2025-11-04 20:14" },
    { ip: "187.22.11.51", navegador: "Safari", dispositivo: "iPhone", ultima: "2025-10-29 09:30" },
  ]

  const logs = [
    "Login realizado com sucesso (2025-11-03 18:20)",
    "Alterou senha (2025-11-02 14:40)",
    "Tentativa de acesso negada (2025-10-30 22:15)",
  ]

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={usuario.avatar} />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{usuario.nome}</h2>
          <p className="text-sm text-muted-foreground">{usuario.email}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento do Usuário</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-4 flex flex-wrap justify-start">
              <TabsTrigger value="dados">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="permissoes">Permissões</TabsTrigger>
              <TabsTrigger value="sessoes">Sessões Ativas</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>

            {/* TAB: Dados pessoais */}
            <TabsContent value="dados" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Nome</Label>
                  <Input defaultValue={usuario.nome} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input defaultValue={usuario.email} />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input defaultValue={usuario.telefone} />
                </div>
              </div>
              <Button className="mt-2">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Salvar alterações
              </Button>
            </TabsContent>

            {/* TAB: Permissões */}
            <TabsContent value="permissoes" className="space-y-3">
              {permissoes.map((p) => (
                <div
                  key={p.key}
                  className="flex items-center justify-between rounded-lg border px-4 py-3"
                >
                  <span className="text-sm">{p.label}</span>
                  <Checkbox
                    defaultChecked={usuario.permissoes.includes(p.key)}
                  />
                </div>
              ))}
              <Button className="mt-3">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Salvar permissões
              </Button>
            </TabsContent>

            {/* TAB: Sessões ativas */}
            <TabsContent value="sessoes" className="space-y-3">
              {sessoes.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {s.navegador} · {s.dispositivo}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      IP: {s.ip} · Último acesso: {s.ultima}
                    </p>
                  </div>
                  <Button variant="secondary" className="mt-2 sm:mt-0">
                    <XCircle className="h-4 w-4 mr-2" />
                    Encerrar sessão
                  </Button>
                </div>
              ))}
            </TabsContent>

            {/* TAB: Logs */}
            <TabsContent value="logs" className="space-y-2">
              {logs.map((l, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="h-2 w-2 rounded-full bg-gray-400" />
                  {l}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>

        {/* ZONA DE PERIGO */}
        <CardFooter className="border-t mt-4 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span>Zona de perigo — ações permanentes</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={bloqueado ? "secondary" : "destructive"}
              onClick={() => setBloqueado((b) => !b)}
            >
              {bloqueado ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Desbloquear
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Bloquear Usuário
                </>
              )}
            </Button>

            {/* Excluir com confirmação */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir Usuário
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Excluir Usuário</DialogTitle>
                  <DialogDescription>
                    Essa ação é irreversível. Deseja realmente excluir o
                    usuário <b>{usuario.nome}</b>?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="secondary">Cancelar</Button>
                  <Button variant="destructive">Confirmar Exclusão</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
