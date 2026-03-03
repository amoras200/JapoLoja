import Layout from "../../components/Layout";
import { ProductCard } from "../../components/ProductCard";
import { Carousel } from "../../components/Carousel"; // <-- Importamos o carrossel aqui!


// Vamos simular alguns produtos "fakes" só para testar o visual
export default function Home() {
  const produtosFake = [
    { _id: 1, nome: "Brasil Jogador", descricao: "Modelo Jogador - primeira linha", preco: 189.90, imagem: null },
    { _id: 2, nome: "Brasil Torcedor", descricao: "Modelo Torcedor - primeira linha", preco: 119.90, imagem: null },
    { _id: 3, nome: "Brasil Tailandesa", descricao: "Modelo Tailandesa - primeira linha", preco: 149.90, imagem: null },
    { _id: 4, nome: "Brasil Retro 2002", descricao: "Edição Limitada", preco: 119.90, imagem: null },
  ];

  return (
    <Layout>

      {/* SEÇÃO HERO - AGORA COM O CARROSSEL */}
      <div className="border-b border-gray-800">
        <Carousel />
      </div>
      {/* SEÇÃO DE PRODUTOS */}
      <div className="bg-gradient-to-r from-black via-gray-800 to-black py-16 px-8 w-full">
        <div className="flex text-center justify-center items-end mb-12 px-16">
          <h2 className="text-3xl text-center font-bold text-white uppercase tracking-wide px-18">
            Destaques
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {produtosFake.map((produto) => (
            <ProductCard key={produto._id} produto={produto} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
