import { MapPin, Send } from "lucide-react";
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
import { apiFetchServer } from "@/src/lib/apiFetch.server";
import ContactInfo from "./_components/ContactInfo";
import { ContactInfoType } from "@/src/types";

export default async function Contact() {
  const settingsRes = await apiFetchServer<{ settings: ContactInfoType }>(
    "/settings"
  );

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
            <Button className="btn-hero">
              <Send className="ml-2 h-5 w-5" />
              ارسال پیام
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <ContactInfo contactInfo={settingsRes?.settings} />
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
