import React, { createContext, useState, useContext, ReactNode } from 'react';

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

  // Função para adicionar uma nova dívida
  const adicionarDivida = (divida: Divida) => {
    setDividas((prevDividas) => [...prevDividas, divida]);
  };

  // Função para remover uma dívida
  const removerDivida = (index: number) => {
    setDividas((prevDividas) => prevDividas.filter((_, i) => i !== index));
  };

  // Função para calcular o total das dívidas a pagar
  const calcularTotalDevido = (): number => {
    return dividas
      .filter((divida) => divida.tipo === 'a pagar')
      .reduce((total, divida) => total + parseFloat(divida.valor), 0);
  };

  // Função para calcular o total das dívidas a receber
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
