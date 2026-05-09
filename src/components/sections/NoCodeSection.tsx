"use client";

import {
  Wallet,
  MousePointerClick,
  Sliders,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";

// ===== Mocked Token Generator UI (dark-mode reskin of the easysite demo) =====

function TokenGeneratorMock() {
  return (
    <div className="rounded-xl bg-bg-secondary border border-white/[0.08] overflow-hidden shadow-[0_0_60px_rgba(20,184,166,0.06)]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-black/20">
        <span className="w-3 h-3 rounded-full bg-red-500/60" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <span className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="ml-auto text-xs text-text-muted font-mono">
          quarryswap.network/wizard
        </span>
      </div>

      {/* App header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-qc-teal/30 to-qc-blue/30 border border-qc-teal/20 flex items-center justify-center">
            <span className="text-[10px] font-mono font-bold text-qc-teal">Q</span>
          </div>
          <div>
            <p className="text-sm font-bold font-display text-text-primary leading-none">
              <span className="text-qc-blue">Quarry</span>Swap
            </p>
            <p className="text-[10px] text-text-muted font-mono leading-none mt-0.5">
              Token Generator DApp
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs text-text-secondary font-mono">
          <span>Dashboard</span>
          <span>Create Token</span>
          <span className="text-qc-teal">Token Wizard</span>
          <span>Role Blocks</span>
          <span>Staking</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-qc-green/10 border border-qc-green/20">
            <span className="w-1.5 h-1.5 rounded-full bg-qc-green animate-pulse" />
            <span className="text-[10px] font-mono text-qc-green">
              QC Mainnet
            </span>
          </span>
          <span className="px-3 py-1.5 rounded-lg text-[11px] font-mono bg-gradient-to-r from-qc-teal/20 to-qc-blue/20 border border-qc-teal/30 text-qc-teal">
            Connect Wallet
          </span>
        </div>
      </div>

      {/* Wizard body — 2 column on md+ */}
      <div className="grid md:grid-cols-[1.4fr_1fr] gap-5 p-5">
        {/* Left: Create Token form */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono">
              Create Token
            </p>
            <span className="text-[10px] text-text-muted font-mono">Step 3 of 5</span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-[11px] text-text-muted font-mono mb-1.5">Name</p>
              <div className="rounded-lg bg-bg-tertiary border border-white/5 px-3 py-2 text-sm text-text-primary font-mono">
                MyToken
              </div>
            </div>
            <div>
              <p className="text-[11px] text-text-muted font-mono mb-1.5">Symbol</p>
              <div className="rounded-lg bg-bg-tertiary border border-white/5 px-3 py-2 text-sm text-text-primary font-mono">
                MTK
              </div>
            </div>
            <div>
              <p className="text-[11px] text-text-muted font-mono mb-1.5">Supply</p>
              <div className="rounded-lg bg-bg-tertiary border border-white/5 px-3 py-2 text-sm text-text-primary font-mono">
                1,000,000
              </div>
            </div>
            <div>
              <p className="text-[11px] text-text-muted font-mono mb-1.5">Token Type</p>
              <div className="rounded-lg bg-bg-tertiary border border-white/5 px-3 py-2 text-sm text-text-primary font-mono flex items-center justify-between">
                <span>QRC-20 · Fungible</span>
                <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
              </div>
            </div>
            <div>
              <p className="text-[11px] text-text-muted font-mono mb-1.5">
                Badge Permissions
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 rounded-md text-[10px] font-mono bg-qc-teal/10 border border-qc-teal/20 text-qc-teal">
                  Tiered Access
                </span>
                <span className="px-2 py-1 rounded-md text-[10px] font-mono bg-qc-blue/10 border border-qc-blue/20 text-qc-blue">
                  Gold Tier
                </span>
                <span className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-text-muted">
                  + Add Role
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.06]">
            <span className="px-3 py-1.5 rounded-lg text-[11px] font-mono bg-white/5 border border-white/10 text-text-secondary">
              Preview
            </span>
            <span className="px-3 py-1.5 rounded-lg text-[11px] font-mono bg-gradient-to-r from-qc-teal/20 to-qc-blue/20 border border-qc-teal/30 text-qc-teal flex items-center gap-1.5">
              Deploy Token
              <Rocket className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Right: Deployment preview */}
        <div>
          <p className="text-xs uppercase tracking-widest text-qc-green font-mono mb-4">
            Deployment Preview
          </p>
          <div className="rounded-lg bg-black/30 border border-qc-green/15 p-4 space-y-3">
            <div>
              <p className="text-[10px] text-text-muted font-mono">Contract Address</p>
              <p className="text-xs font-mono text-text-primary truncate">
                0x7a3b…c4f2
              </p>
            </div>
            <div>
              <p className="text-[10px] text-text-muted font-mono">Estimated Gas</p>
              <p className="text-xs font-mono text-text-primary">0.0004 QRY</p>
            </div>
            <div>
              <p className="text-[10px] text-text-muted font-mono">Network</p>
              <p className="text-xs font-mono text-text-primary">QuarryChain Mainnet</p>
            </div>
            <div>
              <p className="text-[10px] text-text-muted font-mono">Status</p>
              <p className="text-xs font-mono text-qc-green flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" />
                Ready to Deploy
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-bg-tertiary border border-white/5 p-3">
            <p className="text-[10px] text-text-muted font-mono mb-1.5">
              Wizard Progress
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i <= 3 ? "bg-qc-teal" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
            <p className="text-[10px] text-text-muted font-mono mt-1.5">
              Connect → Choose → Configure → Permissions → Deploy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 5-step flow =====

const STEPS = [
  { icon: Wallet, label: "Connect Wallet", sub: "QuarryWallet" },
  { icon: MousePointerClick, label: "Choose", sub: "Token / NFT / DApp" },
  { icon: Sliders, label: "Configure", sub: "Supply, metadata" },
  { icon: ShieldCheck, label: "Permissions", sub: "Badge-based roles" },
  { icon: Rocket, label: "Deploy", sub: "One-click to mainnet" },
];

export default function NoCodeSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <BlurFade>
          <p className="text-xs uppercase tracking-widest text-qc-green font-mono mb-4">
            No-Code
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
            Deploy tokens{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-green to-qc-teal">
              without writing code.
            </span>
          </h2>
          <p className="text-text-secondary text-lg mb-12 max-w-2xl">
            Connect your wallet, pick a template, configure permissions, deploy.
            QuarrySwap&apos;s Token Generator handles QRC-20 tokens, NFTs, and
            full DApps — with a badge-based role system for tiered memberships,
            collateralized NFTs, bonds, and other DeFi instruments.
          </p>
        </BlurFade>

        {/* Mock preview */}
        <BlurFade delay={0.1}>
          <TokenGeneratorMock />
        </BlurFade>

        {/* 5-step flow */}
        <BlurFade delay={0.15}>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.label}
                  className="rounded-xl bg-bg-secondary border border-white/5 p-4 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-text-muted">
                      0{i + 1}
                    </span>
                    <Icon className="w-3.5 h-3.5 text-qc-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-bold font-display text-text-primary leading-tight">
                      {step.label}
                    </p>
                    <p className="text-[11px] text-text-muted font-mono mt-0.5">
                      {step.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </BlurFade>

        {/* CTAs */}
        <BlurFade delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="https://qc-token-gen.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-qc-teal/20 to-qc-blue/20 border border-qc-teal/40 text-qc-teal hover:border-qc-teal/60 transition-colors"
            >
              Try the Beta →
            </a>
            <a
              href="/whitepaper#ecosystem"
              className="px-5 py-3 rounded-lg text-sm font-semibold border border-white/10 text-text-secondary hover:border-white/20 hover:text-text-primary transition-colors"
            >
              Read the Litepaper
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
