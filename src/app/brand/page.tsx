"use client";

import { useState } from "react";
import { Download, Check, Copy } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import BlurFade from "@/components/ui/blur-fade";
import SpotlightCard from "@/components/ui/spotlight-card";
import DownloadableShape from "@/components/three/DownloadableShape";
import QuarryToken from "@/components/ui/QuarryToken";

// ===== Color Data =====

const COLOR_GROUPS = [
  {
    label: "Backgrounds",
    colors: [
      { name: "bg-primary", hex: "#08080f", desc: "Page background" },
      { name: "bg-secondary", hex: "#0f1019", desc: "Cards, code blocks" },
      { name: "bg-tertiary", hex: "#161822", desc: "Elevated surfaces" },
    ],
  },
  {
    label: "Brand",
    colors: [
      { name: "qc-teal", hex: "#14b8a6", desc: "Primary accent, CTAs, labels" },
      { name: "qc-teal-glow", hex: "#2dd4bf", desc: "Bright accent, hover" },
      { name: "qc-blue", hex: "#3b82f6", desc: "Actions, links, wordmark" },
      { name: "qc-blue-glow", hex: "#60a5fa", desc: "Hover states" },
      { name: "qc-red", hex: "#ef4444", desc: "Alerts, emphasis" },
      { name: "qc-green", hex: "#22c55e", desc: "Success, live status" },
    ],
  },
  {
    label: "Text",
    colors: [
      { name: "text-primary", hex: "#f1f5f9", desc: "Headlines" },
      { name: "text-secondary", hex: "#94a3b8", desc: "Body text" },
      { name: "text-muted", hex: "#475569", desc: "Labels, captions" },
    ],
  },
];

// ===== Font Data =====

const FONTS = [
  {
    name: "Space Grotesk",
    role: "Display / Headlines",
    weights: "Bold (700)",
    url: "https://fonts.google.com/specimen/Space+Grotesk",
    sample: "The Blockchain Built for What's Next",
    className: "font-display",
  },
  {
    name: "Inter",
    role: "Body Text",
    weights: "Regular (400), Medium (500)",
    url: "https://fonts.google.com/specimen/Inter",
    sample: "100,000 TPS. 3-second finality. Minimal fees. Zero compromise.",
    className: "font-sans",
  },
  {
    name: "JetBrains Mono",
    role: "Code / Data / Labels",
    weights: "Regular (400), Medium (500)",
    url: "https://fonts.google.com/specimen/JetBrains+Mono",
    sample: "GOVERNANCE · BUILD ON QUARRYCHAIN · 100,000 TPS",
    className: "font-mono",
  },
];

// ===== Voice Data =====

const VOICE_TABLE = [
  { weAre: "Confident — state facts plainly", weAreNot: "Arrogant — never mock competitors" },
  { weAre: "Technical — precise terminology", weAreNot: "Impenetrable — jargon serves clarity" },
  { weAre: "Focused — builder shipping energy", weAreNot: "Hype-bro — no 'This is HUGE'" },
  { weAre: "Punchy — minimal, effortless copy", weAreNot: "Corporate — no qualifiers or committee tone" },
  { weAre: "Respectful — trust reader intelligence", weAreNot: "Condescending — never over-explain" },
  { weAre: "Direct — show capability, full stop", weAreNot: "Comparative — never frame against competitors" },
];

const GOOD_BAD = [
  {
    good: '"Start building on QuarryChain."',
    bad: '"Ready to Build on QuarryChain?"',
    why: "Statements, not questions",
  },
  {
    good: '"100,000 TPS. 3-second finality."',
    bad: '"Really fast blockchain technology"',
    why: "Stats, not adjectives",
  },
  {
    good: '"Read the Docs"',
    bad: '"Learn More"',
    why: "Specific CTAs, not generic",
  },
  {
    good: '"Non-custodial AMM with liquidity pools."',
    bad: '"Our powerful decentralized exchange"',
    why: "Mechanism, not superlatives",
  },
];

// ===== Color Swatch with Copy =====

function ColorSwatch({ name, hex, desc }: { name: string; hex: string; desc: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group text-left w-full"
    >
      <div
        className="h-20 rounded-xl border border-white/5 mb-3 transition-all duration-300 group-hover:border-white/15 group-hover:scale-[1.02] relative overflow-hidden"
        style={{ backgroundColor: hex }}
      >
        {copied && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <span className="text-xs font-mono text-qc-green flex items-center gap-1">
              <Check className="w-3 h-3" /> Copied
            </span>
          </div>
        )}
      </div>
      <p className="text-sm font-bold text-text-primary">{name}</p>
      <p className="text-xs font-mono text-text-muted">{hex}</p>
      <p className="text-xs text-text-muted mt-0.5">{desc}</p>
    </button>
  );
}

// ===== Main Page =====

export default function BrandPage() {
  return (
    <div className="pt-16">
      <PageHero
        label="Brand"
        headline="QuarryChain Brand Guidelines"
        subheadline="Colors, typography, logo usage, voice, and visual standards for all QuarryChain communications."
        shape="dodecahedron"
        shapeColors={{ primary: "#14b8a6", secondary: "#3b82f6", tertiary: "#ef4444" }}
      />

      {/* ==================== COLORS ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">Color Palette</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Dark mode. <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">Always.</span>
            </h2>
            <p className="text-text-secondary mb-16 max-w-2xl">Click any swatch to copy the hex value. All colors are designed for dark backgrounds — never use on light surfaces.</p>
          </BlurFade>

          {COLOR_GROUPS.map((group, gi) => (
            <BlurFade key={group.label} delay={0.05 + gi * 0.05}>
              <div className="mb-12">
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-4">{group.label}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {group.colors.map((color) => (
                    <ColorSwatch key={color.hex} {...color} />
                  ))}
                </div>
              </div>
            </BlurFade>
          ))}

          {/* Gradient */}
          <BlurFade delay={0.2}>
            <div className="mb-4">
              <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-4">Primary Gradient</p>
              <div className="h-20 rounded-xl bg-gradient-to-r from-qc-teal to-qc-blue mb-3" />
              <p className="text-sm text-text-secondary">Teal (#14b8a6) → Blue (#3b82f6) — Used for headline accents and button borders. Never on body text.</p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ==================== TYPOGRAPHY ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-blue font-mono mb-4">Typography</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Three fonts. <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-blue to-qc-teal">Clear hierarchy.</span>
            </h2>
            <p className="text-text-secondary mb-16 max-w-2xl">Each font serves a specific role. Space Grotesk carries the brand voice, Inter carries content, JetBrains Mono carries data authority.</p>
          </BlurFade>

          <div className="space-y-8">
            {FONTS.map((font, i) => (
              <BlurFade key={font.name} delay={0.1 + i * 0.1}>
                <div className="rounded-xl bg-bg-secondary border border-white/5 p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold font-display text-text-primary">{font.name}</h3>
                      <p className="text-sm text-text-muted">{font.role} — {font.weights}</p>
                    </div>
                    <a
                      href={font.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono text-qc-teal bg-qc-teal/8 border border-qc-teal/15 rounded-lg hover:bg-qc-teal/15 transition-all shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Font
                    </a>
                  </div>
                  <p className={`text-2xl md:text-3xl text-text-primary ${font.className} ${font.name === "JetBrains Mono" ? "text-lg md:text-xl tracking-wider" : ""}`}>
                    {font.sample}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>

          {/* Type scale */}
          <BlurFade delay={0.4}>
            <div className="mt-12 rounded-xl bg-bg-secondary border border-white/5 p-8">
              <h3 className="text-lg font-bold font-display text-text-primary mb-6">Type Scale</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-text-muted font-mono mb-1">HERO — 48-80px Bold, tracking-tight</p>
                  <p className="text-5xl font-bold font-display text-text-primary">Hero Headline</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted font-mono mb-1">SECTION — 30-48px Bold</p>
                  <p className="text-3xl font-bold font-display text-text-primary">Section Headline</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted font-mono mb-1">BODY — 16px Regular, leading-relaxed</p>
                  <p className="text-base text-text-secondary leading-relaxed">Body text uses Inter Regular for maximum readability across all screen sizes and devices.</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted font-mono mb-1">LABEL — 12px Uppercase, tracking-widest</p>
                  <p className="text-xs uppercase tracking-widest text-text-muted font-mono">GOVERNANCE · ECOSYSTEM · TOKENOMICS</p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ==================== LOGOS ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-red font-mono mb-4">Logo</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Logo <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-red to-qc-blue">assets.</span>
            </h2>
            <p className="text-text-secondary mb-16 max-w-2xl">Download logo files for use in presentations, partnerships, and media. Always use on dark backgrounds.</p>
          </BlurFade>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Icon + Wordmark — exact navbar treatment */}
            <BlurFade delay={0.05}>
              <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.08)" className="h-full">
                <div className="p-6">
                  <div className="h-32 rounded-lg bg-bg-primary border border-white/5 flex items-center justify-center mb-4">
                    <div className="flex items-center gap-2.5">
                      <img src="/logo-original.png" alt="" className="h-10 w-10" />
                      <span className="text-2xl font-bold font-display">
                        <span className="text-qc-blue">Quarry</span>
                        <span className="text-text-primary">Chain</span>
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-text-primary mb-1">Icon + Wordmark</h3>
                  <p className="text-xs text-text-muted mb-3">Primary use — navbar, hero, decks</p>
                  <a
                    href="/logo-icon-wordmark.svg"
                    download
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-qc-teal hover:text-qc-teal-glow transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Download SVG
                  </a>
                </div>
              </SpotlightCard>
            </BlurFade>

            {/* Icon Only */}
            <BlurFade delay={0.10}>
              <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.08)" className="h-full">
                <div className="p-6">
                  <div className="h-32 rounded-lg bg-bg-primary border border-white/5 flex items-center justify-center mb-4">
                    <img src="/logo-original.png" alt="QuarryChain icon" className="h-20 w-20" />
                  </div>
                  <h3 className="text-sm font-bold text-text-primary mb-1">Icon</h3>
                  <p className="text-xs text-text-muted mb-3">Favicons, social avatars, app icons</p>
                  <a
                    href="/logo-original.png"
                    download
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-qc-teal hover:text-qc-teal-glow transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </a>
                </div>
              </SpotlightCard>
            </BlurFade>

            {/* $QRY 3D Token — live rocking coin */}
            <BlurFade delay={0.15}>
              <SpotlightCard spotlightColor="rgba(20, 184, 166, 0.10)" className="h-full">
                <div className="p-6">
                  <div className="h-32 rounded-lg bg-bg-primary border border-white/5 flex items-center justify-center mb-4 overflow-hidden">
                    <QuarryToken size={104} glow={false} />
                  </div>
                  <h3 className="text-sm font-bold text-text-primary mb-1">$QRY 3D Token</h3>
                  <p className="text-xs text-text-muted mb-3">Token mark — tokenomics, ICO, swap UI</p>
                  <a
                    href="/quarry-token.svg"
                    download
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-qc-teal hover:text-qc-teal-glow transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Download SVG
                  </a>
                </div>
              </SpotlightCard>
            </BlurFade>
          </div>

          {/* Logo rules */}
          <BlurFade delay={0.3}>
            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-bg-secondary border border-qc-green/20 p-6">
                <p className="text-sm font-bold text-qc-green mb-3">Do</p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>✓ Use on dark backgrounds only</li>
                  <li>✓ Maintain clear space equal to icon height</li>
                  <li>✓ "Quarry" in blue, "Chain" in white</li>
                  <li>✓ Minimum size: 120px wide (icon + wordmark)</li>
                </ul>
              </div>
              <div className="rounded-xl bg-bg-secondary border border-qc-red/20 p-6">
                <p className="text-sm font-bold text-qc-red mb-3">Don&apos;t</p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>✗ Stretch, skew, or rotate the logo</li>
                  <li>✗ Place on busy backgrounds without overlay</li>
                  <li>✗ Change the blue/white color split</li>
                  <li>✗ Add drop shadows, outlines, or effects</li>
                </ul>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ==================== ICONOGRAPHY ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-green font-mono mb-4">Iconography</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Lucide icons. <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-green to-qc-teal">Nothing else.</span>
            </h2>
            <p className="text-text-secondary mb-12 max-w-2xl">All icons come from the Lucide library — clean, consistent line icons. No clipart, no emoji, no filled/illustrated icons ever.</p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className="rounded-xl bg-bg-secondary border border-white/5 p-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {[
                  { label: "Default", desc: "24px, 2px stroke, inherit color", example: "bg-white/5" },
                  { label: "In colored container", desc: "bg-{color}/10, matching text color", example: "bg-qc-teal/10" },
                  { label: "Standalone accent", desc: "Brand color directly on icon", example: "bg-transparent" },
                ].map((style, i) => (
                  <div key={style.label} className="text-center">
                    <div className={`w-12 h-12 rounded-lg ${style.example} flex items-center justify-center mx-auto mb-3 border border-white/5`}>
                      <svg className="w-6 h-6 text-qc-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-text-primary">{style.label}</p>
                    <p className="text-xs text-text-muted">{style.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                <a
                  href="https://lucide.dev/icons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-qc-teal hover:text-qc-teal-glow transition-colors font-mono"
                >
                  Browse Lucide Icons →
                </a>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ==================== GEOMETRIC SHAPES ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">Geometric Shapes</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Wireframe <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">geometries.</span>
            </h2>
            <p className="text-text-secondary mb-12 max-w-2xl">
              Each section of the QuarryChain site uses a unique 3D wireframe shape as its visual signature. Click any shape to download a high-resolution PNG with transparent background.
            </p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <DownloadableShape
                shape="torusKnot"
                name="Torus Knot"
                primaryColor="#3b82f6"
                secondaryColor="#ef4444"
                tertiaryColor="#22c55e"
              />
              <DownloadableShape
                shape="octahedron"
                name="Octahedron"
                primaryColor="#14b8a6"
                secondaryColor="#22c55e"
                tertiaryColor="#ef4444"
              />
              <DownloadableShape
                shape="dodecahedron"
                name="Dodecahedron"
                primaryColor="#14b8a6"
                secondaryColor="#3b82f6"
                tertiaryColor="#ef4444"
              />
              <DownloadableShape
                shape="icosahedron"
                name="Icosahedron"
                primaryColor="#ef4444"
                secondaryColor="#3b82f6"
                tertiaryColor="#22c55e"
              />
              <DownloadableShape
                shape="tetrahedron"
                name="Tetrahedron"
                primaryColor="#14b8a6"
                secondaryColor="#3b82f6"
                tertiaryColor="#ef4444"
              />
              <DownloadableShape
                shape="sphere"
                name="Sphere"
                primaryColor="#a855f7"
                secondaryColor="#14b8a6"
                tertiaryColor="#3b82f6"
              />
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="mt-8 rounded-xl bg-bg-secondary border border-white/5 p-6">
              <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-3">Section Assignments</p>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-text-secondary">
                <p><span className="font-mono text-qc-teal">torusKnot</span> &middot; /technology</p>
                <p><span className="font-mono text-qc-teal">octahedron</span> &middot; /developers</p>
                <p><span className="font-mono text-qc-teal">dodecahedron</span> &middot; /ecosystem &middot; /brand</p>
                <p><span className="font-mono text-qc-teal">icosahedron</span> &middot; /blog</p>
                <p><span className="font-mono text-qc-teal">tetrahedron</span> &middot; /whitepaper</p>
                <p><span className="font-mono text-qc-teal">sphere</span> &middot; /tokenomics</p>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ==================== VOICE ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">Voice</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              State. Don&apos;t <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">ask.</span>
            </h2>
            <p className="text-text-secondary mb-16 max-w-2xl">Engineers who know they built something good. Confident, precise, no hedging, no hype.</p>
          </BlurFade>

          {/* We Are / We Are Not */}
          <BlurFade delay={0.1}>
            <div className="rounded-xl bg-bg-secondary border border-white/5 overflow-hidden mb-8">
              <div className="grid grid-cols-2">
                <div className="p-6 border-b border-white/5 border-r border-white/5">
                  <p className="text-sm font-bold text-qc-green">We Are</p>
                </div>
                <div className="p-6 border-b border-white/5">
                  <p className="text-sm font-bold text-qc-red">We Are Not</p>
                </div>
                {VOICE_TABLE.map((row, i) => (
                  <div key={i} className="contents">
                    <div className="p-4 border-b border-white/5 border-r border-white/5 last:border-b-0">
                      <p className="text-sm text-text-secondary">{row.weAre}</p>
                    </div>
                    <div className="p-4 border-b border-white/5 last:border-b-0">
                      <p className="text-sm text-text-secondary">{row.weAreNot}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Good vs Bad */}
          <BlurFade delay={0.15}>
            <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-4">Examples</p>
          </BlurFade>
          <div className="space-y-3">
            {GOOD_BAD.map((example, i) => (
              <BlurFade key={i} delay={0.2 + i * 0.05}>
                <div className="rounded-xl bg-bg-secondary border border-white/5 p-5">
                  <div className="grid sm:grid-cols-2 gap-4 mb-2">
                    <div>
                      <span className="text-xs font-mono text-qc-green">✓ </span>
                      <span className="text-sm text-text-primary">{example.good}</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-qc-red">✗ </span>
                      <span className="text-sm text-text-secondary line-through decoration-qc-red/30">{example.bad}</span>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted">{example.why}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== COMPONENTS ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-blue font-mono mb-4">Components</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              UI <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-blue to-qc-green">patterns.</span>
            </h2>
            <p className="text-text-secondary mb-16 max-w-2xl">Core component styles used across the site and all brand materials.</p>
          </BlurFade>

          <div className="space-y-8">
            {/* Buttons */}
            <BlurFade delay={0.1}>
              <div className="rounded-xl bg-bg-secondary border border-white/5 p-8">
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-6">Buttons</p>
                <div className="flex flex-wrap gap-4 items-center">
                  <span className="inline-flex items-center px-6 py-3 text-sm font-medium text-white rounded-lg border border-qc-teal/50 bg-gradient-to-r from-qc-teal/10 to-qc-blue/10">
                    Primary CTA
                  </span>
                  <span className="inline-flex items-center px-6 py-3 text-sm font-medium text-text-secondary rounded-lg border border-white/10">
                    Secondary / Ghost
                  </span>
                </div>
                <p className="text-xs text-text-muted mt-4">Primary: gradient border teal→blue, transparent fill, glow on hover. Secondary: border-white/10, text-secondary.</p>
              </div>
            </BlurFade>

            {/* Badges */}
            <BlurFade delay={0.15}>
              <div className="rounded-xl bg-bg-secondary border border-white/5 p-8">
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-6">Badges</p>
                <div className="flex flex-wrap gap-2">
                  {["EVM Compatible", "Solidity Native", "Web3.js", "MetaMask Ready"].map((badge) => (
                    <span key={badge} className="px-3.5 py-1.5 rounded-full text-xs font-medium text-qc-teal bg-[rgba(20,184,166,0.08)] border border-[rgba(20,184,166,0.15)] font-mono">
                      {badge}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-text-muted mt-4">Rounded-full, teal/8 bg, teal/15 border, JetBrains Mono. Used for compatibility tags and feature labels.</p>
              </div>
            </BlurFade>

            {/* Cards */}
            <BlurFade delay={0.2}>
              <div className="rounded-xl bg-bg-secondary border border-white/5 p-8">
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-6">Cards</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <SpotlightCard spotlightColor="rgba(20, 184, 166, 0.08)">
                    <div className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-qc-teal/10 flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-qc-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>
                      </div>
                      <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-1">FEATURE LABEL</p>
                      <p className="text-sm text-text-secondary">Card with spotlight hover glow effect.</p>
                    </div>
                  </SpotlightCard>
                  <div className="rounded-xl bg-bg-primary border border-white/5 p-6">
                    <p className="text-2xl font-bold font-display text-text-primary">100,000</p>
                    <p className="text-xs uppercase tracking-widest text-text-muted font-mono mt-1">TPS</p>
                    <p className="text-xs text-text-muted mt-3">Stat card — Space Grotesk value, JetBrains Mono label.</p>
                  </div>
                </div>
                <p className="text-xs text-text-muted mt-4">bg-secondary (#0f1019), border-white/5, rounded-xl, p-6 to p-8. Hover: spotlight glow follows cursor. No drop shadows.</p>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* ==================== MOTION ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-green font-mono mb-4">Motion</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Every animation <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-green to-qc-teal">earns its place.</span>
            </h2>
            <p className="text-text-secondary mb-12 max-w-2xl">Animations communicate information — entrance reveals, live data, active governance. No decorative motion.</p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { type: "Entrance", desc: "BlurFade — fade up 6px + blur, stagger 50ms between siblings", timing: "400-600ms ease-out" },
                { type: "Hover", desc: "Spotlight radial gradient follows cursor on cards, glow expansion on buttons", timing: "200-300ms ease" },
                { type: "Continuous", desc: "HexGrid wave, WireframeShape rotation, Marquee scroll, GovernancePreview node ring", timing: "20-60s linear" },
                { type: "Data", desc: "NumberTicker count-up on scroll. Chart transitions on hover.", timing: "1.5-2s ease-out" },
              ].map((item, i) => (
                <div key={item.type} className="rounded-xl bg-bg-secondary border border-white/5 p-6">
                  <p className="text-sm font-bold text-text-primary mb-1">{item.type}</p>
                  <p className="text-sm text-text-secondary mb-2">{item.desc}</p>
                  <p className="text-xs font-mono text-text-muted">{item.timing}</p>
                </div>
              ))}
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="mt-8 rounded-xl bg-bg-secondary border border-qc-red/20 p-6">
              <p className="text-sm font-bold text-qc-red mb-2">Accessibility</p>
              <p className="text-sm text-text-secondary">All animations are disabled when <code className="text-xs font-mono text-qc-teal bg-white/5 px-1.5 py-0.5 rounded">prefers-reduced-motion</code> is set. Static frames shown instead.</p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ==================== DOWNLOAD ALL ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-3xl text-center">
          <BlurFade>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Need the full kit?
            </h2>
            <p className="text-text-secondary mb-8">Download the brand style guide PDF with all colors, typography, components, and usage rules.</p>
          </BlurFade>
          <BlurFade delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/QuarryChain_Brand_Style_Guide.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg border border-qc-teal/50 bg-gradient-to-r from-qc-teal/10 to-qc-blue/10 hover:from-qc-teal/20 hover:to-qc-blue/20 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Download Brand Guide PDF
              </a>
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-text-secondary rounded-lg border border-white/10 hover:border-white/20 hover:text-text-primary transition-all duration-300"
              >
                Back to Home
              </a>
            </div>
          </BlurFade>
        </div>
      </section>
    </div>
  );
}
