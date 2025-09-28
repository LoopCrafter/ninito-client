"use client";

import { Category } from "@/types/categories";
import Image from "next/image";
import Link from "next/link";

type CategoriesProps = {
  categories: Category[];
};

export function CategoriesSection({ categories }: CategoriesProps) {
  console.log("_______,", categories);
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            دسته‌بندی محصولات
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            محصولات متنوع و باکیفیت برای آسایش و سلامت نوزاد شما
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="category-card block cursor-pointer rounded-3xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 py-6 px-4 text-center"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <Image
                    src={category.thumbnailUrl}
                    width={200}
                    height={200}
                    alt={category.title}
                  />
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-1 text-gray-900">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
