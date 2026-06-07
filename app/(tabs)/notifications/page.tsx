import Link from "next/link"
import { Bell, Star, Calendar, Heart, ShieldCheck } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { notifications } from "@/lib/mock-data"

const iconFor = {
  rating: Star,
  reminder: Calendar,
  match: Heart,
  trust: ShieldCheck,
} as const

const tintFor = {
  rating: "bg-saffron/30 text-saffron-soft",
  reminder: "bg-pomegranate/15 text-pomegranate",
  match: "bg-pomegranate-deep/15 text-pomegranate-deep",
  trust: "bg-emerald-trust/15 text-emerald-trust",
} as const

export default function NotificationsPage() {
  return (
    <div className="px-4 pt-4 pb-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-ink">Bildirimler</h1>
          <p className="text-ink-soft text-[13px] mt-0.5">
            Hatırlatmalar, değerlendirmeler ve bağlantılar.
          </p>
        </div>
        <span className="grid place-items-center h-10 w-10 rounded-full glass">
          <Bell className="w-4 h-4 text-pomegranate" />
        </span>
      </header>

      {/* Highlight rating nudge */}
      <GlassCard variant="pomegranate" className="mt-5 p-5 overflow-hidden">
        <div className="absolute -top-10 -right-6 h-32 w-32 rounded-full bg-saffron/40 blur-2xl" />
        <div className="relative">
          <span className="text-[11px] uppercase tracking-wider opacity-90">
            30 dk sonra
          </span>
          <h2 className="font-display text-2xl mt-1 leading-tight text-balance">
            Dün akşamki sofra nasıldı?
          </h2>
          <p className="text-[13px] mt-1.5 opacity-90 leading-relaxed">
            Sofra arkadaşlarını anonim olarak değerlendir; topluluğun güvenli
            kalmasına yardım et.
          </p>
          <Link
            href="/event/evt-cihangir/rate"
            className="mt-4 inline-flex items-center justify-center h-10 px-5 rounded-full bg-cream text-pomegranate text-[13px] font-semibold"
          >
            Hemen Değerlendir
          </Link>
        </div>
      </GlassCard>

      <h2 className="font-display text-xl text-ink mt-6">Tüm Bildirimler</h2>

      <ul className="mt-3 space-y-2.5">
        {notifications.map((n) => {
          const Icon = iconFor[n.type]
          const Item = (
            <GlassCard className="p-4 flex items-start gap-3">
              <span
                className={`grid place-items-center h-10 w-10 rounded-2xl shrink-0 ${tintFor[n.type]}`}
              >
                <Icon className="w-4 h-4" strokeWidth={2.4} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-ink text-[14px] truncate">
                    {n.title}
                  </p>
                  <span className="text-[11px] text-ink-soft shrink-0">
                    {n.time}
                  </span>
                </div>
                <p className="text-[13px] text-ink-soft mt-0.5 leading-relaxed">
                  {n.body}
                </p>
                <span className="mt-2 inline-block text-[12px] text-pomegranate font-semibold">
                  {n.cta} →
                </span>
              </div>
            </GlassCard>
          )
          if (n.type === "rating" && n.eventId) {
            return (
              <li key={n.id}>
                <Link href={`/event/${n.eventId}/rate`}>{Item}</Link>
              </li>
            )
          }
          if (n.eventId) {
            return (
              <li key={n.id}>
                <Link href={`/event/${n.eventId}`}>{Item}</Link>
              </li>
            )
          }
          return <li key={n.id}>{Item}</li>
        })}
      </ul>
    </div>
  )
}
