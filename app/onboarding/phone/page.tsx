"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Phone, Lock } from "lucide-react"
import { MobileFrame } from "@/components/mobile-frame"
import { PageHeader } from "@/components/page-header"
import { GlassCard } from "@/components/glass-card"

export default function PhonePage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")

  const formatted = phone
    .replace(/\D/g, "")
    .slice(0, 10)
    .replace(/(\d{3})(\d{3})?(\d{2})?(\d{2})?/, (_, a, b, c, d) =>
      [a, b, c, d].filter(Boolean).join(" "),
    )

  const valid = phone.replace(/\D/g, "").length === 10

  return (
    <MobileFrame blobs="warm">
      <PageHeader title="Telefon Doğrulama" />
      <main className="flex-1 px-6 pt-2 pb-8 flex flex-col">
        <div className="space-y-2 mt-2">
          <h2 className="font-display text-3xl text-ink leading-tight text-balance">
            Soframa hoş geldin.
          </h2>
          <p className="text-ink-soft text-[15px] leading-relaxed">
            Topluluğun güvenliği için önce telefonunla giriş yap. Sana 6 haneli bir
            kod göndereceğiz.
          </p>
        </div>

        <GlassCard className="mt-8 p-5">
          <label className="text-[12px] uppercase tracking-wider text-ink-soft font-medium">
            Telefon Numaran
          </label>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 h-12 rounded-xl bg-cream-deep/60 border border-ink/5">
              <Phone className="w-4 h-4 text-pomegranate" />
              <span className="text-ink font-medium">+90</span>
            </div>
            <input
              inputMode="numeric"
              autoFocus
              placeholder="5XX XXX XX XX"
              value={formatted}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 h-12 px-3 rounded-xl bg-white/60 border border-ink/5 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-pomegranate/40 text-[16px] tracking-wider"
            />
          </div>
          <div className="flex items-start gap-2 mt-4 text-[12px] text-ink-soft">
            <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-trust" />
            <p className="leading-relaxed">
              Numaran kimseyle paylaşılmaz. Sadece doğrulama ve etkinlik
              hatırlatmaları için kullanılır.
            </p>
          </div>
        </GlassCard>

        <div className="mt-auto pt-8 space-y-3">
          <button
            type="button"
            disabled={!valid}
            onClick={() => router.push("/onboarding/otp")}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-pomegranate to-pomegranate-deep text-cream font-medium shadow-[0_18px_40px_-12px_rgba(138,14,41,0.55)] disabled:opacity-50 disabled:shadow-none active:scale-[0.99] transition"
          >
            Kodu Gönder
          </button>
          <p className="text-center text-[11px] text-ink-soft/80">
            Devam ederek{" "}
            <span className="underline">Kullanım Koşulları</span> ve{" "}
            <span className="underline">Topluluk Kuralları</span>'nı kabul etmiş
            olursun.
          </p>
        </div>
      </main>
    </MobileFrame>
  )
}
