import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { CategorieService } from "@/services/CategorieService";
import type { CategorieProduit } from "@/types";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { CategoryCard, CategorySkeleton } from "./CategoryCard";
import { Marquee } from "@/components/ui/marquee";

export default function CategorieSection() {
    const [categories, setCategories] = useState<CategorieProduit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        CategorieService.getAll()
            .then(setCategories)
            .catch(() => setError("Impossible de charger les catégories."))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <section className="w-full pb-20">
            <div className="mx-auto px-4">
                <motion.div
                    className="mb-10 flex flex-col items-center gap-3 text-center"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                >
                    
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Parcourez nos catégories
                    </h2>
                    <p className="max-w-md text-sm text-muted-foreground">
                        Trouvez rapidement ce que vous cherchez parmi nos
                        différentes catégories de produits.
                    </p>
                    <Link
                        to="/produits"
                        className="mt-1 flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                        Voir tout le catalogue
                        <ChevronRight className="size-4" />
                    </Link>
                </motion.div>
            </div>

            {error && (
                <p className="text-center text-sm text-muted-foreground">
                    {error}
                </p>
            )}

            {!error && isLoading && (
                <div className="flex justify-center gap-8 overflow-hidden px-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <CategorySkeleton key={i} />
                    ))}
                </div>
            )}

            {!error && !isLoading && categories.length === 0 && (
                <p className="text-center text-sm text-muted-foreground">
                    Aucune catégorie disponible pour le moment.
                </p>
            )}

            {!error && !isLoading && categories.length > 0 && (
                <Marquee speed={35} gap={3}>
                    {categories.map((categorie, index) => (
                        <CategoryCard
                            key={categorie.idcategorie_produit}
                            categorie={categorie}
                            index={index}
                        />
                    ))}
                </Marquee>
            )}
        </section>
    );
}
