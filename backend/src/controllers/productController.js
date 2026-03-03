const Product = require('../models/Product');

exports.criarProduto = async (req, res) => {
    try {
        // Pega a URL da imagem que o Cloudinary devolveu
        const imagemUrl = req.file ? req.file.path : '';

        if (!imagemUrl) {
            return res.status(400).json({ erro: 'A imagem do produto é obrigatória.' });
        }

        // Transforma o texto do form-data de volta em um Array de Objetos (Variações)
        let variacoesFormatadas = [];
        if (req.body.variacoes) {
            try {
                variacoesFormatadas = JSON.parse(req.body.variacoes);
            } catch (e) {
                return res.status(400).json({ erro: 'Formato de variações inválido. Envie um JSON válido.' });
            }
        }

        const novoProduto = new Product({
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            cor: req.body.cor,
            versao: req.body.versao,
            imagem: imagemUrl,
            variacoes: variacoesFormatadas
        });

        const produtoSalvo = await novoProduto.save();
        res.status(201).json(produtoSalvo);
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

exports.atualizarProduto = async (req, res) => {
    try {
        // Copia os dados que vieram do corpo da requisição
        const dadosAtualizados = { ...req.body };

        // Se o admin mandou uma imagem nova, atualiza a URL
        if (req.file) {
            dadosAtualizados.imagem = req.file.path;
        }

        // Se o admin mandou novos tamanhos/estoques, formata novamente
        if (req.body.variacoes) {
            try {
                dadosAtualizados.variacoes = JSON.parse(req.body.variacoes);
            } catch (e) {
                return res.status(400).json({ erro: 'Formato de variações inválido. Envie um JSON válido.' });
            }
        }

        const produtoAtualizado = await Product.findByIdAndUpdate(req.params.id, dadosAtualizados, { new: true });
        if (!produtoAtualizado) return res.status(404).json({ mensagem: 'Produto não encontrado' });
        res.status(200).json(produtoAtualizado);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
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