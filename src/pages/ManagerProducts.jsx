import {
  Input,
} from "@/components/ui/input"
import {
  Button
} from "@/components/ui/button"
import {
  Badge
} from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { Search, Plus, MoreHorizontal } from "lucide-react"

export default function ManagerProducts() {
  return (
    <div className="space-y-6 mt-8">
      
      {/* Header + Novo Produto */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Produtos</h2>
        <Button className="rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* Barra de busca */}
        <div className="w-64">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar produto..." className="pl-8" />
          </div>
        </div>

        {/* Categoria */}
        <select className="rounded-xl border border-input bg-background px-3 py-2 text-sm">
          <option value="all">Todas categorias</option>
          <option value="vestuario">Vestuário</option>
          <option value="eletronicos">Eletrônicos</option>
          <option value="casa">Casa</option>
        </select>

        {/* Status */}
        <select className="rounded-xl border border-input bg-background px-3 py-2 text-sm">
          <option value="all">Todos status</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>

        {/* Promoção */}
        <select className="rounded-xl border border-input bg-background px-3 py-2 text-sm">
          <option value="all">Promoções</option>
          <option value="com">Em promoção</option>
          <option value="sem">Sem promoção</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Promoção</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {/* Linha 1 - exemplo */}
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src="https://berzerk.com.br/cdn/shop/files/techpreta_1000x.jpg?v=1754530290"
                    alt="imagem"
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  Camiseta Tech
                </div>
              </TableCell>

              <TableCell>Vestuário</TableCell>
              <TableCell>R$ 79,90</TableCell>

              <TableCell>
                <Badge variant="success">20% OFF</Badge>
              </TableCell>

              <TableCell>
                <Badge variant="success">Ativo</Badge>
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <MoreHorizontal className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Promoções</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>

            {/* Linha 2 - exemplo */}
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src="https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-2-lightspeed/gallery/gallery-1-pro-x-2-lightspeed-gaming-headset-black.png?v=1"
                    alt="imagem"
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  Fone Pro X
                </div>
              </TableCell>

              <TableCell>Eletrônicos</TableCell>
              <TableCell>R$ 499,00</TableCell>
              <TableCell>
                <Badge variant="secondary">Sem promoção</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="success">Ativo</Badge>
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <MoreHorizontal className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Promoções</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </div>
    </div>
  )
}
