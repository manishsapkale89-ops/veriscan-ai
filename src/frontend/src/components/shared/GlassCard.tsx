import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  glow = false,
  hover = false,
}: GlassCardProps) {
  return (
    <div
      data-ocid="glass_card"
      className={cn(
        "glass-card rounded-2xl shadow-subtle",
        glow &&
          "relative overflow-hidden before:pointer-events-none before:absolute before:-inset-px before:rounded-2xl before:bg-gradient-primary before:opacity-20 before:blur-xl",
        hover &&
          "transition-smooth hover:-translate-y-0.5 hover:shadow-elevated",
        className,
      )}
    >
      {children}
    </div>
  );
}
