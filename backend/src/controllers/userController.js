const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Configuração do disparador de emails (Nodemailer)
// Recomendo usar um email do Gmail para testes com "Senha de App"
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.solicitarCodigo = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ erro: 'O email é obrigatório.' });
        }

        // Gera um código de 6 dígitos
        const codigo = Math.floor(100000 + Math.random() * 900000).toString();
        // Define a expiração para 10 minutos a partir de agora
        const expiracao = Date.now() + 10 * 60 * 1000;

        // Procura o usuário. Se não existir, cria um novo só com o email
        let usuario = await User.findOne({ email });
        
        if (!usuario) {
            usuario = new User({ email });
        }

        // Atualiza o código e a expiração no banco
        usuario.codigoLogin = codigo;
        usuario.expiracaoCodigo = expiracao;
        await usuario.save();

        // Envia o email com o código
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Seu código de acesso - JAPO Sports',
            text: `Seu código de acesso é: ${codigo}. Ele expira em 10 minutos.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ mensagem: 'Código enviado para o seu email com sucesso.' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao solicitar código: ' + erro.message });
    }
};

exports.validarCodigo = async (req, res) => {
    try {
        const { email, codigo } = req.body;

        // Procura o usuário e pede para trazer os campos ocultos de código e expiração (+campo)
        const usuario = await User.findOne({ email }).select('+codigoLogin +expiracaoCodigo');

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        // Verifica se o código bate e se não passou de 10 minutos
        if (usuario.codigoLogin !== codigo || usuario.expiracaoCodigo < Date.now()) {
            return res.status(401).json({ erro: 'Código inválido ou expirado.' });
        }

        // Se deu tudo certo, limpa o código do banco por segurança
        usuario.codigoLogin = undefined;
        usuario.expiracaoCodigo = undefined;
        await usuario.save();

        // Gera o Token JWT igual no sistema antigo
        const token = jwt.sign(
            { id: usuario._id, role: usuario.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' } // Aumentei para 7 dias para o cliente não deslogar toda hora
        );

        res.status(200).json({
            mensagem: 'Login bem-sucedido',
            token,
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                role: usuario.role,
                enderecos: usuario.enderecos
            }
        });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao validar código: ' + erro.message });
    }
};

exports.atualizarPerfil = async (req, res) => {
    try {
        // O id vem do token validado pelo authMiddleware
        const usuarioId = req.usuario.id; 
        const { nome, enderecos } = req.body;

        const usuarioAtualizado = await User.findByIdAndUpdate(
            usuarioId,
            { nome, enderecos },
            { new: true, runValidators: true } // Retorna o usuário já atualizado
        );

        res.status(200).json({
            mensagem: 'Perfil atualizado com sucesso.',
            usuario: usuarioAtualizado
        });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao atualizar perfil: ' + erro.message });
    }
};