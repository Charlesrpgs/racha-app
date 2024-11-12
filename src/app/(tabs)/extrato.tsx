import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDividas } from '@/hooks/useDividas'; // Hook de dívidas
import DividaItem from '@/components/DividaItem';

const ExtratoScreen: React.FC = () => {
  const { dividas, removerDivida } = useDividas(); // Função de remover dívida

  const handleRemoveDivida = (index: number) => {
    // Chama a função de remover do hook com o índice da dívida
    removerDivida(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Extrato de Dívidas</Text>

      {/* Lista de dívidas */}
      {dividas.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma dívida registrada.</Text>
      ) : (
        <FlatList
          data={dividas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <DividaItem
              valor={item.valor}
              descricao={item.descricao}
              tipo={item.tipo}
              onRemove={() => handleRemoveDivida(index)} // Passando a função para remover a dívida
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#777',
  },
});

export default ExtratoScreen;
