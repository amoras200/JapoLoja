const mongoose = require('mongoose');

const enderecoSchema = new mongoose.Schema({
    rua: { type: String, required: true },
    numero: { type: String, required: true },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    cep: { type: String, required: true },
    complemento: { type: String }
}, { _id: true }); 

const userSchema = new mongoose.Schema({
    nome: { type: String, trim: true },
    cpf: { type: String, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    enderecos: [enderecoSchema],
    role: {
        type: String,
        enum: ['cliente', 'admin'],
        default: 'cliente'
    },
    codigoLogin: { type: String, select: false },
    expiracaoCodigo: { type: Date, select: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);