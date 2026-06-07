import { ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function TrustBadge({
  label = "Güvenli Ortam",
  className,
  size = "sm",
}: {
  label?: string
  className?: string
  size?: "sm" | "md"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-emerald-trust/20 bg-emerald-trust/10 text-emerald-trust font-medium",
        size === "sm" ? "text-[11px] px-2 py-1" : "text-xs px-2.5 py-1.5",
        className,
      )}
    >
      <ShieldCheck
        className={cn(size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5")}
        strokeWidth={2.4}
      />
      {label}
    </span>
  )
}

export function TrustMeter({
  score,
  size = 96,
}: {
  score: number
  size?: number
}) {
  // teardrop / droplet meter from 1-10
  const pct = Math.max(0, Math.min(1, score / 10))
  const r = size / 2 - 6
  const c = size / 2
  const circumference = 2 * Math.PI * r
  const dash = circumference * pct
  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="trust-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#F4B436" />
            <stop offset="100%" stopColor="#C1153A" />
          </linearGradient>
        </defs>
        <circle
          cx={c}
          cy={c}
          r={r}
          stroke="rgba(42,24,16,0.08)"
          strokeWidth={6}
          fill="none"
        />
        <circle
          cx={c}
          cy={c}
          r={r}
          stroke="url(#trust-grad)"
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-display text-2xl leading-none text-ink">
            {score.toFixed(1)}
          </div>
          <div className="text-[10px] text-ink-soft tracking-wide uppercase mt-1">
            / 10
          </div>
        </div>
      </div>
    </div>
  )
}
