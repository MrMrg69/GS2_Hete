// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Certifique-se de que a URL está correta

export const registerUser = async (userData: { nome: string; sobrenome: string; dataNascimento: string; email: string; senha: string }) => {
  return await axios.post(`${API_BASE_URL}/auth/register`, userData).then((response) => response.data);
};

export const loginUser = async (credentials: { email: string; senha: string }) => {
  return await axios.post(`${API_BASE_URL}/auth/login`, credentials).then((response) => response.data);
};

export const getCars = async (token: string) => {
  return await axios.get(`${API_BASE_URL}/cars`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((response) => response.data);
};

export const addCar = async (token: string, carData: { marca: string; modelo: string; ano: string }) => {
  return await axios.post(`${API_BASE_URL}/cars`, carData, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((response) => response.data);
};
