"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export function PageHeader({
  title,
  back = true,
  right,
  onBack,
  className,
  variant = "light",
}: {
  title?: string
  back?: boolean
  right?: React.ReactNode
  onBack?: () => void
  className?: string
  variant?: "light" | "transparent" | "dark"
}) {
  const router = useRouter()
  const tone =
    variant === "dark"
      ? "text-cream"
      : "text-ink"
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between px-4 pt-4 pb-3",
        variant === "light" && "bg-cream/70 backdrop-blur-md",
        tone,
        className,
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        {back ? (
          <button
            type="button"
            aria-label="Geri"
            onClick={() => (onBack ? onBack() : router.back())}
            className={cn(
              "h-10 w-10 grid place-items-center rounded-full glass shrink-0",
              variant === "dark" && "bg-white/15 border-white/20 text-cream",
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          <span className="w-2" />
        )}
        {title && (
          <h1 className="font-display text-xl leading-tight truncate text-balance">
            {title}
          </h1>
        )}
      </div>
      {right ? <div className="flex items-center gap-2">{right}</div> : null}
    </header>
  )
}
