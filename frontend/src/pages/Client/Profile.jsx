import { useState, useEffect } from 'react';
import { User, Save, MapPin, Trash2, Plus, Search, Loader2 } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { apiUsers } from '../../services/apiUsers';

export function Profile() {
  const { user, token, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

  const [dadosPessoais, setDadosPessoais] = useState({
    nome: '',
    email: '',
    cpf: ''
  });

  const [enderecos, setEnderecos] = useState([]);

  const [novoEndereco, setNovoEndereco] = useState({
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  useEffect(() => {
    if (user) {
      setDadosPessoais({
        nome: user.nome || '',
        email: user.email || '',
        cpf: user.cpf || ''
      });
      setEnderecos(user.enderecos || []);
    }
  }, [user]);

  const handleDadosChange = (e) => {
    setDadosPessoais({ ...dadosPessoais, [e.target.name]: e.target.value });
  };

  const handleCpfChange = (e) => {
    const valorLimpo = e.target.value.replace(/\D/g, '').slice(0, 11);
    setDadosPessoais({ ...dadosPessoais, cpf: valorLimpo });
  };

  const handleEnderecoChange = (e) => {
    setNovoEndereco({ ...novoEndereco, [e.target.name]: e.target.value });
  };

  const buscarCep = async () => {
    const cepLimpo = novoEndereco.cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setNovoEndereco(prev => ({
          ...prev,
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        }));
      } else {
        mostrarMensagem('CEP não encontrado', 'erro');
      }
    } catch (error) {
      mostrarMensagem('Erro ao buscar o CEP', 'erro');
    } finally {
      setLoading(false);
    }
  };

  const mostrarMensagem = (texto, tipo) => {
    setMensagem({ texto, tipo });
    setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3000);
  };

  const salvarNoBanco = async (dadosCompletos) => {
    setLoading(true);
    try {
      const resposta = await apiUsers.atualizarPerfil(dadosCompletos);
      login(token, resposta.usuario);
      mostrarMensagem('Perfil atualizado com sucesso!', 'sucesso');
    } catch (error) {
      mostrarMensagem('Erro ao salvar as alterações.', 'erro');
    } finally {
      setLoading(false);
    }
  };

  const handleSalvarDadosPessoais = (e) => {
    e.preventDefault();
    if (dadosPessoais.cpf && dadosPessoais.cpf.length !== 11) {
      mostrarMensagem('O CPF precisa ter exatamente 11 números.', 'erro');
      return;
    }
    
    salvarNoBanco({
      nome: dadosPessoais.nome,
      email: dadosPessoais.email,
      cpf: dadosPessoais.cpf,
      enderecos: enderecos
    });
  };

  const handleAdicionarEndereco = (e) => {
    e.preventDefault();
    const novaListaEnderecos = [...enderecos, novoEndereco];
    
    setEnderecos(novaListaEnderecos);
    
    salvarNoBanco({
      nome: dadosPessoais.nome,
      email: dadosPessoais.email,
      cpf: dadosPessoais.cpf,
      enderecos: novaListaEnderecos
    });
    
    setNovoEndereco({ cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '' });
  };

  const handleRemoverEndereco = (idRemover) => {
    const novaListaEnderecos = enderecos.filter(end => end._id !== idRemover);
    setEnderecos(novaListaEnderecos);
    
    salvarNoBanco({
      nome: dadosPessoais.nome,
      email: dadosPessoais.email,
      cpf: dadosPessoais.cpf,
      enderecos: novaListaEnderecos
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-black text-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="bg-[#1a1a1a] rounded-lg shadow-2xl border border-[#3a3a3a] overflow-hidden mb-8">
          <div className="bg-[#39d639] p-6 flex items-center gap-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <User size={32} className="text-[#39d639]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black uppercase tracking-wider">
                {dadosPessoais.nome || "Meu Perfil"}
              </h1>
              <p className="text-black/80 font-medium">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {mensagem.texto && (
          <div className={`p-4 rounded-lg mb-6 font-bold text-center border ${
            mensagem.tipo === 'sucesso' ? 'bg-green-900/30 border-green-500 text-green-400' : 'bg-red-900/30 border-red-500 text-red-400'
          }`}>
            {mensagem.texto}
          </div>
        )}

        <div className="bg-[#1a1a1a] rounded-lg border border-[#3a3a3a] p-6 mb-8">
          <h2 className="text-xl font-bold text-[#39d639] uppercase mb-6 flex items-center gap-2">
            <User size={24} />
            Dados Pessoais
          </h2>

          <form onSubmit={handleSalvarDadosPessoais}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Nome Completo</label>
                <input
                  type="text"
                  name="nome"
                  value={dadosPessoais.nome}
                  onChange={handleDadosChange}
                  className="w-full bg-black border border-[#3a3a3a] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39d639]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase mb-2">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={dadosPessoais.email}
                  onChange={handleDadosChange}
                  required
                  className="w-full bg-black border border-[#3a3a3a] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39d639]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-400 uppercase mb-2">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={dadosPessoais.cpf}
                  onChange={handleCpfChange}
                  required
                  placeholder="Apenas números (11 dígitos)"
                  className="w-full bg-black border border-[#3a3a3a] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39d639]"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-[#39d639] text-black px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[#2bc42b] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Salvar Dados Pessoais
            </button>
          </form>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg border border-[#3a3a3a] p-6">
          <h2 className="text-xl font-bold text-[#39d639] uppercase mb-6 flex items-center gap-2">
            <MapPin size={24} />
            Meus Endereços
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {enderecos.length === 0 ? (
              <p className="text-gray-500 italic col-span-2">Nenhum endereço cadastrado.</p>
            ) : (
              enderecos.map((end) => (
                <div key={end._id} className="bg-black border border-[#3a3a3a] rounded-lg p-4 relative group">
                  <p className="font-bold text-white">{end.rua}, {end.numero}</p>
                  <p className="text-sm text-gray-400">{end.complemento}</p>
                  <p className="text-sm text-gray-400">{end.bairro} - {end.cidade}/{end.estado}</p>
                  <p className="text-sm text-[#39d639] mt-2 font-mono">CEP: {end.cep}</p>
                  
                  <button
                    onClick={() => handleRemoverEndereco(end._id)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-[#3a3a3a] pt-8">
            <h3 className="text-lg font-bold text-white uppercase mb-4">Adicionar Novo Endereço</h3>
            
            <form onSubmit={handleAdicionarEndereco}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-400 uppercase mb-2">CEP</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="cep"
                      value={novoEndereco.cep}
                      onChange={handleEnderecoChange}
                      required
                      className="w-full bg-black border border-[#3a3a3a] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39d639]"
                    />
                    <button
                      type="button"
                      onClick={buscarCep}
                      className="bg-[#3a3a3a] text-white px-4 rounded-lg hover:bg-[#4a4a4a] transition-colors"
                    >
                      <Search size={20} />
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Rua / Avenida</label>
                  <input
                    type="text"
                    name="rua"
                    value={novoEndereco.rua}
                    onChange={handleEnderecoChange}
                    required
                    className="w-full bg-black border border-[#3a3a3a] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39d639]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Número</label>
                  <input
                    type="text"
                    name="numero"
                    value={novoEndereco.numero}
                    onChange={handleEnderecoChange}
                    required
                    className="w-full bg-black border border-[#3a3a3a] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39d639]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Complemento</label>
                  <input
                    type="text"
                    name="complemento"
                    value={novoEndereco.complemento}
                    onChange={handleEnderecoChange}
                    className="w-full bg-black border border-[#3a3a3a] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39d639]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Bairro</label>
                  <input
                    type="text"
                    name="bairro"
                    value={novoEndereco.bairro}
                    onChange={handleEnderecoChange}
                    required
                    className="w-full bg-black border border-[#3a3a3a] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39d639]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    value={novoEndereco.cidade}
                    onChange={handleEnderecoChange}
                    required
                    className="w-full bg-black border border-[#3a3a3a] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39d639]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Estado</label>
                  <input
                    type="text"
                    name="estado"
                    value={novoEndereco.estado}
                    onChange={handleEnderecoChange}
                    required
                    maxLength={2}
                    className="w-full bg-black border border-[#3a3a3a] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39d639]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full border-2 border-[#39d639] text-[#39d639] px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[#39d639] hover:text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Plus size={20} />
                Adicionar Endereço
              </button>
            </form>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}