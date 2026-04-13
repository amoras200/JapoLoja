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
  Trash2
} from 'lucide-react';

// Importando os serviços de API
import { apiProducts } from '../../services/apiProducts';
import { apiOrders } from '../../services/apiOrders';
import { apiUsers } from '../../services/apiUsers';

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Controle de Interface
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Estados para os Dados do Banco
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Efeito que roda toda vez que você troca de Aba
  useEffect(() => {
    async function carregarDados() {
      if (activeTab === 'dashboard' || activeTab === 'estoque' || activeTab === 'relatorios') return;

      setLoading(true);
      try {
        if (activeTab === 'produtos') {
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
        console.error(`Erro ao carregar dados da aba ${activeTab}:`, err);
      } finally {
        setLoading(false);
      }
    }
    
    carregarDados();
  }, [activeTab]);

  // Função para mudar status do pedido
  const handleMudarStatus = async (id, novoStatus) => {
    try {
      await apiOrders.atualizarStatus(id, novoStatus);
      // Recarrega a lista para mostrar a mudança
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
        // Recarrega a lista após deletar
        const res = await apiProducts.listarTodos();
        setDados(res);
        alert("Produto deletado com sucesso!");
      } catch (err) {
        alert("Erro ao deletar produto.");
        console.error(err);
      }
    }
  };

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
      
      {/* MENU LATERAL (SIDEBAR) */}
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

        <div className="p-4 border-t border-[#3a3a3a]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors font-medium"
          >
            <LogOut size={20} />
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL DE CONTEÚDO */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0a0a0a]">
        
        {/* Topbar */}
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

        {/* Container de Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          
          {/* ABA: DASHBOARD */}
          {activeTab === 'dashboard' && (
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
                  <p className="text-[#39d639] text-xs font-medium mt-4 flex items-center gap-1">
                    <TrendingUp size={14} /> +0% referente a ontem
                  </p>
                </div>
                {/* ... (Outros cards do Dashboard mantidos iguais ao seu layout) ... */}
                <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl p-6 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 text-sm font-medium mb-1">Pedidos Hoje</p>
                      <h3 className="text-3xl font-black text-white">0</h3>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                      <ShoppingCart size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ESTADO DE CARREGAMENTO */}
          {loading && activeTab !== 'dashboard' && (
             <div className="flex justify-center items-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#39d639]"></div>
             </div>
          )}

          {/* ABA: PRODUTOS */}
          {!loading && activeTab === 'produtos' && (
            <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl overflow-hidden animate-in fade-in duration-500">
              <div className="p-6 border-b border-[#3a3a3a] flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold">Gerenciar Mantos</h2>
                <button className="bg-[#39d639] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#2bc42b] transition-colors w-full sm:w-auto">
                  + Novo Produto
                </button>
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
                    {dados.length === 0 ? (
                      <tr><td colSpan="4" className="p-8 text-center text-gray-500">Nenhum produto cadastrado.</td></tr>
                    ) : (
                      dados.map(prod => (
                        <tr key={prod._id} className="hover:bg-[#252525] transition-colors">
                          <td className="p-4 flex items-center gap-3 min-w-[200px]">
                            {/* Mostra a primeira imagem do array ou a imagem antiga */}
                            <img src={prod.imagens?.[0] || prod.imagem || 'https://via.placeholder.com/40'} alt={prod.nome} className="w-12 h-12 rounded object-cover border border-[#3a3a3a]" />
                            <span className="font-medium text-white">{prod.nome}</span>
                          </td>
                          <td className="p-4 text-gray-400">{prod.versao}</td>
                          <td className="p-4 text-[#39d639] font-bold whitespace-nowrap">R$ {prod.preco?.toFixed(2)}</td>
                          <td className="p-4 text-center">
                            <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors inline-flex items-center justify-center">
                              <Edit size={18} />
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

          {/* ABA: PEDIDOS */}
          {!loading && activeTab === 'pedidos' && (
            <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl overflow-hidden animate-in fade-in duration-500">
              <div className="p-6 border-b border-[#3a3a3a]">
                <h2 className="text-xl font-bold">Gerenciamento de Pedidos e Envios</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#2a2a2a] text-gray-400 text-sm">
                    <tr>
                      <th className="p-4">Cliente / Local</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3a3a3a]">
                    {dados.length === 0 ? (
                      <tr><td colSpan="4" className="p-8 text-center text-gray-500">Nenhum pedido encontrado.</td></tr>
                    ) : (
                      dados.map(ped => (
                        <tr key={ped._id} className="hover:bg-[#252525] transition-colors">
                          <td className="p-4 min-w-[200px]">
                            <div className="font-bold text-white">{ped.usuario?.nome || 'Cliente Desconhecido'}</div>
                            <div className="text-xs text-gray-500 uppercase mt-1">
                              {ped.enderecoEnvio?.cidade ? `${ped.enderecoEnvio.cidade} - ${ped.enderecoEnvio.estado}` : 'Endereço não informado'}
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
                          <td className="p-4">
                            {ped.status === 'pago' && (
                              <button 
                                onClick={() => handleMudarStatus(ped._id, 'enviado')}
                                className="bg-white text-black text-xs font-bold px-3 py-2 rounded hover:bg-[#39d639] transition-colors shadow-md"
                              >
                                MARCAR ENVIADO
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ABA: CLIENTES */}
          {!loading && activeTab === 'clientes' && (
             <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl overflow-hidden animate-in fade-in duration-500">
               <div className="p-6 border-b border-[#3a3a3a]">
                 <h2 className="text-xl font-bold">Base de Clientes</h2>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-[#2a2a2a] text-gray-400 text-sm">
                     <tr>
                       <th className="p-4">Nome</th>
                       <th className="p-4">E-mail</th>
                       <th className="p-4">Permissão</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-[#3a3a3a]">
                     {dados.length === 0 ? (
                       <tr><td colSpan="3" className="p-8 text-center text-gray-500">Nenhum cliente encontrado.</td></tr>
                     ) : (
                       dados.map(cliente => (
                         <tr key={cliente._id} className="hover:bg-[#252525] transition-colors">
                           <td className="p-4 font-medium text-white">{cliente.nome || 'Sem nome'}</td>
                           <td className="p-4 text-gray-400">{cliente.email}</td>
                           <td className="p-4">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${cliente.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-800 text-gray-400'}`}>
                                {cliente.role === 'admin' ? 'Administrador' : 'Cliente'}
                              </span>
                           </td>
                         </tr>
                       ))
                     )}
                   </tbody>
                 </table>
               </div>
             </div>
          )}

          {/* ABAS EM CONSTRUÇÃO */}
          {!loading && (activeTab === 'estoque' || activeTab === 'relatorios') && (
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
    </div>
  );
}