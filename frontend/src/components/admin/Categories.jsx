import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
const categories = [{
  id: 1,
  name: "Camisas de Time",
  products: 156,
  status: "Ativo"
}, {
  id: 2,
  name: "Treino",
  products: 43,
  status: "Ativo"
}, {
  id: 3,
  name: "Retrô",
  products: 87,
  status: "Ativo"
}, {
  id: 4,
  name: "Seleções",
  products: 62,
  status: "Ativo"
}];
const brands = [{
  id: 1,
  name: "Nike",
  products: 89,
  logo: "✓"
}, {
  id: 2,
  name: "Adidas",
  products: 125,
  logo: "⚡"
}, {
  id: 3,
  name: "Puma",
  products: 67,
  logo: "🐆"
}, {
  id: 4,
  name: "Umbro",
  products: 34,
  logo: "◆"
}];
const teams = [{
  id: 1,
  name: "Flamengo",
  league: "Brasileirão",
  products: 23,
  badge: "🔴⚫"
}, {
  id: 2,
  name: "Palmeiras",
  league: "Brasileirão",
  products: 18,
  badge: "💚"
}, {
  id: 3,
  name: "Barcelona",
  league: "La Liga",
  products: 31,
  badge: "🔵🔴"
}, {
  id: 4,
  name: "Real Madrid",
  league: "La Liga",
  products: 28,
  badge: "⚪"
}, {
  id: 5,
  name: "Brasil",
  league: "Seleções",
  products: 15,
  badge: "💚💛"
}];
const leagues = [{
  id: 1,
  name: "Brasileirão",
  teams: 20,
  products: 145
}, {
  id: 2,
  name: "La Liga",
  teams: 12,
  products: 98
}, {
  id: 3,
  name: "Premier League",
  teams: 15,
  products: 112
}, {
  id: 4,
  name: "Seleções",
  teams: 8,
  products: 67
}];
export function Categories() {
  const [showForm, setShowForm] = useState(false);
  return <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          Categorias, Marcas e Times
        </h2>
        <p className="text-gray-500 mt-1">Organize o catálogo de produtos</p>
      </div>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="brands">Marcas</TabsTrigger>
          <TabsTrigger value="teams">Times</TabsTrigger>
          <TabsTrigger value="leagues">Ligas</TabsTrigger>
        </TabsList>

        {/* Categories */}
        <TabsContent value="categories">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Categorias</CardTitle>
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Categoria
              </Button>
            </CardHeader>
            <CardContent>
              {showForm && <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-4">Nova Categoria</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Nome da categoria" />
                    <Input placeholder="Slug (URL amigável)" />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Salvar</Button>
                    <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>}

              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Nome</th>
                    <th className="text-left py-3 px-4">Produtos</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => <tr key={category.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{category.name}</td>
                      <td className="py-3 px-4">{category.products}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                          {category.status}
                        </span>
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

        {/* Brands */}
        <TabsContent value="brands">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Marcas</CardTitle>
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Marca
              </Button>
            </CardHeader>
            <CardContent>
              {showForm && <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-4">Nova Marca</h3>
                  <div className="space-y-4">
                    <Input placeholder="Nome da marca" />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-600 mt-2">
                        Upload do logo da marca
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Salvar</Button>
                    <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>}

              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Marca</th>
                    <th className="text-left py-3 px-4">Logo</th>
                    <th className="text-left py-3 px-4">Produtos</th>
                    <th className="text-left py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {brands.map(brand => <tr key={brand.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{brand.name}</td>
                      <td className="py-3 px-4">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          {brand.logo}
                        </div>
                      </td>
                      <td className="py-3 px-4">{brand.products}</td>
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

        {/* Teams */}
        <TabsContent value="teams">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Times e Seleções</CardTitle>
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Time
              </Button>
            </CardHeader>
            <CardContent>
              {showForm && <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-4">Novo Time</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Nome do time" />
                    <Input placeholder="Liga" />
                  </div>
                  <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-600 mt-2">
                      Upload do escudo do time
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Salvar</Button>
                    <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>}

              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Time</th>
                    <th className="text-left py-3 px-4">Escudo</th>
                    <th className="text-left py-3 px-4">Liga</th>
                    <th className="text-left py-3 px-4">Produtos</th>
                    <th className="text-left py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map(team => <tr key={team.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{team.name}</td>
                      <td className="py-3 px-4">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-lg">
                          {team.badge}
                        </div>
                      </td>
                      <td className="py-3 px-4">{team.league}</td>
                      <td className="py-3 px-4">{team.products}</td>
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

        {/* Leagues */}
        <TabsContent value="leagues">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Ligas e Competições</CardTitle>
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Liga
              </Button>
            </CardHeader>
            <CardContent>
              {showForm && <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-4">Nova Liga</h3>
                  <Input placeholder="Nome da liga" />
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Salvar</Button>
                    <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>}

              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Liga</th>
                    <th className="text-left py-3 px-4">Times</th>
                    <th className="text-left py-3 px-4">Produtos</th>
                    <th className="text-left py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {leagues.map(league => <tr key={league.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{league.name}</td>
                      <td className="py-3 px-4">{league.teams}</td>
                      <td className="py-3 px-4">{league.products}</td>
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
      </Tabs>
    </div>;
}