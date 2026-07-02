import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const glassVariants = {
  /** Solid white card — left info column */
  light:
    "border-neutral-200/80 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.06)]",
  /** Warm frosted glass — right preview column backdrop */
  warm:
    "border-white/45 bg-white/22 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-[100px] backdrop-brightness-110 backdrop-saturate-[1.8]",
  /** Floating glass screen — centered preview window */
  screen:
    "border-white/65 bg-white/38 shadow-[0_32px_80px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-[72px] backdrop-brightness-105 backdrop-saturate-[1.7]",
  /** Solid gray description box — bottom of left panel */
  inset: "border-0 bg-[#d4d4d4]",
  /** Pill bar for thumbnails */
  pill:
    "border-white/60 bg-white/42 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-[48px] backdrop-brightness-105 backdrop-saturate-[1.6]",
  /** Floating nav dropdown */
  menu:
    "border-white/50 bg-white/28 shadow-[0_24px_80px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-[40px] backdrop-brightness-110 backdrop-saturate-[1.8]",
  /** Dark glass menu trigger pill */
  menuTrigger:
    "border-white/25 bg-black/40 shadow-[0_8px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-white/10",
} as const;

export { glassVariants };

type GlassVariant = keyof typeof glassVariants;

type GlassPanelProps = {
  variant?: GlassVariant;
  className?: string;
  children: ReactNode;
};

export function GlassPanel({
  variant = "light",
  className,
  children,
}: GlassPanelProps) {
  return (
    <div className={cn("border", glassVariants[variant], className)}>
      {children}
    </div>
  );
}
