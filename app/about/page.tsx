"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Truck, Check } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-rose-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pb-16 relative overflow-hidden py-20"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="پس‌زمینه نوزاد"
            fill
            className="object-cover opacity-30"
            style={{ transform: "translateY(0)" }}
            loading="lazy"
          />
          <motion.div
            animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-10 left-10"
          >
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-rose-400" />
          </motion.div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl font-bold  text-sky-600 dark:text-sky-300"
          >
            درباره نی نی تو
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 text-base sm:text-lg  text-gray-700 dark:text-gray-200"
          >
            همراه شما برای خواب آرام و رویایی کوچولوهایتان
          </motion.p>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              href="/products"
              className="mt-6 inline-block bg-sky-400 text-white px-6 py-3 rounded-xl  hover:bg-sky-500 transition"
            >
              مشاهده محصولات
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* محتوای اصلی */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl mx-4 sm:mx-6"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl sm:text-3xl font-bold  text-sky-600 dark:text-sky-300 mb-6">
              ما کی هستیم؟
            </h2>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 ">
                نی نی تو با عشق به نوزادان و والدین، در سال 1400 تأسیس شد تا
                محصولاتی باکیفیت مانند آغوشی، قنداق، و پتوی مسافرتی ارائه دهد.
                ما باور داریم که خواب آرام نوزاد، آرامش والدین را به همراه دارد.
              </p>
              <motion.div className="w-full md:w-1/3">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="محصولات نی نی تو"
                  width={300}
                  height={200}
                  className="rounded-xl object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold  text-sky-600 dark:text-sky-300 mb-6">
              مأموریت ما
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 ">
              در نی نی تو، مأموریت ما ارائه محصولاتی ایمن، نرم، و استاندارد است
              که خواب و راحتی نوزادان را تضمین کند. ما با دقت محصولاتمان را
              انتخاب می‌کنیم تا حس امنیت و آرامش را به شما هدیه دهیم.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold  text-sky-600 dark:text-sky-300 mb-6">
              چرا نی نی تو؟
            </h2>
            <ul className="space-y-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 ">
              <motion.li
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <Heart className="w-6 h-6 text-rose-400" />
                <span>محصولات باکیفیت و ایمن برای نوزادان</span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <Truck className="w-6 h-6 text-rose-400" />
                <span>ارسال سریع و پشتیبانی 24/7</span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <Check className="w-6 h-6 text-rose-400" />
                <span>تضمین رضایت و امکان بازگشت کالا</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* دکمه‌های CTA */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 bg-gradient-to-r from-sky-200 to-rose-200 dark:from-sky-700 dark:to-rose-700 text-center"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold  text-sky-600 dark:text-sky-300 mb-6">
            همراه نی نی تو باشید
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-sky-400 text-white px-6 py-3 rounded-xl  hover:bg-sky-500 transition"
            >
              تماس با ما
            </Link>
            <Link
              href="/products"
              className="bg-rose-400 text-white px-6 py-3 rounded-xl  hover:bg-rose-500 transition"
            >
              مشاهده محصولات
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
