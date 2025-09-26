import { Product } from "@/types/product";

export const mockProducts = [
  {
    id: "1",
    name: "آغوشی نوزاد نینیتو مدل کلاسیک",
    price: 450000,
    originalPrice: 550000,
    image: "/images/placeholder.svg",
    rating: 4.8,
    reviewCount: 124,
    colors: [
      { name: "آبی پاستیلی", value: "#A8D5E2" },
      { name: "صورتی پاستیلی", value: "#F4C2C2" },
      { name: "سفید", value: "#FFFFFF" },
    ],
    isNew: true,
    discount: 18,
  },
  {
    id: "2",
    name: "قنداق نرم پاستیلی مخصوص نوزاد",
    price: 320000,
    image: "/images/placeholder.svg",
    rating: 4.6,
    reviewCount: 89,
    colors: [
      { name: "صورتی پاستیلی", value: "#F4C2C2" },
      { name: "آبی پاستیلی", value: "#A8D5E2" },
    ],
  },
  {
    id: "3",
    name: "بالش شیردهی ارگونومیک نینیتو",
    price: 280000,
    originalPrice: 350000,
    image: "/images/placeholder.svg",
    rating: 4.9,
    reviewCount: 156,
    colors: [
      { name: "خاکستری", value: "#E5E7EB" },
      { name: "آبی پاستیلی", value: "#A8D5E2" },
    ],
    discount: 20,
  },
  {
    id: "4",
    name: "تشک بازی نوزاد با اسباب بازی",
    price: 680000,
    image: "/images/placeholder.svg",
    rating: 4.7,
    reviewCount: 203,
    colors: [
      { name: "رنگارنگ", value: "#A8D5E2" },
      { name: "پاستیلی", value: "#F4C2C2" },
    ],
    isNew: true,
  },
  {
    id: "5",
    name: "پتوی مسافرتی قابل حمل",
    price: 380000,
    image: "/images/placeholder.svg",
    rating: 4.5,
    reviewCount: 67,
    colors: [
      { name: "آبی پاستیلی", value: "#A8D5E2" },
      { name: "صورتی پاستیلی", value: "#F4C2C2" },
      { name: "سبز پاستیلی", value: "#C7E9B4" },
    ],
  },
  {
    id: "6",
    name: "تشک بازی نوزاد با اسباب بازی",
    price: 680000,
    image: "/images/placeholder.svg",
    rating: 4.7,
    reviewCount: 203,
    colors: [
      { name: "رنگارنگ", value: "#A8D5E2" },
      { name: "پاستیلی", value: "#F4C2C2" },
    ],
    isNew: true,
  },
  {
    id: "7",
    name: "پتوی مسافرتی قابل حمل",
    price: 380000,
    image: "/images/placeholder.svg",
    rating: 4.5,
    reviewCount: 67,
    colors: [
      { name: "آبی پاستیلی", value: "#A8D5E2" },
      { name: "صورتی پاستیلی", value: "#F4C2C2" },
      { name: "سبز پاستیلی", value: "#C7E9B4" },
    ],
  },
];

export const reviews = [
  {
    id: "1",
    name: "فاطمه احمدی",
    rating: 5,
    comment:
      "آغوشی نینیتو واقعاً فوق‌العاده بود! نوزادم خیلی راحت می‌خوابه توش. کیفیت پارچه عالی و نرمه.",
    product: "آغوشی نوزاد نینیتو",
    avatar: "👩",
  },
  {
    id: "2",
    name: "علی موسوی",
    rating: 5,
    comment:
      "خرید عالی! بالش شیردهی خیلی مفیده و همسرم راحت تر شیردهی می‌کنه. پیشنهاد می‌کنم.",
    product: "بالش شیردهی ارگونومیک",
    avatar: "👨",
  },
  {
    id: "3",
    name: "مریم کریمی",
    rating: 4,
    comment:
      "قنداق خیلی نرم و گرمه. فقط اندازه‌ش یکم کوچیک تر از انتظار بود ولی کیفیت عالی داشت.",
    product: "قنداق نرم پاستیلی",
    avatar: "👩",
  },
  {
    id: "4",
    name: "رضا نوری",
    rating: 5,
    comment:
      "تشک بازی بچه‌مون عاشقشه! رنگ‌ها خیلی شاد و جذابه و کیفیت ساخت هم فوق‌العاده.",
    product: "تشک بازی نوزاد",
    avatar: "👨",
  },
  {
    id: "5",
    name: "زهرا صفری",
    rating: 5,
    comment:
      "پتوی مسافرتی خیلی کاربردیه! برای سفرها عالیه و آسون حمل میشه. بچه‌م هم دوسش داره.",
    product: "پتوی مسافرتی قابل حمل",
    avatar: "👩",
  },
  {
    id: "6",
    name: "زهرا صفری",
    rating: 5,
    comment:
      "پتوی مسافرتی خیلی کاربردیه! برای سفرها عالیه و آسون حمل میشه. بچه‌م هم دوسش داره.",
    product: "پتوی مسافرتی قابل حمل",
    avatar: "👩",
  },
];

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "آغوشی نوزاد پرمیوم",
    price: 850000,
    originalPrice: 1200000,
    images: ["/images/placeholder.svg"],
    rating: 4.8,
    reviewCount: 124,
    colors: [
      { name: "آبی پاستیلی", value: "#B3D9F2" },
      { name: "صورتی پاستیلی", value: "#F2B3D9" },
    ],
    category: "آغوشی",
    inStock: true,
    isNew: true,
    discount: 30,
    description: "",
  },
  {
    id: "2",
    name: "قنداق نوزاد ضد حساسیت",
    price: 650000,
    images: ["/images/placeholder.svg"],
    rating: 4.5,
    reviewCount: 89,
    colors: [
      { name: "آبی پاستیلی", value: "#B3D9F2" },
      { name: "صورتی پاستیلی", value: "#F2B3D9" },
      { name: "سفید", value: "#FFFFFF" },
    ],
    category: "قنداق",
    inStock: true,
    description: "",
  },
  {
    id: "3",
    name: "پتوی مسافرتی نرم",
    price: 420000,
    images: ["/images/placeholder.svg"],
    rating: 4.6,
    reviewCount: 156,
    colors: [
      { name: "آبی پاستیلی", value: "#B3D9F2" },
      { name: "صورتی پاستیلی", value: "#F2B3D9" },
    ],
    category: "پتو",
    inStock: true,
    description: "",
  },
  {
    id: "4",
    name: "بالش شیردهی ارگونومیک",
    price: 390000,
    originalPrice: 450000,
    images: ["/images/placeholder.svg"],
    rating: 4.7,
    reviewCount: 67,
    colors: [
      { name: "آبی پاستیلی", value: "#B3D9F2" },
      { name: "کرم", value: "#F5F5DC" },
    ],
    category: "بالش",
    inStock: false,
    discount: 13,
    description: "",
  },
  {
    id: "5",
    name: "تشک بازی ضخیم",
    price: 580000,
    images: ["/images/placeholder.svg"],
    rating: 4.4,
    reviewCount: 92,
    colors: [
      { name: "آبی پاستیلی", value: "#B3D9F2" },
      { name: "صورتی پاستیلی", value: "#F2B3D9" },
      { name: "زرد", value: "#FFEB3B" },
    ],
    category: "تشک",
    inStock: true,
    description: "",
  },
  {
    id: "6",
    name: "آغوشی ضد کولیک مخصوص شب",
    price: 920000,
    images: ["/images/placeholder.svg"],
    rating: 4.9,
    reviewCount: 201,
    colors: [
      { name: "آبی پاستیلی", value: "#B3D9F2" },
      { name: "سفید", value: "#FFFFFF" },
    ],
    category: "آغوشی",
    inStock: true,
    isNew: true,
    description: "",
  },
];

export const mockProduct = {
  id: "1",
  name: "آغوشی طرح خرس کوچولو",
  price: 2850000,
  originalPrice: 3200000,
  rating: 4.5,
  reviewCount: 127,
  description:
    "آغوشی فوق‌العاده نرم و راحت با طرح خرس کوچولو، مناسب برای نوزادان 0 تا 6 ماه",
  fullDescription: `این آغوشی با استفاده از بهترین پارچه‌های طبیعی و نرم تولید شده است. طراحی خاص آن باعث احساس امنیت و آرامش نوزاد می‌شود. قابل شستشو در ماشین لباسشویی و مقاوم در برابر استفاده‌های متعدد.

ویژگی‌ها:
• جنس: پارچه کتان ارگانیک 100%
• ابعاد: 70×90 سانتی‌متر  
• مناسب برای سنین: 0 تا 6 ماه
• قابل شستشو در دمای 30 درجه
• ضدحساسیت و بدون مواد شیمیایی`,
  specifications: {
    material: "پارچه کتان ارگانیک 100%",
    dimensions: "70×90 سانتی‌متر",
    ageRange: "0 تا 6 ماه",
    washCare: "قابل شستشو در دمای 30 درجه",
    features: "ضدحساسیت، بدون مواد شیمیایی",
  },
  colors: [
    { name: "آبی پاستیلی", value: "blue", class: "bg-baby-blue" },
    { name: "صورتی پاستیلی", value: "pink", class: "bg-baby-pink" },
    { name: "کرم", value: "cream", class: "bg-neutral-200" },
  ],
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
  ],
  inStock: true,
  category: "آغوشی",
  sku: "NIN-001-BL",
};

export const mockCartItems = [
  {
    id: "1",
    name: "آغوشی نوزاد نینیتو",
    price: 450000,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    color: "آبی پاستیلی",
  },
  {
    id: "2",
    name: "قنداق نرم پاستیلی",
    price: 320000,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    color: "صورتی پاستیلی",
  },
];
