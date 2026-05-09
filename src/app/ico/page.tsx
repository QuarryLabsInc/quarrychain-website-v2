import {
  ShieldCheck,
  Clock,
  Dice3,
  Layers,
  Gauge,
  Coins,
  Wallet,
  Hexagon,
  Ticket,
  Trophy,
} from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageCTA from "@/components/layout/PageCTA";
import BlurFade from "@/components/ui/blur-fade";

export const metadata = {
  title: "QRY ICO — QuarryChain",
  description:
    "The Quarry (QRY) token sale. Seed at $0.25, public at $0.50. KYC-gated, Reg-compliant, geographically restricted. Join the waitlist.",
};

const ROUNDS = [
  {
    label: "Seed",
    badge: "50% discount",
    price: "$0.25",
    allocation: "20,000,000 QRY",
    raiseCap: "Up to $5M",
    vesting: "4-year vest · 25% unlock annually",
    eligibility: "Qualified investors only · regulatory posture finalizing with counsel",
    chain: "Ethereum · USDC",
    color: "#ef4444",
    gradientFrom: "from-qc-red/10",
    gradientTo: "to-qc-red/5",
    accent: "text-qc-red",
    border: "border-qc-red/30",
  },
  {
    label: "Public ICO",
    badge: "Main sale",
    price: "$0.50",
    allocation: "100,000,000 QRY",
    raiseCap: "Up to $50M",
    vesting: "25% at TGE · 75% over 6 months linear",
    eligibility: "Global retail + institutions · Reg S posture · US excluded",
    chain: "Ethereum · USDC, USDT, ETH",
    color: "#3b82f6",
    gradientFrom: "from-qc-blue/10",
    gradientTo: "to-qc-teal/5",
    accent: "text-qc-blue",
    border: "border-qc-blue/30",
  },
];

const FLOW = [
  {
    icon: ShieldCheck,
    n: "01",
    title: "Registration",
    duration: "14 days",
    body: "Complete KYC via Sumsub (ID + liveness + sanctions screening). Link your wallet. Qualify for your allocation tier.",
  },
  {
    icon: Trophy,
    n: "02",
    title: "Priority Round",
    duration: "24 hours",
    body: "Verified testnet users get a guaranteed $1,000 allocation. Rewards the people actually using the network — not bots or new wallets.",
  },
  {
    icon: Dice3,
    n: "03",
    title: "Lottery Round",
    duration: "48 hours",
    body: "VRF-selected winners from the general pool contribute their allocation. Fair, verifiable, bot-resistant — no gas wars.",
  },
  {
    icon: Ticket,
    n: "04",
    title: "Overflow",
    duration: "If needed",
    body: "Any remaining supply opens to public FCFS. Only triggered if the cap isn't hit in the Lottery — which should be rare.",
  },
];

const COMPLIANCE = [
  {
    icon: ShieldCheck,
    title: "KYC gated",
    body: "Sumsub verification — ID, liveness, proof of residency, sanctions screening. No shortcuts.",
  },
  {
    icon: Layers,
    title: "Reg-compliant",
    body: "Reg S global offering. Private round structured per counsel. Full legal disclosures on the sale portal.",
  },
  {
    icon: Hexagon,
    title: "Geographically restricted",
    body: "US (public sale), China, OFAC-sanctioned jurisdictions, and Ontario CA are hard-blocked at IP and wallet level.",
  },
  {
    icon: Gauge,
    title: "Cleanliness audit trail",
    body: "Real-time sanctions screening on every incoming wallet (Chainalysis / TRM). Treasury auto-converts to USDC.",
  },
];

const INSTANT_STAKE_BENEFITS = [
  "10% QRY bonus from the Ecosystem Reserve",
  "Founding Validator badge (reputation on-chain)",
  "Priority slot when mainnet validator elections open",
];

const FAQ = [
  {
    q: "Who can participate?",
    a: "Global retail and institutions in supported jurisdictions. The public round is Reg S and hard-blocks the United States, China, OFAC-sanctioned countries, and Ontario. The private round terms are being finalized with counsel — sign up for the waitlist and we'll notify you when eligibility is confirmed for your country.",
  },
  {
    q: "What's the difference between the two rounds?",
    a: "The Seed round (20M QRY @ $0.25, 50% discount) is for qualified investors and carries a 4-year vesting schedule. The Public ICO (100M QRY @ $0.50) is the main sale — 25% unlocks at TGE, the rest over 6 months linear.",
  },
  {
    q: "What tokens can I pay with?",
    a: "Both rounds settle on Ethereum mainnet as a standard ERC-20. Public ICO accepts USDC, USDT, or ETH. Seed is USDC only. Expect a minimum contribution floor (likely $500-$1,000) since Ethereum mainnet gas fees matter at small ticket sizes.",
  },
  {
    q: "How does KYC work?",
    a: "We use Sumsub — the same KYC provider most major exchanges use. It's about 5–10 minutes: photo of your ID, a short liveness selfie, proof of residency, and automated sanctions screening. You only do it once.",
  },
  {
    q: "Can I buy a bigger allocation by contributing more?",
    a: "Not during the Priority or Lottery rounds — those use fixed allocations (ticket-style) to prevent whales from squeezing out retail. If there's supply left in the Overflow phase, it opens to FCFS.",
  },
  {
    q: "When do I receive my QRY?",
    a: "Public ICO: 25% immediately at TGE, the remainder over 6 months linear. Seed: 4-year vest with 25% unlocking each year. Public-round buyers who opt into Instant-Stake receive a 10% bonus + a Founding Validator badge in exchange for locking their liquid 25% for an extra 6 months.",
  },
];

export default function ICOPage() {
  return (
    <div className="pt-16">
      <PageHero
        label="Token Sale"
        headline="The Quarry (QRY) ICO."
        subheadline="Two rounds. One token. Buy into the network you're going to use. Registration opens soon — join the waitlist to be notified."
        shape="dodecahedron"
        shapeColors={{
          primary: "#fbbf24",
          secondary: "#3b82f6",
          tertiary: "#14b8a6",
        }}
        ctas={[
          {
            text: "Register for ICO",
            href: "https://quarrychain-4pzmvo3c8-garvonious-uis-projects.vercel.app/",
            primary: true,
          },
        ]}
      />

      {/* Rounds */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">
              Two rounds
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
              Seed first.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-red to-qc-blue">
                Public second.
              </span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-3xl mb-16">
              The Seed gets early supporters in at $0.25 with a multi-year vest.
              The Public gives the rest of the world a shot at $0.50 — the
              network&apos;s first day of price discovery.
            </p>
          </BlurFade>

          <div className="grid md:grid-cols-2 gap-6">
            {ROUNDS.map((r, i) => (
              <BlurFade key={r.label} delay={0.05 + i * 0.05}>
                <div
                  className={`rounded-xl bg-gradient-to-br ${r.gradientFrom} ${r.gradientTo} border ${r.border} p-8 h-full flex flex-col`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p
                        className={`text-xs uppercase tracking-widest font-mono mb-1 ${r.accent}`}
                      >
                        {r.badge}
                      </p>
                      <h3 className="text-2xl font-bold font-display text-text-primary">
                        {r.label}
                      </h3>
                    </div>
                    <p
                      className="text-4xl font-bold font-display"
                      style={{ color: r.color }}
                    >
                      {r.price}
                    </p>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-1">
                        Allocation
                      </p>
                      <p className="text-base text-text-primary font-mono">
                        {r.allocation}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-1">
                        Raise cap
                      </p>
                      <p className="text-base text-text-primary font-mono">
                        {r.raiseCap}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-1">
                        Vesting
                      </p>
                      <p className="text-sm text-text-secondary">{r.vesting}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-1">
                        Eligibility
                      </p>
                      <p className="text-sm text-text-secondary">
                        {r.eligibility}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-1">
                        Chain & payment
                      </p>
                      <p className="text-sm text-text-secondary font-mono">
                        {r.chain}
                      </p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-blue font-mono mb-4">
              The Flow
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Register. Get priority. Or{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-blue to-qc-teal">
                get lucky.
              </span>
            </h2>
            <p className="text-text-secondary text-lg mb-16 max-w-2xl">
              No gas wars. No bot sniping. Allocations are distributed through
              a hybrid priority + lottery mechanic that rewards real users.
            </p>
          </BlurFade>

          <div className="space-y-4">
            {FLOW.map((step, i) => {
              const Icon = step.icon;
              return (
                <BlurFade key={step.n} delay={0.05 + i * 0.05}>
                  <div className="rounded-xl bg-bg-secondary border border-white/5 p-6 flex gap-6 items-start">
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-3xl font-bold font-display text-qc-blue leading-none pt-1 font-mono">
                        {step.n}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-qc-blue/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-qc-blue" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 flex-wrap mb-2">
                        <h3 className="text-lg font-bold font-display text-text-primary">
                          {step.title}
                        </h3>
                        <span className="text-xs uppercase tracking-widest text-text-muted font-mono">
                          <Clock className="inline w-3 h-3 mr-1 -translate-y-0.5" />
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-text-secondary">{step.body}</p>
                    </div>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chains + tokens strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <div className="rounded-xl bg-bg-secondary border border-white/5 p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Wallet className="w-5 h-5 text-qc-teal" />
                    <h3 className="text-base font-bold font-display text-text-primary">
                      Wallets supported
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    MetaMask, WalletConnect, Coinbase Wallet, Rainbow, Rabby.
                    Any EVM-compatible wallet. Your QRY ERC-20 works on the
                    QuarryChain testnet the moment you buy — no bridging
                    required.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Coins className="w-5 h-5 text-qc-blue" />
                    <h3 className="text-base font-bold font-display text-text-primary">
                      Chains & payment
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Standard ERC-20 on Ethereum mainnet. Seed round accepts
                    USDC only; Public ICO accepts USDC, USDT, or ETH. Testnet
                    QRY is airdropped to your wallet automatically after
                    purchase — no bridging required.
                  </p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-red font-mono mb-4">
              Compliance
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-red to-qc-blue">
                regulators.
              </span>
            </h2>
            <p className="text-text-secondary text-lg mb-16 max-w-2xl">
              The 2026 regulatory environment is strict — and that&apos;s good
              for buyers. This sale is built on the same rails used by top-tier
              launches.
            </p>
          </BlurFade>

          <div className="grid sm:grid-cols-2 gap-4">
            {COMPLIANCE.map((c, i) => {
              const Icon = c.icon;
              return (
                <BlurFade key={c.title} delay={0.05 + i * 0.05}>
                  <div className="rounded-xl bg-bg-secondary border border-white/5 p-6 h-full">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-4 h-4 text-qc-red" />
                      <h3 className="text-base font-bold font-display text-text-primary">
                        {c.title}
                      </h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                </BlurFade>
              );
            })}
          </div>

          <BlurFade delay={0.3}>
            <p className="text-xs text-text-muted font-mono mt-8 italic">
              The final eligible-countries list is subject to verification by
              QuarryLabs legal counsel.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Testnet utility + Instant-Stake */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-green font-mono mb-4">
              Buy today. Use tomorrow.
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Your QRY works{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-green to-qc-teal">
                the day you get it.
              </span>
            </h2>
            <p className="text-text-secondary text-lg max-w-3xl mb-12">
              QRY-ERC20 is the native token connecting to the QuarryChain
              testnet. The moment you buy, you can use your tokens there — try
              QuarrySwap, deploy on the QVM, and get mainnet-ready. Validator
              elections and governance voting open with mainnet (Phase 3). ICO
              participants get priority access when they do.
            </p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className="rounded-xl bg-gradient-to-br from-qc-green/10 to-qc-teal/5 border border-qc-green/30 p-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-qc-green/10 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5 text-qc-green" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-qc-green font-mono mb-2">
                    Instant-Stake Bonus
                  </p>
                  <h3 className="text-xl font-bold font-display text-text-primary mb-3">
                    Lock your liquid 25% for six more months. Become a Founding
                    Validator.
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    Public ICO buyers who opt into Instant-Stake at TGE lock
                    their 25% liquid allocation for an additional six months in
                    exchange for:
                  </p>
                  <ul className="space-y-2">
                    {INSTANT_STAKE_BENEFITS.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-3 text-sm text-text-secondary"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-qc-green shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">
              Questions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16">
              Frequently{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">
                asked.
              </span>
            </h2>
          </BlurFade>

          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <BlurFade key={item.q} delay={0.05 + i * 0.03}>
                <details className="group rounded-xl bg-bg-secondary border border-white/5 p-6 open:border-qc-teal/30 transition-colors">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                    <h3 className="text-base font-bold font-display text-text-primary">
                      {item.q}
                    </h3>
                    <span className="text-qc-teal text-2xl font-light leading-none shrink-0 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-sm text-text-secondary leading-relaxed mt-4">
                    {item.a}
                  </p>
                </details>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        headline="Reserve your spot."
        ctas={[
          { text: "Join Discord for updates", href: "https://discord.gg/quarrychain", primary: true },
          { text: "Read the Litepaper", href: "/whitepaper" },
        ]}
      />
    </div>
  );
}
