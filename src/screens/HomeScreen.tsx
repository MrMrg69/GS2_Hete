// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import styles from '../styles/HomeScreenStyles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Gerenciador de Carregamento de Carros Elétricos</Text>
      <Button title="Cadastrar" onPress={() => navigation.navigate('Register')} />
      <Button title="Entrar" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default HomeScreen;
