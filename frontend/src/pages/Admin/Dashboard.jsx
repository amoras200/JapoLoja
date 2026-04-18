import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  AlertTriangle, 
  LogOut, 
  Menu, 
  X, 
  DollarSign,
  TrendingUp,
  Edit,
  Trash2,
  Store,
  Save,
  Eye,
  Search
} from 'lucide-react';

import { apiProducts } from '../../services/apiProducts';
import { apiOrders } from '../../services/apiOrders';
import { apiUsers } from '../../services/apiUsers';
import { ProductModal } from '../../components/Admin/ProductModal';
import { OrderModal } from '../../components/Admin/OrderModal';
import { ClientModal } from '../../components/Admin/ClientModal';

function LinhaEstoque({ produto, onSalvar }) {
  const [variacoes, setVariacoes] = useState(produto.variacoes || []);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, valor) => {
    const novasVar = [...variacoes];
    novasVar[index].estoque = Number(valor);
    setVariacoes(novasVar);
  };

  const handleSalvar = async () => {
    setLoading(true);
    await onSalvar(produto, variacoes);
    setLoading(false);
  };

  return (
    <tr className="hover:bg-[#252525] transition-colors border-b border-[#3a3a3a]">
      <td className="p-4 flex items-center gap-3 min-w-[200px]">
        <img 
          src={produto.imagens?.[0] || produto.imagem || 'https://via.placeholder.com/40'} 
          alt={produto.nome}
          className="w-12 h-12 rounded object-cover border border-[#3a3a3a]" 
        />
        <div className="flex flex-col">
          <span className="font-bold text-white text-sm">{produto.nome}</span>
          <span className="text-xs text-gray-500">{produto.versao}</span>
        </div>
      </td>
      <td className="p-4">
        <div className="flex flex-wrap gap-3">
          {variacoes.length === 0 ? (
            <span className="text-xs text-red-400">Sem tamanhos cadastrados</span>
          ) : (
            variacoes.map((v, i) => (
              <div key={i} className="flex items-center gap-2 bg-[#1a1a1a] p-2 rounded-lg border border-[#3a3a3a]">
                <span className="font-black text-[#39d639] w-6 text-center">{v.tamanho}</span>
                <input 
                  type="number" 
                  min="0"
                  value={v.estoque} 
                  onChange={e => handleChange(i, e.target.value)}
                  className="w-16 bg-black border border-[#3a3a3a] rounded px-2 py-1 text-white font-bold focus:outline-none focus:border-[#39d639] text-center"
                />
              </div>
            ))
          )}
        </div>
      </td>
      <td className="p-4 text-center">
        <button 
          onClick={handleSalvar}
          disabled={loading || variacoes.length === 0}
          className="bg-[#39d639] text-black px-4 py-2 rounded-lg font-bold text-xs uppercase hover:bg-[#2bc42b] transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto shadow-lg shadow-[#39d639]/10"
        >
          {loading ? 'Salvando...' : <><Save size={16}/> Atualizar</>}
        </button>
      </td>
    </tr>
  );
}

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  // NOVO: Estados para o Modal de Cliente
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [termoBusca, setTermoBusca] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    setTermoBusca('');
  }, [activeTab]);

  useEffect(() => {
    async function carregarDados() {
      if (activeTab === 'relatorios') return;

      setLoading(true);
      try {
        if (activeTab === 'dashboard' || activeTab === 'produtos' || activeTab === 'estoque') {
          const res = await apiProducts.listarTodos();
          setDados(res);
        } else if (activeTab === 'pedidos') {
          const res = await apiOrders.listarTodos();
          setDados(res);
        } else if (activeTab === 'clientes') {
          const res = await apiUsers.listarTodos();
          setDados(res);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    carregarDados();
  }, [activeTab]);

  const handleMudarStatus = async (id, novoStatus) => {
    try {
      await apiOrders.atualizarStatus(id, novoStatus);
      const res = await apiOrders.listarTodos();
      setDados(res);
      alert("Status atualizado com sucesso!");
    } catch (err) {
      alert("Erro ao atualizar status. Verifique o console.");
      console.error(err);
    }
  };

  const handleDeletarProduto = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este manto permanentemente?")) {
      try {
        await apiProducts.deletar(id);
        const res = await apiProducts.listarTodos();
        setDados(res);
        alert("Produto deletado com sucesso!");
      } catch (err) {
        alert("Erro ao deletar produto.");
        console.error(err);
      }
    }
  };

  const handleAtualizarEstoqueRapido = async (produto, variacoesAtualizadas) => {
    try {
      const formData = new FormData();
      formData.append('variacoes', JSON.stringify(variacoesAtualizadas));
      
      await apiProducts.atualizar(produto._id, formData);
      
      const res = await apiProducts.listarTodos();
      setDados(res);
      
      alert(`Estoque do manto "${produto.nome}" atualizado!`);
    } catch (error) {
      alert("Erro ao atualizar o estoque.");
      console.error(error);
    }
  };

  const handleEditarProduto = (produto) => {
    setProdutoEditando(produto);
    setIsModalOpen(true);
  };

  const handleNovoProduto = () => {
    setProdutoEditando(null);
    setIsModalOpen(true);
  };

  const handleAbrirDetalhesPedido = (pedido) => {
    setPedidoSelecionado(pedido);
    setIsOrderModalOpen(true);
  };

  // NOVO: Função para abrir os detalhes do cliente
  const handleAbrirDetalhesCliente = (cliente) => {
    setClienteSelecionado(cliente);
    setIsClientModalOpen(true);
  };

  let itensCriticos = [];
  if (activeTab === 'dashboard' && dados.length > 0) {
    dados.forEach(prod => {
      if (prod.variacoes) {
        prod.variacoes.forEach(v => {
          if (v.estoque <= 5) {
            itensCriticos.push({
              produtoId: prod._id,
              nome: prod.nome,
              tamanho: v.tamanho,
              estoque: v.estoque
            });
          }
        });
      }
    });
  }

  const dadosFiltrados = dados.filter((item) => {
    if (!termoBusca) return true;
    
    const termo = termoBusca.toLowerCase();
    
    if (activeTab === 'produtos' || activeTab === 'estoque') {
      return item.nome?.toLowerCase().includes(termo);
    }
    if (activeTab === 'pedidos') {
      const nomeCliente = item.usuario?.nome?.toLowerCase() || '';
      const codigo = item.codigoPedido?.toLowerCase() || '';
      return nomeCliente.includes(termo) || codigo.includes(termo);
    }
    if (activeTab === 'clientes') {
      const nome = item.nome?.toLowerCase() || '';
      const email = item.email?.toLowerCase() || '';
      return nome.includes(termo) || email.includes(termo);
    }
    
    return true;
  });

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'produtos', label: 'Produtos', icon: <Package size={20} /> },
    { id: 'estoque', label: 'Estoque', icon: <AlertTriangle size={20} /> },
    { id: 'pedidos', label: 'Pedidos', icon: <ShoppingCart size={20} /> },
    { id: 'clientes', label: 'Clientes', icon: <Users size={20} /> },
    { id: 'relatorios', label: 'Relatórios', icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden font-sans">
      
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1a1a] border-r border-[#3a3a3a] transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0 flex flex-col
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#3a3a3a]">
          <span className="text-[#39d639] font-black text-xl tracking-wider italic">JAPO ADMIN</span>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                ${activeTab === item.id 
                  ? 'bg-[#39d639] text-black shadow-lg shadow-[#39d639]/20' 
                  : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                }
              `}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#3a3a3a] space-y-2">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#2a2a2a] hover:text-[#39d639] rounded-lg transition-colors font-medium"
          >
            <Store size={20} />
            Ir para a Loja
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500/70 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            Deslogar da Conta
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0a0a0a]">
        
        <header className="h-16 flex items-center justify-between px-6 bg-[#1a1a1a] border-b border-[#3a3a3a] shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-400 hover:text-[#39d639]" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold capitalize tracking-wide hidden sm:block">
              {activeTab === 'dashboard' ? 'Visão Geral' : activeTab}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#39d639] flex items-center justify-center text-black font-bold">
              {user?.nome ? user.nome.charAt(0).toUpperCase() : 'A'}
            </div>
            <span className="text-sm font-medium text-gray-300 hidden sm:block">
              {user?.nome || 'Administrador'}
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          
          {activeTab === 'dashboard' && !loading && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl p-6 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 text-sm font-medium mb-1">Faturamento Hoje</p>
                      <h3 className="text-3xl font-black text-white">R$ 0,00</h3>
                    </div>
                    <div className="p-3 bg-[#39d639]/10 rounded-lg text-[#39d639]">
                      <DollarSign size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl p-6 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 text-sm font-medium mb-1">Pedidos Pendentes</p>
                      <h3 className="text-3xl font-black text-white">0</h3>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                      <ShoppingCart size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl p-6 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 text-sm font-medium mb-1">Total de Produtos</p>
                      <h3 className="text-3xl font-black text-white">{dados.length}</h3>
                    </div>
                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                      <Package size={24} />
                    </div>
                  </div>
                </div>

                <div className={`bg-[#1a1a1a] border rounded-xl p-6 shadow-lg relative overflow-hidden ${itensCriticos.length > 0 ? 'border-red-500/50 shadow-red-500/10' : 'border-[#3a3a3a]'}`}>
                  <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full ${itensCriticos.length > 0 ? 'bg-red-500/10' : 'bg-[#3a3a3a]/30'}`}></div>
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <p className="text-gray-400 text-sm font-medium mb-1">Estoque Crítico (≤ 5)</p>
                      <h3 className={`text-3xl font-black ${itensCriticos.length > 0 ? 'text-red-400' : 'text-gray-300'}`}>
                        {itensCriticos.length}
                      </h3>
                    </div>
                    <div className={`p-3 rounded-lg ${itensCriticos.length > 0 ? 'bg-red-500/10 text-red-400' : 'bg-[#2a2a2a] text-gray-500'}`}>
                      <AlertTriangle size={24} />
                    </div>
                  </div>
                </div>

              </div>

              <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl p-6 shadow-lg">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className={itensCriticos.length > 0 ? "text-red-500" : "text-[#39d639]"} size={20} />
                  Alertas de Estoque
                </h2>
                
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#3a3a3a] scrollbar-track-transparent">
                  {itensCriticos.length === 0 ? (
                    <div className="bg-[#39d639]/10 border border-[#39d639]/20 text-[#39d639] px-4 py-3 rounded-lg text-sm font-medium">
                      Nenhum alerta no momento. Todos os mantos têm estoque suficiente!
                    </div>
                  ) : (
                    itensCriticos.map((item, i) => (
                      <div key={i} className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm flex sm:flex-row flex-col sm:items-center justify-between gap-2">
                        <span>
                          Reposição necessária: <strong>{item.nome}</strong> (Tamanho <span className="font-black underline">{item.tamanho}</span>)
                        </span>
                        <span className="font-black bg-red-500 text-black px-3 py-1 rounded-full text-xs shrink-0 inline-block text-center">
                          Apenas {item.estoque} restando
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

          {loading && activeTab !== 'dashboard' && (
             <div className="flex justify-center items-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#39d639]"></div>
             </div>
          )}

          {!loading && activeTab === 'produtos' && (
            <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl overflow-hidden animate-in fade-in duration-500">
              <div className="p-6 border-b border-[#3a3a3a] flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold">Gerenciar Mantos</h2>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Buscar manto..." 
                      value={termoBusca}
                      onChange={(e) => setTermoBusca(e.target.value)}
                      className="w-full bg-black border border-[#3a3a3a] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#39d639]"
                    />
                  </div>
                  <button 
                    onClick={handleNovoProduto}
                    className="bg-[#39d639] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#2bc42b] transition-colors w-full sm:w-auto whitespace-nowrap"
                  >
                    + Novo Produto
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#2a2a2a] text-gray-400 text-sm">
                    <tr>
                      <th className="p-4">Produto</th>
                      <th className="p-4">Versão</th>
                      <th className="p-4">Preço</th>
                      <th className="p-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3a3a3a]">
                    {dadosFiltrados.length === 0 ? (
                      <tr><td colSpan="4" className="p-8 text-center text-gray-500">Nenhum produto encontrado.</td></tr>
                    ) : (
                      dadosFiltrados.map(prod => (
                        <tr key={prod._id} className="hover:bg-[#252525] transition-colors">
                          <td className="p-4 flex items-center gap-3 min-w-[200px]">
                            <img src={prod.imagens?.[0] || prod.imagem || 'https://via.placeholder.com/40'} alt={prod.nome} className="w-12 h-12 rounded object-cover border border-[#3a3a3a]" />
                            <span className="font-medium text-white">{prod.nome}</span>
                          </td>
                          <td className="p-4 text-gray-400">{prod.versao}</td>
                          <td className="p-4 text-[#39d639] font-bold whitespace-nowrap">R$ {prod.preco?.toFixed(2)}</td>
                          <td className="p-4 text-center flex items-center justify-center gap-2">
                            <button 
                              onClick={() => handleEditarProduto(prod)}
                              className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors inline-flex items-center justify-center"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeletarProduto(prod._id)}
                              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!loading && activeTab === 'estoque' && (
            <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl overflow-hidden animate-in fade-in duration-500">
              <div className="p-6 border-b border-[#3a3a3a] flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Package className="text-[#39d639]"/>
                    Gestão Rápida de Estoque
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">Altere a quantidade das camisas rapidamente.</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar manto..." 
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    className="w-full bg-black border border-[#3a3a3a] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#39d639]"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#2a2a2a] text-gray-400 text-sm">
                    <tr>
                      <th className="p-4">Produto</th>
                      <th className="p-4">Tamanhos e Unidades</th>
                      <th className="p-4 text-center">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosFiltrados.length === 0 ? (
                      <tr><td colSpan="3" className="p-8 text-center text-gray-500">Nenhum produto encontrado.</td></tr>
                    ) : (
                      dadosFiltrados.map(prod => (
                        <LinhaEstoque 
                          key={prod._id} 
                          produto={prod} 
                          onSalvar={handleAtualizarEstoqueRapido} 
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!loading && activeTab === 'pedidos' && (
            <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl overflow-hidden animate-in fade-in duration-500">
              <div className="p-6 border-b border-[#3a3a3a] flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold">Gerenciamento de Pedidos e Envios</h2>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar por cliente ou ID..." 
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    className="w-full bg-black border border-[#3a3a3a] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#39d639]"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#2a2a2a] text-gray-400 text-sm">
                    <tr>
                      <th className="p-4">ID do Pedido / Cliente</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3a3a3a]">
                    {dadosFiltrados.length === 0 ? (
                      <tr><td colSpan="4" className="p-8 text-center text-gray-500">Nenhum pedido encontrado.</td></tr>
                    ) : (
                      dadosFiltrados.map(ped => (
                        <tr key={ped._id} className="hover:bg-[#252525] transition-colors">
                          <td className="p-4 min-w-[200px]">
                            <div className="font-bold text-white">{ped.usuario?.nome || 'Cliente Desconhecido'}</div>
                            <div className="text-xs text-gray-500 uppercase mt-1">
                              ID: {ped.codigoPedido || ped._id.slice(-6)}
                            </div>
                          </td>
                          <td className="p-4 font-bold text-[#39d639] whitespace-nowrap">R$ {ped.valorTotal?.toFixed(2)}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                              ${ped.status === 'pago' ? 'bg-blue-500/20 text-blue-400' : 
                                ped.status === 'enviado' ? 'bg-[#39d639]/20 text-[#39d639]' : 
                                'bg-yellow-500/20 text-yellow-500'
                              }
                            `}>
                              {ped.status}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => handleAbrirDetalhesPedido(ped)}
                              className="bg-[#2a2a2a] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#39d639] hover:text-black transition-colors flex items-center justify-center gap-2 mx-auto"
                            >
                              <Eye size={16} /> Ver Detalhes
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!loading && activeTab === 'clientes' && (
             <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl overflow-hidden animate-in fade-in duration-500">
               <div className="p-6 border-b border-[#3a3a3a] flex flex-col sm:flex-row justify-between items-center gap-4">
                 <h2 className="text-xl font-bold">Base de Clientes</h2>
                 <div className="relative w-full sm:w-64">
                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                   <input 
                     type="text" 
                     placeholder="Buscar por nome ou e-mail..." 
                     value={termoBusca}
                     onChange={(e) => setTermoBusca(e.target.value)}
                     className="w-full bg-black border border-[#3a3a3a] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#39d639]"
                   />
                 </div>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-[#2a2a2a] text-gray-400 text-sm">
                     <tr>
                       <th className="p-4">Nome</th>
                       <th className="p-4">E-mail</th>
                       <th className="p-4">Permissão</th>
                       {/* NOVA COLUNA DE AÇÃO NA TABELA DE CLIENTES */}
                       <th className="p-4 text-center">Ações</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-[#3a3a3a]">
                     {dadosFiltrados.length === 0 ? (
                       <tr><td colSpan="4" className="p-8 text-center text-gray-500">Nenhum cliente encontrado.</td></tr>
                     ) : (
                       dadosFiltrados.map(cliente => (
                         <tr key={cliente._id} className="hover:bg-[#252525] transition-colors">
                           <td className="p-4 font-medium text-white">{cliente.nome || 'Nome protegido'}</td>
                           <td className="p-4 text-gray-400">{cliente.email || 'E-mail protegido'}</td>
                           <td className="p-4">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${cliente.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-800 text-gray-400'}`}>
                                {cliente.role === 'admin' ? 'Administrador' : 'Cliente'}
                              </span>
                           </td>
                           <td className="p-4 text-center">
                             {/* BOTÃO PARA ABRIR O MODAL DO CLIENTE */}
                             <button 
                               onClick={() => handleAbrirDetalhesCliente(cliente)}
                               className="bg-[#2a2a2a] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#39d639] hover:text-black transition-colors flex items-center justify-center gap-2 mx-auto"
                             >
                               <Eye size={16} /> Ver Detalhes
                             </button>
                           </td>
                         </tr>
                       ))
                     )}
                   </tbody>
                 </table>
               </div>
             </div>
          )}

          {!loading && activeTab === 'relatorios' && (
            <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl p-8 text-center animate-in fade-in duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2a2a2a] text-[#39d639] mb-4">
                {menuItems.find(i => i.id === activeTab)?.icon}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 capitalize">Gerenciar {activeTab}</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                A tela de {activeTab} está em construção.
              </p>
            </div>
          )}

        </div>
      </main>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        produtoEditando={produtoEditando}
        onSuccess={async () => {
          const res = await apiProducts.listarTodos();
          setDados(res);
        }}
      />

      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        pedido={pedidoSelecionado}
        onSuccess={async () => {
          const res = await apiOrders.listarTodos();
          setDados(res);
        }}
      />

      {/* NOVO MODAL DE CLIENTES CONECTADO */}
      <ClientModal 
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        cliente={clienteSelecionado}
      />

    </div>
  );
}