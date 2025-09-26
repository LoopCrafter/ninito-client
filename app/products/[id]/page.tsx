import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductGallery } from "@/components/product-gallery";
import { ProductReviews } from "@/components/product-reviews";
import { ReviewForm } from "@/components/review-form";
import { mockProduct } from "@/mock";
import BreadCrumb from "./_components/BreadCrumb";
import ProductInfo from "./_components/ProductInfo";

export default function ProductDetail() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadCrumb
        productName={mockProduct.name}
        category={mockProduct.category}
      />

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div className="order-2 lg:order-1">
          <ProductGallery
            images={mockProduct.images}
            productName={mockProduct.name}
          />
        </div>

        <ProductInfo product={mockProduct} />
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
                      <span className="text-foreground text-left">{value}</span>
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
    </div>
  );
}
