import { useState } from 'react';
import { X, MapPin, Package, Truck, CheckCircle } from 'lucide-react';
import { apiOrders } from '../../services/apiOrders';

export function OrderModal({ isOpen, onClose, pedido, onSuccess }) {
  const [codigoRastreio, setCodigoRastreio] = useState(pedido?.codigoRastreio || '');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !pedido) return null;

  const handleEnviarPedido = async () => {
    if (!codigoRastreio.trim()) {
      alert("Por favor, insira o código de rastreio antes de marcar como enviado.");
      return;
    }

    setLoading(true);
    try {
      await apiOrders.atualizarStatus(pedido._id, 'enviado', codigoRastreio);
      alert("Pedido marcado como ENVIADO! O cliente será notificado.");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar o envio do pedido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Cabeçalho */}
        <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#3a3a3a] p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Package className="text-[#39d639]" />
              Detalhes do Pedido
            </h2>
            <p className="text-sm text-gray-400 mt-1">ID: {pedido.codigoPedido || pedido._id}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Sessão 1: Cliente e Endereço */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black border border-[#3a3a3a] p-4 rounded-lg">
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Dados do Cliente</h3>
              <p className="font-bold text-white">{pedido.usuario?.nome || 'Cliente não identificado'}</p>
              <p className="text-sm text-gray-400">{pedido.usuario?.email || 'Email protegido pelo sistema'}</p>
            </div>
            
            <div className="bg-black border border-[#3a3a3a] p-4 rounded-lg">
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin size={14} className="text-[#39d639]"/> Endereço de Entrega
              </h3>
              {pedido.enderecoEntrega && pedido.enderecoEntrega.rua ? (
                <div className="text-sm text-gray-300">
                  <p className="font-bold text-white">{pedido.enderecoEntrega.rua}, {pedido.enderecoEntrega.numero}</p>
                  <p>{pedido.enderecoEntrega.bairro}</p>
                  <p>{pedido.enderecoEntrega.cidade} - {pedido.enderecoEntrega.estado}</p>
                  <p>CEP: {pedido.enderecoEntrega.cep}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Endereço de entrega não preenchido.</p>
              )}
            </div>
          </div>

          {/* Sessão 2: Itens do Pedido */}
          <div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Itens do Pedido</h3>
            <div className="bg-black border border-[#3a3a3a] rounded-lg divide-y divide-[#3a3a3a]">
              {pedido.produtos && pedido.produtos.length > 0 ? (
                pedido.produtos.map((item, index) => (
                  <div key={index} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.produto?.imagens?.[0] || item.produto?.imagem || 'https://via.placeholder.com/50'} 
                        alt="Produto" 
                        className="w-12 h-12 rounded object-cover border border-[#3a3a3a]"
                      />
                      <div>
                        <p className="font-bold text-white text-sm">{item.produto?.nome || 'Manto Indisponível'}</p>
                        <p className="text-xs text-gray-400">Tamanho: <span className="font-bold text-[#39d639]">{item.tamanho}</span> | Qtd: {item.quantidade}</p>
                      </div>
                    </div>
                    <div className="font-bold text-white">
                      R$ {(item.precoUnitario * item.quantidade).toFixed(2)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-4 text-sm text-gray-500 italic">Nenhum item registrado neste pedido.</p>
              )}
            </div>
            <div className="mt-3 text-right">
              <p className="text-gray-400 text-sm">Total do Pedido:</p>
              <p className="text-2xl font-black text-[#39d639]">R$ {pedido.valorTotal?.toFixed(2)}</p>
            </div>
          </div>

          {/* Sessão 3: Ações de Logística (Rastreio) */}
          <div className="border-t border-[#3a3a3a] pt-6">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Truck size={14} className="text-[#39d639]"/> Logística e Envio
            </h3>
            
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-gray-400 mb-2">Código de Rastreio</label>
                <input 
                  type="text" 
                  value={codigoRastreio}
                  onChange={(e) => setCodigoRastreio(e.target.value)}
                  placeholder="Ex: BR123456789BR"
                  disabled={pedido.status !== 'pago'}
                  className="w-full bg-black border border-[#3a3a3a] rounded-lg px-4 py-3 text-white focus:border-[#39d639] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              
              {pedido.status === 'pago' ? (
                <button 
                  onClick={handleEnviarPedido}
                  disabled={loading}
                  className="bg-[#39d639] text-black px-8 py-3 rounded-lg font-bold uppercase hover:bg-[#2bc42b] transition-colors w-full md:w-auto flex items-center justify-center gap-2"
                >
                  {loading ? 'Processando...' : <><CheckCircle size={18}/> Confirmar Envio</>}
                </button>
              ) : (
                <div className={`px-6 py-3 rounded-lg font-bold uppercase w-full md:w-auto text-center border
                  ${pedido.status === 'enviado' ? 'bg-[#39d639]/10 text-[#39d639] border-[#39d639]/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}
                `}>
                  STATUS: {pedido.status}
                </div>
              )}
            </div>
            {pedido.status === 'pendente' && (
              <p className="text-xs text-yellow-500 mt-2">* Aguarde o pagamento ser aprovado para liberar o envio.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}