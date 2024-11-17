// src/styles/AddCarScreenStyles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0e1e0e', // Fundo verde escuro para um toque futurista
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#a4ffaf', // Verde neon para destaque
    textShadowColor: '#003300', // Sombra leve para profundidade
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  input: {
    height: 50,
    borderColor: '#1f3d1f', // Verde escuro para bordas
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#142614', // Verde muito escuro para contraste
    color: '#d9ffd9', // Verde claro para texto
    fontSize: 16,
    fontWeight: '500',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3, // Sombra leve para modernidade
  },
  buttonContainer: {
    backgroundColor: '#1fcc44', // Verde vibrante para chamar atenção
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#0a2a0a',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#0b550b',
  },
  buttonText: {
    color: '#ffffff', // Texto branco para contraste
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.2, // Espaçamento para um toque futurista
  },
});

export default styles;
