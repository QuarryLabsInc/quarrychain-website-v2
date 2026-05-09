"use client";

import { useState, useCallback } from "react";
import { TOKENOMICS, TOKENOMICS_DETAILS } from "@/lib/constants";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import BlurFade from "@/components/ui/blur-fade";
import QuarryToken from "@/components/ui/QuarryToken";
import { cn } from "@/lib/utils";

const data = TOKENOMICS.allocation.map((item, i) => ({
  name: item.name,
  value: item.percentage,
  color: item.color,
  tokens: TOKENOMICS_DETAILS[i]?.tokens ?? "",
}));

export default function Tokenomics() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = useCallback((_: unknown, index: number) => {
    setActiveIndex(index);
  }, []);

  const onPieLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const activeItem = activeIndex !== null ? data[activeIndex] : null;

  return (
    <section id="tokenomics" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-qc-teal mb-4">
              Tokenomics
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary">
              Quarry (QRY) — Powering the Network
            </h2>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Chart with floating hover label + 3D coin in middle */}
          <BlurFade delay={0.1}>
            <div className="h-[460px] relative">
              {/* Floating hover label — fades in when a slice is active */}
              <div
                className={cn(
                  "absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none",
                  "rounded-full border border-white/10 bg-bg-secondary/90 backdrop-blur",
                  "px-4 py-2 transition-all duration-300 ease-out",
                  activeItem
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-1",
                )}
              >
                <div className="flex items-center gap-2.5 whitespace-nowrap">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: activeItem?.color ?? "transparent" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: activeItem?.color ?? "transparent" }}
                  >
                    {activeItem?.name ?? "—"}
                  </span>
                  <span className="text-text-muted">·</span>
                  <span className="text-sm font-mono text-text-primary">
                    {activeItem?.tokens ?? ""}
                  </span>
                  <span className="text-text-muted">·</span>
                  <span className="text-sm font-mono text-text-primary">
                    {activeItem ? `${activeItem.value}%` : ""}
                  </span>
                </div>
              </div>

              <div className="absolute inset-x-0 top-12 bottom-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={100}
                      outerRadius={170}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                      onMouseEnter={onPieEnter}
                      onMouseLeave={onPieLeave}
                      style={{ cursor: "pointer" }}
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          opacity={activeIndex !== null && activeIndex !== index ? 0.35 : 1}
                          stroke={activeIndex === index ? entry.color : "none"}
                          strokeWidth={activeIndex === index ? 2 : 0}
                          style={{
                            transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.8s cubic-bezier(0.4, 0, 0.2, 1), stroke-width 0.5s ease",
                            filter: activeIndex === index ? `drop-shadow(0 0 12px ${entry.color}50)` : "none",
                          }}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* 3D rocking coin always in the donut hole */}
              <div className="absolute inset-x-0 top-12 bottom-0 flex items-center justify-center pointer-events-none">
                <QuarryToken size={150} glow={false} />
              </div>
            </div>
          </BlurFade>

          {/* Info */}
          <BlurFade delay={0.2}>
            <div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Total Supply", value: "200M QRY" },
                  { label: "Seed Price", value: "$0.25" },
                  { label: "Symbol", value: "QRY" },
                  { label: "Decimals", value: "18" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-bg-secondary border border-white/5 p-4"
                  >
                    <p className="text-sm text-text-muted">{item.label}</p>
                    <p className="text-xl font-bold font-display text-text-primary">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Legend — interactive */}
              <div className="space-y-2">
                {TOKENOMICS.allocation.map((item, i) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 cursor-pointer rounded-lg px-2 py-1 -mx-2 transition-colors hover:bg-white/5"
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0 transition-transform duration-500 ease-out"
                      style={{
                        backgroundColor: item.color,
                        transform: activeIndex === i ? "scale(1.4)" : "scale(1)",
                      }}
                    />
                    <span
                      className="text-sm flex-1 transition-colors duration-500 ease-out"
                      style={{
                        color: activeIndex === i ? "#f1f5f9" : "#94a3b8",
                      }}
                    >
                      {item.name}
                    </span>
                    <span className="text-sm font-mono text-text-primary">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Revenue model */}
              <div className="mt-8 rounded-xl bg-bg-secondary border border-white/5 p-4">
                <p className="text-sm text-text-muted mb-2">Revenue Model</p>
                <p className="text-sm text-text-secondary">
                  0.25% transaction fees &bull; Smart contract deployment fees
                  &bull; 1% asset tokenization commission
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
