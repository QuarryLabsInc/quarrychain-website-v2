"use client";

import { ArrowLeftRight, Droplets, Sprout } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageCTA from "@/components/layout/PageCTA";
import BlurFade from "@/components/ui/blur-fade";
import SpotlightCard from "@/components/ui/spotlight-card";
import QuarryToken from "@/components/ui/QuarryToken";

// ===== Animated Swap Visual =====

function SwapAnimation() {
  return (
    <div className="flex items-center justify-center gap-6 py-8">
      <div className="relative">
        <QuarryToken
          size={72}
          rockDuration={5}
          glowColor="rgba(20, 184, 166, 0.45)"
        />
      </div>

      <div className="relative w-12 h-12 flex items-center justify-center">
        <ArrowLeftRight className="w-6 h-6 text-text-muted motion-safe:animate-[spin_4s_linear_infinite]" />
      </div>

      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-qc-blue/20 border border-qc-blue/30 flex items-center justify-center motion-safe:animate-[pulse_3s_ease-in-out_infinite_0.5s]">
          <span className="text-sm font-bold font-mono text-qc-blue">USDT</span>
        </div>
      </div>
    </div>
  );
}

const HOW_IT_WORKS = [
  {
    title: "Swap",
    description: "Trade any QRC-20 token pair instantly. 0.3% swap fee — 0.25% goes directly to liquidity providers.",
    icon: ArrowLeftRight,
    color: "text-qc-teal",
    spotlight: "rgba(20, 184, 166, 0.08)",
  },
  {
    title: "Provide Liquidity",
    description: "Deposit equal parts of any token pair. Receive QLP tokens representing your pool share. Earn fees on every swap.",
    icon: Droplets,
    color: "text-qc-blue",
    spotlight: "rgba(59, 130, 246, 0.08)",
  },
  {
    title: "Yield Farming",
    description: "Stake QLP tokens in farms to earn QRY rewards. Stack three types of yield: protocol fees, network tokens, and leverage demand.",
    icon: Sprout,
    color: "text-qc-green",
    spotlight: "rgba(34, 197, 94, 0.08)",
  },
];

const YIELD_TYPES = [
  { title: "Protocol Usage", description: "0.25% swap fees distributed to liquidity providers.", color: "text-qc-teal", bg: "bg-qc-teal/10" },
  { title: "Network Tokens", description: "QLP reward boosts for staked positions.", color: "text-qc-blue", bg: "bg-qc-blue/10" },
  { title: "Leverage Demand", description: "Lending interest rates driven by borrowing demand.", color: "text-qc-green", bg: "bg-qc-green/10" },
];

const FEE_BREAKDOWN = [
  { label: "Total swap fee", value: "0.3%" },
  { label: "Liquidity providers", value: "0.25%" },
  { label: "Ecosystem holders", value: "0.05%" },
];

export default function QuarrySwapPage() {
  return (
    <div className="pt-16">
      <PageHero
        label="QuarrySwap"
        headline="Swap, stake, farm. Fully decentralized."
        subheadline="Non-custodial AMM DEX on QuarryChain. Trade tokens, provide liquidity, and earn yield."
        shape="icosahedron"
        shapeColors={{ primary: "#22c55e", secondary: "#ef4444", tertiary: "#3b82f6" }}
        ctas={[
          { text: "Launch App", href: "#", primary: true, badge: "Coming soon" },
          { text: "Read Docs", href: "/developers" },
        ]}
      />

      {/* Swap Animation */}
      <section className="pb-12 px-4">
        <BlurFade>
          <SwapAnimation />
        </BlurFade>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16">Three ways to <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-green to-qc-teal">earn.</span></h2>
          </BlurFade>

          <div className="grid md:grid-cols-3 gap-4">
            {HOW_IT_WORKS.map((item, i) => (
              <BlurFade key={item.title} delay={0.1 + i * 0.1}>
                <SpotlightCard spotlightColor={item.spotlight} className="h-full">
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <h3 className="text-lg font-bold font-display text-text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-text-secondary">{item.description}</p>
                  </div>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Yield Stacking */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-blue font-mono mb-4">Yield</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16"><span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-blue to-qc-green">Triple yield</span> stacking.</h2>
          </BlurFade>

          <div className="grid md:grid-cols-3 gap-4">
            {YIELD_TYPES.map((y, i) => (
              <BlurFade key={y.title} delay={0.1 + i * 0.1}>
                <div className="rounded-xl bg-bg-secondary border border-white/5 p-6">
                  <div className={`w-2 h-2 rounded-full ${y.bg} mb-4`} style={{ boxShadow: `0 0 8px currentColor` }} />
                  <h3 className={`text-base font-bold ${y.color} mb-2`}>{y.title}</h3>
                  <p className="text-sm text-text-secondary">{y.description}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4 text-center">Fees</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-12 text-center"><span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-red to-qc-blue">Transparent</span> fee structure.</h2>
          </BlurFade>

          <div className="grid sm:grid-cols-3 gap-4">
            {FEE_BREAKDOWN.map((fee, i) => (
              <BlurFade key={fee.label} delay={0.1 + i * 0.1}>
                <div className="rounded-xl bg-bg-secondary border border-white/5 p-6 text-center">
                  <p className="text-2xl font-bold font-display text-text-primary">{fee.value}</p>
                  <p className="text-sm text-text-muted mt-1">{fee.label}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        headline="Start trading on QuarrySwap."
        ctas={[
          { text: "Get Notified", href: "#", primary: true },
          { text: "Join Discord", href: "https://discord.gg/quarrychain" },
        ]}
      />
    </div>
  );
}
