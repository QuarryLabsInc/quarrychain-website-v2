"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface QuarryTokenProps {
  size?: number;
  /** Coin thickness in px. Larger = chunkier coin. */
  depth?: number;
  /** Number of stacked discs forming the coin's body. More = smoother edge, heavier DOM. */
  edgeLayers?: number;
  /** Inset for the metallic body discs (% of viewBox), so they match the SVG's actual disc, not the bounding box. */
  bodyInset?: number;
  className?: string;
  spinDuration?: number;
  glowColor?: string;
  glow?: boolean;
  float?: boolean;
  spin?: boolean;
  priority?: boolean;
}

export default function QuarryToken({
  size = 240,
  depth = 14,
  edgeLayers = 7,
  bodyInset = 7.5,
  className,
  spinDuration = 18,
  glowColor = "rgba(20, 184, 166, 0.35)",
  glow = true,
  float = false,
  spin = true,
  priority = false,
}: QuarryTokenProps) {
  const halfDepth = depth / 2;
  const layerSpacing = edgeLayers > 1 ? depth / (edgeLayers - 1) : 0;

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
        perspective: `${size * 4}px`,
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
          spin && "motion-safe:animate-[qry-spin_var(--qry-spin-duration)_linear_infinite]",
        )}
        style={
          {
            transformStyle: "preserve-3d",
            "--qry-spin-duration": `${spinDuration}s`,
          } as React.CSSProperties
        }
      >
        {/* Stacked discs forming the coin's metallic body — visible at oblique rotations and edge-on */}
        {Array.from({ length: edgeLayers }).map((_, i) => {
          const z = -halfDepth + i * layerSpacing;
          // Subtle metallic banding: layers nearer the faces a bit lighter, center darker
          const t = Math.abs(z) / Math.max(halfDepth, 0.001);
          const lightness = 11 + t * 6;
          const innerLightness = Math.max(6, lightness - 5);
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${100 - bodyInset * 2}%`,
                height: `${100 - bodyInset * 2}%`,
                top: `${bodyInset}%`,
                left: `${bodyInset}%`,
                transform: `translateZ(${z}px)`,
                background: `radial-gradient(circle at 50% 38%, hsl(228, 14%, ${lightness}%) 0%, hsl(228, 18%, ${innerLightness}%) 100%)`,
              }}
            />
          );
        })}

        {/* Front face — full SVG with logo */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateZ(${halfDepth + 0.5}px)`,
            backfaceVisibility: "hidden",
          }}
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

        {/* Back face — same SVG, mirror-flipped so the Q-mark reads correctly from behind */}
        <div
          className="absolute inset-0"
          style={{
            transform: `rotateY(180deg) translateZ(${halfDepth + 0.5}px)`,
            backfaceVisibility: "hidden",
          }}
        >
          <Image
            src="/quarry-token.svg"
            alt=""
            width={size}
            height={size}
            className="w-full h-full select-none"
            style={{ transform: "scaleX(-1)" }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
