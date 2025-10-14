import { Instagram, MessageSquare, Send } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { apiFetchServer } from "@/src/lib/apiFetch.server";
import ContactInfo from "./_components/ContactInfo";
import { ContactInfoType } from "@/src/types";
import ContactForm from "./_components/ContactForm";

export default async function Contact() {
  const contactRes = await apiFetchServer<{ settings: ContactInfoType }>(
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
            <ContactInfo contactInfo={contactRes?.settings} />
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="flex w-full justify-center items-center">
        <h3 className="font-semibold text-lg mb-4">شبکه‌های اجتماعی</h3>
        <div className="flex gap-4">
          <a
            href={
              contactRes?.settings?.socials?.instagram ??
              "https://instagram.com/ninito"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 smooth-transition"
          >
            <Instagram className="h-6 w-6 text-primary" />
          </a>
          <a
            href={contactRes?.settings?.socials?.whatsapp ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center hover:bg-secondary/20 smooth-transition"
          >
            <MessageSquare className="h-6 w-6 text-secondary" />
          </a>
          <a
            href={contactRes?.settings?.socials?.telegram ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 smooth-transition"
          >
            <Send className="h-6 w-6 text-primary" />
          </a>
        </div>
      </section>
    </>
  );
}
