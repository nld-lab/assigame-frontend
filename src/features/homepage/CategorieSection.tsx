import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { CategorieService } from "@/services/CategorieService";
import type { CategorieProduit } from "@/types";
import {
    fadeUp,
    staggerContainer,
    staggerItem,
    viewportOnce,
} from "@/lib/motion";
import { CategoryCard, CategorySkeleton } from "./CategoryCard";

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

    return (
        <section className="w-full px-4 pb-20">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    className="mb-8 flex items-center justify-between"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                >
                    <h2 className="text-2xl font-bold sm:text-3xl">Catégories</h2>
                    <Link
                        to="/produits"
                        className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                        Voir tout
                        <ChevronRight className="size-4" />
                    </Link>
                </motion.div>

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

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

                {!error && !isLoading && categories.length > 0 && (
                    <motion.div
                        className="grid grid-cols-2 gap-4 lg:grid-cols-5 lg:justify-center"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >
                        {categories.slice(0, 5).map((categorie, index) => (
                            <motion.div key={categorie.idcategorie_produit} variants={staggerItem}>
                                <CategoryCard categorie={categorie} index={index} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
