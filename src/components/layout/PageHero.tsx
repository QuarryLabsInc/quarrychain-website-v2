"use client";

import dynamic from "next/dynamic";
import BlurFade from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";
import type { ShapeType } from "@/components/three/WireframeShape";
import QuarryToken from "@/components/ui/QuarryToken";

const WireframeShape = dynamic(() => import("@/components/three/WireframeShape"), {
  ssr: false,
  loading: () => null,
});

interface PageHeroCTA {
  text: string;
  href: string;
  primary?: boolean;
  badge?: string;
}

interface PageHeroProps {
  label?: string;
  headline: string;
  subheadline?: string;
  ctas?: PageHeroCTA[];
  shape?: ShapeType;
  shapeColors?: { primary: string; secondary: string; tertiary?: string };
  className?: string;
  showTokenInHeadline?: boolean;
}

export default function PageHero({
  label,
  headline,
  subheadline,
  ctas,
  shape,
  shapeColors,
  className,
  showTokenInHeadline,
}: PageHeroProps) {
  // If no shape, centered layout (fallback)
  if (!shape) {
    return (
      <section className={cn("py-24 lg:py-32 px-6", className)}>
        <div className="mx-auto max-w-3xl text-center">
          <HeroContent label={label} headline={headline} subheadline={subheadline} ctas={ctas} center showTokenInHeadline={showTokenInHeadline} />
        </div>
      </section>
    );
  }

  // With shape: centered text, shape as atmospheric backdrop
  return (
    <section className={cn("py-24 lg:py-32 px-6 relative overflow-hidden", className)}>
      {/* Shape as backdrop behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] h-[320px] lg:w-[400px] lg:h-[400px] opacity-40">
          <WireframeShape shape={shape} className="w-full h-full" primaryColor={shapeColors?.primary} secondaryColor={shapeColors?.secondary} tertiaryColor={shapeColors?.tertiary} />
        </div>
      </div>

      {/* Centered text on top */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <HeroContent label={label} headline={headline} subheadline={subheadline} ctas={ctas} center showTokenInHeadline={showTokenInHeadline} />
      </div>
    </section>
  );
}

function HeroContent({
  label,
  headline,
  subheadline,
  ctas,
  center,
  showTokenInHeadline,
}: {
  label?: string;
  headline: string;
  subheadline?: string;
  ctas?: PageHeroCTA[];
  center?: boolean;
  showTokenInHeadline?: boolean;
}) {
  return (
    <>
      {label && (
        <BlurFade>
          <p className={cn("text-xs uppercase tracking-widest text-qc-teal font-mono mb-4", center && "text-center")}>
            {label}
          </p>
        </BlurFade>
      )}

      <BlurFade delay={0.05}>
        <h1 className={cn("text-4xl md:text-5xl lg:text-6xl font-bold font-display text-text-primary leading-tight", center && "text-center")}>
          {showTokenInHeadline ? (
            <span className="inline-flex items-center justify-center gap-3">
              <QuarryToken size={56} glow={false} />
              <span>{headline}</span>
            </span>
          ) : headline}
        </h1>
      </BlurFade>

      {subheadline && (
        <BlurFade delay={0.1}>
          <p className={cn("text-lg text-text-secondary mt-6 max-w-2xl", center && "mx-auto text-center")}>
            {subheadline}
          </p>
        </BlurFade>
      )}

      {ctas && ctas.length > 0 && (
        <BlurFade delay={0.15}>
          <div className={cn("flex flex-col sm:flex-row gap-4 mt-8", center && "items-center justify-center")}>
            {ctas.map((cta) => (
              <a
                key={cta.text}
                href={cta.href}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300",
                  cta.primary
                    ? "text-white border border-qc-teal/50 bg-gradient-to-r from-qc-teal/10 to-qc-blue/10 hover:from-qc-teal/20 hover:to-qc-blue/20 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]"
                    : "text-text-secondary border border-white/10 hover:border-white/20 hover:text-text-primary"
                )}
              >
                {cta.text}
                {cta.badge && (
                  <span className="text-[10px] text-text-muted bg-white/5 px-2 py-0.5 rounded-full">
                    {cta.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </BlurFade>
      )}
    </>
  );
}
