import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDividas } from '@/hooks/useDividas'; // Hook de dívidas

const HomeScreen: React.FC = ({  }) => {
  const { dividas, adicionarDivida, calcularTotalDevido, calcularTotalAReceber } = useDividas();
  const [modalVisible, setModalVisible] = useState(false);
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState<'a pagar' | 'a receber'>('a pagar');

  const handleAddDivida = () => {
    if (!valor || !descricao) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Cria o objeto da dívida
    const novaDivida = { valor, descricao, tipo };
    
    // Adiciona a nova dívida ao contexto
    adicionarDivida(novaDivida);

    // Fecha o modal e limpa os campos
    setModalVisible(false);
    setValor('');
    setDescricao('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Você deve</Text>
        <Text style={styles.summaryValue}>R$ {calcularTotalDevido().toFixed(2)}</Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Você tem a receber</Text>
        <Text style={styles.summaryValue}>R$ {calcularTotalAReceber().toFixed(2)}</Text>
      </View>

      {/* Botão para abrir o modal */}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Registrar Dívida</Text>
      </TouchableOpacity>

      
      {/* Modal para adicionar uma nova dívida */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Nova Dívida</Text>

            {/* Campo para o valor da dívida */}
            <TextInput
              style={styles.input}
              placeholder="Valor da Dívida"
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
            />

            {/* Campo para a descrição da dívida */}
            <TextInput
              style={[styles.input, { height: 100 }]} // Aumenta a altura para a descrição
              placeholder="Descrição da Dívida"
              value={descricao}
              onChangeText={setDescricao}
              multiline={true} // Permite múltiplas linhas para a descrição
            />

            {/* Campo para escolher o tipo de dívida */}
            <View style={styles.tipoContainer}>
              <TouchableOpacity
                style={[styles.tipoButton, tipo === 'a pagar' && styles.selectedButton]}
                onPress={() => setTipo('a pagar')}
              >
                <Text style={styles.tipoButtonText}>A Pagar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tipoButton, tipo === 'a receber' && styles.selectedButton]}
                onPress={() => setTipo('a receber')}
              >
                <Text style={styles.tipoButtonText}>A Receber</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleAddDivida}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    backgroundColor: '#f9f9f9',
  },
  summaryTitle: {
    fontSize: 16,
    color: '#333',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  button: {
    width: '100%',
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#007BFF',
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro para o modal
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  tipoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  tipoButton: {
    width: '48%',
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 4,
    alignItems: 'center',
  },
  tipoButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
});

export default HomeScreen;
