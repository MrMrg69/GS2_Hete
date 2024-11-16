const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Obter o cabeçalho de autorização
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            console.error('Erro de autenticação: Token de autenticação não fornecido.');
            return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
        }

        // Remover o prefixo 'Bearer ' do token
        const token = authHeader.replace('Bearer ', '');

        // Verificar se a chave secreta está definida no ambiente
        if (!process.env.SECRET_KEY) {
            console.error('Erro de configuração: Chave secreta não configurada no servidor.');
            return res.status(500).json({ message: 'Chave secreta não configurada no servidor.' });
        }

        // Verificar e decodificar o token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Anexar os dados decodificados ao objeto de requisição
        req.user = decoded;

        // Passar para o próximo middleware ou rota
        next();
    } catch (error) {
        console.error('Erro de autenticação: Token inválido ou erro no processo de verificação.', error);
        res.status(401).json({ message: 'Token inválido.' });
    }
};
