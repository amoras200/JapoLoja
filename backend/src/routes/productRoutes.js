const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/cloudinary');

router.get('/', productController.listarProdutos);
router.get('/busca', productController.buscarPorTermo);
router.get('/:id', productController.buscarProdutoPorId);

router.post('/', 
    authMiddleware.verificarToken, 
    authMiddleware.verificarAdmin, 
    upload.array('imagens', 5), 
    productController.criarProduto
);

router.put('/:id', 
    authMiddleware.verificarToken, 
    authMiddleware.verificarAdmin, 
    upload.array('imagens', 5), 
    productController.atualizarProduto
);

router.delete('/:id', 
    authMiddleware.verificarToken, 
    authMiddleware.verificarAdmin, 
    productController.deletarProduto
);

module.exports = router;