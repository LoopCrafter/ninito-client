"use client";
import { Button } from "@/src/components/ui/button";
import useAddToBasket from "@/src/hooks/useAddToBasket";
import { cn } from "@/src/lib/utils";
import { Product } from "@/src/types/product";
import { formatPrice } from "@/src/utils";
import { ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ClientSanitizer from "./ClientSanitizer";

type ProductInfoProps = {
  product?: Product;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToBasket } = useAddToBasket();
  const variants = product?.variants ?? [];

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
    ? product?.discount?.method === "percentage"
      ? selectedVariant.price -
        (selectedVariant.price * product.discount.value) / 100
      : selectedVariant.price - (product?.discount?.value ?? 0)
    : product?.basePrice ?? 0;

  useEffect(() => {
    if (!selectedColor) return;

    const variantsWithColor = product?.variants.find(
      (v) => v.color.name === selectedColor
    );
    if (variantsWithColor) {
      setSelectedSize(variantsWithColor.size);
    }
  }, [selectedColor]);

  const handleToBasket = () => {
    if (!selectedColor) {
      toast.error("لطفا رنگ مورد نظر را انتخاب کنید");
    } else if (!selectedSize) {
      toast.error("لطفا سایز مورد نظر را انتخاب کنید");
    }
    if (!selectedVariant) return;
    if (product) {
      addToBasket(product, selectedVariant, 1);
    }
    toast.success("آیتم با موفقیت اضافه شد");
  };

  const availableSizes = Array.from(
    new Set(
      variants.filter((v) => v.color.name === selectedColor).map((v) => v.size)
    )
  );

  return (
    <div className="order-2 lg:order-1 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {product?.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground mr-2">{4}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product?.comments?.length} نظر)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex justify-start items-center gap-2">
        <div className="font-semibold text-primary">
          {formatPrice(finalPrice)}
        </div>
        {selectedVariant?.price && (product?.discount?.value ?? 0) > 0 && (
          <div className="text-xs text-muted-foreground">
            <del>{formatPrice(selectedVariant.price)}</del>
          </div>
        )}
      </div>

      {/* Color Selection */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">رنگ: {selectedColor}</h3>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {Array.from(new Set(variants.map((v) => v.color.name))).map(
              (colorName) => {
                const colorHex =
                  variants.find((v) => v.color.name === colorName)?.color.hex ??
                  "#000";
                return (
                  <button
                    key={colorName}
                    className={cn(
                      "w-12 h-12 rounded-full border-2 transition-all",
                      selectedColor === colorName
                        ? "border-primary scale-110 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
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

      {/* Description */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">توضیحات کوتاه</h3>
        <ClientSanitizer html={product?.shortDescription ?? ""} />
        {/* <p className="text-muted-foreground leading-relaxed" aria-colspan={}>{sanitizedHtml}</p> */}
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Button
          onClick={handleToBasket}
          // disabled={!product.inStock}
          className="w-full h-12 text-lg font-semibold"
          size="lg"
        >
          <ShoppingCart className="h-5 w-5 ml-2" />
          افزودن به سبد خرید
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
