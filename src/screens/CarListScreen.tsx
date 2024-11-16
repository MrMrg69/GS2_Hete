// src/screens/CarListScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import styles from '../styles/CarListScreenStyles';
import { getCars, addCar, deleteCar } from '../services/api';

type CarListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CarList'>;
type CarListScreenRouteProp = RouteProp<RootStackParamList, 'CarList'>;

interface CarListScreenProps {
  navigation: CarListScreenNavigationProp;
  route: CarListScreenRouteProp;
}

interface Car {
  _id: string;
  marca: string;
  modelo: string;
  ano: string;
}

const CarListScreen: React.FC<CarListScreenProps> = ({ navigation, route }) => {
  const { token } = route.params;
  const [cars, setCars] = useState<Car[]>([]);

  // Função para carregar carros do backend
  const loadCars = async () => {
    try {
      const response = await getCars(token);
      setCars(response);
    } catch (error) {
      console.error('Erro ao carregar carros:', error);
      Alert.alert('Erro', 'Erro ao carregar carros.');
    }
  };

  // Função para adicionar um carro e atualizar a lista
  const handleAddCar = async (newCar: { marca: string; modelo: string; ano: string }) => {
    try {
      const addedCar = await addCar(token, newCar);
      setCars((prevCars) => [...prevCars, addedCar]); // Atualiza o estado local
    } catch (error) {
      console.error('Erro ao adicionar carro:', error);
      Alert.alert('Erro', 'Erro ao adicionar carro.');
    }
  };

  // Função para deletar um carro e atualizar a lista
  const handleDeleteCar = async (carId: string) => {
    try {
      await deleteCar(token, carId);
      setCars((prevCars) => prevCars.filter((car) => car._id !== carId)); // Remove localmente
      Alert.alert('Sucesso', 'Carro deletado com sucesso.');
    } catch (error) {
      console.error('Erro ao deletar carro:', error);
      Alert.alert('Erro', 'Erro ao deletar carro.');
    }
  };

  // Recarrega os carros quando o componente ganha foco
  useFocusEffect(
    useCallback(() => {
      loadCars();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Carros</Text>
      <FlatList
        data={cars}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.carItem}>
            <Text style={styles.carText}>{`${item.marca} ${item.modelo} (${item.ano})`}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate('CarDetails', { car: item })}>
                <Text style={styles.selectText}>Selecionar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteCar(item._id)}>
                <Text style={styles.deleteText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum carro cadastrado.</Text>}
      />
      <Button
        title="Adicionar Novo Carro"
        onPress={() => navigation.navigate('AddCar', { handleAddCar })}
      />
    </View>
  );
};

export default CarListScreen;
