import { Instagram, MessageSquare, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-muted/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-baby-blue to-baby-pink bg-clip-text text-transparent mb-4">
              نینیتو
            </h3>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              فروشگاه تخصصی محصولات خواب نوزاد با کیفیت بالا و قیمت مناسب. آسایش
              فرزند شما، اولویت ماست.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  صفحه اصلی
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  محصولات
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  درباره ما
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  تماس با ما
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  سبد خرید
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">خدمات مشتریان</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  راهنمای خرید
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  شیوه‌های پرداخت
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  سیاست بازگشت
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  سوالات متداول
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  حریم خصوصی
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">ارتباط با ما</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3 space-x-reverse">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  تهران، خیابان ولیعصر، پلاک ۱۲۳۴
                </span>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">info@ninito.com</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold text-sm mb-3">شبکه‌های اجتماعی</h5>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © ۲۰۲۵ نینیتو - تمام حقوق محفوظ است
            </p>

            <div className="flex items-center space-x-6 space-x-reverse text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                قوانین و مقررات
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                حریم خصوصی
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
