import { Baby, Shirt, Bed, Car, Gift, Heart } from "lucide-react";

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

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <a
                key={category.id}
                href="/products"
                className="category-card block cursor-pointer rounded-3xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 py-10 px-4 text-center"
              >
                <div
                  className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[${category.color}]`}
                >
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-1 text-gray-900">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </a>
            );
          })}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto">
          <div
            className="flex space-x-4 space-x-reverse pb-4"
            style={{ width: "max-content" }}
          >
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <a
                  key={category.id}
                  href="/products"
                  className="category-card cursor-pointer min-w-[200px] block"
                >
                  <div
                    className={`${category.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-base mb-1">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {category.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
