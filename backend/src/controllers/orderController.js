const Order = require('../models/Order');
const Product = require('../models/Product');
const { calcularPrecoPrazo } = require('correios-brasil');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.calcularFrete = async (req, res) => {
    try {
        const { cepDestino } = req.body;
        let args = {
            sCepOrigem: '01001000',
            sCepDestino: cepDestino,
            nVlPeso: '0.3',
            nCdFormato: '1', 
            nVlComprimento: '20', 
            nVlAltura: '10', 
            nVlLargura: '15',
            nCdServico: ['04510', '04014'],
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
        const pedido = await Order.findById(req.params.id).populate('usuario', 'nome email');
        
        if (!pedido) return res.status(404).json({ mensagem: 'Pedido não encontrado' });
        if (pedido.status !== 'pago') return res.status(400).json({ mensagem: 'Apenas pedidos PAGOS podem ser enviados' });

        pedido.status = 'enviado';
        pedido.codigoRastreio = codigoRastreio;
        await pedido.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: pedido.usuario.email,
            subject: 'Seu Manto foi Enviado! 🚀 - JAPO Sports',
            html: `
                <h2>Olá, ${pedido.usuario.nome}!</h2>
                <p>Ótimas notícias! O seu pedido <strong>${pedido.codigoPedido || pedido._id}</strong> acabou de ser enviado.</p>
                <p>Você pode acompanhar a entrega usando o código de rastreio abaixo:</p>
                <h3 style="background: #eee; padding: 10px; display: inline-block;">${codigoRastreio}</h3>
                <p>Obrigado por comprar com a JAPO Sports!</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
        });

        res.status(200).json({ mensagem: 'Pedido marcado como enviado e e-mail disparado!', pedido });
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