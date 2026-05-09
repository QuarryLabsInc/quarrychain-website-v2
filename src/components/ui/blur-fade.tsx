"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  once?: boolean;
  /** Skip IntersectionObserver entirely and animate on mount. Use for
   *  above-fold content where the element is already in view when the
   *  observer registers — otherwise the callback never fires. */
  forceAnimate?: boolean;
}

export default function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.4,
  yOffset = 6,
  blur = "6px",
  once = true,
  forceAnimate = false,
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inViewFromObserver = useInView(ref, { once, margin: "-50px" });
  const inView = forceAnimate || inViewFromObserver;

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={{
        hidden: {
          y: yOffset,
          opacity: 0,
          filter: `blur(${blur})`,
        },
        visible: {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
        },
      }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        delay,
        duration,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
