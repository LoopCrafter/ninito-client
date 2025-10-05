import { ShoppingCart } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/product";
import Pagination from "./ui/pagination";
import { PaginationProps } from "@/types/pagination";

interface ProductsListProps {
  products: Product[];
  pagination: PaginationProps;
  onPageChange: (page: number) => void;
}

export function ProductsList({
  products,
  pagination,
  onPageChange,
}: ProductsListProps) {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {products.length > 0 && (
        <div className="mt-6">
          <Pagination
            page={+pagination.page}
            totalPages={+pagination.totalPages}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
            onPageChange={(p) => onPageChange(p)}
            limit={+pagination.limit}
          />
        </div>
      )}
    </div>
  );
}
