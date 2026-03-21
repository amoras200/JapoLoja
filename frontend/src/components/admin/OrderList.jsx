import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search, Eye, Printer, Download } from "lucide-react";
import { Badge } from "../ui/badge";
const mockOrders = [{
  id: "#4521",
  customer: "João Silva",
  email: "joao@email.com",
  date: "2024-03-14 10:30",
  items: 2,
  total: 289.9,
  status: "paid",
  payment: "Cartão de Crédito"
}, {
  id: "#4520",
  customer: "Maria Santos",
  email: "maria@email.com",
  date: "2024-03-14 09:15",
  items: 1,
  total: 179.9,
  status: "pending",
  payment: "PIX"
}, {
  id: "#4519",
  customer: "Pedro Costa",
  email: "pedro@email.com",
  date: "2024-03-13 16:45",
  items: 3,
  total: 359.8,
  status: "shipped",
  payment: "Boleto"
}, {
  id: "#4518",
  customer: "Ana Oliveira",
  email: "ana@email.com",
  date: "2024-03-13 14:20",
  items: 1,
  total: 149.9,
  status: "delivered",
  payment: "Cartão de Crédito"
}, {
  id: "#4517",
  customer: "Carlos Souza",
  email: "carlos@email.com",
  date: "2024-03-13 11:00",
  items: 2,
  total: 499.8,
  status: "cancelled",
  payment: "PIX"
}];
const statusConfig = {
  pending: {
    label: "Pendente",
    color: "bg-yellow-100 text-yellow-700"
  },
  paid: {
    label: "Pago",
    color: "bg-green-100 text-green-700"
  },
  processing: {
    label: "Em Preparação",
    color: "bg-blue-100 text-blue-700"
  },
  shipped: {
    label: "Enviado",
    color: "bg-purple-100 text-purple-700"
  },
  delivered: {
    label: "Entregue",
    color: "bg-teal-100 text-teal-700"
  },
  cancelled: {
    label: "Cancelado",
    color: "bg-red-100 text-red-700"
  }
};
export function OrderList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Pedidos</h2>
        <p className="text-gray-500 mt-1">
          Gerencie todos os pedidos da loja
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">127</div>
          <p className="text-sm text-gray-600 mt-1">Total</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-yellow-600">8</div>
          <p className="text-sm text-gray-600 mt-1">Pendentes</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-blue-600">15</div>
          <p className="text-sm text-gray-600 mt-1">Em Preparação</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-purple-600">23</div>
          <p className="text-sm text-gray-600 mt-1">Enviados</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-600">81</div>
          <p className="text-sm text-gray-600 mt-1">Entregues</p>
        </CardContent>
      </Card>
    </div>

    {/* Filters */}
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar por pedido, cliente ou email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="paid">Pago</SelectItem>
              <SelectItem value="processing">Em Preparação</SelectItem>
              <SelectItem value="shipped">Enviado</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>

    {/* Orders Table */}
    <Card>
      <CardHeader>
        <CardTitle>Lista de Pedidos ({filteredOrders.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Pedido</th>
                <th className="text-left py-3 px-4">Cliente</th>
                <th className="text-left py-3 px-4">Data</th>
                <th className="text-left py-3 px-4">Itens</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Pagamento</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{order.id}</td>
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">{order.date}</td>
                <td className="py-3 px-4">{order.items}</td>
                <td className="py-3 px-4 font-medium">
                  R$ {order.total.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-sm">{order.payment}</td>
                <td className="py-3 px-4">
                  <Badge className={statusConfig[order.status].color}>
                    {statusConfig[order.status].label}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Link to={`/admin/orders/${order.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      <Printer className="h-4 w-4" />
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