"use client";
import { ProductFilters } from "@/components/product-filters";
import { ProductsHeader } from "@/components/products-header";
import { sampleProducts } from "@/mock";
import { useState } from "react";

export type ViewMode = "grid" | "list";
export type SortOption =
  | "newest"
  | "popular"
  | "price-low"
  | "price-high"
  | "rating";

export interface ProductFilters {
  priceRange: [number, number];
  categories: string[];
  inStock: boolean;
  colors: string[];
  searchQuery: string;
}

export default function Products() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ProductFilters>({
    priceRange: [0, 2000000],
    categories: [],
    inStock: false,
    colors: [],
    searchQuery: "",
  });

  const itemsPerPage = viewMode === "grid" ? 12 : 10;

  // Filter and sort products
  const filteredProducts = sampleProducts.filter((product) => {
    const priceInRange =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];
    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);
    const stockMatch = !filters.inStock || product.inStock;
    const colorMatch =
      filters.colors.length === 0 ||
      product.colors.some((color) => filters.colors.includes(color.name));
    const searchMatch =
      !filters.searchQuery ||
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return (
      priceInRange && categoryMatch && stockMatch && colorMatch && searchMatch
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popular":
        return b.reviewCount - a.reviewCount;
      case "newest":
      default:
        return a.isNew ? -1 : 1;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <ProductFilters filters={filters} onFiltersChange={setFilters} />

        {/* Main Content */}
        <div className="flex-1">
          <ProductsHeader
            viewMode={viewMode}
            sortBy={sortBy}
            onViewModeChange={setViewMode}
            onSortChange={setSortBy}
            totalProducts={filteredProducts.length}
            searchQuery={filters.searchQuery}
            onSearchChange={(query) =>
              setFilters((prev) => ({ ...prev, searchQuery: query }))
            }
          />
        </div>
      </div>
    </div>
  );
}
