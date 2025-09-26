"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/useToast";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils";
import { Link, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

type ProductInfoProps = {
  product: Product;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const handleAddToCart = () => {
    toast({
      title: "محصول به سبد خرید اضافه شد",
      description: `${product.name} - رنگ ${selectedColor.name}`,
    });
  };

  return (
    <div className="order-1 lg:order-2 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground mr-2">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount} نظر)
          </span>
        </div>

        {/* Stock Status */}
        <div className="mb-4">
          {product.inStock ? (
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
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        {product.originalPrice && (
          <div className="text-sm text-green-600 dark:text-green-400">
            شما {formatPrice(product.originalPrice - product.price)} صرفه‌جویی
            می‌کنید
          </div>
        )}
      </div>

      {/* Color Selection */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">رنگ: {selectedColor.name}</h3>
        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color)}
              className={`w-12 h-12 rounded-full border-2 transition-all ${
                selectedColor.value === color.value
                  ? "border-primary scale-110 shadow-lg"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">توضیحات کوتاه</h3>
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full h-12 text-lg font-semibold"
          size="lg"
        >
          <ShoppingCart className="h-5 w-5 ml-2" />
          افزودن به سبد خرید
        </Button>
      </div>

      {/* Product Info */}
      <div className="border-t pt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">کد محصول:</span>
          <span className="font-medium">{product.sku}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">دسته‌بندی:</span>
          <Link
            href={`/products?category=${product.category}`}
            className="font-medium text-primary hover:underline"
          >
            {product.category}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
