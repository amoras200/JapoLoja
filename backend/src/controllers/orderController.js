const Order = require('../models/Order');
const Product = require('../models/Product');
const { calcularPrecoPrazo } = require('correios-brasil');

exports.calcularFrete = async (req, res) => {
    try {
        const { cepDestino } = req.body;
        let args = {
            sCepOrigem: '01001000', // Troque pelo CEP de onde as camisas vão sair
            sCepDestino: cepDestino,
            nVlPeso: '0.3', // 300g (peso médio da camisa)
            nCdFormato: '1', 
            nVlComprimento: '20', nVlAltura: '10', nVlLargura: '15',
            nCdServico: ['04510', '04014'], // PAC e SEDEX
            nVlDiametro: '0',
        };
        const result = await calcularPrecoPrazo(args);
        res.status(200).json(result);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

exports.criarPedido = async (req, res) => {
    try {
        const { produtos, enderecoEntrega, valorFrete } = req.body;
        let valorProdutos = 0;

        for (let item of produtos) {
            const produtoBanco = await Product.findById(item.produto);
            if (!produtoBanco) return res.status(404).json({ mensagem: 'Produto não encontrado' });

            const variacao = produtoBanco.variacoes.find(v => v.tamanho === item.tamanho);
            if (!variacao || variacao.estoque < item.quantidade) {
                return res.status(400).json({ mensagem: `Estoque indisponível para ${produtoBanco.nome} tamanho ${item.tamanho}` });
            }

            item.precoUnitario = produtoBanco.preco;
            valorProdutos += item.precoUnitario * item.quantidade;
        }

        const novoPedido = new Order({
            usuario: req.usuario.id,
            produtos,
            valorProdutos,
            valorFrete: valorFrete || 0,
            valorTotal: valorProdutos + (valorFrete || 0),
            enderecoEntrega
        });

        const pedidoSalvo = await novoPedido.save();

        for (let item of produtos) {
            await Product.findOneAndUpdate(
                { _id: item.produto, "variacoes.tamanho": item.tamanho },
                { $inc: { "variacoes.$.estoque": -item.quantidade } }
            );
        }

        res.status(201).json(pedidoSalvo);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

exports.cancelarMeuPedido = async (req, res) => {
    try {
        const pedido = await Order.findOne({ _id: req.params.id, usuario: req.usuario.id });
        if (!pedido) return res.status(404).json({ mensagem: 'Pedido não encontrado' });
        if (pedido.status !== 'pendente') return res.status(400).json({ mensagem: 'Apenas pedidos pendentes podem ser cancelados' });

        pedido.status = 'cancelado';
        await pedido.save();

        // Devolve o estoque para a loja
        for (let item of pedido.produtos) {
            await Product.findOneAndUpdate(
                { _id: item.produto, "variacoes.tamanho": item.tamanho },
                { $inc: { "variacoes.$.estoque": item.quantidade } }
            );
        }
        res.status(200).json({ mensagem: 'Pedido cancelado e estoque devolvido!' });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

exports.enviarPedido = async (req, res) => {
    try {
        const { codigoRastreio } = req.body;
        const pedido = await Order.findById(req.params.id);
        if (!pedido) return res.status(404).json({ mensagem: 'Pedido não encontrado' });
        if (pedido.status !== 'pago') return res.status(400).json({ mensagem: 'Apenas pedidos PAGOS podem ser enviados' });

        pedido.status = 'enviado';
        pedido.codigoRastreio = codigoRastreio;
        await pedido.save();

        res.status(200).json({ mensagem: 'Pedido marcado como enviado!', pedido });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

exports.listarPedidos = async (req, res) => {
    try {
        const pedidos = await Order.find()
            .populate('usuario', 'nome email')
            .populate('produtos.produto', 'nome imagem');
        res.status(200).json(pedidos);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

exports.listarMeusPedidos = async (req, res) => {
    try {
        const pedidos = await Order.find({ usuario: req.usuario.id })
            .populate('produtos.produto', 'nome imagem');
        res.status(200).json(pedidos);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};