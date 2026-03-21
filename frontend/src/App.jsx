// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // <-- IMPORTAMOS O CONTEXTO AQUI

// Importações do Cliente
import Home from './pages/Home';
import { Cart } from './pages/cart/index.jsx';
import { Profile } from './pages/Client/Profile.jsx';
import { Login } from './pages/Login/index.jsx';
import { Orders } from './pages/Orders/Orders.jsx';
import { Details } from './pages/Product/Details.jsx';
import { Category } from './pages/Category/index.jsx';

// Importações do Admin
import { AdminLayout } from './components/admin/AdminLayout';
import { Dashboard } from './components/admin/Dashboard';
import { ProductList } from './components/admin/ProductList';
import { ProductForm } from './components/admin/ProductForm';
import { OrderList } from './components/admin/OrderList';
import { OrderDetails } from './components/admin/OrderDetails';
import { CustomerList } from './components/admin/CustomerList';
import { CustomerDetails } from './components/admin/CustomerDetails';
import { Categories } from './components/admin/Categories';
import { Coupons } from './components/admin/Coupons';
import { Settings } from './components/admin/Settings';
import { Content } from './components/admin/Content';
import { Reports } from './components/admin/Reports';
import { Users } from './components/admin/Users';

export default function App() {
  return (
    // ABRAÇAMOS TODA A APLICAÇÃO COM O AUTHPROVIDER
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas do site */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pedidos" element={<Orders />} />

          <Route path="/produto/:id" element={<Details />} />
          <Route path="/categoria/:id" element={<Category />} />

          {/* Rotas do Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductList />} />

            {/* IMPORTANTE: A ORDEM IMPORTA! */}
            {/* Primeiro as rotas específicas, depois as dinâmicas */}
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id/edit" element={<ProductForm />} />

            <Route path="orders" element={<OrderList />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="customers/:id" element={<CustomerDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="content" element={<Content />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<Users />} />
          </Route>

          {/* Rota 404 */}
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}