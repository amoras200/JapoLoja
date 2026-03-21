const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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

        const codigo = Math.floor(100000 + Math.random() * 900000).toString();
        const expiracao = Date.now() + 10 * 60 * 1000;

        let usuario = await User.findOne({ email });
        
        if (!usuario) {
            usuario = new User({ email });
        }

        usuario.codigoLogin = codigo;
        usuario.expiracaoCodigo = expiracao;
        await usuario.save();

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

        const usuario = await User.findOne({ email }).select('+codigoLogin +expiracaoCodigo');

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        if (usuario.codigoLogin !== codigo || usuario.expiracaoCodigo < Date.now()) {
            return res.status(401).json({ erro: 'Código inválido ou expirado.' });
        }

        usuario.codigoLogin = undefined;
        usuario.expiracaoCodigo = undefined;
        await usuario.save();

        const token = jwt.sign(
            { id: usuario._id, role: usuario.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' } 
        );

        res.status(200).json({
            mensagem: 'Login bem-sucedido',
            token,
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                cpf: usuario.cpf,
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
        const usuarioId = req.usuario.id; 
        // Adicionamos o email na desestruturação
        const { nome, email, enderecos, cpf } = req.body;

        const usuarioAtualizado = await User.findByIdAndUpdate(
            usuarioId,
            { nome, email, enderecos, cpf }, // Adicionamos o email aqui também
            { new: true, runValidators: true } 
        );

        res.status(200).json({
            mensagem: 'Perfil atualizado com sucesso.',
            usuario: usuarioAtualizado
        });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao atualizar perfil: ' + erro.message });
    }
};