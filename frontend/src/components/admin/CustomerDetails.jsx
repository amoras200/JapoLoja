import { useNavigate, useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, Mail, Ban, Edit } from "lucide-react";
import { Badge } from "../ui/badge";
export function CustomerDetails() {
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const customer = {
    id: id || "1",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    birthdate: "15/05/1985",
    status: "active",
    totalOrders: 15,
    totalSpent: 4250.5,
    averageTicket: 283.37,
    firstOrder: "12/01/2023",
    lastOrder: "14/03/2024",
    addresses: [{
      id: 1,
      type: "Principal",
      street: "Rua das Flores, 123",
      complement: "Apto 45",
      neighborhood: "Jardim Primavera",
      city: "São Paulo",
      state: "SP",
      zip: "01234-567"
    }],
    orders: [{
      id: "#4521",
      date: "14/03/2024",
      total: 289.9,
      status: "delivered"
    }, {
      id: "#4398",
      date: "05/03/2024",
      total: 349.9,
      status: "delivered"
    }, {
      id: "#4287",
      date: "22/02/2024",
      total: 179.9,
      status: "delivered"
    }]
  };
  return <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/admin/customers")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {customer.name}
          </h2>
          <p className="text-gray-500 mt-1">
            Cliente desde {customer.firstOrder}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Mail className="mr-2 h-4 w-4" />
          Enviar Email
        </Button>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{customer.totalOrders}</div>
              <p className="text-sm text-gray-600 mt-1">Total de Pedidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                R$ {customer.totalSpent.toFixed(2)}
              </div>
              <p className="text-sm text-gray-600 mt-1">Total Gasto</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                R$ {customer.averageTicket.toFixed(2)}
              </div>
              <p className="text-sm text-gray-600 mt-1">Ticket Médio</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders History */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Pedido</th>
                    <th className="text-left py-3 px-4">Data</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.orders.map(order => <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4">R$ {order.total.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-700">
                        Entregue
                      </Badge>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{customer.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Telefone</p>
              <p className="font-medium">{customer.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">CPF</p>
              <p className="font-medium">{customer.cpf}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Data de Nascimento</p>
              <p className="font-medium">{customer.birthdate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <Badge className="bg-green-100 text-green-700 mt-1">Ativo</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Addresses */}
        <Card>
          <CardHeader>
            <CardTitle>Endereços</CardTitle>
          </CardHeader>
          <CardContent>
            {customer.addresses.map(address => <div key={address.id} className="space-y-2">
              <Badge className="bg-blue-100 text-blue-700">
                {address.type}
              </Badge>
              <p className="text-sm">{address.street}</p>
              {address.complement && <p className="text-sm">{address.complement}</p>}
              <p className="text-sm">{address.neighborhood}</p>
              <p className="text-sm">
                {address.city} - {address.state}
              </p>
              <p className="text-sm">CEP: {address.zip}</p>
            </div>)}
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full text-red-600">
              <Ban className="mr-2 h-4 w-4" />
              Bloquear Cliente
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>;
}