import Link from "next/link"
import Image from "next/image"
import { Clock, MapPin, Users } from "lucide-react"
import type { Event } from "@/lib/mock-data"
import { GlassCard } from "./glass-card"
import { CategoryIcon } from "./category-icon"
import { TrustBadge } from "./trust-badge"
import { categories } from "@/lib/mock-data"

export function EventCard({ event }: { event: Event }) {
  const cat = categories.find((c) => c.id === event.category)
  const lowSeats = event.seatsLeft <= 2
  return (
    <Link href={`/event/${event.id}`} className="block group">
      <GlassCard className="overflow-hidden p-0">
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            sizes="390px"
            className="object-cover scale-105 blur-[2px] group-active:scale-100 transition"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pomegranate-deep/70 via-pomegranate-deep/10 to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/90 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-ink">
              <CategoryIcon id={event.category} className="w-3.5 h-3.5 text-pomegranate" />
              {cat?.short}
            </span>
            <TrustBadge size="sm" />
          </div>
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-saffron px-2.5 py-1 text-[11px] font-semibold text-ink shadow">
              ₺{event.price}
              <span className="text-ink-soft font-normal">/kişi</span>
            </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-cream">
            <div className="text-[11px] uppercase tracking-wider opacity-90">
              {event.date}
            </div>
            <h3 className="font-display text-lg leading-snug text-pretty mt-0.5 drop-shadow">
              {event.title}
            </h3>
          </div>
        </div>
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[12px] text-ink-soft min-w-0">
            <span className="inline-flex items-center gap-1 min-w-0">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{event.neighborhood}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {event.time}
            </span>
          </div>
          <span
            className={[
              "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium",
              lowSeats
                ? "bg-pomegranate/10 text-pomegranate"
                : "bg-emerald-trust/10 text-emerald-trust",
            ].join(" ")}
          >
            <Users className="w-3 h-3" />
            {event.seatsLeft} koltuk kaldı
          </span>
        </div>
      </GlassCard>
    </Link>
  )
}
