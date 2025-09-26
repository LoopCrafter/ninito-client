import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-gradient2 bg-gradient-to-br from-rose-100 to-sky-100">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-right space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                خوابی آرام برای
                <span className="block bg-gradient-to-l from-rose-300 to-sky-400 bg-clip-text text-transparent">
                  کوچولوهای شما
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                در نینیتو، محصولات باکیفیت و امن برای خواب آرام نوزادان شما
                فراهم می‌کنیم. از آغوشی‌های نرم تا قنداق‌های مخصوص، همه چیز برای
                آسایش فرزند شما.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="btn-hero text-lg px-8 py-4" asChild>
                  <a href="/products">
                    مشاهده محصولات
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="text-lg px-8 py-4 btn-secondary"
                >
                  درباره نینیتو
                </Button>
              </div>

              {/* Stats */}
              <div className="flex justify-center lg:justify-start gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">۱۰۰+</div>
                  <div className="text-sm text-muted-foreground">
                    محصول متنوع
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">۵۰۰+</div>
                  <div className="text-sm text-muted-foreground">
                    مشتری راضی
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">۲۴/۷</div>
                  <div className="text-sm text-muted-foreground">پشتیبانی</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl soft-shadow">
                <Image
                  src="/images/hero-baby-sleep.jpg"
                  width={400}
                  height={400}
                  alt="خواب آرام نوزاد با محصولات نینیتو"
                  className="w-full h-[400px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating badges */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-2xl px-4 py-2 soft-shadow">
                <div className="text-sm font-medium text-sky-400">
                  کیفیت تضمینی
                </div>
              </div>

              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-2xl px-4 py-2 soft-shadow">
                <div className="text-sm font-medium text-rose-300">
                  ارسال رایگان
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
