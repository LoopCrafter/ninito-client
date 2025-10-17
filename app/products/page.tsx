"use client";
import { ProductFilters } from "@/src/components/product-filters";
import { ProductsHeader } from "@/src/components/products-header";
import { ProductsList } from "@/src/components/products-list";
import { ProductCardSkeleton } from "@/src/components/skeleton-loaders/product-skeleton";
import { apiFetchClient } from "@/src/lib/apiFetch.client";
import { buildQueryString } from "@/src/lib/utils";
import { PaginationProps } from "@/src/types/pagination";
import {
  Color,
  Product,
  ProductFilters as ProductFiltersType,
  ProductResponse,
  SortOption,
} from "@/src/types/product";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    lastPage: 1,
    limit: 8,
  });
  const [filters, setFilters] = useState<ProductFiltersType>({
    priceRange: [0, 20000000],
    categories: [],
    inStock: false,
    colors: [],
    searchQuery: "",
    sort: "newest",
  });

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const initialFilters: ProductFiltersType = {
      priceRange: [0, 20000000],
      categories: params["filter[category]"]
        ? [params["filter[category]"]]
        : [],
      inStock: params["filter[inStock]"] === "true",
      colors: params["filter[color]"] ? [params["filter[color]"]] : [],
      searchQuery: params["search"] || "",
      sort: (params["sort"] as SortOption) || "newest",
    };

    setFilters(initialFilters);
    getProducts(1, initialFilters); // ✅ فقط همین یک بار
    setInitialized(true);
  }, []);

  const resetPagination = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  };
  const handleSortChange = (sort: SortOption) => {
    setFilters((prev) => ({ ...prev, sort }));
    resetPagination();
  };

  const handleFilterChange = (filter: ProductFiltersType) => {
    setFilters(filter);
    resetPagination();
  };
  const getProducts = async (page: number, filters: ProductFiltersType) => {
    setIsLoading(true);
    try {
      const query = buildQueryString(filters, page, pagination.limit);
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
    if (!initialized) return;

    const query = buildQueryString(filters, pagination.page, pagination.limit);
    const newUrl = `/products?${query}`;
    router.replace(newUrl);

    getProducts(pagination.page, filters);
  }, [filters, pagination.page]);

  const colors = useMemo(() => {
    const allColors: Color[] = [];

    products.forEach((product) => {
      product.variants.forEach((variant) => {
        if (variant.color && variant.color.name && variant.color.hex) {
          allColors.push({
            name: variant.color.name,
            hex: variant.color.hex,
          });
        }
      });
    });

    const uniqueColors = Array.from(
      new Map(allColors.map((color) => [color.hex, color])).values()
    );

    return uniqueColors;
  }, [products]);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        {/* Filters Sidebar */}

        <ProductFilters
          filters={filters}
          onFiltersChange={handleFilterChange}
          colors={colors}
        />

        {/* Main Content */}
        <div className="flex-1">
          <ProductsHeader
            sortBy={filters.sort}
            onSortChange={handleSortChange}
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
