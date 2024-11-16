import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import styles from '../styles/CarDetailsScreenStyles';

type CarDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;
type CarDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CarDetails'>;

interface CarDetailsScreenProps {
  route: CarDetailsScreenRouteProp;
  navigation: CarDetailsScreenNavigationProp;
}

const CarDetailsScreen: React.FC<CarDetailsScreenProps> = ({ route }) => {
  const { car } = route.params;

  const [batteryLevel, setBatteryLevel] = useState<number>(Math.floor(Math.random() * 100));
  const [chargingRate, setChargingRate] = useState<number>(Math.floor(Math.random() * 20));

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.min(prev + chargingRate, 100));
    }, 5000); // Atualiza a cada 5 segundos
    return () => clearInterval(interval);
  }, [chargingRate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Carro</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações do Carro</Text>
        <Text style={styles.batteryText}>Marca: {car.marca}</Text>
        <Text style={styles.batteryText}>Modelo: {car.modelo}</Text>
        <Text style={styles.batteryText}>Ano: {car.ano}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gerenciamento de Bateria</Text>
        <Text style={styles.batteryText}>Nível de Bateria: {batteryLevel}%</Text>
        <Text style={styles.chargeText}>Taxa de Recarga: {chargingRate}% a cada 5 segundos</Text>
      </View>
    </View>
  );
};

export default CarDetailsScreen;
