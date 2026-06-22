import HeroSection from "@/features/homepage/HeroSection";
import { ContainerScroll } from "@/features/homepage/ContainerScroll";
import { Marquee } from "@/components/ui/marquee";
import CTA from "@/features/homepage/cta";
import TestimonialsSection from "@/features/homepage/TestimonialsSection";

export default function HomePage() {
  return (
    <div 
      className="flex w-full flex-col items-center justify-center gap-0"
      style={{
        backgroundImage: 'url("/motif.jpg")',
        backgroundRepeat: 'repeat',
      }}
    >
      <HeroSection />

      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Découvrez notre marketplace
            </h2>
            <p className="text-lg text-black max-w-xl text-center">
              Achetez et vendez en toute simplicité sur Assigame
            </p>
          </div>
        }
      >
        <img
          src="/img.png"
          alt="Aperçu Marketplace Assigame"
          className="w-full h-full object-cover object-top rounded-lg md:rounded-xl"
        />
      </ContainerScroll>

      <Marquee pauseOnHover speed={25}>
        {[
          { src: "/1.png", alt: "Brand Logo 1" },
          { src: "/2.png", alt: "Brand Logo 2" },
          { src: "/3.webp", alt: "Brand Logo 3" },
          { src: "/4.webp", alt: "Brand Logo 4" },
          { src: "/5.png", alt: "Brand Logo 5" },
          { src: "/6.png", alt: "Brand Logo 6" },
        ].map((brand, idx) => (
          <div key={idx} className="flex items-center justify-center w-80 h-32 mx-12 shrink-0">
            <img
              src={brand.src}
              alt={brand.alt}
              className="max-h-24 max-w-full object-contain"
            />
          </div>
        ))}
      </Marquee>

      <CTA />
      
      <TestimonialsSection />
    </div>
  );
}
