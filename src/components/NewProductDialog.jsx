import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { productsData } from "@/data/productsData";

export function NewProductDialog({ onAdded }) {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
    status: "Ativo",
  });

  // 🔒 Evita duplicações
  const isSubmitting = useRef(false);

  const handleAddProduct = () => {
    if (isSubmitting.current) return; // impede múltiplos cliques
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast.error("Preencha os campos obrigatórios!");
      return;
    }

    isSubmitting.current = true; // trava o botão por segurança

    const id = productsData.length
      ? Math.max(...productsData.map((p) => p.id)) + 1
      : 1;

    const productToAdd = {
      ...newProduct,
      id,
      price: parseFloat(newProduct.price),
      hasPromotion: false,
      discount: "Sem promoção",
    };

    // 🔒 Verifica se já existe um item idêntico (por nome e preço)
    const exists = productsData.some(
      (p) => p.name === productToAdd.name && p.price === productToAdd.price
    );
    if (exists) {
      toast.warning("Esse produto já foi adicionado!");
      isSubmitting.current = false;
      return;
    }

    // ✅ Só adiciona uma vez no mock
    productsData.push(productToAdd);

    // ✅ Notifica o componente pai para recarregar
    if (onAdded) onAdded();

    toast.success("Produto adicionado com sucesso!");

    // Reset e fechar
    setNewProduct({
      name: "",
      description: "",
      category: "",
      price: "",
      image: "",
      status: "Ativo",
    });
    setOpen(false);
    isSubmitting.current = false; // libera novamente
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produto</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="text-sm font-medium">Nome *</label>
            <Input
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              placeholder="Ex: Camiseta Tech"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Descrição</label>
            <Input
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value,
                })
              }
              placeholder="Ex: Camiseta de algodão leve"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Categoria *</label>
            <Input
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  category: e.target.value,
                })
              }
              placeholder="Ex: Vestuário"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Preço *</label>
            <Input
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: e.target.value,
                })
              }
              placeholder="Ex: 79.90"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Imagem (URL)</label>
            <Input
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  image: e.target.value,
                })
              }
              placeholder="Cole aqui o link da imagem"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              className="border rounded-xl w-full px-3 py-2 text-sm"
              value={newProduct.status}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  status: e.target.value,
                })
              }
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleAddProduct}
            disabled={isSubmitting.current}
          >
            {isSubmitting.current ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
