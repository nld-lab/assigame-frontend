import { useState } from "react";
import { Link } from "react-router";
import { Package } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/admin-stats";
import { ProduitService } from "@/services/ProduitService";
import type { Produit } from "@/types";

interface RecentProductsPreviewProps {
    products: Produit[];
    totalThisMonth: number;
    title?: string;
    viewAllHref?: string;
    viewAllLabel?: string;
    emptyMessage?: string;
}

function ProductRow({ produit }: { produit: Produit }) {
    const [imageError, setImageError] = useState(false);
    const imageUrl = produit.image_type
        ? ProduitService.getImageUrl(produit.id_produit)
        : null;
    const vendeur = produit.utilisateur;
    const initials =
        `${vendeur?.prenom_utilisateur?.[0] ?? "V"}${vendeur?.nom_utilisateur?.[0] ?? ""}`.toUpperCase();

    return (
        <div className="flex items-center gap-3">
            <Avatar className="size-10 rounded-lg">
                {imageUrl && !imageError ? (
                    <AvatarImage
                        src={imageUrl}
                        alt={produit.nom_produit}
                        className="object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : null}
                <AvatarFallback className="rounded-lg">
                    {imageUrl && !imageError ? (
                        initials
                    ) : (
                        <Package className="size-4 opacity-60" />
                    )}
                </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                    {produit.nom_produit}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                    {produit.categorie_produit?.nom_categorieproduit ??
                        "Sans catégorie"}
                </p>
            </div>
            <p className="shrink-0 text-sm font-semibold">
                {formatPrice(produit.prix)}
            </p>
        </div>
    );
}

export function RecentProductsPreview({
    products,
    totalThisMonth,
    title = "Produits récents",
    viewAllHref = "/admin/produits",
    viewAllLabel = "Voir tous les produits",
    emptyMessage = "Aucun produit publié pour le moment.",
}: RecentProductsPreviewProps) {
    return (
        <Card className="flex h-full flex-col">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {totalThisMonth} annonce{totalThisMonth > 1 ? "s" : ""}{" "}
                    publiée{totalThisMonth > 1 ? "s" : ""} ce mois-ci
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
                {products.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        {emptyMessage}
                    </p>
                )}
                {products.map((produit, index) => (
                    <div key={produit.id_produit}>
                        <ProductRow produit={produit} />
                        {index < products.length - 1 && (
                            <Separator className="mt-4" />
                        )}
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                    <Link to={viewAllHref}>{viewAllLabel}</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
