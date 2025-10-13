"use client";
import { useState } from "react";
import { z } from "zod";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  MessageSquare,
  Send,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Card, CardContent } from "@/src/components/ui/card";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "نام باید حداقل 2 کاراکتر باشد" })
    .max(50, { message: "نام نباید بیش از 50 کاراکتر باشد" }),
  email: z
    .string()
    .trim()
    .email({ message: "آدرس ایمیل معتبر نیست" })
    .max(100, { message: "ایمیل نباید بیش از 100 کاراکتر باشد" }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "لطفاً موضوع پیام را انتخاب کنید" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "پیام باید حداقل 10 کاراکتر باشد" })
    .max(1000, { message: "پیام نباید بیش از 1000 کاراکتر باشد" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToForm = () => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-rose-100 to-sky-100">
        <div className="hero-gradient absolute inset-0 opacity-10" />
        <div className="container relative z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              تماس با نینیتو
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              ما همیشه آماده پاسخگویی به شما هستیم!
            </p>
            <Button onClick={scrollToForm} className="btn-hero">
              <Send className="ml-2 h-5 w-5" />
              ارسال پیام
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">راه‌های ارتباطی</h2>
                <p className="text-muted-foreground text-lg">
                  تیم نینیتو همیشه آماده پاسخگویی به سؤالات شما درباره محصولات
                  کالای خواب نوزاد است.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="product-card border-none shadow-lg">
                  <CardContent className="p-6 flex gap-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          آدرس فروشگاه
                        </h3>
                        <p className="text-muted-foreground">
                          تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک 1234
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="product-card border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                        <Phone className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          شماره تماس
                        </h3>
                        <a
                          href="tel:+982112345678"
                          className="text-muted-foreground hover:text-primary smooth-transition"
                        >
                          021-12345678
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="product-card border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">ایمیل</h3>
                        <a
                          href="mailto:support@ninito.ir"
                          className="text-muted-foreground hover:text-primary smooth-transition"
                        >
                          support@ninito.ir
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="product-card border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                        <Clock className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          ساعات کاری
                        </h3>
                        <p className="text-muted-foreground">
                          شنبه تا پنج‌شنبه، 9 صبح تا 6 عصر
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">شبکه‌های اجتماعی</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/ninito_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 smooth-transition"
                  >
                    <Instagram className="h-6 w-6 text-primary" />
                  </a>
                  <a
                    href="https://t.me/ninito_support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center hover:bg-secondary/20 smooth-transition"
                  >
                    <MessageSquare className="h-6 w-6 text-secondary" />
                  </a>
                  <a
                    href="https://wa.me/989123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 smooth-transition"
                  >
                    <Phone className="h-6 w-6 text-primary" />
                  </a>
                </div>
              </div>
            </div>

            <div id="contact-form">
              <Card className="product-card border-none shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6">ارسال پیام</h2>

                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block mb-1 font-medium">
                        نام و نام خانوادگی *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="نام کامل خود را وارد کنید"
                        defaultValue=""
                        className="rounded-xl w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block mb-1 font-medium">
                        ایمیل *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        defaultValue=""
                        className="rounded-xl w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block mb-1 font-medium">
                        شماره تلفن
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="09123456789"
                        defaultValue=""
                        className="rounded-xl w-full"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block mb-1 font-medium"
                      >
                        موضوع پیام *
                      </label>
                      <Select>
                        <SelectTrigger
                          name="subject"
                          defaultValue=""
                          className="rounded-xl w-full"
                        >
                          <SelectValue placeholder="موضوع پیام خود را انتخاب کنید" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product-question">
                            سؤال درباره محصول
                          </SelectItem>
                          <SelectItem value="order-support">
                            پشتیبانی سفارش
                          </SelectItem>
                          <SelectItem value="complaint">شکایات</SelectItem>
                          <SelectItem value="suggestion">پیشنهاد</SelectItem>
                          <SelectItem value="collaboration">همکاری</SelectItem>
                          <SelectItem value="other">سایر موارد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-1 font-medium"
                      >
                        متن پیام *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="پیام خود را بنویسید..."
                        defaultValue=""
                        className="rounded-xl min-h-32 resize-none w-full"
                        maxLength={1000}
                      />
                      <div className="text-sm text-muted-foreground mt-1 text-right">
                        0/1000
                      </div>
                    </div>

                    <Button type="submit" className="btn-hero w-full">
                      <Send className="ml-2 h-5 w-5" />
                      ارسال پیام
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">موقعیت فروشگاه</h2>
            <p className="text-muted-foreground text-lg">
              به راحتی ما را پیدا کنید
            </p>
          </div>

          <div className="bg-card rounded-2xl overflow-hidden soft-shadow">
            <div className="h-96 bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">نقشه موقعیت فروشگاه</p>
                <p className="text-muted-foreground">
                  تهران، خیابان ولیعصر، نرسیده به میدان ونک
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
