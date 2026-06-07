"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MobileFrame } from "@/components/mobile-frame"
import { PageHeader } from "@/components/page-header"
import { GlassCard } from "@/components/glass-card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "sonner"

export default function OtpPage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [seconds, setSeconds] = useState(45)

  useEffect(() => {
    if (seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  const handleChange = (val: string) => {
    setCode(val)
    if (val.length === 6) {
      if (val === "123456") {
        toast.success("Numaran doğrulandı")
        setTimeout(() => router.push("/onboarding/verify"), 600)
      } else {
        toast.error("Kod hatalı. Demo için 123456 girin.")
        setCode("")
      }
    }
  }

  return (
    <MobileFrame blobs="warm">
      <PageHeader title="Kodu Gir" />
      <main className="flex-1 px-6 pt-2 pb-8 flex flex-col">
        <div className="space-y-2 mt-2">
          <h2 className="font-display text-3xl text-ink leading-tight">
            6 haneli kod
          </h2>
          <p className="text-ink-soft text-[15px] leading-relaxed">
            +90 5XX XXX XX XX numarana kısa bir doğrulama kodu gönderdik.
          </p>
        </div>

        <GlassCard className="mt-8 p-6 flex flex-col items-center">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={handleChange}
            autoFocus
          >
            <InputOTPGroup className="gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="h-14 w-11 text-xl font-semibold rounded-xl border-ink/10 bg-white/70 data-[active=true]:ring-2 data-[active=true]:ring-pomegranate/40 data-[active=true]:border-pomegranate/40"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <p className="mt-6 text-[12px] text-ink-soft text-center">
            Demo için kod:{" "}
            <span className="font-semibold text-pomegranate">123456</span>
          </p>
        </GlassCard>

        <div className="mt-6 flex items-center justify-between text-[13px] text-ink-soft">
          <span>Kod gelmedi mi?</span>
          {seconds > 0 ? (
            <span>Yeniden gönder · {seconds}s</span>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSeconds(45)
                toast("Yeni kod yola çıktı")
              }}
              className="text-pomegranate font-medium"
            >
              Yeniden Gönder
            </button>
          )}
        </div>

        <button
          type="button"
          disabled={code.length !== 6}
          onClick={() => handleChange(code)}
          className="mt-auto w-full h-14 rounded-2xl bg-gradient-to-r from-pomegranate to-pomegranate-deep text-cream font-medium shadow-[0_18px_40px_-12px_rgba(138,14,41,0.55)] disabled:opacity-50 active:scale-[0.99] transition"
        >
          Devam Et
        </button>
      </main>
    </MobileFrame>
  )
}
