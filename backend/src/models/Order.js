const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    codigoPedido: { type: String, unique: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    produtos: [
        {
            produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
            tamanho: { type: String, required: true },
            quantidade: { type: Number, required: true },
            precoUnitario: { type: Number, required: true }
        }
    ],
    valorProdutos: { type: Number, required: true },
    valorFrete: { type: Number, required: true, default: 0 },
    valorTotal: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pendente', 'pago', 'enviado', 'cancelado'],
        default: 'pendente'
    },
    codigoRastreio: { type: String },
    enderecoEntrega: {
        rua: String, numero: String, bairro: String,
        cidade: String, estado: String, cep: String
    }
}, { timestamps: true });

// Gatilho corrigido (sem o parâmetro next)
orderSchema.pre('save', function() {
    if (!this.codigoPedido) {
        this.codigoPedido = 'JP-' + Math.floor(100000 + Math.random() * 900000);
    }
});

module.exports = mongoose.model('Order', orderSchema);