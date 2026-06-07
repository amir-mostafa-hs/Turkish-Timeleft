import {
  ShieldCheck,
  IdCard,
  EyeOff,
  HeartHandshake,
  Flag,
  Activity,
  Sparkles,
} from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { trustWallActions } from "@/lib/mock-data"

const steps = [
  {
    icon: IdCard,
    title: "Herkes kimliğini doğrular",
    body: "T.C. Kimlik kontrolü yapılmadan kimse koltuk ayırtamaz. Sahte hesaplar daha kapıda kalır.",
  },
  {
    icon: EyeOff,
    title: "Adresler rezervasyon sonrası açılır",
    body: "Mahalle bilgisi her zaman açık; tam adres sadece koltuğunu ayıran misafirlere görünür.",
  },
  {
    icon: HeartHandshake,
    title: "Anonim, üç başlıklı değerlendirme",
    body: "Samimiyet, Sohbet, Saygı. Etkinlikten 30 dakika sonra herkes herkesi değerlendirir.",
  },
  {
    icon: Flag,
    title: "Tek tıkla şikayet",
    body: "Rahatsız hissettiğin an Şikayet Et butonu yanında. 24 saat içinde insan moderatör inceler.",
  },
  {
    icon: Sparkles,
    title: "Düşük puan = topluluktan uzaklaşma",
    body: "Sürekli düşük puan alan kullanıcılar gizlice çıkarılır. Sofralar yumuşak, insanlar nazik kalır.",
  },
]

export default function TrustPage() {
  return (
    <div className="px-4 pt-4 pb-6">
      <header>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-trust/15 text-emerald-trust text-[11px] font-medium uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          Güven Duvarı
        </div>
        <h1 className="font-display text-3xl text-ink leading-tight mt-2 text-balance">
          Sofranın güvenli kalması bizim hikâyemiz.
        </h1>
        <p className="text-ink-soft text-[14px] leading-relaxed mt-2 text-pretty">
          Sofram, Türkiye'nin yeni nesil sosyal kulübü. Tanıdık olmayan biriyle
          aynı sofraya oturmak güveni gerektirir; biz de bu güveni inşa etmek
          için ne yaptığımızı şeffaf olarak gösteriyoruz.
        </p>
      </header>

      {/* Live counters */}
      <GlassCard variant="strong" className="mt-5 p-5">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-pomegranate" />
          <h2 className="font-display text-lg text-ink">Canlı Topluluk</h2>
        </div>
        <ul className="mt-3 space-y-2.5">
          {trustWallActions.map((t) => (
            <li
              key={t}
              className="flex items-start gap-2.5 text-[13px] text-ink leading-relaxed"
            >
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-trust shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      </GlassCard>

      {/* Big stats */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "Doğrulanmış üye", value: "12.4k" },
          { label: "Tamamlanan sofra", value: "3.1k" },
          { label: "Ort. topluluk puanı", value: "9.2" },
        ].map((s) => (
          <GlassCard key={s.label} className="p-3 text-center">
            <p className="font-display text-2xl text-pomegranate leading-none">
              {s.value}
            </p>
            <p className="text-[10px] text-ink-soft uppercase tracking-wider mt-1.5 leading-tight">
              {s.label}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Steps */}
      <h2 className="font-display text-xl text-ink mt-6">Nasıl Güvende Kalırız?</h2>
      <ol className="mt-3 space-y-2.5">
        {steps.map((s, i) => {
          const Icon = s.icon
          return (
            <li key={s.title}>
              <GlassCard className="p-4 flex items-start gap-3">
                <span className="grid place-items-center h-10 w-10 rounded-2xl bg-gradient-to-br from-pomegranate to-pomegranate-deep text-cream shrink-0">
                  <Icon className="w-4.5 h-4.5" strokeWidth={2.2} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-pomegranate">
                      Adım {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-[16px] text-ink leading-tight mt-0.5">
                    {s.title}
                  </h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed mt-1">
                    {s.body}
                  </p>
                </div>
              </GlassCard>
            </li>
          )
        })}
      </ol>

      {/* Community guidelines */}
      <GlassCard variant="pomegranate" className="mt-6 p-5 overflow-hidden">
        <div className="absolute -top-10 -right-6 h-32 w-32 rounded-full bg-saffron/40 blur-2xl" />
        <div className="relative">
          <span className="text-[11px] uppercase tracking-wider opacity-90">
            Topluluk Kuralları
          </span>
          <h3 className="font-display text-2xl mt-1 leading-tight">
            Üç temel söz: Saygı, Dinleme, Açıklık.
          </h3>
          <ul className="mt-3 space-y-1.5 text-[13px] opacity-95 leading-relaxed">
            <li>• Politik / dini tartışmaya değil, hikâyeye gel.</li>
            <li>• Telefonu sofraya değil, anıya çevir.</li>
            <li>• Hayır, hayırdır. Kimse rahatsız edilmez.</li>
            <li>• Ev sahibinin kuralı geçerlidir.</li>
          </ul>
        </div>
      </GlassCard>

      <p className="mt-6 text-center text-[11px] text-ink-soft italic">
        "Bir sofra, ancak güvenle paylaşılırsa anılaşır."
      </p>
    </div>
  )
}
