import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { VerificationStatus } from "@/types";
import { CheckCircle2, Clock, ShieldAlert, XCircle } from "lucide-react";

const statusConfig: Record<
  VerificationStatus,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  verified: {
    label: "Verified",
    className:
      "border-transparent bg-success/15 text-success dark:bg-success/20",
    icon: CheckCircle2,
  },
  suspicious: {
    label: "Suspicious",
    className:
      "border-transparent bg-warning/15 text-warning dark:bg-warning/20",
    icon: ShieldAlert,
  },
  fake: {
    label: "Fake",
    className:
      "border-transparent bg-destructive/15 text-destructive dark:bg-destructive/25",
    icon: XCircle,
  },
  pending: {
    label: "Pending",
    className:
      "border-transparent bg-primary/15 text-primary dark:bg-primary/20",
    icon: Clock,
  },
};

interface StatusBadgeProps {
  status: VerificationStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <Badge
      data-ocid={`status_badge_${status}`}
      variant="outline"
      className={cn("gap-1.5 font-medium", config.className, className)}
    >
      <Icon className="size-3.5" />
      {config.label}
    </Badge>
  );
}
