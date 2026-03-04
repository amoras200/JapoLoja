const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas de Login (Públicas)
router.post('/solicitar-codigo', userController.solicitarCodigo);
router.post('/validar-codigo', userController.validarCodigo);

// Rota de Perfil (Privada - Precisa do Token do cliente logado)
router.put('/perfil', authMiddleware.verificarToken, userController.atualizarPerfil);

module.exports = router;