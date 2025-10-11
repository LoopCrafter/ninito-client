import { CategoriesSection } from "@/src/components/categories-section";
import { FeaturesSection } from "@/src/components/feature-section";
import FeaturedProducts from "@/src/components/featured-products";
import { HeroSection } from "@/src/components/hero-section";
import PopulateProducts from "@/src/components/populate-products";
import ReviewSection from "@/src/components/review-section";
import { ThemeProvider } from "@/src/components/theme-provider";
import { WhyNinito } from "@/src/components/why-ninito";
import { apiFetch } from "@/src/lib/apiClient";
import { Category } from "@/src/types/categories";
import { Product } from "@/src/types/product";

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
