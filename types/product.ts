export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  colors: Array<{ name: string; value: string }>;
  category: string;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
}
