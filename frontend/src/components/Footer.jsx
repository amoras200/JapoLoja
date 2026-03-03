import logo from '../assets/logojagua.png';

export function Footer() {
  return (
    <footer className="bg-black text-white mt-auto pt-16">
      <div className="max-w-7xl mx-auto px-8 pb-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Coluna 1: Marca e Slogan */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl tracking-widest font-semibold">
              JapoLoja
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Camisetas Esportivas. Estilo e performance para quem não para no tempo.
          </p>
        </div>

        {/* Coluna 2: Links Rápidos */}
        <div>
          <h3 className="text-lg font-semibold mb-6 tracking-wide">
            Links Rápidos
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors duration-300">Sobre Nós</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Coleções</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Contato</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">FAQ</a></li>
          </ul>
        </div>

        {/* Coluna 3: Contato */}
        <div>
          <h3 className="text-lg font-semibold mb-6 tracking-wide">
            Contato
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>Email: contato@japoloja.com</li>
            <li>Tel: (11) 1234-5678</li>
            <li>Seg - Sex: 9h às 18h</li>
          </ul>
        </div>
      </div>

      {/* Linha inferior: Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-6 text-center text-gray-500 text-sm">
          © 2026 japoLoja. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}