import { GlassCard } from "@/components/shared/GlassCard";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  delta?: number;
  sparkline?: number[];
  accent?: "blue" | "green" | "amber" | "red" | "purple";
  className?: string;
}

const accentMap: Record<
  NonNullable<StatCardProps["accent"]>,
  { icon: string; spark: string }
> = {
  blue: { icon: "bg-primary/15 text-primary", spark: "text-primary" },
  green: { icon: "bg-success/15 text-success", spark: "text-success" },
  amber: { icon: "bg-warning/15 text-warning", spark: "text-warning" },
  red: {
    icon: "bg-destructive/15 text-destructive",
    spark: "text-destructive",
  },
  purple: { icon: "bg-accent/15 text-accent", spark: "text-accent" },
};

export function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  sparkline,
  accent = "blue",
  className,
}: StatCardProps) {
  const colors = accentMap[accent];
  const positive = (delta ?? 0) >= 0;

  return (
    <GlassCard hover className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-display mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">
            {value}
          </p>
          {delta !== undefined && (
            <p
              className={cn(
                "mt-1.5 flex items-center gap-1 text-xs font-medium",
                positive ? "text-success" : "text-destructive",
              )}
            >
              {positive ? (
                <TrendingUp className="size-3.5" />
              ) : (
                <TrendingDown className="size-3.5" />
              )}
              {positive ? "+" : ""}
              {delta}%
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl",
            colors.icon,
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>
      {sparkline && sparkline.length > 0 && (
        <div className="mt-4">
          <Sparkline data={sparkline} className={colors.spark} />
        </div>
      )}
    </GlassCard>
  );
}

function Sparkline({
  data,
  className,
}: {
  data: number[];
  className?: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 28 - ((value - min) / range) * 26;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      className="h-8 w-full"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      />
    </svg>
  );
}
