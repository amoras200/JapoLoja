// src/components/ProductCard.jsx

// Vamos receber "produto" como prop para o card ser dinâmico
export function ProductCard({ produto }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group">

      {/* Área da Imagem (com efeito de zoom leve ao passar o mouse) */}
      <div className="h-80 bg-white/20 bg-gray-100 flex items-center justify-center relative overflow-hidden">
        {produto.imagem ? (
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <span className="text-gray-400 font-medium">Sem Imagem</span>
        )}

        {/* Botão de "Adicionar Rápido" que aparece só no hover (opcional, mas fica chique) */}
        <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full px-4">
          <button className="w-full bg-black text-white py-2 rounded-lg font-medium text-sm hover:bg-gray-800">
            Ver Detalhes
          </button>
        </div>
      </div>

      {/* Informações do Produto */}
      <div className="p-4 bg-gray-900">
        <h3 className="text-lg font-bold text-lime-400 truncate">{produto.nome}</h3>
        <p className="text-gray-50 text-sm mb-2">{produto.descricao}</p>
        <p className="text-xl font-semibold text-white">
          R$ {produto.preco ? produto.preco.toFixed(2).replace('.', ',') : '0,00'}
        </p>
      </div>
    </div>
  );
}