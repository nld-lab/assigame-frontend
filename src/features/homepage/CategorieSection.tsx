import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { CategorieService } from "@/services/CategorieService";
import type { CategorieProduit } from "@/types";
import { CategoryCard, CategorySkeleton } from "./CategoryCard";

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
        <section className="w-full px-4 pb-20">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold sm:text-3xl">Catégories</h2>
                    <Link
                        to="/produits"
                        className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                        Voir tout
                        <ChevronRight className="size-4" />
                    </Link>
                </div>

                {error && (
                    <p className="text-center text-sm text-muted-foreground">{error}</p>
                )}

                {!error && isLoading && (
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
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
                    <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-wrap lg:justify-center">
                        {categories.slice(0, 4).map((categorie, index) => (
                            <CategoryCard
                                key={categorie.idcategorie_produit}
                                categorie={categorie}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
