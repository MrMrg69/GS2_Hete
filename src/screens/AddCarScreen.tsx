// src/screens/AddCarScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import styles from '../styles/AddCarScreenStyles';

type AddCarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddCar'>;
type AddCarScreenRouteProp = RouteProp<RootStackParamList, 'AddCar'>;

interface AddCarScreenProps {
  navigation: AddCarScreenNavigationProp;
  route: AddCarScreenRouteProp;
}

const AddCarScreen: React.FC<AddCarScreenProps> = ({ navigation, route }) => {
  const { handleAddCar } = route.params;
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');

  const handleSaveCar = () => {
    if (marca && modelo && ano) {
      const newCar = {
        id: Date.now().toString(), // Gera um ID único usando timestamp
        marca,
        modelo,
        ano,
      };
      handleAddCar(newCar);
      Alert.alert("Sucesso", "Carro adicionado com sucesso!");
      navigation.goBack();
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Novo Carro</Text>
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano"
        value={ano}
        keyboardType="numeric"
        onChangeText={setAno}
      />
      <Button title="Salvar Carro" onPress={handleSaveCar} />
    </View>
  );
};

export default AddCarScreen;
