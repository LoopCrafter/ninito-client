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

const fakeApi = async (duration = 3000) => {
  return new Promise((res) => setTimeout(res, duration));
};

const calculateDate = (dateString: string) => {
  const date = new Date(dateString);
  const shamsiDate = date.toLocaleString("fa-IR", {
    calendar: "persian",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
    //   second: "2-digit",
  });
  return shamsiDate;
};

export { formatPrice, getFinalPrice, fakeApi, calculateDate };
