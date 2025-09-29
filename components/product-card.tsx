"use client";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatPrice } from "@/utils";
import Image from "next/image";
import { Product, ProductVariant } from "@/types/product";
import useAddToBasket from "@/hooks/useAddToBasket";
interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToBasket } = useAddToBasket();
  const variants = product.variants ?? [];

  useEffect(() => {
    if (variants.length > 0) {
      setSelectedColor(variants[0].color.name);
      setSelectedSize(variants[0].size);
    }
  }, [variants]);

  const selectedVariant = variants.find(
    (v) => v.color.name === selectedColor && v.size === selectedSize
  );

  const finalPrice = selectedVariant
    ? product.discount?.method === "percentage"
      ? selectedVariant.price -
        (selectedVariant.price * product.discount.value) / 100
      : selectedVariant.price - product.discount.value
    : product.basePrice ?? 0;

  const handleToBasket = () => {
    if (!selectedVariant) return;
    addToBasket(product, selectedVariant, 1);
  };

  const availableSizes = Array.from(
    new Set(
      variants.filter((v) => v.color.name === selectedColor).map((v) => v.size)
    )
  );

  return (
    <div className="product-card group p-3 border border-gray-200 rounded-xl bg-white">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <Image
            src={product.thumbnailUrl ?? ""}
            alt={product.title}
            width={200}
            height={200}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.discount && (
            <Badge className="bg-rose-400 text-white">
              {product.discount.value}
              {product.discount.method === "fixed" ? "تومان" : "%"} تخفیف
            </Badge>
          )}
        </div>

        <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            className="w-full bg-sky-300 text-sm hover:bg-sky-500"
            onClick={handleToBasket}
          >
            <ShoppingCart className="h-4 w-4 ml-2" />
            افزودن به سبد
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href={`/products/${product.id}`}
          className="text-lg text-muted-foreground"
        >
          <h3 className="font-medium text-sm leading-tight line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">رنگ:</span>
            <div className="flex gap-1">
              {Array.from(
                new Set(variants.slice(0, 3).map((v) => v.color.name))
              ).map((colorName) => {
                const colorHex =
                  variants.find((v) => v.color.name === colorName)?.color.hex ??
                  "#000";
                return (
                  <button
                    key={colorName}
                    className={cn(
                      "w-4 h-4 rounded-full border transition-all",
                      selectedColor === colorName
                        ? "border-primary"
                        : "border-gray-300"
                    )}
                    style={{ backgroundColor: colorHex }}
                    onClick={() => {
                      setSelectedColor(colorName);
                      setSelectedSize(null); // تغییر رنگ → سایز ریست میشه
                    }}
                    title={colorName}
                  />
                );
              })}
            </div>
          </div>

          {selectedColor && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">سایز:</span>
              <div className="flex gap-1">
                {availableSizes.slice(0, 3).map((size) => (
                  <button
                    key={size}
                    className={cn(
                      "px-2 py-1 border rounded",
                      selectedSize === size
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300"
                    )}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="font-semibold text-primary">
              {formatPrice(finalPrice)}
            </div>
            {selectedVariant?.price && product.discount?.value > 0 && (
              <div className="text-xs text-muted-foreground line-through">
                {formatPrice(selectedVariant.price)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
