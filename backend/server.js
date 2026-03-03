require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const cron = require('node-cron');
const Order = require('./src/models/Order');
const Product = require('./src/models/Product');

// Roda todo dia à meia-noite (0 0 * * *)
cron.schedule('0 0 * * *', async () => {
    console.log('⏳ Rodando rotina de verificação de pedidos não pagos...');
    try {
        // Pega a data de 5 dias atrás
        const dataLimite = new Date();
        dataLimite.setDate(dataLimite.getDate() - 5);

        // Acha pedidos pendentes criados antes da data limite
        const pedidosExpirados = await Order.find({ 
            status: 'pendente', 
            createdAt: { $lt: dataLimite } 
        });

        for (let pedido of pedidosExpirados) {
            pedido.status = 'cancelado';
            await pedido.save();

            // Devolve os estoques
            for (let item of pedido.produtos) {
                await Product.findOneAndUpdate(
                    { _id: item.produto, "variacoes.tamanho": item.tamanho },
                    { $inc: { "variacoes.$.estoque": item.quantidade } }
                );
            }
        }
        console.log(`✅ Foram cancelados ${pedidosExpirados.length} pedidos expirados.`);
    } catch (erro) {
        console.error('Erro na rotina de cancelamento:', erro);
    }
});
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor da Japoloja rodando na porta ${PORT}`);
});