import { Button as ShadcnButton, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonSize = VariantProps<typeof buttonVariants>["size"];

interface ButtonProps
  extends React.ComponentProps<typeof ShadcnButton>,
    VariantProps<typeof buttonVariants> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ShadcnButton
      data-ocid="button"
      variant={variant}
      size={size}
      className={cn(
        "rounded-lg font-medium transition-all",
        variant === "default" &&
          "bg-gradient-primary text-primary-foreground shadow-elevated hover:opacity-90 hover:shadow-elevated",
        className,
      )}
      {...props}
    />
  );
}

export { buttonVariants };
