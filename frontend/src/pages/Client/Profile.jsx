import { useState } from "react";
// Ajuste nos caminhos: subimos dois níveis (../../) para sair de 'profile' e 'pages'
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useUser } from "../../hooks/useUser";
import { User, Save, Edit } from "lucide-react";

export function Profile() {
    const { userData, updateUser } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(userData);
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
        setIsEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleCancel = () => {
        setFormData(userData);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-black">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-[#39d639] text-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                                <User className="w-10 h-10 text-black" />
                            </div>
                            <div>
                                <h1 className="text-black 2xl font-bold">
                                    {userData.name || "Usuário"}
                                </h1>
                                <p className="text-black red-100">
                                    {userData.email || "Configure seu perfil"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Success Message */}
                    {saved && (
                        <div className="bg-gray-700 border-l border-green-500 p-4">
                            <p className="text-white font-medium">
                                ✓ Dados salvos com sucesso!
                            </p>
                        </div>
                    )}

                    {/* Profile Form */}
                    <form onSubmit={handleSubmit} className="bg-gray-800 border-t border-gray-300 p-6">
                        <div className="flex justify-between items-center mb-6 bg-gray-700 border border-white p-4 rounded-lg">
                            <h2 className="text-white xl font-bold">Informações Pessoais</h2>
                            {!isEditing ? (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 bg-[#39d639] text-black px-4 py-2 rounded-lg hover:bg-[#2bc42b] transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                    Editar Perfil
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="bg-gray-600 text-white px-4 py-2 border border-gray-200 rounded-lg hover:bg-yellow-400 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 bg-green-600 text-white white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        Salvar
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white white">
                            <div>
                                <label className="block text-white sm font-medium text-white white mb-2">
                                    Nome Completo
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="bg-gray-900 w-full px-4 py-2 border border-gray-300 text-gray-200 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed"
                                    placeholder="Seu nome completo"
                                />
                            </div>

                            <div>
                                <label className="block text-white sm font-medium text-white gray-700 mb-2">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="bg-gray-900 w-full px-4 py-2 border border-gray-300 text-gray-200 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed"
                                    placeholder="seu@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-white sm font-medium text-white gray-700 mb-2">
                                    Telefone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="bg-gray-900 w-full px-4 py-2 border border-gray-300 text-gray-200 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed"
                                    placeholder="(11) 98765-4321"
                                />
                            </div>

                            <div>
                                <label className="block text-white sm font-medium text-white gray-700 mb-2">
                                    CPF
                                </label>
                                <input
                                    type="text"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="bg-gray-900 w-full px-4 py-2 border border-gray-300 text-gray-200 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed"
                                    placeholder="000.000.000-00"
                                />
                            </div>
                        </div>

                        <h3 className="text-white lg font-semibold mt-8 mb-4">Endereço</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-white sm font-medium text-white gray-700 mb-2">
                                    CEP
                                </label>
                                <input
                                    type="text"
                                    name="cep"
                                    value={formData.cep}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="bg-gray-900 w-full px-4 py-2 border border-gray-300 text-gray-200 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed"
                                    placeholder="00000-000"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-white sm font-medium text-white gray-700 mb-2">
                                    Endereço
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="bg-gray-900 w-full px-4 py-2 border border-gray-300 text-gray-200 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed"
                                    placeholder="Rua, Avenida, etc."
                                />
                            </div>

                            <div>
                                <label className="block text-white sm font-medium text-white gray-700 mb-2">
                                    Número
                                </label>
                                <input
                                    type="text"
                                    name="number"
                                    value={formData.number}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="bg-gray-900 w-full px-4 py-2 border border-gray-300 text-gray-200 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed"
                                    placeholder="123"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-white sm font-medium text-white gray-700 mb-2">
                                    Complemento
                                </label>
                                <input
                                    type="text"
                                    name="complement"
                                    value={formData.complement}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="bg-gray-900 w-full px-4 py-2 border border-gray-300 text-gray-200 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed"
                                    placeholder="Apto, Bloco, etc."
                                />
                            </div>

                            <div>
                                <label className="block text-white sm font-medium text-white gray-700 mb-2">
                                    Cidade
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="bg-gray-900 w-full px-4 py-2 border border-gray-300 text-gray-200 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed"
                                    placeholder="São Paulo"
                                />
                            </div>

                            <div>
                                <label className="block text-white sm font-medium text-white gray-700 mb-2">
                                    Estado
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="bg-gray-900 w-full px-4 py-2 border border-gray-300 text-gray-200 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed"
                                    placeholder="SP"
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="mt-6 p-4 bg-red-50 rounded-lg bg-gray-800 border border-gray-200">
                                <p className="text-white sm text-white">
                                    <strong>Dica:</strong> Mantenha seus dados atualizados para agilizar futuras compras!
                                </p>
                            </div>
                        )}
                    </form>
                </div>

                {/* Additional Info */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-300 pt-6">
                    <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-300">
                        <h3 className="font-semibold text-white lg mb-2">Pedidos Recentes</h3>
                        <p className="text-white gray-600 text-white sm">
                            Você ainda não realizou nenhum pedido.
                        </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-300">
                        <h3 className="font-semibold text-white lg mb-2">Preferências</h3>
                        <p className="text-white gray-600 text-white sm">
                            Configure suas preferências de notificação e privacidade.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}