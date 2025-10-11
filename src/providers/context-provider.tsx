"use client";

import { createContext, useState, useEffect } from "react";
import { Product, ProductVariant } from "@/src/types/product";
import { User } from "@/src/types/user";

interface BasketItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

type AppProviderProps = {
  children: React.ReactNode;
};

type AppContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  basket: BasketItem[];
  setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
};

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [basket, setBasket] = useState<BasketItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("basket");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser, basket, setBasket }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
