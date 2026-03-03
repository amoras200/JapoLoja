import { Link } from "react-router-dom";
// Ajuste nos caminhos: subindo dois níveis para alcançar components e hooks
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useCart } from "../../hooks/useCart";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-black">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-white mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4 text-white">Seu carrinho está vazio</h1>
            <p className="text-white mb-8">
              Adicione produtos ao seu carrinho para continuar comprando.
            </p>
            <Link
              to="/"
              className="inline-block bg-[#39d639] text-black px-8 py-3 rounded-lg hover:bg-[#2bc42b] transition-colors"
            >
              Ver Produtos
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <Link
                    to={`/produto/${item.id}`}
                    className="font-semibold text-gray-900 hover:text-red-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.specifications.minOrder}
                  </p>
                  <p className="text-red-600 font-bold mt-2">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                    title="Remover do carrinho"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-1 border-x border-gray-300 min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="font-semibold text-gray-900">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Frete</span>
                  <span className="text-green-600">A calcular</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-red-600">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-blue-800 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors font-semibold mb-3"
              >
                Finalizar Pedido
              </Link>

              <Link
                to="/"
                className="block w-full bg-gray-100 text-gray-700 text-center px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Continuar Comprando
              </Link>

              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>Dica:</strong> Compras acima de R$ 500,00 têm frete grátis!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}