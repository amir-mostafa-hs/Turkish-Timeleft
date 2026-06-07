"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, Bell, User, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { href: "/home", label: "Ana Sayfa", icon: Home },
  { href: "/discover", label: "Keşfet", icon: Compass },
  { href: "/trust", label: "Güven", icon: ShieldCheck },
  { href: "/notifications", label: "Bildirim", icon: Bell },
  { href: "/profile", label: "Profilim", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav
      aria-label="Alt menü"
      className="sticky bottom-0 z-30 mt-auto px-3 pt-2 safe-bottom"
    >
      <div className="glass-strong rounded-[1.75rem] px-2 py-1.5 flex items-center justify-between">
        {tabs.map((t) => {
          const active =
            pathname === t.href || pathname?.startsWith(`${t.href}/`)
          const Icon = t.icon
          return (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                "relative flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-2xl transition-colors",
                active ? "text-pomegranate" : "text-ink-soft",
              )}
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <span className="absolute inset-x-3 top-0 h-[3px] rounded-full bg-pomegranate" />
              )}
              <Icon className="w-5 h-5" strokeWidth={active ? 2.4 : 2} />
              <span className="text-[10px] font-medium leading-none">
                {t.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
