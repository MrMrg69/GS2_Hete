import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import styles from '../styles/CarDetailsScreenStyles';
import ModalSelector from 'react-native-modal-selector';

type CarDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;
type CarDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CarDetails'>;

interface CarDetailsScreenProps {
  route: CarDetailsScreenRouteProp;
  navigation: CarDetailsScreenNavigationProp;
}

const CarDetailsScreen: React.FC<CarDetailsScreenProps> = ({ route }) => {
  const { car } = route.params;

  const [batteryLevel, setBatteryLevel] = useState<number>(Math.floor(Math.random() * 100));
  const [chargingZone, setChargingZone] = useState<string>('Doméstica');
  const [completionTime, setCompletionTime] = useState<string>('');
  const [milestones, setMilestones] = useState<{ [key: string]: string }>({});

  const calculateChargingRate = () => {
    return chargingZone === 'Doméstica' ? Math.random() * (2 - 1) + 1 : Math.random() * (4 - 2) + 2;
  };

  const updateTimes = () => {
    const now = new Date();
    const rate = calculateChargingRate();
    const remainingCharge = 100 - batteryLevel;
    const maxTime = chargingZone === 'Doméstica' ? 60 : 30; // Tempo máximo em minutos
    const estimatedTimeInMinutes = Math.min((remainingCharge / rate) * 5, maxTime);

    now.setMinutes(now.getMinutes() + estimatedTimeInMinutes);
    setCompletionTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    const milestonesTimes: { [key: string]: string } = {};
    const intervals = [25, 50, 75];

    intervals.forEach((milestone) => {
      if (batteryLevel < milestone) {
        const milestoneTime = new Date();
        const percentToMilestone = milestone - batteryLevel;
        const timeToMilestone = (percentToMilestone / remainingCharge) * estimatedTimeInMinutes;

        milestoneTime.setMinutes(milestoneTime.getMinutes() + timeToMilestone);
        milestonesTimes[`${milestone}%`] = milestoneTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    });

    setMilestones(milestonesTimes);
  };

  useEffect(() => {
    updateTimes();
    const interval = setInterval(() => {
      const rate = calculateChargingRate();
      setBatteryLevel((prevLevel) => {
        const newLevel = Math.min(prevLevel + rate, 100);
        if (newLevel === 100) {
          clearInterval(interval);
          Alert.alert('Carregamento Completo', 'A bateria está totalmente carregada!');
        }
        return newLevel;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [chargingZone, batteryLevel]);

  const options = [
    { key: 'domestica', label: 'Doméstica' },
    { key: 'posto', label: 'Posto' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações do Carro</Text>
        <Text style={styles.textMarca}>Marca: {car.marca}</Text>
        <Text style={styles.textModelo}>Modelo: {car.modelo}</Text>
        <Text style={styles.textAno}>Ano: {car.ano}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gerenciamento de Bateria</Text>
        <Text style={styles.batteryText}>
          Bateria atual: {Math.round(batteryLevel)}% - Carregamento completo às {completionTime}
        </Text>
        {milestones['25%'] && (
          <Text style={styles.milestoneText}>25% de bateria às {milestones['25%']}</Text>
        )}
        {milestones['50%'] && (
          <Text style={styles.milestoneText}>50% de bateria às {milestones['50%']}</Text>
        )}
        {milestones['75%'] && (
          <Text style={styles.milestoneText}>75% de bateria às {milestones['75%']}</Text>
        )}
        {/* Barra de Progresso */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${batteryLevel}%` }]} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Zona de Carregamento</Text>
        <View style={styles.pickerContainer}>
          <ModalSelector
            data={options}
            initValue={chargingZone}
            onChange={(option) => setChargingZone(option.label)}
            optionContainerStyle={styles.optionContainer}
            optionTextStyle={styles.optionText}
            initValueTextStyle={styles.initValueText}
            selectStyle={styles.selectStyle}
            selectTextStyle={styles.selectText}
          />
        </View>
      </View>
    </View>
  );
};

export default CarDetailsScreen;
