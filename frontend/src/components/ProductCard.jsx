import { Link } from 'react-router-dom';

export function ProductCard({ produto }) {
  const imagemSrc = produto.imagens?.[0] || produto.imagem;

  return (
    <Link 
      to={`/produto/${produto._id}`} 
      className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-2xl shadow-lg hover:shadow-[#39d639]/20 hover:border-[#39d639]/50 transition-all duration-300 cursor-pointer overflow-hidden group block"
    >
      <div className="h-80 bg-black flex items-center justify-center relative overflow-hidden">
        {imagemSrc ? (
         <img 
           src={imagemSrc} 
           alt={produto.nome} 
           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        ) : (
          <span className="text-gray-600 font-medium">Sem Imagem</span>
        )}

        <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full px-4">
          <div className="w-full bg-[#39d639] text-black text-center py-2 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#2bc42b]">
            Ver Detalhes
          </div>
        </div>
      </div>

      <div className="p-4 bg-[#1a1a1a] border-t border-[#3a3a3a]">
        <h3 className="text-lg font-bold text-white truncate">{produto.nome}</h3>
        <p className="text-gray-400 text-sm mb-2 truncate">{produto.descricao}</p>
        <p className="text-xl font-extrabold text-[#39d639]">
          R$ {produto.preco ? produto.preco.toFixed(2).replace('.', ',') : '0,00'}
        </p>
      </div>
    </Link>
  );
}