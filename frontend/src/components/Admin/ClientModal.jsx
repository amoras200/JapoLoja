import { useState, useEffect } from 'react';
import { X, User, Mail, Shield, ShoppingBag, MapPin } from 'lucide-react';
import { apiOrders } from '../../services/apiOrders';

export function ClientModal({ isOpen, onClose, cliente }) {
  const [pedidosCliente, setPedidosCliente] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarHistorico() {
      if (isOpen && cliente) {
        setLoading(true);
        try {
          // Busca todos os pedidos e filtra só os deste cliente
          const todosPedidos = await apiOrders.listarTodos();
          const filtrados = todosPedidos.filter(ped => ped.usuario?._id === cliente._id);
          setPedidosCliente(filtrados);
        } catch (error) {
          console.error("Erro ao buscar pedidos do cliente:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    buscarHistorico();
  }, [isOpen, cliente]);

  if (!isOpen || !cliente) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Cabeçalho */}
        <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#3a3a3a] p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="text-[#39d639]" />
              Ficha do Cliente
            </h2>
            <p className="text-sm text-gray-400 mt-1">ID: {cliente._id}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Dados Pessoais */}
          <div className="bg-black border border-[#3a3a3a] p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#39d639]/20 flex items-center justify-center border border-[#39d639]/50 shrink-0">
              <span className="text-2xl font-black text-[#39d639]">
                {cliente.nome ? cliente.nome.charAt(0).toUpperCase() : '?'}
              </span>
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-2xl font-bold text-white">{cliente.nome || 'Nome não informado'}</h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={16} className="text-[#39d639]"/>
                {cliente.email || 'E-mail bloqueado ou não informado'}
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Shield size={16} className="text-[#39d639]"/>
                Permissão: <span className="uppercase font-bold text-white">{cliente.role || 'cliente'}</span>
              </div>
            </div>
          </div>

          {/* Histórico de Pedidos e Endereços */}
          <div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShoppingBag size={16} className="text-[#39d639]" />
              Histórico de Compras e Endereços
            </h3>
            
            {loading ? (
              <div className="text-center p-8 text-gray-400">Buscando histórico...</div>
            ) : pedidosCliente.length === 0 ? (
              <div className="bg-black border border-[#3a3a3a] p-8 rounded-xl text-center text-gray-500">
                Este cliente ainda não realizou nenhuma compra.
              </div>
            ) : (
              <div className="space-y-4">
                {pedidosCliente.map(pedido => (
                  <div key={pedido._id} className="bg-black border border-[#3a3a3a] rounded-xl p-5 flex flex-col md:flex-row gap-6 justify-between">
                    
                    {/* Resumo do Pedido */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-white">{pedido.codigoPedido || pedido._id.slice(-6)}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase
                          ${pedido.status === 'pago' ? 'bg-blue-500/20 text-blue-400' : 
                            pedido.status === 'enviado' ? 'bg-[#39d639]/20 text-[#39d639]' : 
                            'bg-yellow-500/20 text-yellow-500'
                          }
                        `}>
                          {pedido.status}
                        </span>
                      </div>
                      <p className="text-xl font-black text-[#39d639] mb-3">R$ {pedido.valorTotal?.toFixed(2)}</p>
                      
                      <div className="space-y-1">
                        {pedido.produtos?.map((item, idx) => (
                          <div key={idx} className="text-sm text-gray-400">
                            • {item.quantidade}x {item.produto?.nome || 'Manto Excluído'} (Tam: {item.tamanho})
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Endereço Utilizado Neste Pedido */}
                    <div className="flex-1 bg-[#1a1a1a] p-4 rounded-lg border border-[#3a3a3a]">
                      <h4 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-2">
                        <MapPin size={12} /> Entregue em
                      </h4>
                      {pedido.enderecoEntrega && pedido.enderecoEntrega.rua ? (
                        <div className="text-sm text-gray-300">
                          <p className="font-bold text-white">{pedido.enderecoEntrega.rua}, {pedido.enderecoEntrega.numero}</p>
                          <p>{pedido.enderecoEntrega.bairro}</p>
                          <p>{pedido.enderecoEntrega.cidade} - {pedido.enderecoEntrega.estado}</p>
                          <p>CEP: {pedido.enderecoEntrega.cep}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">Nenhum endereço salvo neste pedido.</p>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}