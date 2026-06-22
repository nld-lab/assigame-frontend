import type { ComponentType } from "react";
import {
    Activity,
    Package,
    Tags,
    TrendingDown,
    TrendingUp,
    Users,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AdminDashboardStats } from "@/lib/admin-stats";

interface AdminStatCardsProps {
    stats: AdminDashboardStats;
}

function StatCard({
    title,
    value,
    trend,
    icon: Icon,
}: {
    title: string;
    value: number;
    trend: string;
    icon: ComponentType<{ className?: string }>;
}) {
    const isPositive = trend.startsWith("+") || trend === "0%";
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
                <div className="text-2xl font-bold">{value.toLocaleString("fr-FR")}</div>
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
                    <span>vs mois dernier</span>
                </p>
            </CardContent>
        </Card>
    );
}

export function AdminStatCards({ stats }: AdminStatCardsProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
                title="Total produits"
                value={stats.totalProduits}
                trend={stats.produitsTrend}
                icon={Package}
            />
            <StatCard
                title="Annonces actives"
                value={stats.produitsActifs}
                trend={stats.produitsActifsTrend}
                icon={Activity}
            />
            <StatCard
                title="Utilisateurs"
                value={stats.totalUtilisateurs}
                trend={stats.utilisateursTrend}
                icon={Users}
            />
            <StatCard
                title="Catégories"
                value={stats.totalCategories}
                trend={stats.categoriesTrend}
                icon={Tags}
            />
        </div>
    );
}
