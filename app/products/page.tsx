"use client";
import { ProductFilters } from "@/components/product-filters";
import { ProductsHeader } from "@/components/products-header";
import { ProductsList } from "@/components/products-list";
import { ProductCardSkeleton } from "@/components/skeleton-loaders/product-skeleton";
import { apiFetchClient } from "@/lib/apiFetch.client";
import { buildQueryString } from "@/lib/utils";
import { PaginationProps } from "@/types/pagination";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type ViewMode = "grid" | "list";
export type SortOption =
  | "newest"
  | "popular"
  | "price-low"
  | "price-high"
  | "rating";

export interface ProductFilters {
  searchQuery: string;
  categories: string[];
  colors: string[];
  inStock: boolean;
  isEnabled?: boolean;
  priceRange: [number, number];
  sort?:
    | "newest"
    | "oldest"
    | "cheapest"
    | "expensive"
    | "mostViewed"
    | "bestSelling";
  order?: "asc" | "desc";
}

type ProductResponse = PaginationProps & {
  products: Product[];
  nextPage: null | number;
  prevPage: null | number;
};
export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    lastPage: 1,
    limit: 8,
  });
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filters, setFilters] = useState<ProductFilters>({
    priceRange: [0, 20000000],
    categories: [],
    inStock: false,
    colors: [],
    searchQuery: "",
  });

  const getProducts = async (page: number, filters: ProductFilters) => {
    setIsLoading(true);
    try {
      const query = buildQueryString(
        filters,
        pagination.page,
        pagination.limit
      );
      const url = `/products?${query}`;

      const productsData = await apiFetchClient<ProductResponse>(url);
      const {
        products,
        hasNextPage,
        hasPrevPage,
        page: currentPage,
        totalPages,
        lastPage,
        limit: currentLimit,
      } = productsData;
      console.log("++++++", products);
      setProducts(products);
      setPagination({
        hasNextPage,
        hasPrevPage,
        page: currentPage,
        totalPages,
        lastPage,
        limit: currentLimit,
      });
    } catch (error) {
      toast.error("There is an error, please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts(1, filters);
    console.log("filters,", filters);
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <ProductFilters filters={filters} onFiltersChange={setFilters} />

        {/* Main Content */}
        <div className="flex-1">
          <ProductsHeader
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalProducts={products.length}
            searchQuery={filters.searchQuery}
            onSearchChange={(query) =>
              setFilters((prev) => ({ ...prev, searchQuery: query }))
            }
          />

          {isLoading ? (
            <ProductCardSkeleton count={8} cols={4} />
          ) : (
            <ProductsList
              products={products}
              pagination={pagination}
              onPageChange={(page) => getProducts(page, filters)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
