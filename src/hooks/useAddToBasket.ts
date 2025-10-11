import { Product, ProductVariant } from "@/src/types/product";
import useApp from "./useApp";

const useAddToBasket = () => {
  const { setBasket } = useApp();

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
        return prevBasket.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
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

  const incrementQuantity = (productId: string, variantId: string) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.variant.id === variantId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (productId: string, variantId: string) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.variant.id === variantId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = (productId: string, variantId?: string) => {
    setBasket((prev) =>
      prev.filter(
        (item) =>
          item.product.id !== productId ||
          (variantId ? item.variant.id !== variantId : true)
      )
    );
  };

  return { addToBasket, incrementQuantity, decrementQuantity, removeItem };
};

export default useAddToBasket;
