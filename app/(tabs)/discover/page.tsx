"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Sparkles, MapPin, Calendar } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { CategoryIcon } from "@/components/category-icon"
import { events, categories } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function DiscoverPage() {
  const [q, setQ] = useState("")
  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(q.toLowerCase()) ||
      e.neighborhood.toLowerCase().includes(q.toLowerCase()) ||
      e.city.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <div className="px-4 pt-4 pb-6">
      <header>
        <h1 className="font-display text-3xl text-ink leading-tight">Keşfet</h1>
        <p className="text-ink-soft text-[13px] mt-1">
          Yeni şehirler, yeni sofralar, yeni hikâyeler.
        </p>
      </header>

      <div className="mt-4 relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Mahalle, şehir veya etkinlik ara…"
          className="w-full h-12 pl-11 pr-4 rounded-2xl glass placeholder:text-ink-soft/60 text-ink focus:outline-none focus:ring-2 focus:ring-pomegranate/40"
        />
      </div>

      {/* Category grid */}
      <h2 className="font-display text-xl text-ink mt-6">Kategoriler</h2>
      <div className="mt-3 grid grid-cols-3 gap-2.5">
        {categories
          .filter((c) => c.id !== "all")
          .map((c) => (
            <Link
              key={c.id}
              href={`/discover?cat=${c.id}`}
              className="aspect-square rounded-2xl glass grain p-3 flex flex-col justify-between hover:bg-white/80 transition"
            >
              <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-pomegranate/20 to-saffron/30 text-pomegranate">
                <CategoryIcon id={c.id} className="w-4 h-4" />
              </span>
              <div>
                <p className="font-display text-[14px] leading-tight text-ink">
                  {c.short}
                </p>
                <p className="text-[10px] text-ink-soft mt-0.5 line-clamp-2 leading-snug">
                  {c.description}
                </p>
              </div>
            </Link>
          ))}
      </div>

      {/* Featured */}
      <h2 className="font-display text-xl text-ink mt-7 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-pomegranate" /> Öne Çıkanlar
      </h2>
      <div className="mt-3 -mx-4 px-4 flex gap-3 overflow-x-auto no-scrollbar">
        {events.slice(0, 4).map((e) => (
          <Link
            key={e.id}
            href={`/event/${e.id}`}
            className="shrink-0 w-[260px] block"
          >
            <GlassCard className="overflow-hidden p-0">
              <div className="relative h-32">
                <Image
                  src={e.image || "/placeholder.svg"}
                  alt={e.title}
                  fill
                  sizes="260px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pomegranate-deep/60 to-transparent" />
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-cream/85 px-2 py-0.5 text-[10px] font-medium text-ink">
                  <CategoryIcon
                    id={e.category}
                    className="w-3 h-3 text-pomegranate"
                  />
                  {categories.find((c) => c.id === e.category)?.short}
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-display text-[15px] text-ink leading-tight text-balance line-clamp-2">
                  {e.title}
                </h3>
                <div className="mt-2 flex items-center justify-between text-[11px] text-ink-soft">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {e.city}
                  </span>
                  <span className="text-pomegranate font-semibold">
                    ₺{e.price}
                  </span>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>

      {/* All results */}
      <h2 className="font-display text-xl text-ink mt-7 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-pomegranate" /> Tüm Sofralar
      </h2>
      <div className="mt-3 space-y-3">
        {filtered.map((e) => (
          <Link
            key={e.id}
            href={`/event/${e.id}`}
            className={cn("block")}
          >
            <GlassCard className="p-3 flex items-center gap-3">
              <div className="relative h-16 w-16 rounded-2xl overflow-hidden shrink-0">
                <Image
                  src={e.image || "/placeholder.svg"}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-wider text-ink-soft">
                  {e.date}
                </p>
                <h3 className="font-display text-[15px] text-ink leading-tight truncate">
                  {e.title}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-ink-soft">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{e.neighborhood}</span>
                </div>
              </div>
              <span className="font-semibold text-pomegranate text-[13px]">
                ₺{e.price}
              </span>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  )
}
