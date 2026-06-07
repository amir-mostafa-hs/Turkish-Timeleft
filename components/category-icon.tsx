import {
  UtensilsCrossed,
  Coffee,
  CupSoda,
  Dices,
  Heart,
  Palette,
  Sparkles,
} from "lucide-react"
import type { CategoryId } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const map = {
  all: Sparkles,
  sofra: UtensilsCrossed,
  kahvalti: Coffee,
  cay: CupSoda,
  oyun: Dices,
  kadin: Heart,
  atolye: Palette,
} as const

export function CategoryIcon({
  id,
  className,
}: {
  id: CategoryId
  className?: string
}) {
  const Icon = map[id]
  return <Icon className={cn("w-4 h-4", className)} strokeWidth={2.2} />
}
