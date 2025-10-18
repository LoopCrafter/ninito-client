import React from "react";
import { ProductsSlider } from "./products-slider";
import { Product } from "@/src/types/product";
import { apiFetchServer } from "../lib/apiFetch.server";

type ProductsResponse = {
  products: Product[];
  featured: Product[];
};

const FeaturedProducts = async () => {
  const [productsData] = await Promise.all([
    apiFetchServer<ProductsResponse>("/products", { cache: "no-store" }),
  ]);
  const products = productsData?.featured ?? [];
  return (
    <div className="bg-pink-400/50 featured-products">
      <ProductsSlider
        title="محصولات منتخب"
        subtitle="بهترین‌ها را برای فرزند شما انتخاب کردیم"
        products={products}
      />
    </div>
  );
};

export default FeaturedProducts;
