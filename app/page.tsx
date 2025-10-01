import { CategoriesSection } from "@/components/categories-section";
import { FeaturesSection } from "@/components/feature-section";
import FeaturedProducts from "@/components/featured-products";
import { HeroSection } from "@/components/hero-section";
import PopulateProducts from "@/components/populate-products";
import ReviewSection from "@/components/review-section";
import { ThemeProvider } from "@/components/theme-provider";
import { WhyNinito } from "@/components/why-ninito";
import { apiFetch } from "@/lib/apiClient";
import { Category } from "@/types/categories";
import { Product } from "@/types/product";

type ProductsResponse = {
  products: Product[];
  featured: Product[];
};

type CategoriesResponse = {
  categories: Category[];
};

export default async function Home() {
  const [productsData, categoriesData] = await Promise.all([
    apiFetch<ProductsResponse>("/products", { cache: "no-store" }),
    apiFetch<CategoriesResponse>("/categories", { cache: "no-store" }),
  ]);

  return (
    <div className="">
      <HeroSection />
      <CategoriesSection categories={categoriesData.categories ?? []} />
      {productsData?.featured?.length > 0 && (
        <FeaturedProducts products={productsData.featured ?? []} />
      )}
      <WhyNinito />
      {/*  <PopulateProducts />*/}
      <ReviewSection />
      <FeaturesSection />
    </div>
  );
}
