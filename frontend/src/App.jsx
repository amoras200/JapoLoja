import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // O React entende que é pra pegar o index.jsx dentro da pasta Home
import { Cart } from './pages/cart/index.jsx'
import { Profile } from './pages/Client/Profile.jsx'
import { Login } from './pages/Login/index.jsx'
import { Orders } from './pages/Orders/Orders.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Aqui vamos listar todas as páginas do site */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pedidos" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}