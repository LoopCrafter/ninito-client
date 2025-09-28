import { BasketContext } from "@/providers/basket-provider";
import { useContext } from "react";

const useBasket = () => {
  const basketContext = useContext(BasketContext);
  if (!basketContext) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return basketContext;
};

export default useBasket;
