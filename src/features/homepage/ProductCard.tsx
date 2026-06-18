import { useState } from "react";
import { Link } from "react-router";
import { Package } from "lucide-react";
import type { Produit } from "@/types";
import { ProduitService } from "@/services/ProduitService";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";

interface ProductCardProps {
    produit: Produit;
}

function formatPrice(prix: number) {
    return new Intl.NumberFormat("fr-FR").format(prix) + " FCFA";
}

export function ProductCard({ produit }: ProductCardProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(
        produit.image_type ? ProduitService.getImageUrl(produit.id_produit) : null
    );

    return (
        <Card
            size="sm"
            className="gap-0 overflow-hidden rounded-xl border-0 bg-card py-0 shadow-sm ring-1 ring-foreground/5 transition-shadow hover:shadow-md"
        >
            <CardContent className="space-y-2 p-3">
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-muted/80 to-muted/40 p-1.5">
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt={produit.nom_produit}
                            className="h-full w-full rounded-md object-cover transition-transform duration-300 group-hover/card:scale-105"
                            onError={() => setImageSrc(null)}
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-1 text-muted-foreground">
                            <Package className="size-6 opacity-40" />
                            <span className="text-[10px]">Image indisponible</span>
                        </div>
                    )}
                </div>

                <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground">
                        {produit.categorie_produit?.nom_categorieproduit ??
                            "Catégorie du produit"}
                    </p>
                    <CardTitle className="line-clamp-2 text-sm font-bold leading-snug">
                        {produit.nom_produit}
                    </CardTitle>
                </div>
            </CardContent>

            <CardFooter className="items-center mt-auto justify-between border-0 bg-transparent px-3 pb-3 pt-0">
                <p className="text-xs font-semibold tracking-tight sm:text-sm">
                    {formatPrice(produit.prix)}
                </p>
                <Button
                    asChild
                    size="xs"
                    className="rounded-full px-3 text-xs font-semibold"
                >
                    <Link to={`/produits/${produit.id_produit}`}>Voir plus</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export function ProductSkeleton() {
    return (
        <Card
            size="sm"
            className="gap-0 overflow-hidden rounded-xl border-0 py-0 shadow-sm ring-1 ring-foreground/5"
        >
            <CardContent className="space-y-2 p-3">
                <div className="aspect-4/3 animate-pulse rounded-lg bg-background/50" />
                <div className="space-y-1.5">
                    <div className="h-3 w-2/5 animate-pulse rounded bg-background/50" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-background/50" />
                </div>
            </CardContent>
            <CardFooter className="justify-between border-0 bg-transparent px-3 pb-3 pt-0">
                <div className="h-4 w-16 animate-pulse rounded bg-background/50" />
                <div className="h-6 w-16 animate-pulse rounded-full bg-background/50" />
            </CardFooter>
        </Card>
    );
}
