"use client";
import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  colors: Array<{ name: string; value: string }>;
  discount?: number;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  colors,
  discount,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  return (
    <div className="product-card group p-3 border border-gray-200 rounded-xl bg-white">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <Link href={`/products/${id}`} className="block w-full h-full">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {discount && (
            <Badge className="bg-destructive text-white">
              {discount}% تخفیف
            </Badge>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 left-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur",
            isLiked && "text-red-500"
          )}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
        </Button>

        <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="w-full bg-sky-300 text-sm hover:bg-sky-500">
            <ShoppingCart className="h-4 w-4 ml-2" />
            افزودن به سبد
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href={`/products/${id}`}
          className="text-sm text-muted-foreground"
        >
          <h3 className="font-medium text-sm leading-tight line-clamp-2">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviewCount})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">رنگ:</span>
          <div className="flex gap-1">
            {colors.map((color) => (
              <button
                key={color.name}
                className={cn(
                  "w-4 h-4 rounded-full border-1 transition-all",
                  selectedColor.name === color.name
                    ? "border-primary "
                    : "border-gray-300"
                )}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color)}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="font-semibold text-primary">
              {formatPrice(price)}
            </div>
            {originalPrice && (
              <div className="text-xs text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </div>
            )}
          </div>

          <Button variant="outline" size="icon" className="h-8 w-8">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
