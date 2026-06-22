import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { ProduitService } from "@/services/ProduitService";
import type { Produit } from "@/types";
import {
    fadeUp,
    staggerContainer,
    staggerItem,
    viewportOnce,
} from "@/lib/motion";
import { ProductCard, ProductSkeleton } from "./ProductCard";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

    return (
        <section className="w-full px-4 pb-20">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    className="mb-8 flex items-center justify-between"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                >
                    <h2 className="text-2xl font-bold sm:text-3xl">
                        Nouveaux produits
                    </h2>
                    <Link
                        to="/produits"
                        className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                        Voir tout
                        <ChevronRight className="size-4" />
                    </Link>
                </motion.div>

                {error && (
                    <p className="text-center text-sm text-muted-foreground">
                        {error}
                    </p>
                )}

                {!error && isLoading && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <ProductSkeleton key={index} />
                        ))}
                    </div>
                )}

                {!error && !isLoading && latestProducts.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground">
                        Aucun produit disponible pour le moment.
                    </p>
                )}

                {!error && !isLoading && latestProducts.length > 0 && (
                    <motion.div
                        className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >
                        {latestProducts.map((produit) => (
                            <motion.div key={produit.id_produit} variants={staggerItem}>
                                <ProductCard produit={produit} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
