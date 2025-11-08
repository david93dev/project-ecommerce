import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { productsData } from "@/data/productsData";
import { NewProductDialog } from "@/components/NewProductDialog";

export default function ManagerProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 🧩 Função central para carregar produtos do mock
  const loadProducts = () => {
    // Clona o array global para garantir renderização
    const loaded = [...productsData];
    setProducts(loaded);
  };

  // 🟢 Carrega uma vez ao montar o componente
  useEffect(() => {
    loadProducts();
  }, []);


  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 mt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Produtos</h2>
        {/* Passamos o callback para recarregar os produtos */}
        <NewProductDialog onAdded={loadProducts} />
      </div>

      {/* Barra de busca */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-64">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar produto..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
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
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan="5" className="text-center py-6">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          product.image ||
                          "https://via.placeholder.com/60?text=Produto"
                        }
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover border"
                      />
                      {product.name}
                    </div>
                  </TableCell>

                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={product.hasPromotion ? "success" : "secondary"}
                    >
                      {product.discount}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/produtos/${product.id}`)}
                    >
                      Ver Detalhes
                    </Button>
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
