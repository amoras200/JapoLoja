import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { Upload } from "lucide-react";
export function Settings() {
  return <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Configurações da Loja</h2>
        <p className="text-gray-500 mt-1">
          Configure as preferências e regras da loja
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="shipping">Envio</TabsTrigger>
          <TabsTrigger value="payment">Pagamento</TabsTrigger>
          <TabsTrigger value="taxes">Impostos</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Loja</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nome da Loja
                    </label>
                    <Input defaultValue="E-commerce Camisetas" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email de Contato
                    </label>
                    <Input defaultValue="contato@loja.com.br" type="email" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Telefone
                    </label>
                    <Input defaultValue="(11) 3000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      WhatsApp
                    </label>
                    <Input defaultValue="(11) 99999-9999" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descrição da Loja
                  </label>
                  <Textarea rows={4} defaultValue="Loja especializada em camisetas de times de futebol nacionais e internacionais." />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Logo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Clique para fazer upload do logo
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG ou SVG, recomendado 200x200px
                    </p>
                  </div>
                </div>

                <Button>Salvar Alterações</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Redes Sociais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Instagram
                    </label>
                    <Input placeholder="@suaoja" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Facebook
                    </label>
                    <Input placeholder="/sualoja" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Twitter/X
                    </label>
                    <Input placeholder="@sualoja" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      YouTube
                    </label>
                    <Input placeholder="/sualoja" />
                  </div>
                </div>
                <Button>Salvar Redes Sociais</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Shipping */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Envio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Frete Grátis</h4>
                  <p className="text-sm text-gray-600">
                    Ativar frete grátis acima de um valor
                  </p>
                </div>
                <Switch />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Valor Mínimo para Frete Grátis (R$)
                </label>
                <Input type="number" defaultValue="200.00" step="0.01" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Prazo de Entrega Padrão (dias)
                </label>
                <Input type="number" defaultValue="7" />
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Transportadoras Integradas</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Correios (PAC)</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Correios (SEDEX)</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Jadlog</span>
                    <Switch />
                  </div>
                </div>
              </div>

              <Button>Salvar Configurações de Envio</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-medium">Formas de Pagamento Aceitas</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Cartão de Crédito</p>
                      <p className="text-sm text-gray-600">
                        Parcelamento em até 12x
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">PIX</p>
                      <p className="text-sm text-gray-600">Aprovação instantânea</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Boleto Bancário</p>
                      <p className="text-sm text-gray-600">
                        Vencimento em 3 dias úteis
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Débito Online</p>
                      <p className="text-sm text-gray-600">Principais bancos</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Número Máximo de Parcelas
                </label>
                <Input type="number" defaultValue="12" min="1" max="12" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Valor Mínimo da Parcela (R$)
                </label>
                <Input type="number" defaultValue="30.00" step="0.01" />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Juros no Parcelamento</h4>
                  <p className="text-sm text-gray-600">
                    Aplicar juros nas parcelas
                  </p>
                </div>
                <Switch />
              </div>

              <Button>Salvar Configurações de Pagamento</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Taxes */}
        <TabsContent value="taxes">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Impostos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Cálculo Automático de Impostos</h4>
                  <p className="text-sm text-gray-600">
                    Calcular impostos baseado na localização
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  ICMS Padrão (%)
                </label>
                <Input type="number" defaultValue="18" step="0.01" />
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">ICMS por Estado</h4>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <Input defaultValue="SP" disabled />
                    <Input type="number" defaultValue="18" step="0.01" />
                    <Button variant="outline" size="sm">
                      Remover
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Input defaultValue="RJ" disabled />
                    <Input type="number" defaultValue="20" step="0.01" />
                    <Button variant="outline" size="sm">
                      Remover
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  + Adicionar Estado
                </Button>
              </div>

              <Button>Salvar Configurações de Impostos</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}