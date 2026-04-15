import { useState, useEffect } from 'react';
import { X, Plus, Trash2, UploadCloud } from 'lucide-react';
import { apiProducts } from '../../services/apiProducts';

export function ProductModal({ isOpen, onClose, onSuccess, produtoEditando }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [versao, setVersao] = useState('Jogador');
  const [imagens, setImagens] = useState(null);
  
  const [variacoes, setVariacoes] = useState([{ tamanho: 'M', estoque: 10 }]);
  const [loading, setLoading] = useState(false);

  // Esse hook roda toda vez que o Modal abre. 
  // Ele checa: É para editar ou para criar?
  useEffect(() => {
    if (isOpen) {
      if (produtoEditando) {
        setNome(produtoEditando.nome || '');
        setDescricao(produtoEditando.descricao || '');
        setPreco(produtoEditando.preco || '');
        setVersao(produtoEditando.versao || 'Jogador');
        
        if (produtoEditando.variacoes && produtoEditando.variacoes.length > 0) {
          setVariacoes(produtoEditando.variacoes);
        } else {
          setVariacoes([{ tamanho: 'M', estoque: 10 }]);
        }
        
        setImagens(null); // Zera o input de imagens (o backend mantém as antigas se não mandar novas)
      } else {
        // Limpa tudo se for "Novo Produto"
        setNome('');
        setDescricao('');
        setPreco('');
        setVersao('Jogador');
        setVariacoes([{ tamanho: 'M', estoque: 10 }]);
        setImagens(null);
      }
    }
  }, [isOpen, produtoEditando]);

  if (!isOpen) return null;

  const adicionarVariacao = () => {
    setVariacoes([...variacoes, { tamanho: '', estoque: 0 }]);
  };

  const removerVariacao = (index) => {
    const novasVariacoes = variacoes.filter((_, i) => i !== index);
    setVariacoes(novasVariacoes);
  };

  const atualizarVariacao = (index, campo, valor) => {
    const novasVariacoes = [...variacoes];
    novasVariacoes[index][campo] = campo === 'estoque' ? Number(valor) : valor;
    setVariacoes(novasVariacoes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('descricao', descricao);
      formData.append('preco', Number(preco));
      formData.append('versao', versao);
      
      formData.append('variacoes', JSON.stringify(variacoes));

      // Só envia as imagens se o usuário tiver selecionado fotos novas
      if (imagens) {
        for (let i = 0; i < imagens.length; i++) {
          formData.append('imagens', imagens[i]);
        }
      } else if (!produtoEditando) {
        // Se for criar, é obrigatório ter imagem. Editando, não.
        alert("Selecione pelo menos uma imagem para o novo produto.");
        setLoading(false);
        return;
      }

      if (produtoEditando) {
        await apiProducts.atualizar(produtoEditando._id, formData);
        alert("Manto atualizado com sucesso!");
      } else {
        await apiProducts.criar(formData);
        alert("Manto cadastrado com sucesso!");
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao salvar produto. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        
        <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#3a3a3a] p-6 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-white">
            {produtoEditando ? 'Editar Manto' : 'Cadastrar Novo Manto'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Nome do Produto</label>
              <input type="text" required value={nome} onChange={e => setNome(e.target.value)}
                className="w-full bg-black border border-[#3a3a3a] rounded-lg px-4 py-2 text-white focus:border-[#39d639] focus:outline-none"
                placeholder="Ex: Camisa Real Madrid 24/25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Preço (R$)</label>
              <input type="number" step="0.01" required value={preco} onChange={e => setPreco(e.target.value)}
                className="w-full bg-black border border-[#3a3a3a] rounded-lg px-4 py-2 text-white focus:border-[#39d639] focus:outline-none"
                placeholder="249.90"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Versão</label>
            <select value={versao} onChange={e => setVersao(e.target.value)}
              className="w-full bg-black border border-[#3a3a3a] rounded-lg px-4 py-2 text-white focus:border-[#39d639] focus:outline-none"
            >
              <option value="Tailandesa">Tailandesa</option>
              <option value="Jogador">Jogador</option>
              <option value="Torcedor">Torcedor</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Descrição Detalhada</label>
            <textarea required value={descricao} onChange={e => setDescricao(e.target.value)} rows="3"
              className="w-full bg-black border border-[#3a3a3a] rounded-lg px-4 py-2 text-white focus:border-[#39d639] focus:outline-none"
              placeholder="Descreva os detalhes do manto..."
            />
          </div>

          <div className="bg-black border border-dashed border-[#3a3a3a] rounded-lg p-6 text-center hover:border-[#39d639] transition-colors relative">
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              required={!produtoEditando} // Só é obrigatório se for um Novo Produto
              onChange={e => setImagens(e.target.files)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center text-gray-400">
              <UploadCloud size={40} className="mb-2 text-[#39d639]" />
              <p className="font-medium text-white mb-1">
                {imagens 
                  ? `${imagens.length} arquivo(s) selecionado(s)` 
                  : produtoEditando 
                    ? 'Arraste fotos novas para substituir as atuais'
                    : 'Clique ou arraste as fotos aqui'
                }
              </p>
              <p className="text-xs">Máximo de 5 imagens (PNG, JPG)</p>
            </div>
          </div>

          <div className="border-t border-[#3a3a3a] pt-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-bold text-[#39d639] uppercase tracking-wider">Tamanhos e Estoque</label>
              <button type="button" onClick={adicionarVariacao} className="text-xs bg-[#2a2a2a] text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-700">
                <Plus size={14} /> Adicionar
              </button>
            </div>
            
            <div className="space-y-3">
              {variacoes.map((varItem, index) => (
                <div key={index} className="flex items-center gap-4 bg-black p-3 rounded-lg border border-[#3a3a3a]">
                  <div className="flex-1">
                    <input type="text" placeholder="Tamanho (Ex: M)" required value={varItem.tamanho} onChange={e => atualizarVariacao(index, 'tamanho', e.target.value)}
                      className="w-full bg-transparent border-b border-[#3a3a3a] px-2 py-1 text-white focus:border-[#39d639] focus:outline-none uppercase"
                    />
                  </div>
                  <div className="flex-1">
                    <input type="number" placeholder="Qtd Estoque" required min="0" value={varItem.estoque} onChange={e => atualizarVariacao(index, 'estoque', e.target.value)}
                      className="w-full bg-transparent border-b border-[#3a3a3a] px-2 py-1 text-white focus:border-[#39d639] focus:outline-none"
                    />
                  </div>
                  <button type="button" onClick={() => removerVariacao(index)} className="text-red-400 hover:text-red-300 p-2" disabled={variacoes.length === 1}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#3a3a3a] pt-6 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg font-bold text-gray-400 hover:bg-[#2a2a2a] transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="bg-[#39d639] text-black px-8 py-2 rounded-lg font-bold hover:bg-[#2bc42b] transition-colors flex items-center gap-2">
              {loading ? 'Salvando...' : (produtoEditando ? 'Atualizar Produto' : 'Salvar Produto')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}