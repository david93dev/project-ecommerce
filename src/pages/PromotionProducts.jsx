import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Trash2, ArrowLeft } from "lucide-react"

export default function PromotionProducts() {
  const produto = {
    nome: "Camiseta Tech",
    preco: 79.9,
    img: "https://picsum.photos/seed/tee/80",
  }

  // form controls
  const [tipo, setTipo] = useState("percent")
  const [valor, setValor] = useState("")
  const [inicio, setInicio] = useState("")
  const [fim, setFim] = useState("")
  const [promos, setPromos] = useState([
    {
      tipo: "percent",
      valor: 20,
      inicio: "2025-11-01",
      fim: "2025-11-30",
    },
  ])

  // preview price
  const novoPreco = useMemo(() => {
    if (!valor) return produto.preco
    if (tipo === "percent") return produto.preco * (1 - valor / 100)
    if (tipo === "value") return Math.max(0, produto.preco - valor)
  }, [valor, tipo])

  function aplicar() {
    if (!valor || !inicio || !fim) return
    setPromos((prev) => [{ tipo, valor: Number(valor), inicio, fim }, ...prev])
  }

  function remover(idx) {
    setPromos((prev) => prev.filter((_, i) => i !== idx))
  }

  function statusPromo(p) {
    const hoje = new Date()
    const fimPromo = new Date(p.fim)
    return fimPromo >= hoje ? "ativa" : "expirada"
  }

  return (
    <div className="space-y-6 mt-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mx-4 gap-4">
       

        <div className="flex items-center gap-3">
          <img
            src={produto.img}
            className="rounded-xl h-14 w-14 object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{produto.nome}</h2>
            <p className="text-sm text-muted-foreground">
              Preço atual: R$ {produto.preco.toFixed(2)}
            </p>
          </div>
        </div>
         <Button variant="secondary">
          Voltar
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Aplicar */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Aplicar promoção</h3>
            <p className="text-sm text-muted-foreground">
              Defina desconto e período de validade
            </p>
          </CardHeader>
          <CardContent className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Tipo de desconto</Label>
                <select
                  className="border rounded-xl w-full px-3 py-2 text-sm"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="percent">Porcentagem (%)</option>
                  <option value="value">Valor fixo (R$)</option>
                </select>
              </div>

              <div>
                <Label>Valor</Label>
                <Input
                  type="number"
                  className="mt-1"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>

              <div>
                <Label>Início</Label>
                <Input
                  type="date"
                  className="mt-1"
                  value={inicio}
                  onChange={(e) => setInicio(e.target.value)}
                />
              </div>

              <div>
                <Label>Fim</Label>
                <Input
                  type="date"
                  className="mt-1"
                  value={fim}
                  onChange={(e) => setFim(e.target.value)}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted flex items-center justify-between">
              <p className="text-sm">
                Novo preço:{" "}
                <span className="font-semibold">
                  R$ {novoPreco.toFixed(2)}
                </span>
              </p>
              <Button onClick={aplicar}>Aplicar</Button>
            </div>
          </CardContent>
        </Card>

        {/* Listagem */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Promoções Ativas</h3>
            <p className="text-sm text-muted-foreground">
              Remova promoções expiradas ou vigentes
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            {promos.map((p, idx) => {
              const status = statusPromo(p)
              const precoResultante =
                p.tipo === "percent"
                  ? produto.preco * (1 - p.valor / 100)
                  : produto.preco - p.valor

              return (
                <div
                  key={idx}
                  className="border rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <Badge
                      variant={status === "ativa" ? "default" : "secondary"}
                      className={
                        status === "ativa" ? "bg-green-600" : "bg-gray-400"
                      }
                    >
                      {status === "ativa" ? "Ativa" : "Expirada"}
                    </Badge>
                    <p className="text-sm">
                      {p.tipo === "percent"
                        ? `${p.valor}%`
                        : `- R$ ${p.valor}`}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {p.inicio} → {p.fim}
                    </p>

                    <p className="text-sm font-semibold">
                      Novo preço: R$ {precoResultante.toFixed(2)}
                    </p>
                  </div>

                  <Button
                    variant="destructive"
                    onClick={() => remover(idx)}
                    className="flex gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remover
                  </Button>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
