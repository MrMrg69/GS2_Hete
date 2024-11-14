// src/screens/CarDetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import styles from '../styles/CarDetailsScreenStyles';

type CarDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;

interface CarDetailsScreenProps {
  route: CarDetailsScreenRouteProp;
}

const CarDetailsScreen: React.FC<CarDetailsScreenProps> = ({ route }) => {
  const { car } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Carro</Text>
      <Text style={styles.detailText}>Marca: {car.marca}</Text>
      <Text style={styles.detailText}>Modelo: {car.modelo}</Text>
      <Text style={styles.detailText}>Ano: {car.ano}</Text>
    </View>
  );
};

export default CarDetailsScreen;
