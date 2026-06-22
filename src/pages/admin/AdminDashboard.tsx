import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AdminStatCards } from "@/features/admin/AdminStatCards";
import { ChartActivity } from "@/features/admin/ChartActivity";
import { RecentProductsPreview } from "@/features/admin/RecentProductsPreview";
import {
    buildWeeklyProductSeries,
    computeAdminStats,
    countProductsThisMonth,
    getRecentProducts,
} from "@/lib/admin-stats";
import { CategorieService } from "@/services/CategorieService";
import { ProduitService } from "@/services/ProduitService";
import { UtilisateurService } from "@/services/UtilisateurService";
import type { Produit, Utilisateur } from "@/types";
import type { CategorieProduit } from "@/types";

export default function AdminDashboard() {
    const [produits, setProduits] = useState<Produit[]>([]);
    const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
    const [categories, setCategories] = useState<CategorieProduit[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            ProduitService.getAll(),
            UtilisateurService.getAll(),
            CategorieService.getAll(),
        ])
            .then(([productsData, usersData, categoriesData]) => {
                setProduits(productsData);
                setUtilisateurs(usersData);
                setCategories(categoriesData);
            })
            .catch(() =>
                toast.error("Impossible de charger les statistiques du tableau de bord.")
            )
            .finally(() => setIsLoading(false));
    }, []);

    const stats = useMemo(
        () => computeAdminStats(produits, utilisateurs, categories.length),
        [produits, utilisateurs, categories.length]
    );

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
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Tableau de bord
                </h1>
                <p className="text-muted-foreground">
                    Voici ce qu&apos;il se passe sur Assigame aujourd&apos;hui.
                </p>
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
                <AdminStatCards stats={stats} />
            )}

            <div className="grid gap-4 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    {isLoading ? (
                        <div className="h-[380px] animate-pulse rounded-xl bg-muted" />
                    ) : (
                        <ChartActivity data={chartData} />
                    )}
                </div>
                <div className="lg:col-span-3">
                    {isLoading ? (
                        <div className="h-[380px] animate-pulse rounded-xl bg-muted" />
                    ) : (
                        <RecentProductsPreview
                            products={recentProducts}
                            totalThisMonth={productsThisMonth}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
