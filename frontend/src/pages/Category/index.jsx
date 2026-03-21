import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ProductCard } from '../../components/ProductCard';

export function Category() {
  const { id } = useParams(); // Pega o que vier na URL (ex: "tailandesa", "jogador")

  // Simulando produtos (Depois vamos buscar do banco usando esse 'id')
  const produtosFake = [
    { _id: 1, nome: `Camisa ${id.toUpperCase()} 1`, descricao: `Modelo ${id} - primeira linha`, preco: 149.90, imagem: null },
    { _id: 2, nome: `Camisa ${id.toUpperCase()} 2`, descricao: `Modelo ${id} - primeira linha`, preco: 149.90, imagem: null },
    { _id: 3, nome: `Camisa ${id.toUpperCase()} 3`, descricao: `Modelo ${id} - primeira linha`, preco: 149.90, imagem: null },
  ];

  // Função para deixar o título bonito (ex: de "tailandesa" para "Tailandesa")
  const formatarTitulo = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black via-gray-800 to-black text-white">
      <Header />

      <main className="flex-1 w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Cabeçalho da Categoria */}
        <div className="border-b border-[#3a3a3a] pb-6 mb-12">
          <p className="text-[#39d639] font-bold tracking-widest uppercase text-sm mb-2">Coleção</p>
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
            Versão {formatarTitulo(id)}
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl">
            Explore nossa seleção exclusiva de camisas da categoria {formatarTitulo(id)}. 
            Qualidade premium para quem exige o melhor em campo ou na arquibancada.
          </p>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {produtosFake.map((produto) => (
            <ProductCard key={produto._id} produto={produto} />
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}