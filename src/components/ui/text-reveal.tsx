"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

// Animates on mount, no IntersectionObserver gating. Used in the hero, which
// is always in view on first paint. The previous useInView-gated version had
// a race where the observer occasionally never fired and words stayed hidden
// at translateY(100%), opacity 0 \u2014 most visibly affecting the gradient
// "for What's Next" portion (where the bg-clip-text parent made the broken
// state look like missing words rather than a stuck animation).
export default function TextReveal({
  children,
  className,
  delay = 0,
  staggerDelay = 0.03,
}: TextRevealProps) {
  const words = children.split(" ");

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: delay + i * staggerDelay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}
