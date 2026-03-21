import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, Edit, Trash2, Shield } from "lucide-react";
import { Badge } from "../ui/badge";
const mockUsers = [{
  id: 1,
  name: "Admin Master",
  email: "admin@loja.com.br",
  role: "admin",
  status: "active",
  lastLogin: "14/03/2024 15:30"
}, {
  id: 2,
  name: "João Estoquista",
  email: "joao@loja.com.br",
  role: "stock",
  status: "active",
  lastLogin: "14/03/2024 12:15"
}, {
  id: 3,
  name: "Maria Atendente",
  email: "maria@loja.com.br",
  role: "support",
  status: "active",
  lastLogin: "14/03/2024 14:45"
}, {
  id: 4,
  name: "Carlos Financeiro",
  email: "carlos@loja.com.br",
  role: "finance",
  status: "active",
  lastLogin: "13/03/2024 18:20"
}, {
  id: 5,
  name: "Ana Marketing",
  email: "ana@loja.com.br",
  role: "marketing",
  status: "inactive",
  lastLogin: "10/03/2024 10:00"
}];
const roleConfig = {
  admin: {
    label: "Administrador",
    color: "bg-red-100 text-red-700"
  },
  stock: {
    label: "Estoquista",
    color: "bg-blue-100 text-blue-700"
  },
  support: {
    label: "Atendente",
    color: "bg-green-100 text-green-700"
  },
  finance: {
    label: "Financeiro",
    color: "bg-purple-100 text-purple-700"
  },
  marketing: {
    label: "Marketing",
    color: "bg-orange-100 text-orange-700"
  }
};
const permissions = [{
  module: "Dashboard",
  view: true,
  edit: false,
  delete: false
}, {
  module: "Produtos",
  view: true,
  edit: true,
  delete: true
}, {
  module: "Pedidos",
  view: true,
  edit: true,
  delete: false
}, {
  module: "Clientes",
  view: true,
  edit: true,
  delete: false
}, {
  module: "Cupons",
  view: true,
  edit: true,
  delete: true
}, {
  module: "Relatórios",
  view: true,
  edit: false,
  delete: false
}, {
  module: "Configurações",
  view: false,
  edit: false,
  delete: false
}, {
  module: "Usuários",
  view: false,
  edit: false,
  delete: false
}];
export function Users() {
  const [showForm, setShowForm] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Administração de Usuários
          </h2>
          <p className="text-gray-500 mt-1">
            Gerencie usuários e permissões de acesso
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-gray-600 mt-1">Total de Usuários</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">7</div>
            <p className="text-sm text-gray-600 mt-1">Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-sm text-gray-600 mt-1">Administradores</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <p className="text-sm text-gray-600 mt-1">Diferentes Perfis</p>
          </CardContent>
        </Card>
      </div>

      {/* User Form */}
      {showForm && <Card>
          <CardHeader>
            <CardTitle>Novo Usuário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome</label>
                <Input placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" placeholder="email@exemplo.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Senha</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Perfil</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="stock">Estoquista</SelectItem>
                    <SelectItem value="support">Atendente</SelectItem>
                    <SelectItem value="finance">Financeiro</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button>Criar Usuário</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>}

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários ({mockUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Usuário</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Perfil</th>
                  <th className="text-left py-3 px-4">Último Acesso</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map(user => <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-medium text-blue-600">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge className={roleConfig[user.role].color}>
                        {roleConfig[user.role].label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{user.lastLogin}</td>
                    <td className="py-3 px-4">
                      <Badge className={user.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                        {user.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setShowPermissions(!showPermissions)}>
                          <Shield className="h-4 w-4" />
                        </Button>
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

      {/* Permissions Matrix */}
      {showPermissions && <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Matriz de Permissões - Estoquista</CardTitle>
            <Button variant="outline" onClick={() => setShowPermissions(false)}>
              Fechar
            </Button>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Módulo</th>
                  <th className="text-center py-3 px-4">Visualizar</th>
                  <th className="text-center py-3 px-4">Editar</th>
                  <th className="text-center py-3 px-4">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((perm, index) => <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{perm.module}</td>
                    <td className="py-3 px-4 text-center">
                      <input type="checkbox" defaultChecked={perm.view} className="w-4 h-4" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input type="checkbox" defaultChecked={perm.edit} className="w-4 h-4" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input type="checkbox" defaultChecked={perm.delete} className="w-4 h-4" />
                    </td>
                  </tr>)}
              </tbody>
            </table>
            <Button className="mt-4">Salvar Permissões</Button>
          </CardContent>
        </Card>}
    </div>;
}