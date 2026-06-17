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
            className="group block"
        >
            <div className="relative h-50 lg:w-60 overflow-hidden rounded-2xl bg-muted shadow-md transition-transform duration-300 group-hover:scale-[1.02]">
                <img
                    src={imageSrc}
                    alt={categorie.nom_categorieproduit}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => {
                        if (imageSrc !== fallback) {
                            setImageSrc(fallback);
                        }
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
                <p className="absolute inset-x-0 bottom-5 text-center text-base font-bold text-white sm:text-lg">
                    {categorie.nom_categorieproduit}
                </p>
            </div>
        </Link>
    );
}

function CategorySkeleton() {
    return (
        <div className="aspect-4/5 animate-pulse rounded-2xl bg-muted" />
    );
}

export { CategorySkeleton };
