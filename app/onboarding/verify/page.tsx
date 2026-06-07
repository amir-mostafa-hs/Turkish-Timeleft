"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Camera, Lock, Eye, ScanLine } from "lucide-react"
import { MobileFrame } from "@/components/mobile-frame"
import { PageHeader } from "@/components/page-header"
import { GlassCard } from "@/components/glass-card"
import { toast } from "sonner"

export default function VerifyPage() {
  const router = useRouter()
  const [scanning, setScanning] = useState(false)
  const [done, setDone] = useState(false)

  const startScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setDone(true)
      toast.success("Kimliğin başarıyla yüklendi")
    }, 2200)
  }

  return (
    <MobileFrame blobs="warm">
      <PageHeader title="Kimlik Doğrulama" />
      <main className="flex-1 px-6 pt-2 pb-8 flex flex-col">
        <div className="space-y-2 mt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-trust/10 text-emerald-trust text-[11px] font-medium uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Zorunlu Adım
          </div>
          <h2 className="font-display text-3xl text-ink leading-tight text-balance">
            Güvenliğin için kimlik doğrulaması
          </h2>
          <p className="text-ink-soft text-[15px] leading-relaxed text-pretty">
            T.C. Kimlik Kartının ön yüzünün fotoğrafını yükle. Bilgilerin
            şifrelenir, sofra arkadaşlarınla paylaşılmaz.
          </p>
        </div>

        <GlassCard className="mt-6 p-5">
          <div
            className={`relative aspect-[4/2.6] rounded-2xl border-2 border-dashed transition overflow-hidden ${
              done
                ? "border-emerald-trust/60 bg-emerald-trust/5"
                : "border-pomegranate/30 bg-cream-deep/50"
            }`}
          >
            {scanning && (
              <span className="absolute inset-x-3 top-4 bottom-4 rounded-xl border border-pomegranate/40 overflow-hidden">
                <span
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pomegranate to-transparent"
                  style={{
                    animation: "scan 2.2s ease-in-out forwards",
                    top: 0,
                  }}
                />
              </span>
            )}
            <div className="absolute inset-0 grid place-items-center">
              {done ? (
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-emerald-trust grid place-items-center text-cream">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <p className="mt-2 text-emerald-trust font-medium">
                    Kimlik yüklendi
                  </p>
                  <p className="text-[12px] text-ink-soft mt-0.5">
                    İncelemen 24 saat içinde tamamlanır
                  </p>
                </div>
              ) : (
                <div className="text-center px-4">
                  <div className="mx-auto h-12 w-12 rounded-full bg-pomegranate/10 grid place-items-center text-pomegranate">
                    {scanning ? (
                      <ScanLine className="w-6 h-6 animate-pulse" />
                    ) : (
                      <Camera className="w-6 h-6" />
                    )}
                  </div>
                  <p className="mt-2 text-ink font-medium">
                    {scanning ? "Taranıyor…" : "Kimlik kartını çerçeveye yerleştir"}
                  </p>
                  <p className="text-[12px] text-ink-soft mt-1">
                    Net, parlamasız, dört köşesi görünür olsun
                  </p>
                </div>
              )}
            </div>
          </div>

          {!done && (
            <button
              type="button"
              onClick={startScan}
              disabled={scanning}
              className="mt-4 w-full h-12 rounded-xl bg-saffron text-ink font-medium active:scale-[0.99] transition disabled:opacity-60"
            >
              {scanning ? "Yükleniyor…" : "Kimlik Fotoğrafı Çek"}
            </button>
          )}
        </GlassCard>

        <ul className="mt-5 space-y-2.5">
          {[
            { icon: Lock, t: "Bilgilerin uçtan uca şifrelenir" },
            { icon: Eye, t: "Diğer kullanıcılar kimlik bilgilerini görmez" },
            { icon: ShieldCheck, t: "Sahte hesapları engellemek için kullanılır" },
          ].map(({ icon: Icon, t }) => (
            <li key={t} className="flex items-start gap-3 text-[13px] text-ink-soft">
              <span className="grid place-items-center h-7 w-7 rounded-full bg-cream-deep text-pomegranate shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </span>
              <span className="leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          disabled={!done}
          onClick={() => router.push("/onboarding/quiz")}
          className="mt-auto w-full h-14 rounded-2xl bg-gradient-to-r from-pomegranate to-pomegranate-deep text-cream font-medium shadow-[0_18px_40px_-12px_rgba(138,14,41,0.55)] disabled:opacity-50 active:scale-[0.99] transition"
        >
          Devam Et
        </button>
      </main>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: calc(100% - 2px); }
          100% { top: 0; }
        }
      `}</style>
    </MobileFrame>
  )
}
