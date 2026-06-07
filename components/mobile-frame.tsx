import { cn } from "@/lib/utils"
import { BackgroundBlobs } from "./background-blobs"

/**
 * Mobile-first viewport. On phones (<= 480px) it fills the screen.
 * On larger screens it presents the app inside a 390px phone-style frame
 * so designers can preview the PWA on desktop / tablet.
 */
export function MobileFrame({
  children,
  blobs = "default",
  className,
}: {
  children: React.ReactNode
  blobs?: "default" | "warm" | "deep" | "none"
  className?: string
}) {
  return (
    <div className="min-h-dvh w-full flex items-stretch sm:items-center justify-center sm:py-8">
      <div
        className={cn(
          "relative w-full sm:w-[390px] sm:min-h-[844px] sm:max-h-[900px]",
          "min-h-dvh sm:rounded-[2.75rem]",
          "overflow-hidden bg-cream",
          "sm:shadow-[0_40px_80px_-30px_rgba(138,14,41,0.45),0_0_0_8px_rgba(42,24,16,0.85),0_0_0_10px_rgba(255,255,255,0.4)]",
          className,
        )}
      >
        {blobs !== "none" && <BackgroundBlobs variant={blobs} />}
        <div className="relative z-10 flex flex-col min-h-dvh sm:min-h-[844px] sm:max-h-[900px]">
          {children}
        </div>
      </div>
    </div>
  )
}

export function MobileScroll({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex-1 overflow-y-auto no-scrollbar", className)}>
      {children}
    </div>
  )
}
