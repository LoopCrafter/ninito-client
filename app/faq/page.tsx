import { motion } from "framer-motion";
import { Baby, Cloud, Star } from "lucide-react";
import FAQItem from "./_component/FaqItem";
import FAQHeader from "./_component/FAQHeader";

export default function FAQSection() {
  const faqs = [
    {
      question: "نینیتو چه محصولاتی ارائه می‌دهد؟",
      answer:
        "ما انواع محصولات کالای خواب نوزاد مثل آغوشی، قنداق، پتوی مسافرتی، و بالش شیردهی با طراحی جذاب و کیفیت بالا ارائه می‌کنیم.",
    },
    {
      question: "چگونه می‌توانم محصول را برگردانم؟",
      answer:
        "برای بازگشت محصول، در عرض 7 روز با پشتیبانی تماس بگیرید، محصول را بسته‌بندی کنید و به آدرس ما ارسال کنید. هزینه ارسال بر عهده مشتری است.",
    },
    {
      question: "زمان ارسال سفارش چقدر است؟",
      answer:
        "سفارش‌ها معمولاً 2 تا 5 روز کاری با پست پیشتاز ارسال می‌شوند. زمان دقیق بستگی به آدرس شما دارد.",
    },
    {
      question: "آیا محصولات نینیتو ایمن هستند؟",
      answer:
        "بله، تمام محصولات ما با استانداردهای ایمنی نوزادان طراحی و تست شده‌اند.",
    },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-sky-100 to-rose-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative">
        <FAQHeader />
        <h2 className="text-3xl sm:text-4xl font-bold  text-sky-400 dark:text-sky-300 text-center mb-8">
          سوالات متداول
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
