import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { ProductCard } from "../../components/ProductCard";
import { Carousel } from "../../components/Carousel";
import { apiProducts } from "../../services/apiProducts";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const dados = await apiProducts.listarTodos();
        setProdutos(dados);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    
    carregarProdutos();
  }, []);

  return (
    <Layout>
      <Carousel />
      
      <div className="bg-gradient-to-r from-black via-gray-800 to-black mx-auto py-16 px-8 w-full">
        <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold text-white uppercase tracking-wide">
            Destaques
            </h2>
            <a href="/produtos" className="text-gray-500 hover:text-white font-medium underline decoration-gray-300">
                Ver todos
            </a>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">
            Carregando a coleção...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {produtos.length > 0 ? (
              produtos.map((produto) => (
                  <ProductCard key={produto._id} produto={produto} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Ainda não há produtos cadastrados na loja.
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}