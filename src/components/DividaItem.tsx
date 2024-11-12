import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface DividaItemProps {
  valor: string;
  descricao: string;
  tipo: 'a pagar' | 'a receber';
  onRemove: () => void;
}

const DividaItem: React.FC<DividaItemProps> = ({ valor, descricao, tipo, onRemove }) => {
  return (
    <View style={styles.dividaItem}>
      <View style={styles.textContainer}>
        <Text style={styles.valorText}>R$ {valor}</Text>
        <Text style={styles.descricaoText}>{descricao}</Text>
        <Text style={styles.tipoText}>{tipo === 'a pagar' ? 'A Pagar' : 'A Receber'}</Text>
      </View>
      
      <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dividaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textContainer: {
    flex: 1,
  },
  valorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  descricaoText: {
    fontSize: 14,
    color: '#555',
  },
  tipoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007BFF',
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#FF4D4D',
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default DividaItem;
