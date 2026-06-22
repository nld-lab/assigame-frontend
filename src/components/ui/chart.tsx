import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
    [k: string]: {
        label?: React.ReactNode;
        icon?: React.ComponentType;
        color?: string;
    };
};

type ChartContextProps = {
    config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
    const context = React.useContext(ChartContext);
    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />");
    }
    return context;
}

function ChartContainer({
    id,
    className,
    children,
    config,
    ...props
}: React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
        typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
}) {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-slot="chart"
                data-chart={chartId}
                className={cn(
                    "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-surface]:outline-hidden",
                    className
                )}
                {...props}
            >
                <ChartStyle id={chartId} config={config} />
                <RechartsPrimitive.ResponsiveContainer>
                    {children}
                </RechartsPrimitive.ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    );
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
    const colorConfig = Object.entries(config).filter(
        ([, itemConfig]) => itemConfig.color
    );

    if (!colorConfig.length) {
        return null;
    }

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.entries(THEMES)
                    .map(
                        ([, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
    .map(([key, itemConfig]) => {
        const color = itemConfig.color;
        return color ? `  --color-${key}: ${color};` : null;
    })
    .join("\n")}
}
`
                    )
                    .join("\n"),
            }}
        />
    );
}

function ChartTooltip({
    ...props
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip>) {
    return (
        <RechartsPrimitive.Tooltip
            cursor={false}
            content={<ChartTooltipContent />}
            {...props}
        />
    );
}

function ChartTooltipContent({
    active,
    payload,
    label,
    hideLabel = false,
    className,
}: React.ComponentProps<"div"> & {
    active?: boolean;
    payload?: Array<{
        dataKey?: string | number;
        name?: string;
        value?: number;
        color?: string;
        payload?: { fill?: string };
    }>;
    label?: string;
    hideLabel?: boolean;
}) {
    const { config } = useChart();

    if (!active || !payload?.length) {
        return null;
    }

    return (
        <div
            className={cn(
                "grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
                className
            )}
        >
            {!hideLabel && label && (
                <div className="font-medium">{label}</div>
            )}
            <div className="grid gap-1.5">
                {payload.map((item, index) => {
                    const key = String(item.dataKey ?? item.name ?? index);
                    const itemConfig = config[key];
                    const indicatorColor =
                        item.color ?? item.payload?.fill ?? itemConfig?.color;

                    return (
                        <div
                            key={key}
                            className="flex w-full items-center gap-2"
                        >
                            <div
                                className="size-2.5 shrink-0 rounded-[2px]"
                                style={{ backgroundColor: indicatorColor }}
                            />
                            <div className="flex flex-1 items-center justify-between gap-2 leading-none">
                                <span className="text-muted-foreground">
                                    {itemConfig?.label ?? item.name}
                                </span>
                                <span className="font-mono font-medium tabular-nums text-foreground">
                                    {item.value?.toLocaleString("fr-FR")}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export { ChartContainer, ChartTooltip, ChartTooltipContent };
