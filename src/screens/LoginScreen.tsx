// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import styles from '../styles/RegisterScreenStyles';

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

  const handleLogin = () => {
    if (validateLogin()) {
      // Simulação de autenticação bem-sucedida
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      navigation.navigate('CarList'); // Redireciona para a tela de lista de carros após o login bem-sucedido
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
