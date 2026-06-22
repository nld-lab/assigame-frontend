import type { Produit, Utilisateur } from "@/types";

export interface WeeklyProductPoint {
    week: string;
    total: number;
    nouveaux: number;
}

function startOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    return start;
}

function endOfWeek(weekStart: Date): Date {
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return end;
}

export interface AdminDashboardStats {
    totalProduits: number;
    produitsActifs: number;
    totalUtilisateurs: number;
    totalCategories: number;
    produitsTrend: string;
    utilisateursTrend: string;
    produitsActifsTrend: string;
    categoriesTrend: string;
}

function countInMonth(dates: Date[], year: number, month: number): number {
    return dates.filter(
        (date) => date.getFullYear() === year && date.getMonth() === month
    ).length;
}

export function formatTrend(current: number, previous: number): string {
    if (previous === 0) {
        return current > 0 ? "+100%" : "0%";
    }
    const change = ((current - previous) / previous) * 100;
    const prefix = change > 0 ? "+" : "";
    return `${prefix}${change.toFixed(1)}%`;
}

export function buildWeeklyProductSeries(
    produits: Produit[],
    weeks = 12
): WeeklyProductPoint[] {
    const now = new Date();
    const dates = produits.map((produit) => new Date(produit.date_ajout));
    const currentWeekStart = startOfWeek(now);

    return Array.from({ length: weeks }, (_, index) => {
        const offset = weeks - 1 - index;
        const weekStart = new Date(currentWeekStart);
        weekStart.setDate(weekStart.getDate() - offset * 7);
        const weekEnd = endOfWeek(weekStart);

        const total = dates.filter((date) => date <= weekEnd).length;
        const nouveaux = dates.filter(
            (date) => date >= weekStart && date <= weekEnd
        ).length;

        return {
            week: weekStart.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "short",
            }),
            total,
            nouveaux,
        };
    });
}

function countInWeek(
    dates: Date[],
    weekStart: Date,
    weekEnd: Date
): number {
    return dates.filter((date) => date >= weekStart && date <= weekEnd).length;
}

export interface VendeurDashboardStats {
    totalProduits: number;
    produitsActifs: number;
    prixTotal: number;
    prixMoyen: number;
    produitsTrend: string;
    actifsTrend: string;
}

export function computeVendeurStats(produits: Produit[]): VendeurDashboardStats {
    const activeProducts = produits.filter((p) => p.statut === "ACTIF");
    const prixTotal = activeProducts.reduce((sum, p) => sum + p.prix, 0);
    const prixMoyen = activeProducts.length
        ? prixTotal / activeProducts.length
        : 0;

    const now = new Date();
    const currentWeekStart = startOfWeek(now);
    const currentWeekEnd = endOfWeek(currentWeekStart);
    const lastWeekStart = new Date(currentWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    const lastWeekEnd = endOfWeek(lastWeekStart);

    const productDates = produits.map((p) => new Date(p.date_ajout));
    const produitsThisWeek = countInWeek(
        productDates,
        currentWeekStart,
        currentWeekEnd
    );
    const produitsLastWeek = countInWeek(
        productDates,
        lastWeekStart,
        lastWeekEnd
    );

    const activeDates = activeProducts.map((p) => new Date(p.date_ajout));
    const actifsThisWeek = countInWeek(
        activeDates,
        currentWeekStart,
        currentWeekEnd
    );
    const actifsLastWeek = countInWeek(
        activeDates,
        lastWeekStart,
        lastWeekEnd
    );

    return {
        totalProduits: produits.length,
        produitsActifs: activeProducts.length,
        prixTotal,
        prixMoyen,
        produitsTrend: formatTrend(produitsThisWeek, produitsLastWeek),
        actifsTrend: formatTrend(actifsThisWeek, actifsLastWeek),
    };
}

export function countProductsThisMonth(produits: Produit[]): number {
    const now = new Date();
    return produits.filter((produit) => {
        const date = new Date(produit.date_ajout);
        return (
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth()
        );
    }).length;
}

export function computeAdminStats(
    produits: Produit[],
    utilisateurs: Utilisateur[],
    categoriesCount: number
): AdminDashboardStats {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const lastMonthDate = new Date(thisYear, thisMonth - 1, 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastMonthYear = lastMonthDate.getFullYear();

    const productDates = produits.map((p) => new Date(p.date_ajout));
    const activeProducts = produits.filter((p) => p.statut === "ACTIF");

    const produitsThisMonth = countInMonth(productDates, thisYear, thisMonth);
    const produitsLastMonth = countInMonth(
        productDates,
        lastMonthYear,
        lastMonth
    );

    const activeThisMonth = activeProducts.filter((p) => {
        const date = new Date(p.date_ajout);
        return (
            date.getFullYear() === thisYear && date.getMonth() === thisMonth
        );
    }).length;
    const activeLastMonth = activeProducts.filter((p) => {
        const date = new Date(p.date_ajout);
        return (
            date.getFullYear() === lastMonthYear &&
            date.getMonth() === lastMonth
        );
    }).length;

    const usersThisMonth = utilisateurs.length;
    const usersLastMonth = Math.max(usersThisMonth - 1, 0);

    return {
        totalProduits: produits.length,
        produitsActifs: activeProducts.length,
        totalUtilisateurs: utilisateurs.length,
        totalCategories: categoriesCount,
        produitsTrend: formatTrend(produitsThisMonth, produitsLastMonth),
        produitsActifsTrend: formatTrend(activeThisMonth, activeLastMonth),
        utilisateursTrend: formatTrend(usersThisMonth, usersLastMonth),
        categoriesTrend: "+0.0%",
    };
}

export function getRecentProducts(produits: Produit[], limit = 5): Produit[] {
    return [...produits]
        .sort(
            (a, b) =>
                new Date(b.date_ajout).getTime() -
                new Date(a.date_ajout).getTime()
        )
        .slice(0, limit);
}

export function formatPrice(prix: number) {
    return new Intl.NumberFormat("fr-FR").format(prix) + " FCFA";
}
