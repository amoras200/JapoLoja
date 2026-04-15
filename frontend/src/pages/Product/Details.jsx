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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Novo estado para controlar qual imagem está aparecendo
  const [imagemAtiva, setImagemAtiva] = useState(0);

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

  // Sempre que trocar o tamanho, a quantidade volta para 1 por segurança
  useEffect(() => {
    setQuantidade(1);
  }, [tamanhoSelecionado]);

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

  // Lógica de Imagens (Tratando array novo ou imagem antiga única)
  const arrayImagens = produto.imagens && produto.imagens.length > 0 
    ? produto.imagens 
    : (produto.imagem ? [produto.imagem] : []);
  
  const imagemPrincipal = arrayImagens[imagemAtiva] || null;

  // Lógica de Estoque e Variações
  const variacoesDisponiveis = produto.variacoes ? produto.variacoes.filter(v => v.estoque > 0) : [];
  
  // Pegando a variação que o usuário clicou para saber o limite de estoque
  const variacaoSelecionada = variacoesDisponiveis.find(v => v.tamanho === tamanhoSelecionado);
  const estoqueDisponivel = variacaoSelecionada ? variacaoSelecionada.estoque : 0;

  const handleDiminuir = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

  const handleAumentar = () => {
    // Só deixa aumentar se a quantidade for menor que o estoque daquele tamanho
    if (quantidade < estoqueDisponivel) {
      setQuantidade(quantidade + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black via-gray-800 to-black text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#39d639] transition-colors mb-8 font-semibold uppercase text-sm tracking-wider">
          <ChevronLeft size={20} />
          Voltar para a loja
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* LADO ESQUERDO: GALERIA DE IMAGENS */}
          <div className="flex flex-col gap-4">
            {/* Imagem Principal */}
            <div 
              className="relative group cursor-zoom-in bg-[#1a1a1a] rounded-2xl p-4 md:p-8 flex items-center justify-center border border-[#3a3a3a] shadow-2xl overflow-hidden h-[400px] md:h-[600px]" 
              onClick={() => setIsModalOpen(true)}
            >
              {imagemPrincipal ? (
                <>
                  <img 
                    src={imagemPrincipal} 
                    alt={`${produto.nome} - Imagem ${imagemAtiva + 1}`} 
                    className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 right-6 bg-black/60 p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={24} className="text-[#39d639]" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Sem imagem disponível
                </div>
              )}
            </div>

            {/* Miniaturas (Thumbnails) para trocar a imagem */}
            {arrayImagens.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#3a3a3a] scrollbar-track-black">
                {arrayImagens.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setImagemAtiva(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-xl border-2 overflow-hidden transition-all duration-200
                      ${imagemAtiva === index 
                        ? 'border-[#39d639] opacity-100' 
                        : 'border-[#3a3a3a] opacity-50 hover:opacity-100'
                      }`}
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Miniatura ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* LADO DIREITO: INFORMAÇÕES DO PRODUTO */}
          <div className="flex flex-col justify-center">
            
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

            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Descrição</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {produto.descricao}
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Tamanho</h3>
                <button className="text-xs text-[#39d639] hover:underline">Guia de Medidas</button>
              </div>
              
              {variacoesDisponiveis.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {variacoesDisponiveis.map((variacao) => (
                    <button
                      key={variacao.tamanho}
                      onClick={() => setTamanhoSelecionado(variacao.tamanho)}
                      className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center font-bold text-lg transition-all
                        ${tamanhoSelecionado === variacao.tamanho 
                          ? 'border-[#39d639] bg-[#39d639]/10 text-[#39d639]' 
                          : 'border-[#3a3a3a] bg-[#1a1a1a] text-gray-300 hover:border-gray-500'
                        }`}
                    >
                      {variacao.tamanho.toUpperCase()}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg font-bold text-sm text-center w-full">
                  Sem estoque no momento
                </div>
              )}
              
              {!tamanhoSelecionado && variacoesDisponiveis.length > 0 && (
                <p className="text-red-400 text-xs mt-2">* Selecione um tamanho para continuar</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              
              {/* Controle de Quantidade Integrado ao Estoque */}
              <div className="flex flex-col gap-1 w-full sm:w-32">
                <div className="flex items-center justify-between bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-2 h-14">
                  <button 
                    onClick={handleDiminuir} 
                    disabled={quantidade <= 1}
                    className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="font-bold text-lg">{quantidade}</span>
                  <button 
                    onClick={handleAumentar} 
                    disabled={!tamanhoSelecionado || quantidade >= estoqueDisponivel}
                    className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {/* Mostra a quantidade disponível em estoque abaixo dos botões se tiver um tamanho selecionado */}
                {tamanhoSelecionado && (
                  <span className="text-xs text-gray-500 text-center font-medium">
                    {estoqueDisponivel} em estoque
                  </span>
                )}
              </div>

              <button 
                disabled={!tamanhoSelecionado || variacoesDisponiveis.length === 0}
                className="flex-1 h-14 bg-[#39d639] text-black font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-3 hover:bg-[#2bc42b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#39d639]/20"
              >
                <ShoppingCart size={24} />
                Adicionar ao Carrinho
              </button>
            </div>

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

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <ShieldCheck size={18} className="text-[#39d639]" />
              <span>Compra 100% segura via JAPO Sports.</span>
            </div>

          </div>
        </div>
      </main>

      {/* POPUP DE ZOOM (MODAL) */}
      {isModalOpen && imagemPrincipal && (
        <div 
          className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-[#39d639] transition-colors"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={40} />
          </button>

          <img 
            src={imagemPrincipal} 
            alt={`${produto.nome} em Zoom`} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in duration-300"
          />
        </div>
      )}

      <Footer />
    </div>
  );
}