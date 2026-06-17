import HeroSection from "@/features/homepage/HeroSection";
import CategorieSection from "@/features/homepage/CategorieSection";
import ProductSection from "@/features/homepage/ProductSection";
import CTA from "@/features/homepage/cta";

export default function HomePage() {
  return (
    <div className="flex w-full px-6 lg:px-10 flex-col items-center justify-center gap-10">
      <HeroSection />
      <CategorieSection />
      <ProductSection />
      <CTA />
    </div>
  );
}
