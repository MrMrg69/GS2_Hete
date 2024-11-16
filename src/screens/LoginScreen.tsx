// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import styles from '../styles/LoginScreenStyles';
import { loginUser } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({ email: '', senha: '' });

  const validateLogin = () => {
    const newErrors = { email: '', senha: '' };
    let valid = true;

    if (!email) {
      newErrors.email = 'Por favor, insira seu email.';
      valid = false;
    }
    if (!senha) {
      newErrors.senha = 'Por favor, insira sua senha.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        const response = await loginUser({ email, senha });
        if (response.token) {
          Alert.alert("Sucesso", "Login realizado com sucesso!");
          await AsyncStorage.setItem('authToken', response.token);
          navigation.navigate('CarList', { token: response.token });
        } else {
          Alert.alert("Erro", "Token não recebido.");
        }
      } catch (error) {
        Alert.alert("Erro", "Erro ao fazer login. Verifique suas credenciais.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      {errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.switchText}>Não tem uma conta? Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
