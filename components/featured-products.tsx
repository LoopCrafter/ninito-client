import React from "react";
import { ProductsSlider } from "./products-slider";
import { Product } from "@/types/product";

type FeaturedProductsProps = {
  products: Product[];
};

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
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
