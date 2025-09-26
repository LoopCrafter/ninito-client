import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
const vazirFont = localFont({
  src: [
    {
      path: "../public/fonts/Vazir-Bold.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazir-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-vazir",
});
export const metadata: Metadata = {
  title: "نینیتو - فروشگاه محصولات نوزاد و کودک",
  description:
    "فروشگاه اینترنتی نینیتو، بهترین محصولات نوزاد و کودک با کیفیت بالا و قیمت مناسب. از پوشاک و اسباب‌بازی تا لوازم بهداشتی و تغذیه، همه چیز برای مراقبت از فرزندتان.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
