import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowLeft, Save, Upload } from "lucide-react";
export function ProductForm() {
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const isEdit = Boolean(id);
  const [formData, setFormData] = useState({
    name: "",
    team: "",
    league: "",
    category: "",
    type: "",
    price: "",
    costPrice: "",
    promoPrice: "",
    description: "",
    status: "active"
  });
  const [variations, setVariations] = useState([{
    size: "P",
    stock: 0
  }, {
    size: "M",
    stock: 0
  }, {
    size: "G",
    stock: 0
  }, {
    size: "GG",
    stock: 0
  }]);
  const handleSubmit = e => {
    e.preventDefault();
    // Save logic here
    navigate("/admin/products");
  };
  return <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => navigate("/admin/products")}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          {isEdit ? "Editar Produto" : "Novo Produto"}
        </h2>
        <p className="text-gray-500 mt-1">
          Preencha os dados do produto abaixo
        </p>
      </div>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nome do Produto
                </label>
                <Input placeholder="Ex: Camisa Flamengo Home 2024" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <Select value={formData.team} onValueChange={value => setFormData({
                    ...formData,
                    team: value
                  })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flamengo">Flamengo</SelectItem>
                      <SelectItem value="palmeiras">Palmeiras</SelectItem>
                      <SelectItem value="barcelona">Barcelona</SelectItem>
                      <SelectItem value="real-madrid">Real Madrid</SelectItem>
                      <SelectItem value="brasil">Brasil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Liga</label>
                  <Select value={formData.league} onValueChange={value => setFormData({
                    ...formData,
                    league: value
                  })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a liga" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brasileirao">Brasileirão</SelectItem>
                      <SelectItem value="laliga">La Liga</SelectItem>
                      <SelectItem value="premier">Premier League</SelectItem>
                      <SelectItem value="selecoes">Seleções</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Categoria
                  </label>
                  <Select value={formData.category} onValueChange={value => setFormData({
                    ...formData,
                    category: value
                  })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="away">Away</SelectItem>
                      <SelectItem value="third">Third Kit</SelectItem>
                      <SelectItem value="retro">Retrô</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tipo</label>
                  <Select value={formData.type} onValueChange={value => setFormData({
                    ...formData,
                    type: value
                  })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match">Jogo</SelectItem>
                      <SelectItem value="training">Treino</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Descrição
                </label>
                <Textarea placeholder="Descreva o produto..." rows={4} value={formData.description} onChange={e => setFormData({
                  ...formData,
                  description: e.target.value
                })} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preços</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Custo (R$)
                  </label>
                  <Input type="number" step="0.01" placeholder="0.00" value={formData.costPrice} onChange={e => setFormData({
                    ...formData,
                    costPrice: e.target.value
                  })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Venda (R$)
                  </label>
                  <Input type="number" step="0.01" placeholder="0.00" value={formData.price} onChange={e => setFormData({
                    ...formData,
                    price: e.target.value
                  })} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Promocional (R$)
                  </label>
                  <Input type="number" step="0.01" placeholder="0.00" value={formData.promoPrice} onChange={e => setFormData({
                    ...formData,
                    promoPrice: e.target.value
                  })} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variações e Estoque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {variations.map((variation, index) => <div key={index} className="flex items-center gap-4">
                  <div className="w-16">
                    <Input value={variation.size} disabled />
                  </div>
                  <div className="flex-1">
                    <Input type="number" placeholder="Quantidade em estoque" value={variation.stock} onChange={e => {
                      const newVariations = [...variations];
                      newVariations[index].stock = parseInt(e.target.value);
                      setVariations(newVariations);
                    }} />
                  </div>
                </div>)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={formData.status} onValueChange={value => setFormData({
                ...formData,
                status: value
              })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="presale">Pré-venda</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Imagens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Clique ou arraste para fazer upload
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG até 5MB
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" />
              {isEdit ? "Salvar Alterações" : "Criar Produto"}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/admin/products")}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </form>
  </div>;
}