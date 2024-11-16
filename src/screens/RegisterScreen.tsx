// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import styles from '../styles/RegisterScreenStyles';
import { registerUser } from '../services/api';
import axios from 'axios';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    email: '',
    senha: '',
  });
  const [errors, setErrors] = useState({
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    email: '',
    senha: '',
  });

  const handleChange = (key: string, value: string) => {
    if (key === 'dataNascimento') {
      value = value.replace(/^(\d{2})(\d)/, '$1/$2').replace(/^(\d{2}\/\d{2})(\d)/, '$1/$2');
    }
    setForm({ ...form, [key]: value });
  };

  const validateForm = () => {
    const newErrors = { nome: '', sobrenome: '', dataNascimento: '', email: '', senha: '' };
    let valid = true;

    if (form.nome.trim().length < 3) {
      newErrors.nome = 'Nome deve ter no mínimo 3 caracteres.';
      valid = false;
    }
    if (form.sobrenome.trim().length < 4) {
      newErrors.sobrenome = 'Sobrenome deve ter no mínimo 4 caracteres.';
      valid = false;
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(form.dataNascimento)) {
      newErrors.dataNascimento = 'Data de nascimento inválida.';
      valid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Email inválido.';
      valid = false;
    }
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (!senhaRegex.test(form.senha)) {
      newErrors.senha = 'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        console.log('Dados enviados:', form); // Log dos dados enviados
  
        const response = await registerUser(form);
        console.log('Resposta do servidor:', response); // Log da resposta do servidor
  
        if (response.message === 'Usuário registrado com sucesso') {
          Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
          navigation.navigate('Login');
        } else {
          Alert.alert('Erro', response.message || 'Erro ao registrar');
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('Erro ao registrar:', error.response?.data || error.message);
          Alert.alert('Erro', error.response?.data?.message || 'Erro de conexão com o servidor');
        } else {
          console.error('Erro desconhecido:', error);
          Alert.alert('Erro', 'Um erro inesperado ocorreu.');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={form.nome}
        onChangeText={(text) => handleChange('nome', text)}
      />
      {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={form.sobrenome}
        onChangeText={(text) => handleChange('sobrenome', text)}
      />
      {errors.sobrenome ? <Text style={styles.errorText}>{errors.sobrenome}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/YYYY)"
        value={form.dataNascimento}
        onChangeText={(text) => handleChange('dataNascimento', text)}
        maxLength={10}
      />
      {errors.dataNascimento ? <Text style={styles.errorText}>{errors.dataNascimento}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={form.senha}
        onChangeText={(text) => handleChange('senha', text)}
        secureTextEntry
      />
      {errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}
      <Button title="Cadastrar" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switchText}>Já tem uma conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
