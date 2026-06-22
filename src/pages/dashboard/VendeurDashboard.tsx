import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChartActivity } from "@/features/admin/ChartActivity";
import { RecentProductsPreview } from "@/features/admin/RecentProductsPreview";
import { VendeurStatCards } from "@/features/vendeur/VendeurStatCards";
import {
    buildWeeklyProductSeries,
    computeVendeurStats,
    countProductsThisMonth,
    getRecentProducts,
} from "@/lib/admin-stats";
import { useAuth } from "@/hooks/use-auth";
import { ProduitService } from "@/services/ProduitService";
import type { Produit } from "@/types";

export default function VendeurDashboard() {
    const { user } = useAuth();
    const [produits, setProduits] = useState<Produit[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        ProduitService.getMine()
            .then(setProduits)
            .catch(() =>
                toast.error("Impossible de charger votre tableau de bord.")
            )
            .finally(() => setIsLoading(false));
    }, []);

    const stats = useMemo(() => computeVendeurStats(produits), [produits]);

    const chartData = useMemo(
        () => buildWeeklyProductSeries(produits),
        [produits]
    );

    const recentProducts = useMemo(
        () => getRecentProducts(produits),
        [produits]
    );

    const productsThisMonth = useMemo(
        () => countProductsThisMonth(produits),
        [produits]
    );

    return (
        <div className="mx-auto max-w-7xl space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Tableau de bord
                    </h1>
                    <p className="text-muted-foreground">
                        Bienvenue {user?.prenom_utilisateur}{" "}
                        {user?.nom_utilisateur}, voici le résumé de votre
                        activité.
                    </p>
                </div>
                <Button asChild>
                    <Link to="/dashboard/produits/nouveau">
                        Publier un produit
                    </Link>
                </Button>
            </div>

            {isLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-32 animate-pulse rounded-xl bg-muted"
                        />
                    ))}
                </div>
            ) : (
                <VendeurStatCards stats={stats} />
            )}

            <div className="grid gap-4 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    {isLoading ? (
                        <div className="h-[380px] animate-pulse rounded-xl bg-muted" />
                    ) : (
                        <ChartActivity
                            data={chartData}
                            title="Évolution de mes annonces"
                            description="Nombre cumulé de vos produits publiés sur les 12 dernières semaines"
                        />
                    )}
                </div>
                <div className="lg:col-span-3">
                    {isLoading ? (
                        <div className="h-[380px] animate-pulse rounded-xl bg-muted" />
                    ) : (
                        <RecentProductsPreview
                            products={recentProducts}
                            totalThisMonth={productsThisMonth}
                            title="Mes produits récents"
                            viewAllHref="/dashboard/produits"
                            viewAllLabel="Voir tous mes produits"
                            emptyMessage="Vous n'avez publié aucun produit pour le moment."
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
