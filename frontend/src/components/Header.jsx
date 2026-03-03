import { User, ShoppingCart, ChevronDown } from 'lucide-react'; // <-- Importei a setinha aqui!
import logo from '../assets/JapoSports.png';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-black via-gray-800 to-black text-white z-50 relative">
      {/* PARTE SUPERIOR (Fundo Cinza Escuro) */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between py-4">

          <div className="flex-1"></div>

          <div className="flex items-center justify-center">
            <img src={logo} alt="logojagua" className="h-12 object-contain" />
          </div>

          <div className="flex-1 flex items-center justify-end gap-6">
            <button className="flex items-center gap-2 hover:text-[#39d639] transition-colors">
              <User size={20} />
              <span className="text-sm hidden sm:block">Perfil</span>
            </button>

            <button className="flex items-center gap-2 bg-[#39d639] text-black px-4 py-2 rounded hover:bg-[#2bc42b] transition-colors font-medium">
              <ShoppingCart size={20} />
              <span className="text-sm uppercase hidden sm:block">Carrinho</span>
            </button>
          </div>

        </div>
      </div>

      {/* PARTE INFERIOR (Faixa 100% Preta) */}
      <nav className="bg-black border-t border-[#3a3a3a] w-full">
        <div className="container mx-auto px-4 max-w-7xl py-2 flex justify-center">
          <ul className="flex items-center justify-center">

            <li className="relative group">
              {/* Botão Principal */}
              <button className="flex items-center gap-2 px-6 py-2 text-sm uppercase hover:text-[#39d639] transition-all tracking-wider font-semibold">
                Camisetas
                <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
              </button>

              {/* Menu Suspenso (Dropdown) */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-0 w-48 bg-[#1a1a1a] border border-[#3a3a3a] rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <ul className="py-2">
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-[#39d639] transition-colors">
                      Tailandesa
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-[#39d639] transition-colors">
                      Jogador
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-[#39d639] transition-colors">
                      Torcedor
                    </a>
                  </li>
                </ul>
              </div>
            </li>

          </ul>
        </div>
      </nav>
    </header>
  );
}