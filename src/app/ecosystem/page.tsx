"use client";

import { useRef, MouseEvent } from "react";
import { Wallet, ArrowLeftRight, Search, Cpu, Coins, Building, ArrowUpRight, type LucideIcon } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageCTA from "@/components/layout/PageCTA";
import BlurFade from "@/components/ui/blur-fade";

type Product = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  external?: boolean;
  comingSoon?: boolean;
};

const PRODUCTS: Product[] = [
  { name: "QuarrySwap", description: "Non-custodial DEX with AMM liquidity pools and yield farming.", href: "/ecosystem/quarryswap", icon: ArrowLeftRight, color: "text-qc-green", bg: "bg-qc-green/10" },
  { name: "QuarryWallet", description: "Self-custodial wallet for QRY and QRC-20 tokens.", href: "/ecosystem/quarrywallet", icon: Wallet, color: "text-qc-blue", bg: "bg-qc-blue/10" },
  { name: "QuarryScan", description: "Block explorer. Every transaction, every contract.", href: "https://explorer.testnet.quarrychain.network", icon: Search, external: true, color: "text-qc-red", bg: "bg-qc-red/10" },
  { name: "QVM", description: "EVM-compatible virtual machine. Solidity-native.", href: "/developers", icon: Cpu, color: "text-qc-teal", bg: "bg-qc-teal/10" },
  { name: "QRC-20 Tokens", description: "Launch tokens with the standard developers already know.", href: "/technology", icon: Coins, color: "text-qc-blue", bg: "bg-qc-blue/10" },
  { name: "Asset Tokenization", description: "Real-world assets on-chain. Trade 24/7.", href: "/ecosystem/asset-tokenization", icon: Building, color: "text-qc-green", bg: "bg-qc-green/10" },
];

// 3D tilt card
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className || ""}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export default function EcosystemPage() {
  return (
    <div className="pt-16">
      <PageHero
        label="Ecosystem"
        headline="One chain. Everything you need."
        subheadline="Wallets, DEX, explorer, smart contracts, and real-world asset tokenization — all native to QuarryChain."
        shape="dodecahedron"
        shapeColors={{ primary: "#22c55e", secondary: "#3b82f6", tertiary: "#ef4444" }}
      />

      {/* Product Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-widest text-qc-green font-mono mb-4">Products</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">Built for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-green to-qc-blue">QuarryChain ecosystem.</span></h2>
            </div>
          </BlurFade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map((product, i) => (
              <BlurFade key={product.name} delay={0.05 + i * 0.05}>
                <TiltCard>
                  <a
                    href={product.comingSoon ? undefined : product.href}
                    {...(product.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`block rounded-xl bg-bg-secondary border border-white/5 p-8 h-full transition-colors duration-300 ${
                      product.comingSoon ? "cursor-default" : "hover:border-[rgba(20,184,166,0.2)]"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg ${product.bg} flex items-center justify-center`}>
                        <product.icon className={`w-6 h-6 ${product.color}`} />
                      </div>
                      {product.comingSoon ? (
                        <span className="text-[10px] text-text-muted bg-white/5 px-2 py-0.5 rounded-full font-mono">Coming soon</span>
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-text-muted" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold font-display text-text-primary mb-2">{product.name}</h3>
                    <p className="text-sm text-text-secondary">{product.description}</p>
                  </a>
                </TiltCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        headline="Build your dApp on QuarryChain."
        ctas={[
          { text: "Read the Docs", href: "/developers", primary: true },
          { text: "Apply for Grants", href: "#" },
        ]}
      />
    </div>
  );
}
