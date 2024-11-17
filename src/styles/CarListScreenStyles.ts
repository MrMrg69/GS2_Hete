// src/styles/CarListScreenStyles.ts
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
    textAlign: 'center',
    marginBottom: 20,
    color: '#a4ffaf', // Verde neon
  },
  carItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#142614', // Verde muito escuro
    borderRadius: 10,
    borderColor: '#1f3d1f',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  carText: {
    fontSize: 16,
    color: '#d9ffd9', // Verde claro
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
  },
  selectText: {
    color: '#4caf50', // Verde vibrante
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#ff4d4d', // Vermelho vibrante para deletar
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#a4ffaf', // Verde neon
    marginTop: 20,
  },
});

export default styles;
