const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas do Cliente
router.post('/frete', orderController.calcularFrete);
router.post('/', authMiddleware.verificarToken, orderController.criarPedido);
router.get('/meus-pedidos', authMiddleware.verificarToken, orderController.listarMeusPedidos);
router.put('/:id/cancelar', authMiddleware.verificarToken, orderController.cancelarMeuPedido);

// Rotas do Admin
router.get('/', authMiddleware.verificarToken, authMiddleware.verificarAdmin, orderController.listarPedidos);
router.put('/:id/enviar', authMiddleware.verificarToken, authMiddleware.verificarAdmin, orderController.enviarPedido);

module.exports = router;