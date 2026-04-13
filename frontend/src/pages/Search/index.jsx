import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ProductCard } from '../../components/ProductCard';
import { apiProducts } from '../../services/apiProducts';

export function Search() {
  const [searchParams] = useSearchParams();
  const termo = searchParams.get('q');
  
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function realizarBusca() {
      if (!termo) return;
      
      setLoading(true);
      try {
        const resultados = await apiProducts.buscarPorTermo(termo);
        setProdutos(resultados);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    realizarBusca();
  }, [termo]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black via-gray-800 to-black text-white">
      <Header />

      <main className="flex-1 w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="border-b border-[#3a3a3a] pb-6 mb-12">
          <p className="text-[#39d639] font-bold tracking-widest uppercase text-sm mb-2">Resultados da busca</p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Você buscou por: "{termo}"
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">
            Procurando no estoque...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {produtos.length > 0 ? (
              produtos.map((produto) => (
                <ProductCard key={produto._id} produto={produto} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10 border border-[#3a3a3a] rounded-xl bg-[#1a1a1a]">
                Nenhum manto encontrado para "{termo}".
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}