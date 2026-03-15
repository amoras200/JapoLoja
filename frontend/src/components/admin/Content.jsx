import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Plus, Edit, Trash2, Upload, Eye, ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "../ui/badge";
const banners = [{
  id: 1,
  title: "Promoção Camisas Brasil",
  link: "/produtos/brasil",
  position: 1,
  status: "active",
  image: "🏆"
}, {
  id: 2,
  title: "Lançamento Temporada 2024",
  link: "/novidades",
  position: 2,
  status: "active",
  image: "⚽"
}, {
  id: 3,
  title: "Frete Grátis acima de R$200",
  link: "/promocoes",
  position: 3,
  status: "inactive",
  image: "🚚"
}];
const promotions = [{
  id: 1,
  title: "Black Friday Camisetas",
  discount: "50%",
  validUntil: "30/11/2024",
  status: "scheduled"
}, {
  id: 2,
  title: "Camisas Retrô em Promoção",
  discount: "30%",
  validUntil: "31/03/2024",
  status: "active"
}];
const showcases = [{
  id: 1,
  name: "Lançamentos",
  products: 12,
  order: 1,
  status: "active"
}, {
  id: 2,
  name: "Mais Vendidos",
  products: 20,
  order: 2,
  status: "active"
}, {
  id: 3,
  name: "Times Brasileiros",
  products: 45,
  order: 3,
  status: "active"
}];
export function Content() {
  const [showForm, setShowForm] = useState(false);
  return <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Gestão de Conteúdo</h2>
        <p className="text-gray-500 mt-1">Gerencie banners, promoções e vitrines</p>
      </div>

      <Tabs defaultValue="banners" className="space-y-6">
        <TabsList>
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="promotions">Promoções</TabsTrigger>
          <TabsTrigger value="showcases">Vitrines</TabsTrigger>
        </TabsList>

        {/* Banners */}
        <TabsContent value="banners">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Banners da Home</CardTitle>
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Banner
              </Button>
            </CardHeader>
            <CardContent>
              {showForm && <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-4">Novo Banner</h3>
                  <div className="space-y-4">
                    <Input placeholder="Título do banner" />
                    <Input placeholder="Link de destino" />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Upload da imagem do banner
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Recomendado: 1920x600px
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button>Salvar Banner</Button>
                    <Button variant="outline" onClick={() => setShowForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>}

              <div className="space-y-3">
                {banners.map(banner => <div key={banner.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-2xl">
                      {banner.image}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{banner.title}</h4>
                      <p className="text-sm text-gray-500">{banner.link}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={banner.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                        {banner.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                      <div className="flex flex-col gap-1">
                        <Button variant="ghost" size="sm">
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promotions */}
        <TabsContent value="promotions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Promoções em Destaque</CardTitle>
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Promoção
              </Button>
            </CardHeader>
            <CardContent>
              {showForm && <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-4">Nova Promoção</h3>
                  <div className="space-y-4">
                    <Input placeholder="Título da promoção" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Desconto (%)" type="number" />
                      <Input type="date" placeholder="Válido até" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button>Salvar Promoção</Button>
                    <Button variant="outline" onClick={() => setShowForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>}

              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Título</th>
                    <th className="text-left py-3 px-4">Desconto</th>
                    <th className="text-left py-3 px-4">Válido Até</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {promotions.map(promo => <tr key={promo.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{promo.title}</td>
                      <td className="py-3 px-4">{promo.discount}</td>
                      <td className="py-3 px-4">{promo.validUntil}</td>
                      <td className="py-3 px-4">
                        <Badge className={promo.status === "active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}>
                          {promo.status === "active" ? "Ativa" : "Agendada"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Showcases */}
        <TabsContent value="showcases">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Vitrines de Produtos</CardTitle>
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Vitrine
              </Button>
            </CardHeader>
            <CardContent>
              {showForm && <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-4">Nova Vitrine</h3>
                  <Input placeholder="Nome da vitrine" />
                  <div className="flex gap-2 mt-4">
                    <Button>Criar Vitrine</Button>
                    <Button variant="outline" onClick={() => setShowForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>}

              <div className="space-y-3">
                {showcases.map(showcase => <div key={showcase.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div>
                      <h4 className="font-medium">{showcase.name}</h4>
                      <p className="text-sm text-gray-500">
                        {showcase.products} produtos
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700">Ativo</Badge>
                      <div className="flex flex-col gap-1">
                        <Button variant="ghost" size="sm">
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}