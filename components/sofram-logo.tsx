import { cn } from "@/lib/utils"

export function SoframLogo({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="relative grid place-items-center w-9 h-9 rounded-2xl bg-gradient-to-br from-pomegranate to-pomegranate-deep shadow-[0_8px_20px_-6px_rgba(138,14,41,0.6)]"
      >
        <span className="absolute inset-0 rounded-2xl bg-white/20 [mask:radial-gradient(circle_at_30%_25%,black_0%,transparent_55%)]" />
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-cream"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 13c2-3 5-4 9-4s7 1 9 4" />
          <path d="M5 13v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
          <path d="M12 9V5" />
          <path d="M10 5h4" />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-display text-[1.35rem] leading-none tracking-tight text-ink">
          Sofram
        </span>
      )}
    </div>
  )
}
