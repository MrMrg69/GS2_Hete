// src/screens/CarListScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import styles from '../styles/CarListScreenStyles';
import { getCars, addCar } from '../services/api'; // Importa as funções do serviço
import AsyncStorage from '@react-native-async-storage/async-storage';

type CarListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CarList'>;
type CarListScreenRouteProp = RouteProp<RootStackParamList, 'CarList'>;

interface CarListScreenProps {
  navigation: CarListScreenNavigationProp;
  route: CarListScreenRouteProp;
}

interface Car {
  id: string;
  marca: string;
  modelo: string;
  ano: string;
}

const CarListScreen: React.FC<CarListScreenProps> = ({ navigation, route }) => {
  const { token } = route.params; // Obtém o token passado pelo LoginScreen
  const [cars, setCars] = useState<Car[]>([]);

  // Função para carregar carros do backend
  const loadCars = async () => {
    try {
      const response = await getCars(token); // Passa o token na requisição
      setCars(response); // Define o estado com a lista de carros recebida do backend
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar carros.');
    }
  };

  // Função para adicionar um carro no backend e atualizar a lista
  const handleAddCar = async (car: Car) => {
    try {
      await addCar(token, car); // Passa o token e os dados do carro
      setCars((prevCars) => [...prevCars, car]); // Atualiza a lista de carros no estado
    } catch (error) {
      Alert.alert('Erro', 'Erro ao adicionar carro.');
    }
  };

  // Função para selecionar um carro e navegar para a tela de detalhes
  const handleSelectCar = (car: Car) => {
    navigation.navigate('CarDetails', { car });
  };

  // Carrega os carros quando o componente é montado
  useEffect(() => {
    loadCars();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Carros</Text>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.carItem}>
            <Text style={styles.carText}>{`${item.marca} ${item.modelo} (${item.ano})`}</Text>
            <TouchableOpacity onPress={() => handleSelectCar(item)}>
              <Text style={styles.selectText}>Selecionar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum carro cadastrado.</Text>}
      />
      <Button title="Adicionar Novo Carro" onPress={() => navigation.navigate('AddCar', { handleAddCar })} />
    </View>
  );
};

export default CarListScreen;
