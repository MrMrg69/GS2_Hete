// routes/auth.js
const express = require('express');
const router = express.Router(); // Aqui é onde o objeto router é definido
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro de usuário
router.post('/register', async (req, res) => {
  const { nome, sobrenome, dataNascimento, email, senha } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }
    user = new User({ nome, sobrenome, dataNascimento, email, senha });
    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(senha))) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, message: 'Login bem-sucedido' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router; // Aqui o router é exportado para ser usado em server.js
