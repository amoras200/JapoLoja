const mongoose = require('mongoose');

const variacaoSchema = new mongoose.Schema({
    tamanho: { type: String, required: true },
    estoque: { type: Number, required: true, default: 0 }
}, { _id: false });

const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    preco: { type: Number, required: true },
    cor: { type: String },
    versao: { 
        type: String, 
        enum: ['Tailandesa', 'Jogador', 'Torcedor', 'Outro'], 
        default: 'Outro' 
    },
    imagens: [{ type: String }], 
    variacoes: [variacaoSchema] 
}, { timestamps: true });

module.exports = mongoose.model('Produto', produtoSchema);