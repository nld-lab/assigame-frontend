import HeroSection from "@/features/homepage/HeroSection";
import CategorieSection from "@/features/homepage/CategorieSection";
import ProductSection from "@/features/homepage/ProductSection";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <HeroSection />
      <CategorieSection />
      <ProductSection />
    </div>
  );
}
