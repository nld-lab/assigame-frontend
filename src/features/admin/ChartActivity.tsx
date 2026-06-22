import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import type { WeeklyProductPoint } from "@/lib/admin-stats";

const chartConfig = {
    total: {
        label: "Total produits",
        color: "var(--color-chart-1)",
    },
} satisfies ChartConfig;

interface ChartActivityProps {
    data: WeeklyProductPoint[];
    title?: string;
    description?: string;
}

export function ChartActivity({
    data,
    title = "Évolution des produits",
    description = "Nombre cumulé de produits publiés sur les 12 dernières semaines",
}: ChartActivityProps) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
                    <LineChart
                        data={data}
                        margin={{ left: 0, right: 12, top: 8, bottom: 0 }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="week"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            allowDecimals={false}
                            width={32}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            dot={{ fill: "var(--primary)", r: 3 }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
