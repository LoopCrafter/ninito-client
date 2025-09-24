import { CategoriesSection } from "@/components/categories-section";
import { FeaturesSection } from "@/components/feature-section";
import FeaturedProducts from "@/components/featured-products";
import { HeroSection } from "@/components/hero-section";
import PopulateProducts from "@/components/populate-products";
import ReviewSection from "@/components/review-section";
import { WhyNinito } from "@/components/why-ninito";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <WhyNinito />
      <PopulateProducts />
      <ReviewSection />
      <FeaturesSection />
    </div>
  );
}
