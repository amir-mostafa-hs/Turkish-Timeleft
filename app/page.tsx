"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { MobileFrame } from "@/components/mobile-frame"
import { SoframLogo } from "@/components/sofram-logo"
import { GlassCard } from "@/components/glass-card"

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => {
      router.push("/onboarding/phone")
    }, 3200)
    return () => clearTimeout(t)
  }, [router])

  return (
    <MobileFrame blobs="warm">
      <main className="relative flex-1 flex flex-col items-center justify-between px-6 pt-20 pb-10">
        <div className="flex flex-col items-center text-center gap-5 mt-10">
          <div className="relative">
            <div className="absolute inset-0 -m-6 rounded-full bg-pomegranate/30 blur-3xl" />
            <div className="relative h-24 w-24 rounded-[2rem] grid place-items-center bg-gradient-to-br from-pomegranate to-pomegranate-deep shadow-[0_20px_40px_-12px_rgba(138,14,41,0.6)]">
              <span className="absolute inset-0 rounded-[2rem] bg-white/20 [mask:radial-gradient(circle_at_30%_25%,black_0%,transparent_60%)]" />
              <svg
                viewBox="0 0 24 24"
                className="w-12 h-12 text-cream relative"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 13c2-3 5-4 9-4s7 1 9 4" />
                <path d="M5 13v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
                <path d="M12 9V5" />
                <path d="M10 5h4" />
              </svg>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-5xl tracking-tight text-ink">
              Sofram
            </h1>
            <p className="text-ink-soft text-[15px] leading-relaxed text-balance max-w-[260px]">
              Gerçek bağlar,
              <br />
              <span className="text-pomegranate font-medium">aynı sofrada.</span>
            </p>
          </div>
        </div>

        <GlassCard className="w-full p-5 space-y-3">
          <div className="flex items-start gap-3">
            <span className="grid place-items-center h-8 w-8 shrink-0 rounded-full bg-saffron/30 text-pomegranate text-sm font-semibold">
              1
            </span>
            <p className="text-sm text-ink-soft leading-relaxed">
              Kimliğini doğrula, topluluğa katıl.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="grid place-items-center h-8 w-8 shrink-0 rounded-full bg-saffron/30 text-pomegranate text-sm font-semibold">
              2
            </span>
            <p className="text-sm text-ink-soft leading-relaxed">
              Şehrindeki sofralardan birine koltuğunu ayır.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="grid place-items-center h-8 w-8 shrink-0 rounded-full bg-saffron/30 text-pomegranate text-sm font-semibold">
              3
            </span>
            <p className="text-sm text-ink-soft leading-relaxed">
              Yeni hikâyelerle, sıcak anılarla evine dön.
            </p>
          </div>
        </GlassCard>

        <Link
          href="/onboarding/phone"
          className="w-full inline-flex items-center justify-center gap-2 h-14 rounded-2xl bg-gradient-to-r from-pomegranate to-pomegranate-deep text-cream font-medium shadow-[0_18px_40px_-12px_rgba(138,14,41,0.6)] active:scale-[0.99] transition"
        >
          Soframa Oturmaya Başla
          <ArrowRight className="w-5 h-5" />
        </Link>

        <SoframLogo showWordmark={false} className="opacity-50" />
      </main>
    </MobileFrame>
  )
}
