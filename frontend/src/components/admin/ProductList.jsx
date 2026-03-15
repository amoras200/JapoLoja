import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
const mockProducts = [{
  id: 1,
  name: "Camisa Flamengo Home 2024",
  team: "Flamengo",
  league: "Brasileirão",
  price: 289.9,
  stock: 45,
  status: "Ativo",
  image: "🔴⚫"
}, {
  id: 2,
  name: "Camisa Brasil Copa 2026",
  team: "Brasil",
  league: "Seleções",
  price: 349.9,
  stock: 8,
  status: "Ativo",
  image: "💚💛"
}, {
  id: 3,
  name: "Camisa Barcelona Home",
  team: "Barcelona",
  league: "La Liga",
  price: 319.9,
  stock: 23,
  status: "Ativo",
  image: "🔵🔴"
}, {
  id: 4,
  name: "Camisa Real Madrid Away",
  team: "Real Madrid",
  league: "La Liga",
  price: 319.9,
  stock: 0,
  status: "Inativo",
  image: "⚪👑"
}, {
  id: 5,
  name: "Camisa PSG Jordan Edition",
  team: "PSG",
  league: "Ligue 1",
  price: 399.9,
  stock: 15,
  status: "Ativo",
  image: "🔵🔴"
}];
export function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || product.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Produtos</h2>
        <p className="text-gray-500 mt-1">Gerencie o catálogo de camisetas</p>
      </div>
      <Link to="/admin/products/new">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Novo Produto
        </Button>
      </Link>
    </div>

    {/* Filters */}
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar produtos..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Liga" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Ligas</SelectItem>
              <SelectItem value="brasileirao">Brasileirão</SelectItem>
              <SelectItem value="laliga">La Liga</SelectItem>
              <SelectItem value="premier">Premier League</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>

    {/* Products Table */}
    <Card>
      <CardHeader>
        <CardTitle>Lista de Produtos ({filteredProducts.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Produto</th>
                <th className="text-left py-3 px-4">Time</th>
                <th className="text-left py-3 px-4">Liga</th>
                <th className="text-left py-3 px-4">Preço</th>
                <th className="text-left py-3 px-4">Estoque</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-xl">
                      {product.image}
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{product.team}</td>
                <td className="py-3 px-4">{product.league}</td>
                <td className="py-3 px-4">R$ {product.price.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-sm ${product.stock === 0 ? "bg-red-100 text-red-700" : product.stock < 10 ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                    {product.stock} un
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${product.status === "Ativo" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                    {product.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Link to={`/products/${product.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>;
}