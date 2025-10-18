import { CategoriesSection } from "@/src/components/categories-section";
import { CategoriesSectionSkeleton } from "@/src/components/fallbacks/CategoriesSectionSkeleton";
import { FeaturedProductsSkeleton } from "@/src/components/fallbacks/FeaturedProductsSkeleton";
import { FeaturesSection } from "@/src/components/feature-section";
import FeaturedProducts from "@/src/components/featured-products";
import { HeroSection } from "@/src/components/hero-section";
import ReviewSection from "@/src/components/review-section";
import { WhyNinito } from "@/src/components/why-ninito";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="">
      <HeroSection />
      <Suspense fallback={<CategoriesSectionSkeleton />}>
        <CategoriesSection />
      </Suspense>

      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <WhyNinito />
      {/*  <PopulateProducts />*/}
      <ReviewSection />
      <FeaturesSection />
    </div>
  );
}
