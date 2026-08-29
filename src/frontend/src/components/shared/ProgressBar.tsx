import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  className,
  indicatorClassName,
  showLabel = false,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        data-ocid="progress_bar"
        className="bg-primary/15 relative h-2 w-full overflow-hidden rounded-full"
      >
        <div
          className={cn(
            "bg-gradient-primary h-full rounded-full transition-all duration-700 ease-out",
            indicatorClassName,
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {clamped.toFixed(1)}%
        </span>
      )}
    </div>
  );
}
