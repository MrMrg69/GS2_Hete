const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Car = require('../models/Car');

// Adicionar um novo carro
router.post('/', auth, async (req, res) => {
  const { marca, modelo, ano } = req.body;
  try {
    const car = new Car({ marca, modelo, ano, usuarioId: req.user.userId });
    await car.save();
    res.status(201).json({ message: 'Carro adicionado com sucesso', car });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Obter todos os carros do usuário
router.get('/', auth, async (req, res) => {
  try {
    const cars = await Car.find({ usuarioId: req.user.userId });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Obter todos os carros da base
router.get('/all', auth, async (req, res) => {
  try {
    const cars = await Car.find(); // Busca todos os carros na base
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Excluir um carro por ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ _id: req.params.id, usuarioId: req.user.userId });
    if (!car) {
      return res.status(404).json({ message: 'Carro não encontrado' });
    }
    res.status(200).json({ message: 'Carro deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar carro:', error);
    res.status(500).json({ message: 'Erro no servidor ao deletar carro' });
  }
});

module.exports = router;
