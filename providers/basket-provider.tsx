"use client";

import { createContext, useState } from "react";

type BasketProviderProps = {
  children: React.ReactNode;
};

type BasketContextType = {
  basket: string[];
  setBasket: React.Dispatch<React.SetStateAction<string[]>>;
};
export const BasketContext = createContext<BasketContextType | null>(null);

const BasketProvider: React.FC<BasketProviderProps> = ({ children }) => {
  const [basket, setBasket] = useState<string[]>([]);
  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;
