"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import TextReveal from "@/components/ui/text-reveal";

// Scroll-reactive wireframe icosphere — replaces HexGrid.
// HexGrid.tsx kept on disk for quick revert if the new feel isn't right.
const ScrollSphere = dynamic(() => import("@/components/three/ScrollSphere"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/20 to-bg-primary" />
  ),
});

// ===== Tunable =====
// Total hero section height. With 250vh and a 100vh viewport:
//   - Pin phase lasts 150vh of scroll (sectionHeight - vh).
//     First (1 - HOLD_FRACTION) of pin: shape triangle-waves 0 → 1 → 0
//     (expand then fully contract).
//     Final HOLD_FRACTION of pin: shape stays compact (0), hero still pinned —
//     so the user sees the contracted state linger before the section releases.
// Higher SECTION_HEIGHT_VH = more "weight" on the pin; lower = snappier.
// Higher HOLD_FRACTION = longer held-compact pause before unstick.
const SECTION_HEIGHT_VH = 250;
const HOLD_FRACTION = 0.2;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const updateProgress = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionHeight = el.offsetHeight;

      // Pixels of the section scrolled above the viewport's top edge.
      // Clamped to [0, sectionHeight].
      const scrolled = Math.max(0, Math.min(-rect.top, sectionHeight));

      // Expand-contract cycle happens INSIDE the sticky pin, but only over
      // the first (1 - HOLD_FRACTION) of the pin. The final HOLD_FRACTION
      // of pin is "held compact" — shape stays at 0 while the hero is
      // still pinned, giving the contracted state a beat to sit before
      // the section releases and exits.
      const pinDuration = Math.max(1, sectionHeight - vh);
      const animationEnd = pinDuration * (1 - HOLD_FRACTION);

      let expansion: number;
      if (scrolled <= animationEnd) {
        const p = scrolled / animationEnd;
        // Triangle wave 0 → 1 → 0
        expansion = p < 0.5 ? p * 2 : (1 - p) * 2;
      } else {
        // Either held-compact-within-pin OR post-pin — both render as 0.
        expansion = 0;
      }

      progressRef.current = expansion;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
    >
      {/* Inner sticky content — this is what pins while the outer section
          provides the scroll "runway" for the pin to work against. */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Three.js scroll-reactive wireframe sphere */}
        <div className="absolute inset-0 z-0">
          <ScrollSphere
            className="absolute inset-0"
            getScrollProgress={() => progressRef.current}
          />
        </div>

        {/* Linear fade top/bottom + radial vignette — keeps centered text
            readable without washing out the wireframe. */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg-primary/60 via-transparent to-bg-primary/80" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,8,15,0.4)_100%)]" />

        {/* Content overlay */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          {/* ICO announcement pill */}
          <BlurFade delay={0.1} forceAnimate>
            <a
              href="/ico"
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-8 border border-qc-teal/25 bg-qc-teal/[0.08] text-xs font-mono uppercase tracking-widest text-qc-teal hover:bg-qc-teal/[0.12] hover:border-qc-teal/40 transition-colors group"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-qc-teal animate-pulse" />
              QRY ICO · Registration opens soon
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </BlurFade>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-text-primary mb-6">
            <TextReveal delay={0.2}>The Blockchain Built</TextReveal>{" "}
            {/* Gradient text: motion.span so transform + bg-clip-text are on
                the SAME element — no descendant stacking context conflict. */}
            <motion.span
              className="inline-block bg-gradient-to-r from-qc-teal to-qc-blue bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            >
              for What&apos;s Next
            </motion.span>
          </h1>

          {/* Subheadline */}
          <BlurFade delay={0.6} forceAnimate>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
              100,000 TPS. 3-second finality. Minimal fees. Zero compromise.
            </p>
          </BlurFade>

          {/* CTAs */}
          <BlurFade delay={0.75} forceAnimate>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/ico"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-white rounded-lg border border-qc-teal/50 bg-gradient-to-r from-qc-teal/10 to-qc-blue/10 hover:from-qc-teal/20 hover:to-qc-blue/20 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] transition-all duration-300"
              >
                View the ICO
              </a>
              <a
                href="/whitepaper"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-text-secondary rounded-lg border border-white/10 hover:border-white/20 hover:text-text-primary transition-all duration-300"
              >
                Read the Litepaper
              </a>
            </div>
          </BlurFade>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-text-muted" />
        </div>
      </div>
    </section>
  );
}
