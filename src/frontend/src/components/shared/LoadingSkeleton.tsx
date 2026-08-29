import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export function LoadingSkeleton({
  className,
  lines = 3,
}: LoadingSkeletonProps) {
  return (
    <div
      data-ocid="loading_state"
      className={cn("space-y-3", className)}
      aria-busy="true"
      aria-label="Loading"
    >
      <Skeleton className="h-4 w-1/3" />
      {Array.from({ length: lines }, (_, index) => ({
        id: `skeleton-line-${index}`,
      })).map((line) => (
        <Skeleton key={line.id} className="h-4 w-full" />
      ))}
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-ocid="loading_state"
      className={cn("glass-card space-y-4 rounded-2xl p-5", className)}
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="size-10 rounded-xl" />
      </div>
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}
