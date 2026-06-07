"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ShieldCheck,
  Settings,
  Bell,
  Languages,
  CreditCard,
  ChevronRight,
  Heart,
  Star,
  Sparkles,
} from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { TrustMeter } from "@/components/trust-badge"
import { CategoryIcon } from "@/components/category-icon"
import { pastEvents, categories } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  const [tab, setTab] = useState<"past" | "favs">("past")
  const [plan, setPlan] = useState<"single" | "monthly">("single")

  return (
    <div className="px-4 pt-4 pb-6">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-ink">Profilim</h1>
        <button
          type="button"
          aria-label="Ayarlar"
          className="grid place-items-center h-10 w-10 rounded-full glass"
        >
          <Settings className="w-4 h-4 text-ink" />
        </button>
      </header>

      {/* Profile card */}
      <GlassCard variant="strong" className="mt-4 p-5">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-pomegranate via-pomegranate-deep to-saffron grid place-items-center text-cream font-display text-2xl shadow-[0_12px_28px_-10px_rgba(138,14,41,0.5)]">
              E
            </div>
            <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-trust grid place-items-center text-cream border-2 border-cream">
              <ShieldCheck className="w-3 h-3" strokeWidth={3} />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-2xl text-ink leading-tight">
              Ece
            </p>
            <p className="text-[12px] text-ink-soft mt-0.5">
              Üye · Mart 2026
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-trust/15 text-emerald-trust px-2 py-0.5 text-[11px] font-medium">
                <ShieldCheck className="w-3 h-3" /> Kimlik Doğrulandı
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-saffron/30 text-ink px-2 py-0.5 text-[11px] font-medium">
                <Sparkles className="w-3 h-3" /> Çay Bardağı
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <TrustMeter score={9.1} size={88} />
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-wider text-ink-soft font-medium">
              Topluluk Puanın
            </p>
            <p className="font-display text-lg text-ink leading-tight mt-0.5">
              Sofra arkadaşların seni böyle hatırlıyor.
            </p>
            <p className="text-[12px] text-ink-soft mt-1">
              Son 12 etkinlikten ortalama. Yüksek puan = öncelikli rezervasyon.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Sofra", value: "12" },
            { label: "Yeni Tanıdık", value: "47" },
            { label: "Hatıra", value: "8" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-cream-deep/60 p-2.5">
              <p className="font-display text-xl text-ink leading-none">
                {s.value}
              </p>
              <p className="text-[10px] text-ink-soft uppercase tracking-wider mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Subscription */}
      <GlassCard className="mt-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-ink">Üyelik</h2>
          <span className="text-[11px] text-ink-soft">İstediğin zaman iptal</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            {
              id: "single",
              label: "Tek Bilet",
              price: "Kişi başı",
              note: "Her etkinlik için ayrı öde",
            },
            {
              id: "monthly",
              label: "Aylık Üye",
              price: "₺199 / ay",
              note: "2 ücretsiz koltuk · ek koltukta indirim",
            },
          ].map((p) => {
            const active = plan === p.id
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlan(p.id as typeof plan)}
                className={cn(
                  "p-3.5 rounded-2xl border text-left transition relative",
                  active
                    ? "border-pomegranate bg-pomegranate/5"
                    : "border-ink/10 bg-white/50",
                )}
              >
                {p.id === "monthly" && (
                  <span className="absolute top-2 right-2 text-[9px] uppercase tracking-wider bg-saffron text-ink px-1.5 py-0.5 rounded-full font-semibold">
                    Önerilen
                  </span>
                )}
                <p
                  className={cn(
                    "font-display text-[15px] leading-tight",
                    active ? "text-pomegranate" : "text-ink",
                  )}
                >
                  {p.label}
                </p>
                <p className="text-[11px] text-ink-soft mt-1">{p.price}</p>
                <p className="text-[10px] text-ink-soft mt-1.5 leading-snug">
                  {p.note}
                </p>
              </button>
            )
          })}
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="mt-5 flex items-center gap-2 p-1 rounded-2xl glass w-fit">
        {[
          { id: "past", label: "Geçmiş Sofralar" },
          { id: "favs", label: "Favoriler" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id as typeof tab)}
            className={cn(
              "px-3.5 h-9 rounded-xl text-[13px] font-medium transition",
              tab === t.id
                ? "bg-ink text-cream"
                : "text-ink-soft",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "past" ? (
        <ul className="mt-3 space-y-2.5">
          {pastEvents.map((e) => (
            <li key={e.id}>
              <GlassCard className="p-4 flex items-center gap-3">
                <span className="grid place-items-center h-11 w-11 rounded-2xl bg-gradient-to-br from-pomegranate/20 to-saffron/30 text-pomegranate">
                  <CategoryIcon id={e.category} className="w-4 h-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[15px] text-ink leading-tight truncate">
                    {e.title}
                  </p>
                  <p className="text-[11px] text-ink-soft mt-0.5">{e.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-ink-soft uppercase tracking-wider">
                    Aldığın
                  </p>
                  <p className="font-display text-base text-ink leading-none mt-0.5 inline-flex items-center gap-1">
                    <Star className="w-3 h-3 fill-saffron text-saffron" />
                    {e.ratingReceived.toFixed(1)}
                  </p>
                </div>
              </GlassCard>
            </li>
          ))}
        </ul>
      ) : (
        <GlassCard className="mt-3 p-8 text-center">
          <Heart className="w-6 h-6 text-pomegranate mx-auto" />
          <p className="font-display text-lg text-ink mt-2">Henüz favorin yok</p>
          <p className="text-[12px] text-ink-soft mt-1">
            Beğendiğin sofraları kalp ikonuna basarak burada saklayabilirsin.
          </p>
        </GlassCard>
      )}

      {/* Settings list */}
      <h2 className="font-display text-xl text-ink mt-6">Ayarlar</h2>
      <GlassCard className="mt-3 p-1.5 divide-y divide-ink/5">
        {[
          { icon: Bell, label: "Bildirim Tercihleri", value: "Açık" },
          { icon: Languages, label: "Dil", value: "Türkçe" },
          { icon: CreditCard, label: "Ödeme Yöntemleri", value: "1 kart" },
          { icon: ShieldCheck, label: "Güven Duvarı", value: "Görüntüle", href: "/trust" },
        ].map(({ icon: Icon, label, value, href }) => {
          const inner = (
            <div className="flex items-center justify-between px-3 py-3">
              <span className="flex items-center gap-3 text-ink text-[14px]">
                <span className="grid place-items-center h-9 w-9 rounded-xl bg-cream-deep text-pomegranate">
                  <Icon className="w-4 h-4" />
                </span>
                {label}
              </span>
              <span className="flex items-center gap-1 text-[12px] text-ink-soft">
                {value}
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          )
          return href ? (
            <Link key={label} href={href} className="block">
              {inner}
            </Link>
          ) : (
            <button key={label} type="button" className="w-full text-left">
              {inner}
            </button>
          )
        })}
      </GlassCard>

      <p className="mt-6 text-center text-[11px] text-ink-soft/80">
        Sofram · v0.1.0 · Türkiye
      </p>
    </div>
  )
}
