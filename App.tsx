// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import CarListScreen from './src/screens/CarListScreen';
import AddCarScreen from './src/screens/AddCarScreen';
import CarDetailsScreen from './src/screens/CarDetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
  CarList: { token: string };
  AddCar: { handleAddCar: (car: { marca: string; modelo: string; ano: string }) => void };
  CarDetails: { car: { _id: string; marca: string; modelo: string; ano: string } };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Cadastrar' }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Entrar' }} 
        />
        <Stack.Screen 
          name="CarList" 
          component={CarListScreen} 
          options={{ title: 'Meus Carros', headerBackTitle: 'Voltar' }} 
        />
        <Stack.Screen 
          name="AddCar" 
          component={AddCarScreen} 
          options={{ title: 'Adicionar Carro' }} 
        />
        <Stack.Screen 
          name="CarDetails" 
          component={CarDetailsScreen} 
          options={{ title: 'Detalhes do Carro' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
