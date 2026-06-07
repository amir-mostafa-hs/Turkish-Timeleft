"use client"

import { useState } from "react"
import { ChevronDown, Search, Sparkles } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { EventCard } from "@/components/event-card"
import { CategoryIcon } from "@/components/category-icon"
import { SoframLogo } from "@/components/sofram-logo"
import { categories, events, cities, type CategoryId } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const [city, setCity] = useState<(typeof cities)[number]>("İstanbul")
  const [activeCat, setActiveCat] = useState<CategoryId>("all")
  const [cityOpen, setCityOpen] = useState(false)

  const filtered = events.filter(
    (e) =>
      e.city === city &&
      (activeCat === "all" || e.category === activeCat),
  )

  return (
    <div className="px-4 pt-4 pb-6">
      {/* Top bar */}
      <header className="flex items-center justify-between">
        <SoframLogo />
        <button
          type="button"
          aria-label="Ara"
          className="h-10 w-10 grid place-items-center rounded-full glass"
        >
          <Search className="w-4.5 h-4.5 text-ink" />
        </button>
      </header>

      {/* Hero glass card */}
      <GlassCard variant="strong" className="mt-4 p-5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-pomegranate font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          Bu Hafta
        </div>
        <h1 className="font-display text-[28px] leading-[1.15] text-ink mt-1.5 text-balance">
          Bu hafta nereye <br />
          oturuyorsun?
        </h1>

        <div className="mt-4 relative">
          <button
            type="button"
            onClick={() => setCityOpen((v) => !v)}
            className="w-full h-12 px-4 rounded-2xl bg-cream-deep/70 border border-ink/5 flex items-center justify-between text-ink"
          >
            <span className="flex items-center gap-2">
              <span className="h-7 w-7 grid place-items-center rounded-full bg-pomegranate text-cream text-[11px] font-semibold">
                {city.slice(0, 2)}
              </span>
              <span className="font-medium">{city}</span>
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-ink-soft transition",
                cityOpen && "rotate-180",
              )}
            />
          </button>

          {cityOpen && (
            <div className="absolute z-20 mt-2 left-0 right-0 rounded-2xl glass-strong p-1 shadow-lg">
              {cities.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCity(c)
                    setCityOpen(false)
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2.5 rounded-xl text-[14px]",
                    c === city
                      ? "bg-pomegranate text-cream font-medium"
                      : "text-ink hover:bg-cream-deep/60",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </GlassCard>

      {/* Category chips */}
      <div className="mt-5 -mx-4 px-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((c) => {
          const active = activeCat === c.id
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCat(c.id)}
              className={cn(
                "shrink-0 inline-flex items-center gap-1.5 px-3.5 h-10 rounded-full text-[13px] font-medium transition",
                active
                  ? "bg-ink text-cream shadow"
                  : "glass text-ink-soft hover:text-ink",
              )}
            >
              <CategoryIcon
                id={c.id}
                className={cn("w-3.5 h-3.5", active && "text-saffron")}
              />
              {c.short}
            </button>
          )
        })}
      </div>

      {/* Feed */}
      <section className="mt-4 space-y-4">
        {filtered.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <p className="font-display text-xl text-ink">
              Bu hafta {city}'da bu kategoride sofra yok.
            </p>
            <p className="text-[13px] text-ink-soft mt-2">
              Başka bir kategori dene veya bizi takip etmeye devam et.
            </p>
          </GlassCard>
        ) : (
          filtered.map((e) => <EventCard key={e.id} event={e} />)
        )}
      </section>

      {/* Subscription nudge */}
      <GlassCard variant="pomegranate" className="mt-6 p-5 overflow-hidden">
        <div className="absolute -right-6 -top-8 h-32 w-32 rounded-full bg-saffron/40 blur-2xl" />
        <div className="relative">
          <span className="text-[11px] uppercase tracking-wider opacity-90">
            Sofram Üyeliği
          </span>
          <h3 className="font-display text-2xl mt-1 leading-tight">
            Aylık ₺199, ayda 2 ücretsiz koltuk.
          </h3>
          <p className="text-[13px] mt-2 opacity-90 leading-relaxed">
            İndirimli ek koltuklar, öncelikli rezervasyon, üyelere özel
            sofralar.
          </p>
          <button
            type="button"
            className="mt-4 inline-flex items-center justify-center h-10 px-5 rounded-full bg-cream text-pomegranate text-[13px] font-semibold"
          >
            Üyeliği İncele
          </button>
        </div>
      </GlassCard>
    </div>
  )
}
