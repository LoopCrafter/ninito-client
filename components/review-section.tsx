"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { reviews } from "../mock";
import { Autoplay } from "swiper/modules";
import ReviewCard from "./review-card";
import "swiper/css";
import "swiper/css/navigation";

const ReviewSection = () => {
  return (
    <section className="py-16 max-w-3/4 mx-auto">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            نظرات مشتریان عزیز
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            تجربه خانواده‌های ایرانی از استفاده از محصولات نینیتو
          </p>
        </div>
      </div>
      <Swiper
        dir="rtl"
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 25 },
        }}
        modules={[Autoplay]}
        loop
        autoplay={{ delay: 3000 }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review} totalReviews={reviews.length} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ReviewSection;
