import { ProductFilters } from "@/app/products/page";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (fullName?: string) => {
  if (!fullName) return "";
  const names = fullName.trim().split(" ");
  const initials = names.map((name) => name[0].toUpperCase());
  return initials.slice(0, 2).join("");
};

export const buildQueryString = (
  filters: ProductFilters,
  page = 1,
  limit = 10
) => {
  const params = new URLSearchParams();

  // Pagination
  params.set("page", page.toString());
  params.set("limit", limit.toString());

  // Search
  if (filters.searchQuery.trim() !== "") {
    params.set("search", filters.searchQuery.trim());
  }

  // Sort & order
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.order) params.set("order", filters.order);

  // Price range
  const [minPrice, maxPrice] = filters.priceRange;
  if (minPrice > 0) params.set("filter[minPrice]", minPrice.toString());
  if (maxPrice < 20000000) params.set("filter[maxPrice]", maxPrice.toString());

  // Categories
  filters.categories.forEach((cat) => {
    params.append("filter[category]", cat);
  });

  // Colors
  filters.colors.forEach((color) => {
    params.append("filter[color]", color);
  });

  // InStock
  if (filters.inStock) params.set("filter[inStock]", "true");

  // isEnabled
  if (filters.isEnabled !== undefined) {
    params.set("filter[isEnabled]", filters.isEnabled ? "true" : "false");
  }

  return params.toString();
};
