import * as React from "react"
import { cn } from "@/lib/utils"

type Variant = "default" | "strong" | "pomegranate" | "saffron"

export const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: Variant }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClass =
    variant === "strong"
      ? "glass-strong"
      : variant === "pomegranate"
        ? "glass-tint-pomegranate"
        : variant === "saffron"
          ? "glass-tint-saffron"
          : "glass"
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl grain relative",
        variantClass,
        className,
      )}
      {...props}
    />
  )
})
GlassCard.displayName = "GlassCard"
