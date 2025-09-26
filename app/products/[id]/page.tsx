"use client";
import { useState } from "react";
import { Star, Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductGallery } from "@/components/product-gallery";
import { ProductReviews } from "@/components/product-reviews";
import { ReviewForm } from "@/components/review-form";
import { useToast } from "@/hooks/useToast";
import { useParams } from "next/navigation";
import Link from "next/link";

// Mock product data
const mockProduct = {
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
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
  ],
  inStock: true,
  category: "آغوشی",
  sku: "NIN-001-BL",
};

export default function ProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    toast({
      title: "محصول به سبد خرید اضافه شد",
      description: `${mockProduct.name} - رنگ ${selectedColor.name}`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted
        ? "از علاقه‌مندی‌ها حذف شد"
        : "به علاقه‌مندی‌ها اضافه شد",
      description: mockProduct.name,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                خانه
              </Link>
            </li>
            <li>
              <ArrowRight className="h-4 w-4" />
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-primary transition-colors"
              >
                محصولات
              </Link>
            </li>
            <li>
              <ArrowRight className="h-4 w-4" />
            </li>
            <li>
              <Link
                href={`/products?category=${mockProduct.category}`}
                className="hover:text-primary transition-colors"
              >
                {mockProduct.category}
              </Link>
            </li>
            <li>
              <ArrowRight className="h-4 w-4" />
            </li>
            <li className="text-foreground font-medium">{mockProduct.name}</li>
          </ol>
        </nav>

        {/* Product Info Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <div className="order-2 lg:order-1">
            <ProductGallery
              images={mockProduct.images}
              productName={mockProduct.name}
              selectedColor={selectedColor.value}
            />
          </div>

          {/* Product Details */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {mockProduct.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(mockProduct.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground mr-2">
                    {mockProduct.rating}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({mockProduct.reviewCount} نظر)
                </span>
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                {mockProduct.inStock ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  >
                    موجود در انبار
                  </Badge>
                ) : (
                  <Badge variant="destructive">ناموجود</Badge>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(mockProduct.price)}
                </span>
                {mockProduct.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(mockProduct.originalPrice)}
                  </span>
                )}
              </div>
              {mockProduct.originalPrice && (
                <div className="text-sm text-green-600 dark:text-green-400">
                  شما{" "}
                  {formatPrice(mockProduct.originalPrice - mockProduct.price)}{" "}
                  صرفه‌جویی می‌کنید
                </div>
              )}
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
                رنگ: {selectedColor.name}
              </h3>
              <div className="flex gap-3">
                {mockProduct.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor.value === color.value
                        ? "border-primary scale-110 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    } ${color.class}`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">توضیحات کوتاه</h3>
              <p className="text-muted-foreground leading-relaxed">
                {mockProduct.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!mockProduct.inStock}
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 ml-2" />
                افزودن به سبد خرید
              </Button>

              <Button
                variant="outline"
                onClick={handleWishlist}
                className="w-full h-12 text-lg"
                size="lg"
              >
                <Heart
                  className={`h-5 w-5 ml-2 ${
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {isWishlisted
                  ? "حذف از علاقه‌مندی‌ها"
                  : "افزودن به علاقه‌مندی‌ها"}
              </Button>
            </div>

            {/* Product Info */}
            <div className="border-t pt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">کد محصول:</span>
                <span className="font-medium">{mockProduct.sku}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">دسته‌بندی:</span>
                <Link
                  href={`/products?category=${mockProduct.category}`}
                  className="font-medium text-primary hover:underline"
                >
                  {mockProduct.category}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="w-full rtl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">توضیحات کامل</TabsTrigger>
            <TabsTrigger value="specifications">مشخصات فنی</TabsTrigger>
            <TabsTrigger value="reviews">
              نظرات ({mockProduct.reviewCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {mockProduct.fullDescription}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="mt-8">
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6">مشخصات فنی</h3>
              <div className="grid gap-4">
                {Object.entries(mockProduct.specifications).map(
                  ([key, value]) => {
                    const labels = {
                      material: "جنس",
                      dimensions: "ابعاد",
                      ageRange: "محدوده سنی",
                      washCare: "نحوه شستشو",
                      features: "ویژگی‌ها",
                    };
                    return (
                      <div
                        key={key}
                        className="flex justify-between py-3 border-b border-border/50 last:border-b-0"
                      >
                        <span className="font-medium text-muted-foreground">
                          {labels[key as keyof typeof labels]}:
                        </span>
                        <span className="text-foreground text-left">
                          {value}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-8">
              <ProductReviews productId={mockProduct.id} />
              <ReviewForm productId={mockProduct.id} />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
