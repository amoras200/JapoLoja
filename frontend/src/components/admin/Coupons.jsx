import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, Edit, Trash2, Copy } from "lucide-react";
import { Badge } from "../ui/badge";
const mockCoupons = [{
  id: 1,
  code: "WELCOME10",
  type: "percentage",
  value: 10,
  minValue: 100,
  maxUses: 100,
  used: 45,
  validFrom: "01/03/2024",
  validUntil: "31/03/2024",
  status: "active"
}, {
  id: 2,
  code: "FRETE20",
  type: "fixed",
  value: 20,
  minValue: 0,
  maxUses: 500,
  used: 287,
  validFrom: "01/03/2024",
  validUntil: "30/04/2024",
  status: "active"
}, {
  id: 3,
  code: "NATAL2023",
  type: "percentage",
  value: 25,
  minValue: 200,
  maxUses: 200,
  used: 200,
  validFrom: "01/12/2023",
  validUntil: "31/12/2023",
  status: "expired"
}, {
  id: 4,
  code: "PRIMCOMPRA",
  type: "percentage",
  value: 15,
  minValue: 0,
  maxUses: 1000,
  used: 523,
  validFrom: "01/01/2024",
  validUntil: "31/12/2024",
  status: "active"
}];
export function Coupons() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage",
    value: "",
    minValue: "",
    maxUses: "",
    validFrom: "",
    validUntil: ""
  });
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Cupons de Desconto</h2>
          <p className="text-gray-500 mt-1">Crie e gerencie cupons promocionais</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cupom
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-gray-600 mt-1">Cupons Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">1.055</div>
            <p className="text-sm text-gray-600 mt-1">Total de Usos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">R$ 18.450</div>
            <p className="text-sm text-gray-600 mt-1">Total Descontado</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">15.2%</div>
            <p className="text-sm text-gray-600 mt-1">Taxa de Conversão</p>
          </CardContent>
        </Card>
      </div>

      {/* Form */}
      {showForm && <Card>
          <CardHeader>
            <CardTitle>Novo Cupom de Desconto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Código do Cupom
                </label>
                <div className="flex gap-2">
                  <Input placeholder="Ex: WELCOME10" value={formData.code} onChange={e => setFormData({
                ...formData,
                code: e.target.value.toUpperCase()
              })} />
                  <Button variant="outline" onClick={() => setFormData({
                ...formData,
                code: Math.random().toString(36).substr(2, 8).toUpperCase()
              })}>
                    Gerar
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Tipo de Desconto
                </label>
                <Select value={formData.type} onValueChange={value => setFormData({
              ...formData,
              type: value
            })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                    <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Valor do Desconto
                </label>
                <Input type="number" placeholder={formData.type === "percentage" ? "10" : "50.00"} value={formData.value} onChange={e => setFormData({
              ...formData,
              value: e.target.value
            })} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Valor Mínimo da Compra (R$)
                </label>
                <Input type="number" placeholder="0.00" value={formData.minValue} onChange={e => setFormData({
              ...formData,
              minValue: e.target.value
            })} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Limite de Usos
                </label>
                <Input type="number" placeholder="100" value={formData.maxUses} onChange={e => setFormData({
              ...formData,
              maxUses: e.target.value
            })} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Válido de
                </label>
                <Input type="date" value={formData.validFrom} onChange={e => setFormData({
              ...formData,
              validFrom: e.target.value
            })} />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Válido até
                </label>
                <Input type="date" value={formData.validUntil} onChange={e => setFormData({
              ...formData,
              validUntil: e.target.value
            })} />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button>Criar Cupom</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>}

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Cupons ({mockCoupons.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Código</th>
                  <th className="text-left py-3 px-4">Tipo</th>
                  <th className="text-left py-3 px-4">Desconto</th>
                  <th className="text-left py-3 px-4">Usos</th>
                  <th className="text-left py-3 px-4">Validade</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockCoupons.map(coupon => <tr key={coupon.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold">{coupon.code}</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {coupon.type === "percentage" ? "Porcentagem" : "Valor Fixo"}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {coupon.type === "percentage" ? `${coupon.value}%` : `R$ ${coupon.value.toFixed(2)}`}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div>
                          {coupon.used} / {coupon.maxUses}
                        </div>
                        <div className="text-gray-500">
                          {(coupon.used / coupon.maxUses * 100).toFixed(0)}%
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div>{coupon.validFrom}</div>
                      <div className="text-gray-500">{coupon.validUntil}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={coupon.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                        {coupon.status === "active" ? "Ativo" : "Expirado"}
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
          </div>
        </CardContent>
      </Card>
    </div>;
}