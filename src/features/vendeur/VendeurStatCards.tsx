import type { ComponentType } from "react";
import {
    Activity,
    Coins,
    Package,
    TrendingDown,
    TrendingUp,
    Wallet,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatPrice, type VendeurDashboardStats } from "@/lib/admin-stats";
import { cn } from "@/lib/utils";

interface VendeurStatCardsProps {
    stats: VendeurDashboardStats;
}

function StatCard({
    title,
    displayValue,
    trend,
    trendLabel = "vs semaine dernière",
    icon: Icon,
    showTrend = true,
}: {
    title: string;
    displayValue: string;
    trend?: string;
    trendLabel?: string;
    icon: ComponentType<{ className?: string }>;
    showTrend?: boolean;
}) {
    const isPositive =
        !trend || trend.startsWith("+") || trend === "0%";
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{displayValue}</div>
                {showTrend && trend ? (
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendIcon
                            className={cn(
                                "size-3.5",
                                isPositive ? "text-emerald-500" : "text-red-500"
                            )}
                        />
                        <span
                            className={cn(
                                isPositive ? "text-emerald-500" : "text-red-500"
                            )}
                        >
                            {trend}
                        </span>
                        <span>{trendLabel}</span>
                    </p>
                ) : (
                    <p className="mt-1 text-xs text-muted-foreground">
                        Annonces actives uniquement
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

export function VendeurStatCards({ stats }: VendeurStatCardsProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
                title="Mes produits"
                displayValue={stats.totalProduits.toLocaleString("fr-FR")}
                trend={stats.produitsTrend}
                icon={Package}
            />
            <StatCard
                title="Annonces actives"
                displayValue={stats.produitsActifs.toLocaleString("fr-FR")}
                trend={stats.actifsTrend}
                icon={Activity}
            />
            <StatCard
                title="Valeur du catalogue"
                displayValue={formatPrice(stats.prixTotal)}
                icon={Wallet}
                showTrend={false}
            />
            <StatCard
                title="Prix moyen"
                displayValue={formatPrice(stats.prixMoyen)}
                icon={Coins}
                showTrend={false}
            />
        </div>
    );
}
