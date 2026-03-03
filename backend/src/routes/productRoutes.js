const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/cloudinary');

// Rotas Públicas (Qualquer pessoa, logada ou não, pode ver os produtos)
router.get('/', productController.listarProdutos);
router.get('/:id', productController.buscarProdutoPorId);

// Rotas Protegidas (Apenas Admin com Token JWT válido)
// upload.single('imagem') intercepta o arquivo enviado com o campo 'imagem'
router.post('/', authMiddleware.verificarToken, authMiddleware.verificarAdmin, upload.single('imagem'), productController.criarProduto);
router.put('/:id', authMiddleware.verificarToken, authMiddleware.verificarAdmin, upload.single('imagem'), productController.atualizarProduto);
router.delete('/:id', authMiddleware.verificarToken, authMiddleware.verificarAdmin, productController.deletarProduto);

module.exports = router;