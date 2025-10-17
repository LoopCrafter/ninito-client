import { PaginationProps } from "./pagination";

export type Color = {
  hex: string;
  name: string;
};
export interface ProductVariant {
  id: string;
  size: "XS" | "S" | "M" | "L" | "XL";
  color: Color;
  price: number;
  stock?: number;
  sku?: string;
  finalPrice?: number;
}
interface Discount {
  method: "percentage" | "fixed";
  value: number;
}

interface User {
  _id: string;
  email: string;
  name: string;
}

interface Comment {
  _id: string;
  productId: string;
  userId: User;
  text: string;
}

export interface Product {
  id: string;
  title: string;
  category: {
    _id: string;
    title: string;
    imageUrl?: string;
  };
  variants: ProductVariant[];
  basePrice?: number;
  discount: Discount;
  description: string;
  shortDescription: string;
  thumbnail: string;
  gallery: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;

  variantsWithFinalPrice?: ProductVariant[];
  thumbnailUrl?: string;
  galleryUrls?: string[];
  finalBasePrice?: number;
  isFeatured?: boolean;
  isEnabled?: boolean;
  specs: { key: string; value: string }[];
}

export type SortOption =
  | "newest"
  | "oldest"
  | "cheapest"
  | "expensive"
  | "mostViewed"
  | "bestSelling";

export interface ProductFilters {
  searchQuery: string;
  categories: string[];
  colors: string[];
  inStock: boolean;
  isEnabled?: boolean;
  priceRange: [number, number];
  sort?: SortOption;

  order?: "asc" | "desc";
}

export type ProductResponse = PaginationProps & {
  products: Product[];
  nextPage: null | number;
  prevPage: null | number;
};
