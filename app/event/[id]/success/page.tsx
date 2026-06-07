"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  CheckCircle2,
  MapPin,
  Calendar,
  Sparkles,
  Camera,
  HeartHandshake,
  ArrowRight,
} from "lucide-react"
import { MobileFrame, MobileScroll } from "@/components/mobile-frame"
import { GlassCard } from "@/components/glass-card"
import { events } from "@/lib/mock-data"

const colors = ["#C1153A", "#F4B436", "#F9CD6F", "#8A0E29", "#FFF7EC"]

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1.6 + Math.random() * 1.6,
      rotate: Math.random() * 360,
      color: colors[i % colors.length],
      size: 6 + Math.random() * 6,
    })),
  )
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-10%] block rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.5,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(0, 110vh) rotate(720deg); opacity: 0.85; }
        }
      `}</style>
    </div>
  )
}

export default function SuccessPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const event = events.find((e) => e.id === id)
  if (!event) notFound()

  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 3500)
    return () => clearTimeout(t)
  }, [])

  // Static map placeholder using a query
  const mapSrc = `/placeholder.svg?height=180&width=600&query=${encodeURIComponent(
    `Top-down minimal city map illustration with pin at ${event.neighborhood} Istanbul, warm cream background`,
  )}`

  return (
    <MobileFrame blobs="warm">
      {showConfetti && <Confetti />}
      <MobileScroll>
        <div className="px-5 pt-10 pb-6 flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 -m-6 rounded-full bg-emerald-trust/30 blur-3xl" />
            <div className="relative h-20 w-20 rounded-full bg-emerald-trust grid place-items-center text-cream shadow-[0_18px_40px_-12px_rgba(42,143,106,0.6)]">
              <CheckCircle2 className="w-10 h-10" strokeWidth={2.4} />
            </div>
          </div>
          <h1 className="font-display text-4xl mt-5 text-ink leading-tight">
            Sofran hazır!
          </h1>
          <p className="text-ink-soft text-[15px] mt-2 leading-relaxed text-pretty max-w-[280px]">
            Koltuğun {event.title} için ayrıldı. Sofra adresi aşağıda — etkinlik
            günü hatırlatma alacaksın.
          </p>
        </div>

        <div className="px-4 space-y-4 pb-8">
          {/* Reveal address card */}
          <GlassCard variant="strong" className="p-5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-trust/15 text-emerald-trust text-[11px] font-semibold">
                <Sparkles className="w-3 h-3" />
                Adres açıldı
              </span>
              <span className="text-[12px] text-ink-soft">{event.dateLong}</span>
            </div>

            <div className="mt-3 flex items-start gap-3">
              <span className="grid place-items-center h-10 w-10 rounded-full bg-pomegranate/10 text-pomegranate shrink-0">
                <MapPin className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-lg text-ink leading-tight">
                  {event.neighborhood}
                </h2>
                <p className="text-[13px] text-ink-soft mt-0.5">
                  {event.fullAddress}
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-2xl overflow-hidden border border-ink/5 relative h-[140px] bg-cream-deep">
              <img
                src={mapSrc || "/placeholder.svg"}
                alt={`Harita: ${event.neighborhood}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-pomegranate text-cream shadow-lg">
                <MapPin className="w-4 h-4" />
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                className="h-11 rounded-xl bg-ink text-cream text-[13px] font-medium"
              >
                Yol Tarifi Al
              </button>
              <button
                type="button"
                className="h-11 rounded-xl bg-cream-deep text-ink text-[13px] font-medium"
              >
                Takvime Ekle
              </button>
            </div>
          </GlassCard>

          {/* Pre-event checklist */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-pomegranate" />
              <h3 className="font-display text-lg text-ink">Yanında götür</h3>
            </div>
            <ul className="mt-3 space-y-2.5 text-[14px] text-ink leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-saffron" />
                İyi enerji ve açık fikir
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-saffron" />
                Sofra anılar için bir telefon (kullansan da kullanmasan da)
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-saffron" />
                Kimlik kartın (giriş kontrolü için)
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-saffron" />
                Bir tatlı söz, bir hikâye
              </li>
            </ul>
          </GlassCard>

          {/* Hatıra teaser */}
          <GlassCard variant="saffron" className="p-5 overflow-hidden">
            <div className="flex items-center gap-2 text-ink/80">
              <Camera className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Sofra Anısı
              </span>
            </div>
            <p className="font-display text-xl mt-1 text-ink leading-snug">
              Akşam bittiğinde "anı" paylaşma sayfası açılacak. Fotoğraflar
              sadece sofra arkadaşlarınla görünür.
            </p>
          </GlassCard>

          <Link
            href="/home"
            className="w-full h-14 rounded-2xl bg-ink text-cream font-medium inline-flex items-center justify-center gap-2 active:scale-[0.99] transition"
          >
            Ana Sayfaya Dön
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href={`/event/${event.id}/rate`}
            className="w-full h-12 rounded-2xl glass text-ink font-medium inline-flex items-center justify-center gap-2 text-[13px]"
          >
            Demo: Etkinlik bittiğinde değerlendirmeyi gör
            <Calendar className="w-4 h-4" />
          </Link>
        </div>
      </MobileScroll>
    </MobileFrame>
  )
}
