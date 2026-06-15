"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, Upload, Globe, BookOpen, Search, Droplets, FileCode, Wrench, ExternalLink } from "lucide-react";
import { useInView } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import PageCTA from "@/components/layout/PageCTA";
import BlurFade from "@/components/ui/blur-fade";
import SpotlightCard from "@/components/ui/spotlight-card";
import NoCodeSection from "@/components/sections/NoCodeSection";

// ===== Terminal Typing Animation =====

const TERMINAL_LINES = [
  { prompt: "$ ", text: "npm install ethers", delay: 0 },
  { prompt: "", text: "added 42 packages in 2.3s", delay: 1200, muted: true },
  { prompt: "$ ", text: "npx hardhat compile", delay: 2000 },
  { prompt: "", text: "Compiling 1 file with 0.8.19", delay: 3000, muted: true },
  { prompt: "", text: "✓ Compiled successfully", delay: 3600, green: true },
  { prompt: "$ ", text: "npx hardhat deploy --network quarrychain", delay: 4200 },
  { prompt: "", text: "Deploying MyToken...", delay: 5200, muted: true },
  { prompt: "", text: "✓ Contract deployed to 0x7a3b...c4f2", delay: 6000, green: true },
];

function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    const timers: NodeJS.Timeout[] = [];
    TERMINAL_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay));
    });

    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref} className="rounded-xl bg-bg-secondary border border-white/[0.06] overflow-hidden shadow-[0_0_40px_rgba(20,184,166,0.06)] max-w-2xl mx-auto">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <span className="w-3 h-3 rounded-full bg-red-500/60" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <span className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="ml-auto text-xs text-text-muted font-mono">terminal</span>
      </div>
      <div className="p-5 font-mono text-sm min-h-[240px]">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="leading-7">
            {line.prompt && <span className="text-qc-teal">{line.prompt}</span>}
            <span className={line.green ? "text-qc-green" : line.muted ? "text-text-muted" : "text-text-secondary"}>
              {line.text}
            </span>
          </div>
        ))}
        {visibleLines < TERMINAL_LINES.length && inView && (
          <span className="inline-block w-2 h-4 bg-qc-teal animate-pulse ml-0.5" />
        )}
      </div>
    </div>
  );
}

// ===== Quick Start Steps =====

const STEPS = [
  {
    step: 1,
    title: "Set up your environment",
    description: "Install Web3.js or Ethers.js. Connect to QuarryChain RPC. Use your existing Solidity toolchain.",
    icon: Terminal,
    color: "text-qc-teal",
    bg: "bg-qc-teal/10",
  },
  {
    step: 2,
    title: "Deploy a smart contract",
    description: "Write Solidity. Compile. Deploy to QuarryChain — the same workflow you already know.",
    icon: Upload,
    color: "text-qc-blue",
    bg: "bg-qc-blue/10",
  },
  {
    step: 3,
    title: "Interact with the network",
    description: "Query blocks, send transactions, and read contract state via the QuarryScan explorer.",
    icon: Globe,
    color: "text-qc-green",
    bg: "bg-qc-green/10",
  },
];

// ===== Resources =====

const RESOURCES = [
  { title: "Documentation", description: "API reference and developer guides", href: "#", icon: BookOpen, comingSoon: true },
  { title: "GitHub", description: "Open source repositories", href: "https://github.com/QuarryLabsInc", icon: ExternalLink, external: true },
  { title: "Testnet Explorer", description: "QuarryScan on testnet", href: "https://explorer.testnet.quarrychain.network", icon: Search, external: true },
  { title: "Testnet Faucet", description: "Get testnet QRY tokens", href: "#", icon: Droplets, comingSoon: true },
  { title: "QRC-20 Standard", description: "Token standard reference", href: "/technology", icon: FileCode },
  { title: "SDKs & Tools", description: "Web3.js, Ethers.js compatible", href: "#", icon: Wrench, comingSoon: true },
];

const QVM_BADGES = ["EVM Compatible", "Solidity", "Web3.js", "Ethers.js", "MetaMask", "Hardhat", "Remix", "Truffle", "OpenZeppelin"];

export default function DevelopersPage() {
  return (
    <div className="pt-16">
      <PageHero
        label="Developers"
        headline="Start building."
        subheadline="Everything you need to deploy on QuarryChain."
        shape="octahedron"
        shapeColors={{ primary: "#14b8a6", secondary: "#22c55e", tertiary: "#ef4444" }}
      />

      {/* Quick Start */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">Quick Start</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16">Three steps. <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-green">That&apos;s it.</span></h2>
          </BlurFade>

          <div className="grid md:grid-cols-3 gap-4">
            {STEPS.map((step, i) => (
              <BlurFade key={step.step} delay={0.1 + i * 0.1}>
                <div className="rounded-xl bg-bg-secondary border border-white/5 p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg ${step.bg} flex items-center justify-center`}>
                      <step.icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <span className="text-xs font-mono text-text-muted">0{step.step}</span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Animation */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-qc-blue font-mono mb-4">Deploy</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-blue to-qc-teal">familiar workflow.</span></h2>
            </div>
          </BlurFade>
          <BlurFade delay={0.1}>
            <TerminalAnimation />
          </BlurFade>
        </div>
      </section>

      {/* No-Code Token Generator */}
      <NoCodeSection />

      {/* Resources Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">Resources</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16">Everything <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-red to-qc-blue">you need.</span></h2>
          </BlurFade>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESOURCES.map((resource, i) => (
              <BlurFade key={resource.title} delay={0.05 + i * 0.05}>
                <a
                  href={resource.comingSoon ? undefined : resource.href}
                  {...(resource.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`block rounded-xl bg-bg-secondary border border-white/5 p-6 transition-all duration-300 h-full ${
                    resource.comingSoon ? "cursor-default" : "hover:border-qc-teal/20 hover:shadow-[0_0_20px_rgba(20,184,166,0.06)]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-qc-teal/10 flex items-center justify-center">
                      <resource.icon className="w-5 h-5 text-qc-teal" />
                    </div>
                    {resource.comingSoon && (
                      <span className="text-[10px] text-text-muted bg-white/5 px-2 py-0.5 rounded-full font-mono">Coming soon</span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-text-primary mb-1">{resource.title}</h3>
                  <p className="text-sm text-text-secondary">{resource.description}</p>
                </a>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Quarry Virtual Machine */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">Virtual Machine</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              QuarryChain <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-blue to-qc-teal">Virtual Machine</span>
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl">
              Lightweight, Turing-complete VM built for the QuarryChain ecosystem. Fully EVM-compatible — deploy existing Solidity contracts with zero modifications. Connects seamlessly with Web3.js, Ethers.js, Hardhat, and Remix.
            </p>
          </BlurFade>
          <BlurFade delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {QVM_BADGES.map((badge) => (
                <span key={badge} className="px-3.5 py-1.5 rounded-full text-xs font-medium text-qc-teal bg-[rgba(20,184,166,0.08)] border border-[rgba(20,184,166,0.15)] font-mono">
                  {badge}
                </span>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      <PageCTA
        headline="Ready to deploy?"
        ctas={[
          { text: "Read the Docs", href: "#", primary: true },
          { text: "Join Discord", href: "https://discord.gg/quarrychain" },
        ]}
      />
    </div>
  );
}
