import { CategoriesSection } from "@/components/categories-section";
import FeaturedProducts from "@/components/featured-products";
import { HeroSection } from "@/components/hero-section";
import { WhyNinito } from "@/components/why-ninito";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <WhyNinito />
    </div>
  );
}
