// ===== Tokenomics =====

// Allocation matches the investor pitch deck (4 slices). Session 9 briefly
// reverted to the 9-slice whitepaper table; Session 10 swapped to the deck
// since the deck is the source of truth investors see.
// See docs/ico-research-summary.md + docs/quarrychain-pitch-deck-2026.pdf.
export const TOKENOMICS = {
  totalSupply: 200_000_000,
  symbol: "QRY",
  decimals: 18,
  seedPrice: 0.25,
  publicPrice: 0.5,
  allocation: [
    { name: "Public Sale", percentage: 50, color: "#3b82f6" },
    { name: "Staking & Farming", percentage: 20, color: "#14b8a6" },
    { name: "Team", percentage: 20, color: "#22c55e" },
    { name: "Angel Investors", percentage: 10, color: "#ef4444" },
  ],
} as const;

// Seed / Angel Investors vesting per deck slide 15 (4yr, 25% annual unlock).
// Public ICO vesting per ico-research-summary.md "Utility Hybrid" model.
// Team vesting follows research PDF (12mo cliff + 4yr 25%/yr).
// Staking/Farming is an emission schedule, not investor vesting.
export const TOKENOMICS_DETAILS = [
  {
    name: "Public Sale",
    percentage: 50,
    color: "#3b82f6",
    tokens: "100,000,000 QRY",
    description: "Allocated for the public ICO at $0.50 per QRY. Funds DEX liquidity and exchange listings at TGE. 25% liquid at TGE, remainder released linearly over 6 months to preserve the price floor without creating a single sellable cliff.",
    vesting: "25% at TGE, 75% over 6 months linear",
    vestingMonths: 6,
  },
  {
    name: "Staking & Farming",
    percentage: 20,
    color: "#14b8a6",
    tokens: "40,000,000 QRY",
    description: "Block rewards for Quarry Miners and staking rewards for QRY holders. Emitted over 4 years on a decreasing schedule — not an investor vesting tranche.",
    vesting: "Linear emission over 48 months",
    vestingMonths: 48,
  },
  {
    name: "Team",
    percentage: 20,
    color: "#22c55e",
    tokens: "40,000,000 QRY",
    description: "Reserved for founders and core team. Fully locked for 12 months, then 25% released annually over 4 years — aligns team incentives with long-term network health.",
    vesting: "12-month cliff, then 25% annually over 4 years",
    vestingMonths: 48,
  },
  {
    name: "Angel Investors",
    percentage: 10,
    color: "#ef4444",
    tokens: "20,000,000 QRY",
    description: "The Seed round — earliest-stage backers who bought at $0.25 (50% discount to public). Matches the investment terms on deck slide 15.",
    vesting: "4-year vest, 25% unlock annually",
    vestingMonths: 48,
  },
] as const;

export const TOKEN_UTILITY = [
  {
    title: "Gas & Transaction Fees",
    description: "QRY is used to pay all transaction fees on the network. 0.25% per transaction — minimal, predictable costs.",
    icon: "Zap",
    color: "text-qc-teal",
    bgColor: "bg-qc-teal/10",
  },
  {
    title: "Staking & Governance",
    description: "Freeze QRY to gain Quarry Power. Vote for Quarry Miners, participate in governance proposals, and earn staking rewards.",
    icon: "Vote",
    color: "text-qc-blue",
    bgColor: "bg-qc-blue/10",
  },
  {
    title: "Block Rewards",
    description: "Quarry Miners earn QRY for producing blocks. Rewards decrease over time following a deflationary emission schedule.",
    icon: "Pickaxe",
    color: "text-qc-red",
    bgColor: "bg-qc-red/10",
  },
  {
    title: "DApp Deployment",
    description: "Deploy smart contracts using QRY. Contract deployment fees are burned, creating deflationary pressure as the ecosystem grows.",
    icon: "Code",
    color: "text-qc-green",
    bgColor: "bg-qc-green/10",
  },
  {
    title: "Asset Tokenization",
    description: "Tokenize and trade real-world assets on-chain. 1% commission on asset tokenization events, paid in QRY.",
    icon: "Building",
    color: "text-qc-teal",
    bgColor: "bg-qc-teal/10",
  },
] as const;

// Percentage of each slice unlocked at each month. Keyed on the 4 deck slices.
// Public: 25% TGE + 6mo linear. Staking: 48mo emission. Team & Angel: 12mo
// cliff then 25% annually over 4 years (deck slide 15).
export const VESTING_SCHEDULE = [
  { month: 0, publicSale: 25, staking: 0, team: 0, angelInvestors: 0 },
  { month: 3, publicSale: 62.5, staking: 6.25, team: 0, angelInvestors: 0 },
  { month: 6, publicSale: 100, staking: 12.5, team: 0, angelInvestors: 0 },
  { month: 12, publicSale: 100, staking: 25, team: 25, angelInvestors: 25 },
  { month: 18, publicSale: 100, staking: 37.5, team: 25, angelInvestors: 25 },
  { month: 24, publicSale: 100, staking: 50, team: 50, angelInvestors: 50 },
  { month: 30, publicSale: 100, staking: 62.5, team: 50, angelInvestors: 50 },
  { month: 36, publicSale: 100, staking: 75, team: 75, angelInvestors: 75 },
  { month: 42, publicSale: 100, staking: 87.5, team: 75, angelInvestors: 75 },
  { month: 48, publicSale: 100, staking: 100, team: 100, angelInvestors: 100 },
] as const;

export const STAKING_TIERS = [
  { tier: "Bronze", minStake: "1,000 QRY", apr: 8, reward30d: "6.58 QRY", color: "#cd7f32" },
  { tier: "Silver", minStake: "10,000 QRY", apr: 12, reward30d: "98.63 QRY", color: "#94a3b8" },
  { tier: "Gold", minStake: "100,000 QRY", apr: 16, reward30d: "1,315.07 QRY", color: "#fbbf24" },
  { tier: "Diamond", minStake: "1,000,000 QRY", apr: 20, reward30d: "16,438.36 QRY", color: "#60a5fa" },
] as const;

export const REVENUE_STREAMS = [
  {
    title: "Transaction Fees",
    rate: "0.25%",
    description: "Applied to every on-chain transaction. Low enough to keep usage frictionless, high enough to sustain the network.",
    icon: "ArrowLeftRight",
    color: "#3b82f6",
  },
  {
    title: "Contract Deployment",
    rate: "Variable",
    description: "Fees for deploying smart contracts to the QVM. Scales with contract complexity. Partially burned to reduce supply.",
    icon: "FileCode",
    color: "#14b8a6",
  },
  {
    title: "Asset Tokenization",
    rate: "1%",
    description: "Commission on real-world asset tokenization events. Covers verification, fractionalization, and on-chain settlement.",
    icon: "Building",
    color: "#22c55e",
  },
] as const;

// ===== Team =====

export const TEAM = [
  { name: "Alec Arrambide", role: "Founder & CEO" },
  { name: "Tanner Hanks", role: "COO" },
  { name: "Gabby Parsons", role: "CMO" },
  { name: "David Aneo", role: "Lead Web Developer / Graphic Designer" },
  { name: "Toyama Haruo", role: "Senior Full Stack Developer" },
  { name: "John Wachi", role: "Full Stack Developer" },
] as const;

// ===== Roadmap =====

export type RoadmapStatus = "complete" | "in-progress" | "upcoming" | "future";

export interface RoadmapPhase {
  phase: number;
  title: string;
  status: RoadmapStatus;
  items: string[];
}

// Roadmap mirrors the live site at quarrychain.network (scraped 2026-04-19).
// If Sanity has roadmapPhase docs, they override this fallback.
export const ROADMAP: RoadmapPhase[] = [
  {
    phase: 1,
    title: "Foundation & Network Launch",
    status: "complete",
    items: [
      "QuarryChain Seed Round",
      "QuarryChain Testnet Development & Launch",
      "Core Team Expansion",
    ],
  },
  {
    phase: 2,
    title: "Ecosystem Infrastructure & Private Sale",
    status: "in-progress",
    items: [
      "Development of QVM (Quarry Virtual Machine)",
      "QRC-20 Development & Testing",
      "Development of QuarrySwap & QuarryWallet",
      "Development of No-Code API",
    ],
  },
  {
    phase: 3,
    title: "Network Maturation & Public Entry",
    status: "upcoming",
    items: [
      "QuarryChain Mainnet Development",
      "QuarryChain DPoS Network Launch",
      "Quarry (QRY) Public Sale (ICO)",
      "First Delegate Voting Round",
      "QRC-20 & QuarryWallet Desktop Launch",
      "Development of QuarryWallet Mobile App",
    ],
  },
  {
    phase: 4,
    title: "Global Ecosystem & Marketplace",
    status: "future",
    items: [
      "QuarrySwap's Real-World Marketplace",
      "QuarryWallet Mobile App Launch",
      "Ecosystem Expansion (DApps)",
      "No-Code API Global Rollout",
    ],
  },
];

// ===== Ecosystem =====

export const ECOSYSTEM = [
  {
    name: "QuarryWallet",
    tagline: "Non-custodial wallet for QRY and QRC-20 tokens.",
    icon: "Wallet",
    href: "/ecosystem/quarrywallet",
  },
  {
    name: "QuarrySwap",
    tagline: "Swap, stake, farm. Fully decentralized.",
    icon: "ArrowLeftRight",
    href: "/ecosystem/quarryswap",
  },
  {
    name: "QuarryScan",
    tagline: "Block explorer. Every transaction, every contract.",
    icon: "Search",
    href: "https://explorer.testnet.quarrychain.network",
    external: true,
  },
  {
    name: "QVM",
    tagline: "EVM-compatible virtual machine. Solidity-native.",
    icon: "Cpu",
    href: "/developers",
  },
  {
    name: "QRC-20 Tokens",
    tagline: "Launch tokens with the standard developers already know.",
    icon: "Coins",
    href: "/technology",
  },
  {
    name: "Asset Tokenization",
    tagline: "Bridge physical assets to the blockchain. Trade 24/7.",
    icon: "Building",
    href: "/ecosystem/asset-tokenization",
  },
] as const;

// ===== Stats (fallback values) =====

export const FALLBACK_STATS = {
  totalBlocks: 1_245_678,
  totalTransactions: 8_934_521,
  activeAddresses: 45_230,
  avgBlockTime: "3.0s",
} as const;

// ===== Navigation =====

export const NAV_LINKS = [
  { label: "Technology", href: "/technology" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Tokenomics", href: "/tokenomics" },
  { label: "ICO", href: "/ico" },
  { label: "Developers", href: "/developers" },
  { label: "Blog", href: "/blog" },
] as const;

// ===== Social Links =====

export const SOCIAL_LINKS = [
  { name: "X", href: "https://x.com/QuarryChain", icon: "Twitter" },
  { name: "Discord", href: "https://discord.gg/quarrychain", icon: "MessageCircle" },
  { name: "Telegram", href: "https://t.me/quarrychain", icon: "Send" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/alec-arrambide-91a7b321a/", icon: "Linkedin" },
  { name: "YouTube", href: "https://youtube.com/@quarrychain", icon: "Youtube" },
  { name: "GitHub", href: "https://github.com/QuarryLabsInc", icon: "Github" },
] as const;
