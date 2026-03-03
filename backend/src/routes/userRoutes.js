const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rotas públicas (qualquer pessoa pode acessar para fazer login)
router.post('/solicitar-codigo', userController.solicitarCodigo);
router.post('/validar-codigo', userController.validarCodigo);

// Rota protegida (o cliente precisa enviar o Token JWT no header para acessar)
router.put('/atualizar-perfil', verificarToken, userController.atualizarPerfil);

module.exports = router;