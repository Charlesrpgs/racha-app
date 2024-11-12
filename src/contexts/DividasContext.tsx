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

  const adicionarDivida = (divida: Divida) => {
    setDividas((prevDividas) => [...prevDividas, divida]);
  };

  const calcularTotalDevido = (): number => {
    return dividas
      .filter((divida) => divida.tipo === 'a pagar')
      .reduce((total, divida) => total + parseFloat(divida.valor), 0);
  };

  const calcularTotalAReceber = (): number => {
    return dividas
      .filter((divida) => divida.tipo === 'a receber')
      .reduce((total, divida) => total + parseFloat(divida.valor), 0);
  };

  return (
    <DividasContext.Provider value={{ dividas, adicionarDivida, calcularTotalDevido, calcularTotalAReceber }}>
      {children}
    </DividasContext.Provider>
  );
};
