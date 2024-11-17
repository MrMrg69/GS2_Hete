// src/styles/CarDetailsScreenStyles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0e1e0e', // Fundo verde escuro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#bfffbf', // Verde claro
  },
  section: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#142614',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#e0ffe0', // Verde mais claro para títulos
  },
  text: {
    fontSize: 16,
    color: '#d9ffd9', // Verde claro para textos
    marginBottom: 5,
  },
  textMarca: {
    fontSize: 16,
    color: '#a5c6a5',
    marginBottom: 5,
  },
  textModelo: {
    fontSize: 16,
    color: '#a5c6a5',
    marginBottom: 5,
  },
  textAno: {
    fontSize: 16,
    color: '#a5c6a5',
    marginBottom: 5,
  },
  progressBarContainer: {
    height: 20,
    width: '100%',
    backgroundColor: '#1f3d1f', // Fundo da barra mais escuro
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50', // Verde progresso
  },
  batteryText: {
    fontSize: 16,
    color: '#d9ffd9', // Verde claro para texto geral da bateria
    marginBottom: 5,
  },
  milestoneText: {
    fontSize: 16,
    color: '#a4ffaf', // Verde mais claro para milestones
    marginBottom: 5,
  },
  pickerContainer: {
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#1f3d1f',
    borderRadius: 10,
    backgroundColor: '#0e1e0e', // Fundo escuro consistente com o app
    paddingHorizontal: 10,
  },
  pickerText: {
    color: '#e0ffe0', // Texto claro para contraste
  },
  pickerItem: {
    backgroundColor: '#0e1e0e', // Fundo dos itens dropdown
    color: '#e0ffe0', // Cor do texto dos itens
  },
  optionContainer: {
    backgroundColor: '#142614', // Fundo da lista de seleção
    borderRadius: 10,
    borderColor: '#1f3d1f',
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#d9ffd9', // Verde claro para opções
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  initValueText: {
    fontSize: 16,
    color: '#e0ffe0', // Texto inicial do dropdown
  },
  selectStyle: {
    backgroundColor: '#142614',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#1f3d1f',
    paddingHorizontal: 10,
  },
  selectText: {
    color: '#e0ffe0',
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default styles;
