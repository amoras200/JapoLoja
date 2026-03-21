import { useNavigate, useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowLeft, Printer, Mail, Ban, DollarSign } from "lucide-react";
import { Badge } from "../ui/badge";
export function OrderDetails() {
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const order = {
    id: id || "#4521",
    date: "14/03/2024 10:30",
    status: "paid",
    customer: {
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 98765-4321",
      cpf: "123.456.789-00"
    },
    shipping: {
      address: "Rua das Flores, 123",
      complement: "Apto 45",
      neighborhood: "Jardim Primavera",
      city: "São Paulo",
      state: "SP",
      zip: "01234-567"
    },
    payment: {
      method: "Cartão de Crédito",
      status: "Aprovado",
      installments: "3x sem juros"
    },
    items: [{
      id: 1,
      name: "Camisa Flamengo Home 2024",
      variant: "Tamanho G",
      price: 289.9,
      quantity: 1,
      image: "🔴⚫"
    }, {
      id: 2,
      name: "Camisa Brasil Copa 2026",
      variant: "Tamanho M",
      price: 349.9,
      quantity: 1,
      image: "💚💛"
    }],
    subtotal: 639.8,
    shipping_cost: 25.0,
    discount: 0,
    total: 664.8,
    history: [{
      date: "14/03/2024 10:30",
      status: "Pedido realizado"
    }, {
      date: "14/03/2024 10:32",
      status: "Pagamento aprovado"
    }, {
      date: "14/03/2024 11:00",
      status: "Em preparação"
    }]
  };
  return <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/admin/orders")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Pedido {order.id}
          </h2>
          <p className="text-gray-500 mt-1">{order.date}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Imprimir
        </Button>
        <Button variant="outline">
          <Mail className="mr-2 h-4 w-4" />
          Enviar Email
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Items */}
        <Card>
          <CardHeader>
            <CardTitle>Itens do Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map(item => <div key={item.id} className="flex items-center gap-4 pb-4 border-b last:border-0">
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-2xl">
                  {item.image}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.variant}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R$ {item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
                </div>
              </div>)}
            </div>

            <div className="mt-6 space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>R$ {order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frete</span>
                <span>R$ {order.shipping_cost.toFixed(2)}</span>
              </div>
              {order.discount > 0 && <div className="flex justify-between text-green-600">
                <span>Desconto</span>
                <span>- R$ {order.discount.toFixed(2)}</span>
              </div>}
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span>R$ {order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico do Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.history.map((event, index) => <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  {index < order.history.length - 1 && <div className="w-0.5 h-full bg-gray-300 mt-1" />}
                </div>
                <div className="pb-4">
                  <p className="font-medium">{event.status}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              </div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select defaultValue="processing">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
                <SelectItem value="processing">Em Preparação</SelectItem>
                <SelectItem value="shipped">Enviado</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full" variant="default">
              Atualizar Status
            </Button>
          </CardContent>
        </Card>

        {/* Customer */}
        <Card>
          <CardHeader>
            <CardTitle>Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium">{order.customer.name}</p>
              <p className="text-sm text-gray-600">{order.customer.email}</p>
              <p className="text-sm text-gray-600">{order.customer.phone}</p>
              <p className="text-sm text-gray-600">CPF: {order.customer.cpf}</p>
            </div>
          </CardContent>
        </Card>

        {/* Shipping */}
        <Card>
          <CardHeader>
            <CardTitle>Endereço de Entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{order.shipping.address}</p>
            {order.shipping.complement && <p className="text-sm">{order.shipping.complement}</p>}
            <p className="text-sm">{order.shipping.neighborhood}</p>
            <p className="text-sm">
              {order.shipping.city} - {order.shipping.state}
            </p>
            <p className="text-sm">CEP: {order.shipping.zip}</p>
          </CardContent>
        </Card>

        {/* Payment */}
        <Card>
          <CardHeader>
            <CardTitle>Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Método:</span>
              <span className="text-sm font-medium">
                {order.payment.method}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Status:</span>
              <Badge className="bg-green-100 text-green-700">
                {order.payment.status}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Parcelamento:</span>
              <span className="text-sm font-medium">
                {order.payment.installments}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full">
              <DollarSign className="mr-2 h-4 w-4" />
              Reembolsar
            </Button>
            <Button variant="outline" className="w-full text-red-600">
              <Ban className="mr-2 h-4 w-4" />
              Cancelar Pedido
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>;
}