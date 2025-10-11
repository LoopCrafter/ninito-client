import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import { Toaster } from "@/src/components/ui/sonner";
import AppProvider from "@/src/providers/context-provider";
import { ThemeProvider } from "@/src/components/theme-provider";
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
        <AppProvider>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster position="top-right" />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
