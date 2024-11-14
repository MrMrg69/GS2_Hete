// src/screens/CarListScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import styles from '../styles/CarListScreenStyles';

type CarListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CarList'>;

interface CarListScreenProps {
  navigation: CarListScreenNavigationProp;
}

interface Car {
  id: string;
  marca: string;
  modelo: string;
  ano: string;
}

const CarListScreen: React.FC<CarListScreenProps> = ({ navigation }) => {
  const [cars, setCars] = useState<Car[]>([]);

  const handleAddCar = (car: Car) => {
    setCars([...cars, car]);
  };

  const handleSelectCar = (car: Car) => {
    navigation.navigate('CarDetails', { car });
  };

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
