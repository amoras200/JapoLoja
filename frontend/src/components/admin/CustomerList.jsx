import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, Eye, Mail, Ban } from "lucide-react";
import { Badge } from "../ui/badge";
const mockCustomers = [{
  id: 1,
  name: "João Silva",
  email: "joao@email.com",
  phone: "(11) 98765-4321",
  orders: 15,
  totalSpent: 4250.5,
  status: "active",
  lastOrder: "14/03/2024"
}, {
  id: 2,
  name: "Maria Santos",
  email: "maria@email.com",
  phone: "(21) 99876-5432",
  orders: 8,
  totalSpent: 2180.9,
  status: "active",
  lastOrder: "13/03/2024"
}, {
  id: 3,
  name: "Pedro Costa",
  email: "pedro@email.com",
  phone: "(11) 97654-3210",
  orders: 23,
  totalSpent: 6890.3,
  status: "active",
  lastOrder: "12/03/2024"
}, {
  id: 4,
  name: "Ana Oliveira",
  email: "ana@email.com",
  phone: "(31) 98888-7777",
  orders: 3,
  totalSpent: 890.7,
  status: "active",
  lastOrder: "10/03/2024"
}, {
  id: 5,
  name: "Carlos Souza",
  email: "carlos@email.com",
  phone: "(11) 96666-5555",
  orders: 1,
  totalSpent: 289.9,
  status: "blocked",
  lastOrder: "05/03/2024"
}];
export function CustomerList() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCustomers = mockCustomers.filter(customer => customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || customer.email.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold text-gray-900">Clientes</h2>
      <p className="text-gray-500 mt-1">Gerencie sua base de clientes</p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">1.247</div>
          <p className="text-sm text-gray-600 mt-1">Total de Clientes</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-600">83</div>
          <p className="text-sm text-gray-600 mt-1">Novos este Mês</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-blue-600">456</div>
          <p className="text-sm text-gray-600 mt-1">Clientes Recorrentes</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">R$ 245,80</div>
          <p className="text-sm text-gray-600 mt-1">Ticket Médio</p>
        </CardContent>
      </Card>
    </div>

    {/* Search */}
    <Card>
      <CardContent className="pt-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input placeholder="Buscar clientes por nome ou email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
      </CardContent>
    </Card>

    {/* Customers Table */}
    <Card>
      <CardHeader>
        <CardTitle>Lista de Clientes ({filteredCustomers.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Cliente</th>
                <th className="text-left py-3 px-4">Contato</th>
                <th className="text-left py-3 px-4">Pedidos</th>
                <th className="text-left py-3 px-4">Total Gasto</th>
                <th className="text-left py-3 px-4">Último Pedido</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-medium text-blue-600">
                        {customer.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium">{customer.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    <div>{customer.email}</div>
                    <div className="text-gray-500">{customer.phone}</div>
                  </div>
                </td>
                <td className="py-3 px-4">{customer.orders}</td>
                <td className="py-3 px-4 font-medium">
                  R$ {customer.totalSpent.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-sm">{customer.lastOrder}</td>
                <td className="py-3 px-4">
                  <Badge className={customer.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                    {customer.status === "active" ? "Ativo" : "Bloqueado"}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Link to={`/admin/customers/${customer.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Ban className="h-4 w-4" />
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