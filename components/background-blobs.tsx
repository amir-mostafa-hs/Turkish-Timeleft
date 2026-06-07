export function BackgroundBlobs({
  variant = "default",
}: {
  variant?: "default" | "warm" | "deep"
}) {
  const palettes = {
    default: {
      a: "bg-pomegranate/30",
      b: "bg-saffron/40",
      c: "bg-pomegranate/15",
    },
    warm: {
      a: "bg-saffron/45",
      b: "bg-pomegranate/25",
      c: "bg-saffron/25",
    },
    deep: {
      a: "bg-pomegranate-deep/40",
      b: "bg-pomegranate/30",
      c: "bg-saffron/25",
    },
  }
  const p = palettes[variant]
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className={`absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl opacity-80 animate-float-slow ${p.a}`}
      />
      <div
        className={`absolute -top-10 right-[-60px] h-80 w-80 rounded-full blur-3xl opacity-80 animate-float-slower ${p.b}`}
      />
      <div
        className={`absolute bottom-[-80px] left-1/3 h-72 w-72 rounded-full blur-3xl opacity-70 animate-float-slow ${p.c}`}
      />
    </div>
  )
}
