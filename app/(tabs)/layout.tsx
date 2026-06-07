import { MobileFrame, MobileScroll } from "@/components/mobile-frame"
import { BottomNav } from "@/components/bottom-nav"

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MobileFrame>
      <MobileScroll>{children}</MobileScroll>
      <BottomNav />
    </MobileFrame>
  )
}
