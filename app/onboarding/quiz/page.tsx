"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, ArrowRight } from "lucide-react"
import { MobileFrame } from "@/components/mobile-frame"
import { PageHeader } from "@/components/page-header"
import { GlassCard } from "@/components/glass-card"
import { quizQuestions, ruhDescriptions } from "@/lib/mock-data"

export default function QuizPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  const total = quizQuestions.length
  const current = quizQuestions[step]
  const progress = ((step + (answers.length > step ? 1 : 0)) / total) * 100

  const ruh = useMemo(() => {
    if (answers.length < total) return null
    const counts: Record<string, number> = {}
    answers.forEach((r) => {
      counts[r] = (counts[r] || 0) + 1
    })
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]
    return top ? ruhDescriptions[top] : null
  }, [answers, total])

  const handlePick = (ruhId: string) => {
    const next = [...answers, ruhId]
    setAnswers(next)
    if (step < total - 1) {
      setTimeout(() => setStep(step + 1), 150)
    }
  }

  if (ruh) {
    return (
      <MobileFrame blobs="warm">
        <PageHeader title="Sofram Ruh Testi" back={false} />
        <main className="flex-1 px-6 pt-4 pb-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/30 text-pomegranate text-[11px] font-medium uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Ruh simgen
          </div>
          <div className="mt-6 relative">
            <div className="absolute inset-0 -m-8 rounded-full bg-saffron/40 blur-3xl" />
            <div className="relative h-32 w-32 rounded-[2.5rem] bg-gradient-to-br from-saffron via-saffron-soft to-cream grid place-items-center text-6xl shadow-[0_24px_48px_-16px_rgba(244,180,54,0.7)]">
              {ruh.emoji}
            </div>
          </div>
          <h2 className="font-display text-4xl mt-6 text-ink">{ruh.title}</h2>
          <p className="text-ink-soft text-[15px] leading-relaxed mt-3 text-pretty max-w-[300px]">
            {ruh.subtitle}
          </p>

          <GlassCard className="mt-8 p-5 w-full text-left">
            <h3 className="font-display text-lg text-ink">Sofranda ne olur?</h3>
            <ul className="mt-3 space-y-2 text-[13px] text-ink-soft">
              <li>• Sana benzer ruhlarla eşleşme önceliği</li>
              <li>• İlk sofranda %20 indirim hediye</li>
              <li>• Profilinde küçük bir simge olarak gözükür</li>
            </ul>
          </GlassCard>

          <button
            type="button"
            onClick={() => router.push("/home")}
            className="mt-auto w-full h-14 rounded-2xl bg-gradient-to-r from-pomegranate to-pomegranate-deep text-cream font-medium shadow-[0_18px_40px_-12px_rgba(138,14,41,0.55)] active:scale-[0.99] transition inline-flex items-center justify-center gap-2"
          >
            Soframa Otur
            <ArrowRight className="w-5 h-5" />
          </button>
        </main>
      </MobileFrame>
    )
  }

  return (
    <MobileFrame blobs="warm">
      <PageHeader
        title="Sofram Ruh Testi"
        right={
          <span className="text-[12px] text-ink-soft font-medium">
            {step + 1} / {total}
          </span>
        }
        onBack={() => {
          if (step === 0) router.back()
          else {
            setStep(step - 1)
            setAnswers(answers.slice(0, -1))
          }
        }}
      />
      <main className="flex-1 px-6 pt-2 pb-8 flex flex-col">
        <div className="h-1.5 rounded-full bg-cream-deep/80 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pomegranate to-saffron transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="font-display text-2xl text-ink leading-snug mt-8 text-balance">
          {current.q}
        </h2>
        <p className="text-ink-soft text-[13px] mt-1">
          Sana en yakın olanı seç. Doğru ya da yanlış yok.
        </p>

        <div className="mt-6 space-y-3">
          {current.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handlePick(opt.ruh)}
              className="group w-full text-left p-4 rounded-2xl glass hover:bg-white/80 active:scale-[0.99] transition flex items-center justify-between gap-3"
            >
              <span className="text-ink text-[15px] leading-snug">
                {opt.label}
              </span>
              <span className="h-8 w-8 grid place-items-center rounded-full bg-cream-deep/70 group-hover:bg-pomegranate group-hover:text-cream transition shrink-0">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          ))}
        </div>

        <p className="mt-auto text-center text-[12px] text-ink-soft/80">
          Cevapların ruh simgeni belirler. Eşleşmelerde kullanılır.
        </p>
      </main>
    </MobileFrame>
  )
}
