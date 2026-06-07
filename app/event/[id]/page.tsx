import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  ShieldCheck,
  Star,
  ArrowRight,
  MessageCircleHeart,
} from "lucide-react"
import { MobileFrame, MobileScroll } from "@/components/mobile-frame"
import { PageHeader } from "@/components/page-header"
import { GlassCard } from "@/components/glass-card"
import { TrustBadge } from "@/components/trust-badge"
import { CategoryIcon } from "@/components/category-icon"
import { events, categories, sampleAttendees } from "@/lib/mock-data"

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = events.find((e) => e.id === id)
  if (!event) notFound()

  const cat = categories.find((c) => c.id === event.category)
  const lowSeats = event.seatsLeft <= 2

  return (
    <MobileFrame blobs="none">
      {/* Hero image */}
      <div className="relative h-[300px] shrink-0">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          sizes="390px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/10 to-cream" />
        <div className="absolute inset-0">
          <PageHeader variant="dark" back />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1 text-[12px] font-medium text-ink">
            <CategoryIcon id={event.category} className="w-3.5 h-3.5 text-pomegranate" />
            {cat?.label}
          </span>
        </div>
      </div>

      <MobileScroll className="-mt-6 relative z-10">
        <div className="px-4 pb-6 space-y-4">
          {/* Title block */}
          <div>
            <h1 className="font-display text-3xl leading-tight text-ink text-balance">
              {event.title}
            </h1>
            <p className="text-ink-soft text-[14px] leading-relaxed mt-2 text-pretty">
              {event.hostNote}
            </p>
          </div>

          {/* Quick facts */}
          <GlassCard className="p-4">
            <ul className="grid grid-cols-2 gap-3">
              {[
                { icon: Calendar, label: event.dateLong },
                { icon: Clock, label: `${event.time} – ${event.endTime}` },
                { icon: MapPin, label: event.neighborhood },
                {
                  icon: Users,
                  label: `${event.totalSeats} kişilik · ${event.ageRange} yaş`,
                },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-2.5">
                  <span className="grid place-items-center h-8 w-8 rounded-full bg-saffron/20 text-pomegranate shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[13px] text-ink leading-snug">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-ink/5 flex items-center justify-between text-[12px]">
              <span className="text-ink-soft">Tam adres rezervasyon sonrası</span>
              <span
                className={
                  lowSeats
                    ? "text-pomegranate font-semibold"
                    : "text-emerald-trust font-semibold"
                }
              >
                {event.seatsLeft} koltuk kaldı
              </span>
            </div>
          </GlassCard>

          {/* What happens */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pomegranate" />
              <h2 className="font-display text-lg text-ink">
                Bu masada neler olacak?
              </h2>
            </div>
            <ul className="mt-3 space-y-2.5">
              {event.whatHappens.map((w, i) => (
                <li key={w} className="flex items-start gap-3 text-[14px]">
                  <span className="h-6 w-6 grid place-items-center rounded-full bg-cream-deep text-pomegranate text-[11px] font-semibold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-ink leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 p-3 rounded-2xl bg-saffron/15">
              <p className="text-[12px] text-ink-soft uppercase tracking-wider font-medium">
                İlk kahkaha garantisi
              </p>
              <p className="font-display text-[15px] text-ink mt-1 leading-snug">
                "{event.icebreakers[0]}"
              </p>
            </div>
          </GlassCard>

          {/* Attendees preview */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg text-ink">Sofra Arkadaşların</h2>
              <span className="text-[11px] text-ink-soft">
                İsimler etkinlikte açıklanır
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              {sampleAttendees.slice(0, 4).map((a, i) => (
                <div
                  key={a.id}
                  className="flex flex-col items-center gap-1.5 flex-1"
                >
                  <div className="relative">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-pomegranate/30 to-saffron/40 backdrop-blur grid place-items-center text-lg">
                      {["🧿", "☕", "🥯", "🍬"][i]}
                    </div>
                    <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-trust grid place-items-center text-cream">
                      <ShieldCheck className="w-3 h-3" strokeWidth={3} />
                    </span>
                  </div>
                  <span className="text-[10px] text-ink-soft">{a.alias}</span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-ink font-semibold">
                    <Star className="w-2.5 h-2.5 fill-saffron text-saffron" />
                    {a.trustScore.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Safety block */}
          <GlassCard className="p-5 border-l-[3px] border-emerald-trust/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-trust" />
              <h2 className="font-display text-lg text-ink">
                Güvenlik & Değerlendirme
              </h2>
            </div>
            <p className="text-[13px] text-ink-soft leading-relaxed mt-2">
              Tüm katılımcıların kimliği doğrulanmıştır. Etkinlikten 30 dakika
              sonra her misafir, sofra arkadaşlarını anonim olarak{" "}
              <strong className="text-ink">Samimiyet</strong>,{" "}
              <strong className="text-ink">Sohbet</strong> ve{" "}
              <strong className="text-ink">Saygı</strong> başlıklarında
              değerlendirir. Düşük puan alan kullanıcılar topluluktan
              uzaklaştırılır.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <TrustBadge label="Doğrulanmış misafirler" />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-pomegranate/10 px-2.5 py-1 text-[11px] font-medium text-pomegranate">
                <MessageCircleHeart className="w-3 h-3" />
                Anonim Değerlendirme
              </span>
            </div>
          </GlassCard>

          {/* Mood */}
          <p className="text-center text-[12px] text-ink-soft italic">
            Mood: {event.mood}
          </p>
        </div>
      </MobileScroll>

      {/* Sticky CTA */}
      <div className="px-4 pt-3 pb-5 safe-bottom border-t border-ink/5 bg-cream/80 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="font-display text-2xl text-ink leading-none">
              ₺{event.price}
            </div>
            <div className="text-[11px] text-ink-soft">/ kişi · yemek hariç</div>
          </div>
          <span className="text-[12px] text-pomegranate font-medium">
            {event.seatsLeft} koltuk kaldı
          </span>
        </div>
        <Link
          href={`/event/${event.id}/reserve`}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-pomegranate to-pomegranate-deep text-cream font-medium shadow-[0_18px_40px_-12px_rgba(138,14,41,0.55)] active:scale-[0.99] transition inline-flex items-center justify-center gap-2"
        >
          Koltuğunu Ayırt
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </MobileFrame>
  )
}
