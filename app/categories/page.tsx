"use client";
import Image from "next/image";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  slug: string;
};

const sampleCategories: Category[] = [
  {
    id: "1",
    name: "آغوشی نوزاد",
    description: "آغوشی‌های ارگونومیک برای راحتی و حمل آسان نوزاد",
    image: "/images/category-aghoushi.jpg",
    productCount: 25,
    slug: "aghoushi",
  },
  {
    id: "2",
    name: "قنداق و پتو",
    description: "پتوهای نرم و قنداق‌های امن برای خواب راحت نوزاد",
    image: "/images/category-ghandagh.jpg",
    productCount: 18,
    slug: "ghandagh",
  },
  {
    id: "3",
    name: "بالش شیردهی",
    description: "بالش‌های راحت برای شیردهی و خواب نوزاد",
    image: "/images/category-balish.jpg",
    productCount: 15,
    slug: "balish",
  },
  {
    id: "4",
    name: "تشک بازی",
    description: "تشک‌های نرم و ایمن برای بازی و استراحت نوزاد",
    image: "/images/category-tashak.jpg",
    productCount: 12,
    slug: "tashak",
  },
];

export default function CategoriesPage() {
  return (
    <>
      <section className="pt-20 pb-12 bg-gradient-to-r from-sky-400 to-rose-400 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            دسته‌بندی‌های نینیتو
          </h1>
          <p className="mt-4 text-base sm:text-lg">
            محصولات متنوع برای خواب آرام کوچولوهای شما
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block bg-white text-sky-400 dark:bg-gray-800 dark:text-sky-300 px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-sky-500 hover:text-white transition"
          >
            مشاهده همه محصولات
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {sampleCategories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative w-full h-48 sm:h-56">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                      {category.name}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-2">
                      {category.description}
                    </p>
                    <p className="mt-2 text-sm text-sky-400 dark:text-sky-300">
                      {category.productCount} محصول
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
