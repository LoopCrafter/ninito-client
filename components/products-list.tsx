import { useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import { ViewMode } from "@/app/products/page";
import Link from "next/link";

interface ProductsListProps {
  products: Product[];
  viewMode: ViewMode;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductsList({
  products,
  viewMode,
  currentPage,
  totalPages,
  onPageChange,
}: ProductsListProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">محصولی یافت نشد</h3>
        <p className="text-muted-foreground">
          لطفاً فیلترهای انتخابی را تغییر دهید یا جستجوی جدیدی انجام دهید
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Products Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.images[0]}
              {...product}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && onPageChange(currentPage - 1)
                  }
                  className={cn(
                    currentPage === 1 && "pointer-events-none opacity-50"
                  )}
                >
                  قبلی
                </PaginationPrevious>
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => onPageChange(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages && onPageChange(currentPage + 1)
                  }
                  className={cn(
                    currentPage === totalPages &&
                      "pointer-events-none opacity-50"
                  )}
                >
                  بعدی
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

function ProductListItem({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 card-shadow hover:shadow-soft transition-all duration-300">
      <div className="flex items-center gap-6">
        {/* Product Image */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <Link
            href={`/products/${product.id}`}
            className="block w-full h-full"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-baby-blue text-baby-blue-foreground text-xs">
                جدید
              </Badge>
            )}
            {product.discount && (
              <Badge className="bg-destructive text-destructive-foreground text-xs">
                {product.discount}% تخفیف
              </Badge>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Link href={`/products/${product.id}`} className="block">
                <h3 className="font-semibold text-lg leading-tight">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount})
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">رنگ:</span>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      className={cn(
                        "w-6 h-6 rounded-full border-2 transition-all",
                        selectedColor.name === color.name
                          ? "border-primary scale-110"
                          : "border-gray-300"
                      )}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    product.inStock ? "bg-green-500" : "bg-red-500"
                  )}
                />
                <span
                  className={cn(
                    "text-sm",
                    product.inStock ? "text-green-600" : "text-red-600"
                  )}
                >
                  {product.inStock ? "موجود" : "ناموجود"}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              {/* Price */}
              <div className="space-y-1">
                <div className="font-bold text-xl text-primary">
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice && (
                  <div className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button className="btn-hero mt-4" disabled={!product.inStock}>
                <ShoppingCart className="h-4 w-4 ml-2" />
                افزودن به سبد
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
