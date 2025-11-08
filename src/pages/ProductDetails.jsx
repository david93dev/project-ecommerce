import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { productsData } from "@/data/productsData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [tipo, setTipo] = useState("percent");
  const [valor, setValor] = useState("");

  useEffect(() => {
    const found = productsData.find((p) => p.id === Number(id));
    if (found) setProduct({ ...found });
  }, [id]);

  // 🧠 Atualiza promoção automaticamente conforme valor
  useEffect(() => {
    if (!product) return;
    const numericValue = parseFloat(valor);
    const hasPromo = numericValue > 0;

    setProduct((prev) => ({
      ...prev,
      hasPromotion: hasPromo,
      discount: hasPromo
        ? tipo === "percent"
          ? `${numericValue}% OFF`
          : `- R$ ${numericValue}`
        : "Sem promoção",
    }));
  }, [valor, tipo]);

  // 🟢 Salvar alterações gerais + promoção
  const handleSave = () => {
    if (!product) return;

    const index = productsData.findIndex((p) => p.id === product.id);
    if (index === -1) return;

    productsData[index] = { ...product };

    toast.success("Produto atualizado com sucesso!");
    navigate("/home");
  };

  // 🔴 Excluir produto
  const handleDelete = () => {
    const index = productsData.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      productsData.splice(index, 1);
      toast.error("Produto excluído com sucesso!");
      navigate("/home");
    }
  };

  if (!product) return <p>Carregando...</p>;

  return (
    <div className="space-y-6 mt-8 mx-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            className="rounded-xl h-14 w-14 object-cover border"
          />
          <div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-muted-foreground">
              {product.category} • R$ {product.price.toFixed(2)}
            </p>
          </div>
        </div>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </div>

      {/* Informações do produto */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Informações do Produto</h3>
          <p className="text-sm text-muted-foreground">
            Edite as informações, status e promoção do produto
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Nome */}
          <div>
            <Label>Nome</Label>
            <Input
              value={product.name}
              onChange={(e) =>
                setProduct((p) => ({ ...p, name: e.target.value }))
              }
            />
          </div>

          {/* Descrição */}
          <div>
            <Label>Descrição</Label>
            <Input
              value={product.description}
              onChange={(e) =>
                setProduct((p) => ({ ...p, description: e.target.value }))
              }
            />
          </div>

          {/* Categoria */}
          <div>
            <Label>Categoria</Label>
            <Input
              value={product.category}
              onChange={(e) =>
                setProduct((p) => ({ ...p, category: e.target.value }))
              }
            />
          </div>

          {/* Preço */}
          <div>
            <Label>Preço</Label>
            <Input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct((p) => ({
                  ...p,
                  price: parseFloat(e.target.value),
                }))
              }
            />
          </div>

          {/* URL da imagem */}
          <div>
            <Label>Imagem (URL)</Label>
            <Input
              value={product.image}
              onChange={(e) =>
                setProduct((p) => ({ ...p, image: e.target.value }))
              }
              placeholder="Cole aqui a URL da imagem do produto"
            />
          </div>

          {/* Promoção */}
          <div className="border-t pt-4 space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground">
              Promoção
            </h4>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Label>Tipo de Desconto</Label>
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
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  placeholder="Ex: 20 ou 50"
                />
              </div>
            </div>

            <p className="text-sm">
              Status da promoção:{" "}
              <strong
                className={
                  product.hasPromotion ? "text-green-600" : "text-gray-400"
                }
              >
                {product.hasPromotion ? "Ativa" : "Inativa"}
              </strong>
            </p>
          </div>

          {/* Botões de ação */}
          <div className="pt-6 flex justify-end gap-4">
            <Button variant="destructive" onClick={handleDelete}>
              Excluir Produto
            </Button>
            <Button onClick={handleSave}>Salvar Alterações</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
