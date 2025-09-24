"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { mockProducts } from "../mock";
import { ProductCard } from "./product-card";
import "swiper/css";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();
  const handleSlideChange = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>

            {/* Navigation Controls */}
            <div className="hidden md:flex items-center space-x-2 space-x-reverse">
              <Button
                variant="outline"
                size="icon"
                onClick={goPrev}
                disabled={isBeginning}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goNext}
                disabled={isEnd}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Swiper Slider */}

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
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
