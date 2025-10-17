"use client";

import { Category } from "@/src/types/categories";
import Image from "next/image";
import Link from "next/link";

type CategoriesProps = {
  categories: Category[];
};

export function CategoriesSection({ categories }: CategoriesProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-pink-600">
            🍼 دسته‌بندی محصولات
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            انتخابی شاد و مطمئن برای آرامش و لبخند نوزاد دلبند شما 💖
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/products?filter[category]=${category.id}`}
              className="group block rounded-3xl bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full aspect-square sm:aspect-[4/3] overflow-hidden">
                <Image
                  src={category.thumbnailUrl}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Text */}
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-pink-600">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
