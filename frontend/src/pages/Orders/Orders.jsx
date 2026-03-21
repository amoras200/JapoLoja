import React from 'react';
import { Package, ChevronRight, Calendar, MapPin, CheckCircle2, Truck } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export function Orders() {
    // Simulação de dados de pedidos (Mock)
    const orders = [
        {
            id: 'JP-98542',
            date: '28/02/2026',
            status: 'Em trânsito',
            total: 'R$ 289,90',
            items: [
                { name: 'Camisa Brasil Home 2024 - Tailandesa', qty: 1, img: 'https://via.placeholder.com/60' },
                { name: 'Camisa Japão Special Edition', qty: 1, img: 'https://via.placeholder.com/60' }
            ]
        },
        {
            id: 'JP-97210',
            date: '15/01/2026',
            status: 'Entregue',
            total: 'R$ 149,90',
            items: [
                { name: 'Camisa Real Madrid - Jogador', qty: 1, img: 'https://via.placeholder.com/60' }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-black  text-white">
            <Header />

            <main className="container mx-auto px-4 max-w-5xl py-10">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold border-l-4 border-[#39d639] pl-4 uppercase tracking-tighter">
                        Meus Pedidos
                    </h1>
                    <p className="text-gray-400 mt-2">Acompanhe o status das suas compras na Japo Sports.</p>
                </header>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] overflow-hidden hover:border-[#4a4a4a] transition-all">

                            {/* Topo do Card */}
                            <div className="p-4 md:p-6 border-b border-[#3a3a3a] flex flex-wrap justify-between items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-[#3a3a3a] p-3 rounded-full text-[#39d639]">
                                        <Package size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold">Pedido</p>
                                        <p className="text-sm font-mono text-[#39d639]">#{order.id}</p>
                                    </div>
                                </div>

                                <div className="flex gap-8">
                                    <div className="hidden sm:block">
                                        <p className="text-xs text-gray-400 uppercase font-bold">Data</p>
                                        <div className="flex items-center gap-1 text-sm">
                                            <Calendar size={14} />
                                            {order.date}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold">Total</p>
                                        <p className="text-sm font-bold">{order.total}</p>
                                    </div>
                                </div>

                                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'Entregue' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'
                                    }`}>
                                    {order.status === 'Entregue' ? (
                                        <span className="flex items-center gap-1"><CheckCircle2 size={14} /> Entregue</span>
                                    ) : (
                                        <span className="flex items-center gap-1"><Truck size={14} /> {order.status}</span>
                                    )}
                                </div>
                            </div>

                            {/* Itens do Pedido */}
                            <div className="p-4 md:p-6 bg-[#252525]/50">
                                <div className="space-y-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <img src={item.img} alt={item.name} className="w-12 h-12 rounded bg-[#3a3a3a] object-cover border border-[#4a4a4a]" />
                                                <div>
                                                    <p className="text-sm font-medium">{item.name}</p>
                                                    <p className="text-xs text-gray-500 font-bold">Qtd: {item.qty}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Rodapé do Card */}
                            <div className="px-4 py-3 bg-[#2a2a2a] flex justify-end">
                                <button className="flex items-center gap-2 text-[#39d639] text-sm font-bold uppercase hover:underline">
                                    Ver detalhes
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Caso não tenha pedidos */}
                {orders.length === 0 && (
                    <div className="text-center py-20 bg-[#2a2a2a] rounded-lg border border-dashed border-[#4a4a4a]">
                        <Package size={48} className="mx-auto text-gray-600 mb-4" />
                        <p className="text-gray-400">Você ainda não realizou nenhum pedido.</p>
                        <button className="mt-4 bg-[#39d639] text-black px-6 py-2 rounded font-bold uppercase text-sm">
                            Ir para a loja
                        </button>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}