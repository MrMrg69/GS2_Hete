// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Registro de usuário
router.post('/register', async (req, res) => {
  try {
    console.log('Dados recebidos no servidor:', req.body); // Log para verificar os dados recebidos
    const { nome, sobrenome, dataNascimento, email, senha } = req.body;

    if (!nome || !sobrenome || !dataNascimento || !email || !senha) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    // Cria um novo usuário (a senha será criptografada no pre-save hook do modelo)
    const newUser = new User({
      nome,
      sobrenome,
      dataNascimento,
      email,
      senha, // A senha será criptografada automaticamente
    });

    await newUser.save();
    console.log('Usuário registrado com sucesso:', newUser);
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro no servidor ao registrar usuário:', error);
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
    console.error('Erro no servidor ao fazer login:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Obter todos os usuários da base
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({}, '-senha'); // Busca todos os usuários e exclui o campo senha
    res.json(users);
  } catch (error) {
    console.error('Erro no servidor ao obter usuários:', error);
    res.status(500).json({ message: 'Erro no servidor ao obter usuários' });
  }
});

// Deletar um usuário por ID
router.delete('/users/:id', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro no servidor ao deletar usuário:', error);
    res.status(500).json({ message: 'Erro no servidor ao deletar usuário' });
  }
});

module.exports = router;
