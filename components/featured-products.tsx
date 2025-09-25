import React from "react";
import { ProductsSlider } from "./products-slider";

const FeaturedProducts = () => {
  return (
    <div className="bg-pink-400/50">
      <ProductsSlider
        title="محصولات منتخب"
        subtitle="بهترین‌ها را برای فرزند شما انتخاب کردیم"
      />
    </div>
  );
};

export default FeaturedProducts;
