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
import { Search } from './pages/Search'; // Ou o caminho da pasta onde você salvou o Search.jsx
import { Dashboard } from './pages/Admin/Dashboard';

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
          <Route path="/busca" element={<Search />} />

          {/* Rotas do Admin */}
        <Route path="/admin" element={<Dashboard />} />

          {/* Rota 404 */}
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}