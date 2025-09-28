import { CategoriesSection } from "@/components/categories-section";
import { FeaturesSection } from "@/components/feature-section";
import FeaturedProducts from "@/components/featured-products";
import { HeroSection } from "@/components/hero-section";
import PopulateProducts from "@/components/populate-products";
import ReviewSection from "@/components/review-section";
import { WhyNinito } from "@/components/why-ninito";

export default async function Home() {
  const [productsRes, categoriesRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/products`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/categories`, {
      cache: "no-store",
    }),
  ]);

  if (!productsRes.ok || !categoriesRes.ok) {
    throw new Error("Failed to fetch data");
  }

  const [productsData, categoriesData] = await Promise.all([
    productsRes.json(),
    categoriesRes.json(),
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
