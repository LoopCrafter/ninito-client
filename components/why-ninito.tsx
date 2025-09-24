import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "کیفیت بالا و استاندارد اروپایی",
  "قیمت‌های مناسب و رقابتی",
  "ارسال سریع در سراسر کشور",
  "محصولات اورجینال و تست شده",
  "مشاوره رایگان برای انتخاب محصول",
  "گارانتی و خدمات پس از فروش",
];

export function WhyNinito() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              چرا نینیتو را انتخاب کنیم؟
            </h2>

            <p className="text-lg mb-8">
              نینیتو با سال‌ها تجربه در زمینه محصولات نوزاد، بهترین کیفیت و
              خدمات را برای خانواده‌های ایرانی فراهم می‌کند. ما می‌دانیم که
              آسایش فرزند شما بی‌قیمت است.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 space-x-reverse"
                >
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-hero">شروع خرید</Button>
              <Button variant="outline" className="btn-secondary">
                درباره ما بیشتر بدانید
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="bg-gradient-to-tl from-sky-100 to-white rounded-3xl p-8 soft-shadow">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-sky-100 flex items-center justify-center">
                    <span className="text-3xl">👶</span>
                  </div>
                  <h3 className="text-2xl font-bold">خانواده نینیتو</h3>
                  <p>بیش از ۵۰۰ خانواده به نینیتو اعتماد کرده‌اند</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-sky-400">۹۸٪</div>
                      <div className="text-xs">رضایت مشتری</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-sky-400">۲۴h</div>
                      <div className="text-xs">ارسال سریع</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-sky-400">۱۰۰٪</div>
                      <div className="text-xs">ضمانت کیفیت</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
