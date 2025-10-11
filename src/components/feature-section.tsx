import { Shield, Headphones, Truck, RotateCcw } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "ضمانت اصل بودن کالا",
    description: "تمام محصولات دارای ضمانت اصالت و کیفیت هستند",
  },
  {
    icon: Headphones,
    title: "پشتیبانی ۲۴/۷",
    description: "تیم پشتیبانی ما همیشه در خدمت شماست",
  },
  {
    icon: Truck,
    title: "ارسال سریع",
    description: "ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان",
  },
  {
    icon: RotateCcw,
    title: "بازگشت آسان کالا",
    description: "امکان بازگشت کالا تا ۷ روز پس از خرید",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-400/10 mb-4">
                  <IconComponent className="h-8 w-8 text-sky-300" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
