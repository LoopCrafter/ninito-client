"use client";

import { Baby, Shirt, Bed, Car, Gift, Heart } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: "swaddles",
    name: "آغوشی نوزاد",
    icon: Baby,
    description: "آغوشی‌های نرم و امن",
    color: "bg-baby-blue",
  },
  {
    id: "blankets",
    name: "قنداق و پتو",
    icon: Shirt,
    description: "قنداق‌های گرم و راحت",
    color: "bg-baby-pink",
  },
  {
    id: "pillows",
    name: "بالش و تشک",
    icon: Bed,
    description: "بالش‌های شیردهی و تشک بازی",
    color: "bg-baby-blue",
  },
  {
    id: "travel",
    name: "لوازم مسافرتی",
    icon: Car,
    description: "لوازم کودک برای سفر",
    color: "bg-baby-pink",
  },
  {
    id: "gifts",
    name: "ست هدیه",
    icon: Gift,
    description: "ست‌های هدیه مخصوص نوزاد",
    color: "bg-baby-blue",
  },
  {
    id: "accessories",
    name: "لوازم جانبی",
    icon: Heart,
    description: "سایر لوازم مراقبت از نوزاد",
    color: "bg-baby-pink",
  },
];

export function CategoriesSection() {
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
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="category-card block cursor-pointer rounded-3xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 py-6 px-4 text-center"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${category.color}`}
                >
                  <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-1 text-gray-900">
                  {category.name}
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
