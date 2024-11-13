import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage

// Definindo a interface para a dívida
export interface Divida {
  valor: string;
  descricao: string;
  tipo: 'a pagar' | 'a receber'; // 'a pagar' para dívidas, 'a receber' para créditos
}

// Criando o contexto de dívidas
export interface DividasContextType {
  dividas: Divida[];
  adicionarDivida: (divida: Divida) => void;
  removerDivida: (index: number) => void;
  calcularTotalDevido: () => number;
  calcularTotalAReceber: () => number;
}

export const DividasContext = createContext<DividasContextType | undefined>(undefined);

// Provider para envolver a aplicação e fornecer acesso ao contexto
interface DividasProviderProps {
  children: ReactNode;
}

export const DividasProvider: React.FC<DividasProviderProps> = ({ children }) => {
  const [dividas, setDividas] = useState<Divida[]>([]);

  // Função para carregar as dívidas do AsyncStorage
  const carregarDividas = async () => {
    try {
      const storedDividas = await AsyncStorage.getItem('dividas');
      if (storedDividas) {
        setDividas(JSON.parse(storedDividas));
      }
    } catch (error) {
      console.error('Erro ao carregar dívidas do AsyncStorage', error);
    }
  };

  // Função para salvar as dívidas no AsyncStorage
  const salvarDividas = async (dividas: Divida[]) => {
    try {
      await AsyncStorage.setItem('dividas', JSON.stringify(dividas));
    } catch (error) {
      console.error('Erro ao salvar dívidas no AsyncStorage', error);
    }
  };

  // UseEffect para carregar as dívidas ao iniciar o app
  useEffect(() => {
    carregarDividas();
  }, []);

  // Função para adicionar uma nova dívida
  const adicionarDivida = (divida: Divida) => {
    const novasDividas = [...dividas, divida];
    setDividas(novasDividas);
    salvarDividas(novasDividas); // Salva as dívidas após adicionar
  };

  // Função para remover uma dívida
  const removerDivida = (index: number) => {
    const novasDividas = dividas.filter((_, i) => i !== index);
    setDividas(novasDividas);
    salvarDividas(novasDividas); // Salva as dívidas após remoção
  };

  // Função para calcular o total devido (a pagar)
  const calcularTotalDevido = (): number => {
    return dividas
      .filter((divida) => divida.tipo === 'a pagar')
      .reduce((total, divida) => total + parseFloat(divida.valor), 0);
  };

  // Função para calcular o total a receber
  const calcularTotalAReceber = (): number => {
    return dividas
      .filter((divida) => divida.tipo === 'a receber')
      .reduce((total, divida) => total + parseFloat(divida.valor), 0);
  };

  return (
    <DividasContext.Provider value={{ dividas, adicionarDivida, removerDivida, calcularTotalDevido, calcularTotalAReceber }}>
      {children}
    </DividasContext.Provider>
  );
};
