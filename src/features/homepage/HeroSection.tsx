import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";
import { Search } from "lucide-react";
import { Link } from "react-router";

const HERO_IMAGES = [
  { src: "/hero image.png", alt: "Marketplace Assigame" },
  { src: "/hero image 2.png", alt: "Achetez et vendez sur Assigame" },
  { src: "/hero image 3.png", alt: "Achetez et vendez sur Assigame" },
] as const;

const AUTOPLAY_DELAY_MS = 4000;

function HeroSection() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Vaplénou", "Nassanou", "eeh Loméyaa!!", "gbimgbance!!"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="w-full pt-28 pb-20">
      <div className="mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] px-0 shadow-2xl lg:px-6">
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            className="absolute inset-0 h-full w-full"
          >
            <CarouselContent className="ml-0 h-full">
              {HERO_IMAGES.map((image) => (
                <CarouselItem
                  key={image.src}
                  className="h-full basis-full pl-0"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

          <motion.div
            className="relative px-7 py-16 sm:px-12 sm:py-24"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeUp}
              className="max-w-xl title text-4xl leading-[1.1] font-bold text-white sm:text-5xl lg:text-6xl"
            >
              Achetez et <span className="text-primary">vendez en ligne</span>{" "}
              en toute simplicité.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-md text-sm leading-relaxed text-white sm:text-base"
            >
              Assigame met en relation acheteurs et vendeurs. Publiez vos
              produits gratuitement et laissez les acheteurs intéressés vous
              contacter directement par WhatsApp ou email.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex gap-4">
                <Link to="/dashboard/produits">
                  <Button size="lg" className="rounded-full px-4">
                    Publier un produit
                  </Button>
                </Link>
                <Link to="/produits">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-3 border-primary px-10 hover:bg-primary/10 dark:border-primary"
                  >
                    Explorer
                  </Button>
                </Link>
              </div>

              <div className="w-full max-w-2xl">
                <form className="flex items-center gap-2 rounded-full border bg-white p-2 shadow-xl">
                  <Search className="ml-3 size-5 shrink-0 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une catégorie, un produit…"
                    className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="gap-2 rounded-full px-6"
                  >
                    <Search className="size-4" />
                    <span className="hidden sm:inline">Rechercher</span>
                  </Button>
                </form>
              </div>
            </motion.div>
          </motion.div>

          <div className="flex items-center justify-center lg:justify-end relative z-20">
            <div className="relative flex items-center justify-center">
              <img
                src="/togo.png"
                alt="Togo Background"
                className="absolute w-[300%] h-[300%] max-w-none object-contain opacity-20 pointer-events-none z-0"
              />
              <img
                src="/landing.png"
                alt="Assigame Hero"
                className="relative w-full max-w-[530px] object-contain rounded-2xl drop-shadow-xl z-20"
              />
            </div>
          </div>

        </div>
      </div>
      <div
        className="w-full relative z-30 h-36 md:h-56 -mt-20 md:-mt-32"
        style={{
          backgroundImage: 'url("/bandeau_horizontal.png")',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}

export default HeroSection;
