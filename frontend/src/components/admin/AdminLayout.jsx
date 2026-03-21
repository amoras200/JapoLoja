import { Outlet, Link, useLocation } from "react-router";
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, Ticket, Settings, FileText, BarChart3, Shield, Menu, X } from "lucide-react";
import { useState } from "react";

const menuItems = [{
  icon: LayoutDashboard,
  label: "Dashboard",
  path: "/admin"
}, {
  icon: Package,
  label: "Produtos",
  path: "/admin/products"
}, {
  icon: ShoppingCart,
  label: "Pedidos",
  path: "/admin/orders"
}, {
  icon: Users,
  label: "Clientes",
  path: "/admin/customers"
}, {
  icon: Tag,
  label: "Categorias",
  path: "/admin/categories"
}, {
  icon: Ticket,
  label: "Cupons",
  path: "/admin/coupons"
}, {
  icon: FileText,
  label: "Conteúdo",
  path: "/admin/content"
}, {
  icon: BarChart3,
  label: "Relatórios",
  path: "/admin/reports"
}, {
  icon: Settings,
  label: "Configurações",
  path: "/admin/settings"
}, {
  icon: Shield,
  label: "Usuários",
  path: "/admin/users"
}];

export function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return <div className="min-h-screen bg-gray-50">
    {/* Mobile menu button */}
    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white rounded-lg shadow-md">
      {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

    {/* Sidebar */}
    <aside className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-200 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
      <div className="p-6 border-b">
        <h1 className="font-bold text-xl text-gray-900">Painel do JaguaFucker</h1>
        <p className="text-sm text-gray-500 mt-1">JapoLoja</p>
      </div>

      <nav className="p-4">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors 
                ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}>
            <Icon size={20} />
            <span>{item.label}</span>
          </Link>;
        })}
      </nav>
    </aside>

    {/* Main content */}
    <main className="lg:ml-64 min-h-screen">
      <div className="p-6 lg:p-8">
        <Outlet />
      </div>
    </main>

    {/* Overlay for mobile */}
    {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
  </div>;
}