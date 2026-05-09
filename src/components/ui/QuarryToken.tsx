"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface QuarryTokenProps {
  size?: number;
  /** Max tilt (degrees). Coin rocks 0 -> -angle -> 0 -> +angle -> 0. */
  rockAngle?: number;
  /** Seconds per full rock cycle. */
  rockDuration?: number;
  className?: string;
  glowColor?: string;
  glow?: boolean;
  float?: boolean;
  rock?: boolean;
  priority?: boolean;
}

export default function QuarryToken({
  size = 240,
  rockAngle = 30,
  rockDuration = 6,
  className,
  glowColor = "rgba(20, 184, 166, 0.35)",
  glow = true,
  float = false,
  rock = true,
  priority = false,
}: QuarryTokenProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        float && "motion-safe:animate-[qry-bob_6s_ease-in-out_infinite]",
        className,
      )}
      style={{
        width: size,
        height: size,
        perspective: `${size * 5}px`,
      }}
    >
      {glow && (
        <div
          className="pointer-events-none absolute inset-0 rounded-full motion-safe:animate-[qry-pulse_4s_ease-in-out_infinite]"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 65%)`,
            filter: "blur(28px)",
          }}
        />
      )}

      <div
        className={cn(
          "relative w-full h-full",
          rock && "motion-safe:animate-[qry-rock_var(--qry-rock-duration)_ease-in-out_infinite]",
        )}
        style={
          {
            "--qry-rock-angle": `${rockAngle}deg`,
            "--qry-rock-angle-neg": `${-rockAngle}deg`,
            "--qry-rock-duration": `${rockDuration}s`,
          } as React.CSSProperties
        }
      >
        <Image
          src="/quarry-token.svg"
          alt="Quarry (QRY) token"
          width={size}
          height={size}
          priority={priority}
          className="w-full h-full select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}
