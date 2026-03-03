const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ mensagem: 'Acesso negado: Token não fornecido' });
    }

    try {
        const tokenLimpo = token.replace('Bearer ', '');
        const verificado = jwt.verify(tokenLimpo, process.env.JWT_SECRET);
        req.usuario = verificado;
        next();
    } catch (erro) {
        res.status(400).json({ mensagem: 'Token inválido' });
    }
};

exports.verificarAdmin = (req, res, next) => {
    if (req.usuario.role !== 'admin') {
        return res.status(403).json({ mensagem: 'Acesso negado: Apenas administradores' });
    }
    next();
};