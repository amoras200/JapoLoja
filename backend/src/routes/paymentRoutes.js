const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/:id/pix', authMiddleware.verificarToken, paymentController.gerarPagamentoPix);
router.post('/webhook', paymentController.receberWebhook);

module.exports = router;