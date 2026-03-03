const mongoose = require('mongoose');

// Criamos um sub-schema para os endereços, assim o utilizador pode ter vários
const enderecoSchema = new mongoose.Schema({
    rua: { type: String, required: true },
    numero: { type: String, required: true },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    cep: { type: String, required: true },
    complemento: { type: String }
}, { _id: true }); // O _id: true permite editar ou remover um endereço específico depois

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        trim: true
        // Removido o 'required: true'. Só será preenchido mais tarde na Minha Conta ou Checkout
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    enderecos: [enderecoSchema], // Agora é um array (lista) de endereços
    role: {
        type: String,
        enum: ['cliente', 'admin'],
        default: 'cliente'
    },
    // ---- Campos temporários para o Login sem Palavra-passe ----
    codigoLogin: {
        type: String,
        select: false // Evita que o código seja exposto acidentalmente ao procurar utilizadores
    },
    expiracaoCodigo: {
        type: Date,
        select: false
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);