const Product = require('../models/Product');

exports.criarProduto = async (req, res) => {
    try {
        let imagensUrls = [];
        if (req.files && req.files.length > 0) {
            imagensUrls = req.files.map(file => file.path);
        }

        if (imagensUrls.length === 0) {
            return res.status(400).json({ erro: 'Pelo menos uma imagem do produto é obrigatória.' });
        }

        let variacoesFormatadas = [];
        if (req.body.variacoes) {
            try {
                variacoesFormatadas = JSON.parse(req.body.variacoes);
            } catch (e) {
                return res.status(400).json({ erro: 'Formato de variações inválido.' });
            }
        }

        const novoProduto = new Product({
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            cor: req.body.cor,
            versao: req.body.versao,
            imagens: imagensUrls,
            variacoes: variacoesFormatadas
        });

        const produtoSalvo = await novoProduto.save();
        res.status(201).json(produtoSalvo);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};

exports.atualizarProduto = async (req, res) => {
    try {
        const dadosAtualizados = { ...req.body };

        if (req.files && req.files.length > 0) {
            dadosAtualizados.imagens = req.files.map(file => file.path);
        }

        if (req.body.variacoes) {
            try {
                dadosAtualizados.variacoes = JSON.parse(req.body.variacoes);
            } catch (e) {
                return res.status(400).json({ erro: 'Formato de variações inválido.' });
            }
        }

        const produtoAtualizado = await Product.findByIdAndUpdate(req.params.id, dadosAtualizados, { new: true });
        if (!produtoAtualizado) return res.status(404).json({ mensagem: 'Produto não encontrado' });
        res.status(200).json(produtoAtualizado);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};

exports.listarProdutos = async (req, res) => {
    try {
        const produtos = await Product.find();
        res.status(200).json(produtos);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

exports.buscarProdutoPorId = async (req, res) => {
    try {
        const produto = await Product.findById(req.params.id);
        if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado' });
        res.status(200).json(produto);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

exports.deletarProduto = async (req, res) => {
    try {
        const produtoDeletado = await Product.findByIdAndDelete(req.params.id);
        if (!produtoDeletado) return res.status(404).json({ mensagem: 'Produto não encontrado' });
        res.status(200).json({ mensagem: 'Produto deletado com sucesso' });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

exports.buscarPorTermo = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(200).json([]);
    const regex = new RegExp(q, 'i');
    const produtos = await Product.find({
      $or: [
        { nome: { $regex: regex } },
        { descricao: { $regex: regex } }
      ]
    });
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao realizar a busca' });
  }
};