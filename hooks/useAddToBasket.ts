import { Product, ProductVariant } from "@/types/product";
import useBasket from "./useBasket";

const useAddToBasket = () => {
  const { setBasket } = useBasket();

  const addToBasket = (
    product: Product,
    selectedVariant: ProductVariant,
    quantity: number = 1
  ) => {
    setBasket((prevBasket) => {
      const existingIndex = prevBasket.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.variant?.size === selectedVariant?.size &&
          item.variant?.color.hex === selectedVariant?.color.hex
      );

      if (existingIndex > -1) {
        const updatedBasket = [...prevBasket];
        updatedBasket[existingIndex].quantity += quantity;
        return updatedBasket;
      }

      return [
        ...prevBasket,
        {
          product,
          variant: selectedVariant,
          quantity,
        },
      ];
    });
  };

  return { addToBasket };
};

export default useAddToBasket;
