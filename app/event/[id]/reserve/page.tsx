"use client"

import { use, useState } from "react"
import { useRouter, notFound } from "next/navigation"
import {
  CreditCard,
  Wallet,
  Tag,
  ShieldCheck,
  Lock,
  CheckCircle2,
} from "lucide-react"
import { MobileFrame, MobileScroll } from "@/components/mobile-frame"
import { PageHeader } from "@/components/page-header"
import { GlassCard } from "@/components/glass-card"
import { events } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function ReservePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const { id } = use(params)
  const event = events.find((e) => e.id === id)
  if (!event) notFound()

  const [method, setMethod] = useState<"card" | "papara">("card")
  const [promo, setPromo] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [processing, setProcessing] = useState(false)

  const platformFee = 12
  const discount = promoApplied ? 30 : 0
  const total = event.price + platformFee - discount

  const applyPromo = () => {
    if (promo.toUpperCase() === "SOFRAM") {
      setPromoApplied(true)
      toast.success("Promosyon uygulandı: ₺30 indirim")
    } else if (promo.length > 0) {
      toast.error("Geçersiz kod. Demo: SOFRAM")
    }
  }

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => {
      router.push(`/event/${event.id}/success`)
    }, 1400)
  }

  return (
    <MobileFrame blobs="warm">
      <PageHeader title="Rezervasyon" />
      <MobileScroll>
        <div className="px-4 pt-2 pb-6 space-y-4">
          {/* Event summary */}
          <GlassCard className="p-4 flex items-center gap-3">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pomegranate/40 to-saffron/40 grid place-items-center text-2xl shrink-0">
              🍽️
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] uppercase tracking-wider text-ink-soft">
                {event.dateLong} · {event.time}
              </div>
              <h2 className="font-display text-[17px] text-ink leading-tight truncate">
                {event.title}
              </h2>
              <div className="text-[12px] text-ink-soft mt-0.5">
                {event.neighborhood}
              </div>
            </div>
          </GlassCard>

          {/* Order summary */}
          <GlassCard className="p-5">
            <h3 className="font-display text-lg text-ink">Özet</h3>
            <ul className="mt-3 space-y-2.5 text-[14px]">
              <li className="flex items-center justify-between text-ink">
                <span>Koltuk ücreti (1 kişi)</span>
                <span>₺{event.price}</span>
              </li>
              <li className="flex items-center justify-between text-ink">
                <span>Platform katkısı</span>
                <span>₺{platformFee}</span>
              </li>
              {promoApplied && (
                <li className="flex items-center justify-between text-emerald-trust">
                  <span>Promosyon (SOFRAM)</span>
                  <span>-₺{discount}</span>
                </li>
              )}
            </ul>
            <div className="mt-3 pt-3 border-t border-ink/5 flex items-center justify-between">
              <span className="text-[12px] uppercase tracking-wider text-ink-soft font-medium">
                Toplam
              </span>
              <span className="font-display text-2xl text-pomegranate">
                ₺{total}
              </span>
            </div>
          </GlassCard>

          {/* Promo code */}
          <GlassCard className="p-4">
            <label className="text-[12px] uppercase tracking-wider text-ink-soft font-medium flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Promosyon kodu
            </label>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="SOFRAM"
                disabled={promoApplied}
                className="flex-1 h-11 px-3 rounded-xl bg-cream-deep/60 border border-ink/5 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-pomegranate/40 disabled:opacity-60"
              />
              <button
                type="button"
                onClick={applyPromo}
                disabled={promoApplied || promo.length === 0}
                className="h-11 px-4 rounded-xl bg-ink text-cream font-medium text-[13px] disabled:opacity-50"
              >
                {promoApplied ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  "Uygula"
                )}
              </button>
            </div>
          </GlassCard>

          {/* Payment method */}
          <GlassCard className="p-4">
            <h3 className="font-display text-lg text-ink">Ödeme Yöntemi</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { id: "card", icon: CreditCard, label: "Kredi / Banka Kartı" },
                { id: "papara", icon: Wallet, label: "Papara" },
              ].map((m) => {
                const active = method === m.id
                const Icon = m.icon
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id as typeof method)}
                    className={cn(
                      "h-20 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition",
                      active
                        ? "border-pomegranate bg-pomegranate/5 text-pomegranate shadow-[0_4px_16px_-6px_rgba(193,21,58,0.35)]"
                        : "border-ink/10 bg-white/50 text-ink-soft",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[12px] font-medium">{m.label}</span>
                  </button>
                )
              })}
            </div>

            {method === "card" && (
              <div className="mt-3 space-y-2.5">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Kart numarası"
                  className="w-full h-11 px-3 rounded-xl bg-cream-deep/60 border border-ink/5 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-pomegranate/40 tracking-wider"
                />
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="AA / YY"
                    className="h-11 px-3 rounded-xl bg-cream-deep/60 border border-ink/5 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-pomegranate/40"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="CVV"
                    className="h-11 px-3 rounded-xl bg-cream-deep/60 border border-ink/5 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-pomegranate/40"
                  />
                </div>
              </div>
            )}

            {method === "papara" && (
              <div className="mt-3 p-3 rounded-2xl bg-cream-deep/60 text-[12px] text-ink-soft">
                Papara hesabına yönlendirileceksin. Demo modunda otomatik
                onaylanır.
              </div>
            )}
          </GlassCard>

          {/* Trust footer */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-ink-soft">
            <Lock className="w-3 h-3" />
            <span>iyzico altyapısıyla şifreli ödeme</span>
            <span>·</span>
            <ShieldCheck className="w-3 h-3 text-emerald-trust" />
            <span>Sofram garantisi</span>
          </div>
        </div>
      </MobileScroll>

      <div className="px-4 pt-3 pb-5 safe-bottom border-t border-ink/5 bg-cream/80 backdrop-blur-md">
        <button
          type="button"
          disabled={processing}
          onClick={handlePay}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-saffron via-saffron to-saffron-soft text-ink font-semibold shadow-[0_18px_40px_-12px_rgba(232,152,28,0.55)] active:scale-[0.99] transition inline-flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {processing ? "Ödeme alınıyor…" : `Ödemeyi Tamamla · ₺${total}`}
        </button>
      </div>
    </MobileFrame>
  )
}
