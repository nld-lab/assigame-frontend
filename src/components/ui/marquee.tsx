import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  pauseOnHover?: boolean
  direction?: "left" | "right"
  /** Durée d'un cycle complet, en secondes. */
  speed?: number
  /** Espace (en rem) entre chaque élément du ruban. */
  gap?: number
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  gap = 2,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn("group w-full overflow-hidden", className)}
      {...props}
    >
      <div
        className="relative flex overflow-hidden py-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className={cn(
            "flex w-max shrink-0 items-center will-change-transform",
            direction === "right"
              ? "animate-marquee-reverse"
              : "animate-marquee",
            pauseOnHover && "group-hover:paused"
          )}
          style={
            {
              "--duration": `${speed}s`,
              gap: `${gap}rem`,
              paddingInlineEnd: `${gap}rem`,
            } as React.CSSProperties
          }
        >
          {children}
          {children}
        </div>
      </div>
    </div>
  )
}
