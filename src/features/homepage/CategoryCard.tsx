import { useState } from "react";
import { Link } from "react-router";
import type { CategorieProduit } from "@/types";
import { CategorieService } from "@/services/CategorieService";
import { getFallbackCategoryImage } from "@/lib/category-images";

interface CategoryCardProps {
    categorie: CategorieProduit;
    index: number;
}

export function CategoryCard({ categorie, index }: CategoryCardProps) {
    const fallback = getFallbackCategoryImage(
        categorie.nom_categorieproduit,
        index
    );
    const apiImage = categorie.image_type
        ? CategorieService.getImageUrl(categorie.idcategorie_produit)
        : null;
    const [imageSrc, setImageSrc] = useState(apiImage ?? fallback);

    return (
        <Link
            to={`/produits?categorie=${categorie.idcategorie_produit}`}
            className="group flex w-28 shrink-0 flex-col items-center gap-3 sm:w-32"
        >
            <div className="relative size-24 overflow-hidden rounded-full bg-muted shadow-md ring-1 ring-border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:ring-primary/40 sm:size-20">
                <img
                    src={imageSrc}
                    alt={categorie.nom_categorieproduit}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={() => {
                        if (imageSrc !== fallback) {
                            setImageSrc(fallback);
                        }
                    }}
                />
                <div className="absolute inset-0 rounded-full bg-linear-to-t from-black/30 to-transparent" />
            </div>
            <p className="line-clamp-1 max-w-full text-center text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                {categorie.nom_categorieproduit}
            </p>
        </Link>
    );
}

function CategorySkeleton() {
    return (
        <div className="flex w-28 shrink-0 flex-col items-center gap-3 sm:w-32">
            <div className="size-24 animate-pulse rounded-full bg-muted sm:size-28" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        </div>
    );
}

export { CategorySkeleton };
