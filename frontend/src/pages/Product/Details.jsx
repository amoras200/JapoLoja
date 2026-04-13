import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Truck, ShieldCheck, Star, Minus, Plus, ChevronLeft, X, ZoomIn } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { apiProducts } from '../../services/apiProducts';

export function Details() {
  const { id } = useParams(); 
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [cep, setCep] = useState('');
  
  // Estado para o Popup de Zoom
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function carregarProduto() {
      try {
        const dados = await apiProducts.buscarPorId(id);
        setProduto(dados);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarProduto();
  }, [id]);

  const handleDiminuir = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

  const handleAumentar = () => {
    setQuantidade(quantidade + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="animate-pulse">Buscando detalhes do manto...</p>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
        <h2 className="text-2xl font-bold">Produto não encontrado.</h2>
        <Link to="/" className="text-[#39d639] hover:underline">Voltar para a loja</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black via-gray-800 to-black text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#39d639] transition-colors mb-8 font-semibold uppercase text-sm tracking-wider">
          <ChevronLeft size={20} />
          Voltar para a loja
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* LADO ESQUERDO: IMAGEM COM CLIQUE PARA ZOOM */}
          <div className="relative group cursor-zoom-in" onClick={() => setIsModalOpen(true)}>
            <div className="bg-[#1a1a1a] rounded-2xl p-4 md:p-8 flex items-center justify-center border border-[#3a3a3a] shadow-2xl overflow-hidden h-full">
              {produto.imagem ? (
                <>
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome} 
                    className="w-full h-auto max-h-[600px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Ícone indicando que dá pra clicar pra aumentar */}
                  <div className="absolute bottom-6 right-6 bg-black/60 p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={24} className="text-[#39d639]" />
                  </div>
                </>
              ) : (
                <div className="w-full h-[500px] flex items-center justify-center text-gray-500">
                  Sem imagem disponível
                </div>
              )}
            </div>
          </div>

          {/* LADO DIREITO: INFORMAÇÕES COMPLETAS (O retorno do que estava antes!) */}
          <div className="flex flex-col justify-center">
            
            {/* Título e Preço */}
            <div className="mb-8 border-b border-[#3a3a3a] pb-6">
              <div className="flex items-center gap-2 text-[#39d639] mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#39d639" />)}
                <span className="text-gray-400 text-sm ml-2">(Avaliações da Galera)</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{produto.nome}</h1>
              <p className="text-4xl font-extrabold text-[#39d639]">
                R$ {produto.preco ? produto.preco.toFixed(2).replace('.', ',') : '0,00'}
              </p>
              {produto.preco && (
                <p className="text-sm text-gray-400 mt-2">ou em até 3x de R$ {(produto.preco / 3).toFixed(2).replace('.', ',')} sem juros</p>
              )}
            </div>

            {/* Descrição */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Descrição</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {produto.descricao}
              </p>
            </div>

            {/* Seleção de Tamanho */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Tamanho</h3>
                <button className="text-xs text-[#39d639] hover:underline">Guia de Medidas</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {(produto.tamanhos || ['P', 'M', 'G', 'GG', 'XG']).map((tamanho) => (
                  <button
                    key={tamanho}
                    onClick={() => setTamanhoSelecionado(tamanho)}
                    className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center font-bold text-lg transition-all
                      ${tamanhoSelecionado === tamanho 
                        ? 'border-[#39d639] bg-[#39d639]/10 text-[#39d639]' 
                        : 'border-[#3a3a3a] bg-[#1a1a1a] text-gray-300 hover:border-gray-500'
                      }`}
                  >
                    {tamanho}
                  </button>
                ))}
              </div>
              {!tamanhoSelecionado && <p className="text-red-400 text-xs mt-2">* Selecione um tamanho para continuar</p>}
            </div>

            {/* Ações: Quantidade e Botão Comprar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Controle de Quantidade */}
              <div className="flex items-center justify-between bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-2 w-full sm:w-32 h-14">
                <button onClick={handleDiminuir} className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Minus size={20} />
                </button>
                <span className="font-bold text-lg">{quantidade}</span>
                <button onClick={handleAumentar} className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Plus size={20} />
                </button>
              </div>

              {/* Botão Adicionar */}
              <button 
                disabled={!tamanhoSelecionado}
                className="flex-1 h-14 bg-[#39d639] text-black font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-3 hover:bg-[#2bc42b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#39d639]/20"
              >
                <ShoppingCart size={24} />
                Adicionar ao Carrinho
              </button>
            </div>

            {/* Cálculo de Frete */}
            <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl p-4 md:p-6 mb-6">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                <Truck size={18} />
                Calcular Frete e Prazo
              </h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Seu CEP" 
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="flex-1 bg-black border border-[#3a3a3a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#39d639]"
                />
                <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors uppercase text-sm">
                  OK
                </button>
              </div>
            </div>

            {/* Garantias */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <ShieldCheck size={18} className="text-[#39d639]" />
              <span>Compra 100% segura via JAPO Sports.</span>
            </div>

          </div>
        </div>
      </main>

      {/* POPUP DE ZOOM (MODAL) */}
      {isModalOpen && produto.imagem && (
        <div 
          className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Botão Fechar */}
          <button 
            className="absolute top-6 right-6 text-white hover:text-[#39d639] transition-colors"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={40} />
          </button>

          {/* Imagem em Tamanho Ouro */}
          <img 
            src={produto.imagem} 
            alt={produto.nome} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in duration-300"
          />
        </div>
      )}

      <Footer />
    </div>
  );
}