import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Você deve</Text>
        <Text style={styles.summaryValue}>R$ 500,00</Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Você tem a receber</Text>
        <Text style={styles.summaryValue}>R$ 1.000,00</Text>
      </View>
      <Button title="Registrar Dívida" onPress={() => { }} />
      <Button title="Ver Detalhes" onPress={() => { }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

