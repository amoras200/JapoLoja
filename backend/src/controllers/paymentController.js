const { MercadoPagoConfig, Payment } = require('mercadopago');
const Order = require('../models/Order');

exports.gerarPagamentoPix = async (req, res) => {
    try {
        const pedido = await Order.findById(req.params.id).populate('usuario', 'email nome cpf');
        
        if (!pedido) return res.status(404).json({ mensagem: 'Pedido não encontrado' });
        if (pedido.status !== 'pendente') return res.status(400).json({ mensagem: 'Este pedido já foi pago ou cancelado' });

        if (!pedido.usuario.cpf) {
            return res.status(400).json({ 
                mensagem: 'CPF obrigatório para gerar o pagamento. Por favor, atualize o seu perfil na Minha Conta antes de finalizar o pedido.' 
            });
        }

        const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
        const payment = new Payment(client);

        const cpfLimpo = pedido.usuario.cpf.replace(/\D/g, '');

        const dadosPagamento = {
            transaction_amount: pedido.valorTotal,
            description: `Pedido Japoloja - ${pedido.codigoPedido || pedido._id}`,
            payment_method_id: 'pix',
            payer: {
                email: pedido.usuario.email,
                first_name: pedido.usuario.nome || 'Cliente',
                identification: {
                    type: 'CPF',
                    number: cpfLimpo
                }
            },
            external_reference: pedido._id.toString()
        };

        const resposta = await payment.create({ body: dadosPagamento });

        res.status(200).json({
            mensagem: 'Cobrança PIX gerada com sucesso',
            pedidoId: pedido._id,
            valor: pedido.valorTotal,
            pixCopiaECola: resposta.point_of_interaction.transaction_data.qr_code,
            qrCode: resposta.point_of_interaction.transaction_data.qr_code_base64
        });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

// exports.receberWebhook = async (req, res) => {
//     try {
//         const { id, topic } = req.query;

//         if (topic === 'payment' && id) {
//             const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
//             const payment = new Payment(client);

//             const pagamentoInfo = await payment.get({ id });

//             if (pagamentoInfo.status === 'approved') {
//                 const pedidoId = pagamentoInfo.external_reference;
//                 await Order.findByIdAndUpdate(pedidoId, { status: 'pago' });
//                 console.log(`Sucesso! Pedido ${pedidoId} foi pago no PIX.`);
//             }
//         }
//         res.status(200).send();
//     } catch (erro) {
//         console.error('Erro no Webhook:', erro);
//         res.status(500).json({ erro: erro.message });
//     }
// };

exports.receberWebhook = async (req, res) => {
    try {
        const id = req.query.id || (req.body && req.body.data && req.body.data.id);
        
        if (id) {
            const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
            const payment = new Payment(client);

            const pagamentoInfo = await payment.get({ id });

            if (pagamentoInfo.status === 'approved') {
                const pedidoId = pagamentoInfo.external_reference;
                await Order.findByIdAndUpdate(pedidoId, { status: 'pago' });
                console.log(`Sucesso! Pedido ${pedidoId} foi pago no PIX.`);
            }
        }
        res.status(200).send();
    } catch (erro) {
        console.error('Erro no Webhook:', erro);
        res.status(500).json({ erro: erro.message });
    }
};