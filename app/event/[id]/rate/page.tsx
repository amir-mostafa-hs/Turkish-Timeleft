"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter, notFound } from "next/navigation"
import {
  Star,
  Flag,
  ArrowRight,
  Heart,
  MessageCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react"
import { MobileFrame, MobileScroll } from "@/components/mobile-frame"
import { PageHeader } from "@/components/page-header"
import { GlassCard } from "@/components/glass-card"
import { events, sampleAttendees } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type Aspect = "samimiyet" | "sohbet" | "saygi"
const ASPECT_LABELS: Record<Aspect, string> = {
  samimiyet: "Samimiyet",
  sohbet: "Sohbet",
  saygi: "Saygı",
}

type Phase = "rate" | "match" | "done"

export default function RatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const { id } = use(params)
  const event = events.find((e) => e.id === id)
  if (!event) notFound()

  const attendees = sampleAttendees.slice(0, 4)
  const [idx, setIdx] = useState(0)
  const [ratings, setRatings] = useState<
    Record<string, Record<Aspect, number>>
  >({})
  const [note, setNote] = useState("")
  const [phase, setPhase] = useState<Phase>("rate")
  const [likes, setLikes] = useState<Record<string, boolean>>({})

  const current = attendees[idx]
  const currentRating = ratings[current?.id] || {
    samimiyet: 0,
    sohbet: 0,
    saygi: 0,
  }

  const setAspect = (aspect: Aspect, value: number) => {
    setRatings({
      ...ratings,
      [current.id]: { ...currentRating, [aspect]: value },
    })
  }

  const allRated =
    currentRating.samimiyet > 0 &&
    currentRating.sohbet > 0 &&
    currentRating.saygi > 0

  const handleNext = () => {
    setNote("")
    if (idx < attendees.length - 1) {
      setIdx(idx + 1)
    } else {
      setPhase("match")
    }
  }

  const finish = () => {
    setPhase("done")
    toast.success("Teşekkürler! Topluluk daha güvenli oldu.")
  }

  if (phase === "done") {
    return (
      <MobileFrame blobs="warm">
        <PageHeader title="" back={false} />
        <main className="flex-1 px-6 pt-2 pb-8 flex flex-col items-center text-center">
          <div className="relative mt-8">
            <div className="absolute inset-0 -m-8 rounded-full bg-emerald-trust/25 blur-3xl" />
            <div className="relative h-24 w-24 rounded-[2rem] bg-emerald-trust grid place-items-center text-cream">
              <CheckCircle2 className="w-12 h-12" strokeWidth={2} />
            </div>
          </div>
          <h1 className="font-display text-4xl mt-6 text-ink">
            Teşekkürler.
          </h1>
          <p className="text-ink-soft text-[15px] mt-3 leading-relaxed text-pretty max-w-[300px]">
            Değerlendirmen toplulukta kimsenin görmeyeceği şekilde gizlenecek.
            Misafirlerin topluluk puanı güncellendi.
          </p>

          <GlassCard className="mt-8 p-5 w-full text-left">
            <div className="flex items-center gap-2 text-pomegranate">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-wider font-medium">
                Yeni özellik (yakında)
              </span>
            </div>
            <p className="font-display text-[17px] text-ink mt-1.5 leading-snug">
              Karşılıklı bağlantı kurduğun misafirlerle özel mesaj
              başlatabileceksin.
            </p>
          </GlassCard>

          <Link
            href="/home"
            className="mt-auto w-full h-14 rounded-2xl bg-gradient-to-r from-pomegranate to-pomegranate-deep text-cream font-medium inline-flex items-center justify-center gap-2 active:scale-[0.99] transition"
          >
            Ana Sayfaya Dön
            <ArrowRight className="w-5 h-5" />
          </Link>
        </main>
      </MobileFrame>
    )
  }

  if (phase === "match") {
    return (
      <MobileFrame blobs="warm">
        <PageHeader title="Bağlantı" back={false} />
        <MobileScroll>
          <div className="px-6 pt-2 pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pomegranate/10 text-pomegranate text-[11px] font-medium uppercase tracking-wider">
                <Heart className="w-3 h-3" />
                Son adım
              </div>
              <h2 className="font-display text-3xl text-ink leading-tight text-balance">
                Bağlantıda kalmak istediğin biri var mı?
              </h2>
              <p className="text-ink-soft text-[14px] leading-relaxed">
                Sadece karşılıklı seçim olursa kişi bilgileri açılır. Anonim
                kalmak istersen hiç dokunma.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {attendees.map((a) => {
                const liked = likes[a.id]
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setLikes({ ...likes, [a.id]: !liked })}
                    className={cn(
                      "p-4 rounded-3xl text-center transition relative",
                      liked
                        ? "glass-tint-pomegranate"
                        : "glass hover:bg-white/80",
                    )}
                  >
                    <div
                      className={cn(
                        "h-16 w-16 rounded-2xl mx-auto grid place-items-center text-3xl",
                        liked
                          ? "bg-cream/20"
                          : "bg-gradient-to-br from-pomegranate/20 to-saffron/30 backdrop-blur-sm",
                      )}
                    >
                      {["🧿", "☕", "🥯", "🍬"][attendees.indexOf(a)]}
                    </div>
                    <p
                      className={cn(
                        "font-medium mt-2 text-[13px]",
                        liked ? "text-cream" : "text-ink",
                      )}
                    >
                      {a.alias}
                    </p>
                    <p
                      className={cn(
                        "text-[10px] mt-0.5",
                        liked ? "text-cream/80" : "text-ink-soft",
                      )}
                    >
                      Ruh: {a.ruh}
                    </p>
                    <span
                      className={cn(
                        "absolute top-2 right-2 h-7 w-7 rounded-full grid place-items-center transition",
                        liked
                          ? "bg-cream text-pomegranate"
                          : "bg-cream-deep/70 text-ink-soft",
                      )}
                    >
                      <Heart
                        className="w-3.5 h-3.5"
                        fill={liked ? "currentColor" : "none"}
                        strokeWidth={2.4}
                      />
                    </span>
                  </button>
                )
              })}
            </div>

            <p className="mt-6 text-center text-[12px] text-ink-soft italic">
              "Karşılıklı seçim olursa, hazır mesaj kalıbıyla sohbet
              başlatabilirsin."
            </p>
          </div>
        </MobileScroll>
        <div className="px-4 pt-3 pb-5 safe-bottom border-t border-ink/5 bg-cream/80 backdrop-blur-md">
          <button
            type="button"
            onClick={finish}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-pomegranate to-pomegranate-deep text-cream font-medium inline-flex items-center justify-center gap-2 active:scale-[0.99] transition"
          >
            Tamam, Bitir
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </MobileFrame>
    )
  }

  return (
    <MobileFrame blobs="warm">
      <PageHeader
        title="Sofranı değerlendir"
        right={
          <button
            type="button"
            onClick={() => toast.error("Şikayet alındı, ekibimize iletildi")}
            className="inline-flex items-center gap-1 px-3 h-9 rounded-full bg-pomegranate/10 text-pomegranate text-[12px] font-medium"
          >
            <Flag className="w-3.5 h-3.5" />
            Şikayet Et
          </button>
        }
      />
      <MobileScroll>
        <div className="px-4 pt-2 pb-8">
          <div className="px-2">
            <p className="text-[12px] text-ink-soft uppercase tracking-wider font-medium">
              {idx + 1} / {attendees.length}
            </p>
            <h2 className="font-display text-2xl text-ink leading-snug mt-1 text-balance">
              {current.alias} ile geçen akşam nasıldı?
            </h2>
            <p className="text-ink-soft text-[13px] mt-1">
              İsimleri açıklamıyoruz — değerlendirmen anonim kalır.
            </p>
          </div>

          <GlassCard className="mt-5 p-5">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pomegranate/20 to-saffron/30 grid place-items-center text-2xl">
                {["🧿", "☕", "🥯", "🍬"][idx]}
              </div>
              <div>
                <p className="font-display text-lg text-ink leading-tight">
                  {current.alias}
                </p>
                <p className="text-[12px] text-ink-soft">
                  Ruh: {current.ruh} · Topluluk puanı{" "}
                  {current.trustScore.toFixed(1)}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {(Object.keys(ASPECT_LABELS) as Aspect[]).map((aspect) => {
                const val = currentRating[aspect]
                return (
                  <div key={aspect}>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium text-ink">
                        {ASPECT_LABELS[aspect]}
                      </span>
                      <span className="text-[11px] text-ink-soft">
                        {val > 0 ? `${val} / 5` : "—"}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setAspect(aspect, n)}
                          className={cn(
                            "flex-1 h-11 rounded-xl border transition flex items-center justify-center",
                            n <= val
                              ? "bg-saffron border-saffron text-ink"
                              : "bg-white/60 border-ink/10 text-ink-soft hover:bg-white",
                          )}
                          aria-label={`${ASPECT_LABELS[aspect]} ${n}`}
                        >
                          <Star
                            className="w-4 h-4"
                            fill={n <= val ? "currentColor" : "none"}
                            strokeWidth={2}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-5">
              <label className="text-[12px] uppercase tracking-wider text-ink-soft font-medium flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" /> Kısa bir not
                (opsiyonel)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Bir cümle ile özetle…"
                rows={2}
                className="mt-2 w-full p-3 rounded-xl bg-cream-deep/60 border border-ink/5 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-pomegranate/40 text-[14px] resize-none"
              />
            </div>
          </GlassCard>

          <p className="mt-4 text-center text-[11px] text-ink-soft">
            Değerlendirmen tamamen anonimdir. Düşük puanlar gizli olarak
            ekibimize bildirilir.
          </p>
        </div>
      </MobileScroll>

      <div className="px-4 pt-3 pb-5 safe-bottom border-t border-ink/5 bg-cream/80 backdrop-blur-md">
        <button
          type="button"
          disabled={!allRated}
          onClick={handleNext}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-pomegranate to-pomegranate-deep text-cream font-medium inline-flex items-center justify-center gap-2 active:scale-[0.99] transition disabled:opacity-50"
        >
          {idx < attendees.length - 1 ? "Sonraki Misafir" : "Devam Et"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </MobileFrame>
  )
}
