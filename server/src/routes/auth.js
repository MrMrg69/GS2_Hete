const jwt = require('jsonwebtoken');

// Login de usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(senha))) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }
    
    // Verifique se a chave secreta está definida antes de gerar o token
    if (!process.env.SECRET_KEY) {
        return res.status(500).json({ message: 'Chave secreta não configurada no servidor.' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, message: 'Login bem-sucedido' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});
