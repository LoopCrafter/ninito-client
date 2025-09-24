"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { mockProducts } from "../mock";
import { ProductCard } from "./product-card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductsSliderProps {
  title: string;
  subtitle: string;
  rtl?: boolean; // اضافه کردم برای RTL
}

export function ProductsSlider({
  title,
  subtitle,
  rtl = true,
}: ProductsSliderProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        {/* Swiper Slider */}

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          //   pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          dir={rtl ? "rtl" : "ltr"}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 25 },
          }}
        >
          {mockProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
