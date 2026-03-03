const mongoose = require('mongoose');

// Sub-esquema para organizar os tamanhos e seus respectivos estoques
const variacaoSchema = new mongoose.Schema({
    tamanho: { type: String, required: true },
    estoque: { type: Number, required: true, default: 0 }
}, { _id: false }); // Desativamos o _id aqui para deixar o banco mais limpo

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
    imagem: { type: String, required: true }, // Aqui vai ficar a URL do Cloudinary
    variacoes: [variacaoSchema] // Lista com os tamanhos e estoques
}, { timestamps: true });

module.exports = mongoose.model('Produto', produtoSchema);