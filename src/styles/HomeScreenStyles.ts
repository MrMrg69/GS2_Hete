// src/styles/HomeScreenStyles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0e1e0e', // Fundo verde escuro
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#a4ffaf', // Verde neon
    textShadowColor: '#003300',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Espaçamento uniforme
    alignItems: 'center',
  },
  button: {
    width: 120, // Mesma largura para todos os botões
    paddingVertical: 10,
    backgroundColor: '#1f3d1f', // Verde escuro
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff', // Texto branco
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
