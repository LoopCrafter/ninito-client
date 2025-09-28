"use client";

import { Product, ProductVariant } from "@/types/product";
import { createContext, useState } from "react";

interface BasketItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}
type BasketProviderProps = {
  children: React.ReactNode;
};

type BasketContextType = {
  basket: BasketItem[];
  setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
};
export const BasketContext = createContext<BasketContextType | null>(null);

const BasketProvider: React.FC<BasketProviderProps> = ({ children }) => {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;
