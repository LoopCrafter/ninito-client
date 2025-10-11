import { Product, ProductVariant } from "@/src/types/product";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
};

const getFinalPrice = (product: Product, variant?: ProductVariant): number => {
  if (variant) {
    if (product.discount?.method === "percentage") {
      return (
        variant.price - (variant.price * (product.discount.value ?? 0)) / 100
      );
    } else if (product.discount?.method === "fixed") {
      return variant.price - (product.discount.value ?? 0);
    }
    return variant.price;
  }

  const basePrice = product.basePrice ?? 0;
  if (product.discount?.method === "percentage") {
    return basePrice - (basePrice * (product.discount.value ?? 0)) / 100;
  } else if (product.discount?.method === "fixed") {
    return basePrice - (product.discount.value ?? 0);
  }

  return basePrice;
};

export { formatPrice, getFinalPrice };
