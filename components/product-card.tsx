"use client";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatPrice } from "@/utils";
import Image from "next/image";
import { Product } from "@/types/product";
import useAddToBasket from "@/hooks/useAddToBasket";
import { toast } from "sonner";
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
    if (!selectedColor) {
      toast.error("لطفا رنگ مورد نظر را انتخاب کنید");
    } else if (!selectedSize) {
      toast.error("لطفا سایز مورد نظر را انتخاب کنید");
    }
    if (!selectedVariant) return;
    addToBasket(product, selectedVariant, 1);
    toast.success("آیتم با موفقیت اضافه شد");
  };

  const availableSizes = Array.from(
    new Set(
      variants.filter((v) => v.color.name === selectedColor).map((v) => v.size)
    )
  );

  useEffect(() => {
    if (!selectedColor) return;

    const variantsWithColor = product.variants.find(
      (v) => v.color.name === selectedColor
    );
    console.log("test", variantsWithColor);
    if (variantsWithColor) {
      setSelectedSize(variantsWithColor.size);
    }
  }, [selectedColor]);

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

        <div className="absolute left-2 top-2 z-5">
          <button className="bg-white p-3 rounded-md" onClick={handleToBasket}>
            <ShoppingCart className="h-4 w-4 text-black" />
          </button>
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
              {Array.from(new Set(variants.map((v) => v.color.name))).map(
                (colorName) => {
                  const colorHex =
                    variants.find((v) => v.color.name === colorName)?.color
                      .hex ?? "#000";
                  return (
                    <button
                      key={colorName}
                      className={cn(
                        "w-4 h-4 rounded-full border-2 transition-all",
                        selectedColor === colorName
                          ? "border-gray-900"
                          : "border-gray-300"
                      )}
                      style={{ backgroundColor: colorHex }}
                      onClick={() => {
                        setSelectedColor(colorName);
                        setSelectedSize(null);
                      }}
                      title={colorName}
                    />
                  );
                }
              )}
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
                      " border-1 rounded w-8 h-8",
                      selectedSize === size
                        ? "border-gray-400 bg-rose-100"
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

        <div className="flex justify-start items-center gap-2">
          <div className="font-semibold text-primary">
            {formatPrice(finalPrice)}
          </div>
          {selectedVariant?.price && product.discount?.value > 0 && (
            <div className="text-xs text-muted-foreground">
              <del>{formatPrice(selectedVariant.price)}</del>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
