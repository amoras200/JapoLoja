import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DollarSign, ShoppingCart, TrendingUp, AlertTriangle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const salesData = [{
  name: "Seg",
  vendas: 4200
}, {
  name: "Ter",
  vendas: 3800
}, {
  name: "Qua",
  vendas: 5100
}, {
  name: "Qui",
  vendas: 4600
}, {
  name: "Sex",
  vendas: 6200
}, {
  name: "Sáb",
  vendas: 8500
}, {
  name: "Dom",
  vendas: 7300
}];
const topProducts = [{
  name: "Camisa Flamengo 2024",
  sales: 145
}, {
  name: "Camisa Brasil Copa",
  sales: 132
}, {
  name: "Camisa Barcelona Home",
  sales: 98
}, {
  name: "Camisa Real Madrid",
  sales: 87
}, {
  name: "Camisa PSG Jordan",
  sales: 76
}];
const recentOrders = [{
  id: "#4521",
  customer: "João Silva",
  value: 289.9,
  status: "Pago"
}, {
  id: "#4520",
  customer: "Maria Santos",
  value: 179.9,
  status: "Pendente"
}, {
  id: "#4519",
  customer: "Pedro Costa",
  value: 359.8,
  status: "Enviado"
}, {
  id: "#4518",
  customer: "Ana Oliveira",
  value: 149.9,
  status: "Pago"
}];
const alerts = [{
  message: "5 produtos com estoque abaixo de 10 unidades",
  type: "warning"
}, {
  message: "3 pedidos aguardando processamento há mais de 24h",
  type: "danger"
}, {
  message: "15 novos clientes esta semana",
  type: "success"
}];
export function Dashboard() {
  return <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">Visão geral do seu e-commerce</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Faturamento Hoje
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 8.450,00</div>
            <p className="text-xs text-green-600 mt-1">+12.5% vs ontem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pedidos Hoje
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-blue-600 mt-1">+8 novos pedidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ticket Médio
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 179,79</div>
            <p className="text-xs text-purple-600 mt-1">+5.2% este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Estoque Baixo
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-orange-600 mt-1">Produtos críticos</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas e Notificações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => <div key={index} className={`p-3 rounded-lg border ${alert.type === "warning" ? "bg-orange-50 border-orange-200" : alert.type === "danger" ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
                <p className="text-sm">{alert.message}</p>
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendas da Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={false} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Pedido</th>
                  <th className="text-left py-3 px-4">Cliente</th>
                  <th className="text-left py-3 px-4">Valor</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">R$ {order.value.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${order.status === "Pago" ? "bg-green-100 text-green-700" : order.status === "Enviado" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>;
}