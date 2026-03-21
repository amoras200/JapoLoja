import { useState, useRef, useEffect } from 'react';
import { User, ShoppingCart, ChevronDown, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/JapoSports.png';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isShirtsOpen, setIsShirtsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const profileRef = useRef(null);
  const shirtsRef = useRef(null);

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (shirtsRef.current && !shirtsRef.current.contains(event.target)) {
        setIsShirtsOpen(false);
      }
    }

    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  const displayName = user?.nome || (user?.email ? user.email.split('@')[0] : 'Perfil');

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-2xl shadow-black/50' : ''}`}>
      <div className="bg-gradient-to-r from-black via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between py-4 gap-4">
            <div className="flex-1 hidden md:block">
              <div className="relative group max-w-xs">
                <input
                  type="text"
                  placeholder="Buscar na Japo Sports..."
                  className="w-full bg-[#1a1a1a] border border-[#3a3a3a] text-sm text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:border-[#39d639] focus:ring-1 focus:ring-[#39d639] transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#39d639] transition-colors" size={18} />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="logojagua" className="h-10 md:h-12 object-contain hover:scale-105 transition-transform" />
              </Link>
            </div>

            <div className="flex-1 flex items-center justify-end gap-2 md:gap-6">
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-2 md:px-4 py-2 text-xs md:text-sm uppercase hover:text-[#39d639] transition-all tracking-wider font-semibold"
                >
                  <User size={20} />
                  <span className="hidden sm:block truncate max-w-[120px]">
                    {isAuthenticated ? displayName : 'Perfil'}
                  </span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-[#3a3a3a] rounded shadow-xl transition-all duration-300 z-50 ${isProfileOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                  <ul className="py-2">
                    {!isAuthenticated ? (
                      <li>
                        <Link to="/login" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-[#39d639]">
                          Login
                        </Link>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link to="/perfil" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-[#39d639]">
                            Meu Perfil
                          </Link>
                        </li>
                        <li>
                          <Link to="/pedidos" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-[#39d639]">
                            Meus Pedidos
                          </Link>
                        </li>
                        
                        {user?.role === 'admin' && (
                          <li className="border-t border-[#3a3a3a] mt-2 pt-2">
                            <Link to="/admin" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-yellow-500 font-bold hover:bg-[#2a2a2a] hover:text-yellow-400">
                              Gerenciar Conteúdo
                            </Link>
                          </li>
                        )}

                        <li className="border-t border-[#3a3a3a] mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-500 font-bold hover:bg-[#2a2a2a] hover:text-red-400"
                          >
                            Sair
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <Link to="/cart" className="flex items-center gap-2 bg-[#39d639] text-black px-4 py-2 rounded hover:bg-[#2bc42b] transition-colors font-bold shadow-lg shadow-[#39d639]/20">
                <ShoppingCart size={20} />
                <span className="text-xs md:text-sm uppercase hidden sm:block">Carrinho</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-black border-y border-[#3a3a3a] w-full shadow-md">
        <div className="container mx-auto px-4 max-w-7xl py-1 flex justify-center">
          <ul className="flex items-center justify-center">
            <li className="relative" ref={shirtsRef}>
              <button
                onClick={() => setIsShirtsOpen(!isShirtsOpen)}
                className="flex items-center gap-2 px-6 py-2 text-xs text-gray-100 md:text-sm uppercase hover:text-[#39d639] transition-all tracking-wider font-bold"
              >
                Camisetas
                <ChevronDown size={14} className={`transition-transform duration-300 ${isShirtsOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute left-1/2 -translate-x-1/2 mt-1 w-48 bg-[#1a1a1a] border border-[#3a3a3a] rounded shadow-xl transition-all duration-300 z-50 ${isShirtsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <ul className="py-2 text-center">
                  <li><Link to="/categoria/tailandesa" onClick={() => setIsShirtsOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-[#39d639]">Tailandesa 1:1</Link></li>
                  <li><Link to="/categoria/jogador" onClick={() => setIsShirtsOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-[#39d639]">Versão Jogador</Link></li>
                  <li><Link to="/categoria/torcedor" onClick={() => setIsShirtsOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-[#39d639]">Versão Torcedor</Link></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}