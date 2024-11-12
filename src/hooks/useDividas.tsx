import { DividasContext, DividasContextType } from "@/contexts/DividasContext";
import { useContext } from "react";

// Hook customizado para acessar o contexto facilmente
export const useDividas = (): DividasContextType => {
    const context = useContext(DividasContext);
    if (!context) {
      throw new Error('useDividas deve ser usado dentro de um DividasProvider');
    }
    return context;
  };