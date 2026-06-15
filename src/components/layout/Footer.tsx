import { SOCIAL_LINKS } from "@/lib/constants";

const FOOTER_COLUMNS = [
  {
    title: "Technology",
    links: [
      { label: "DPoS Consensus", href: "/technology" },
      { label: "QVM", href: "/developers" },
      { label: "QRC-20 Standard", href: "/technology" },
      { label: "Tokenomics", href: "/tokenomics" },
      { label: "ICO", href: "/ico" },
      { label: "Whitepaper", href: "/whitepaper" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { label: "QuarrySwap", href: "/ecosystem/quarryswap" },
      { label: "QuarryWallet", href: "/ecosystem/quarrywallet" },
      { label: "QuarryScan", href: "https://explorer.testnet.quarrychain.network", external: true },
      { label: "Asset Tokenization", href: "/ecosystem/asset-tokenization" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "https://discord.gg/quarrychain", external: true },
      { label: "Telegram", href: "https://t.me/quarrychain", external: true },
      { label: "X (Twitter)", href: "https://x.com/QuarryChain", external: true },
      { label: "Blog", href: "/blog" },
      { label: "Brand Guidelines", href: "/brand" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2.5">
              <img
                src="/logo-hero.png"
                alt="QuarryChain"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold font-display">
                <span className="text-qc-blue">Quarry</span>
                <span className="text-text-primary">Chain</span>
              </span>
            </a>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-text-primary mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} QuarryChain. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-secondary transition-colors"
                aria-label={social.name}
              >
                <span className="text-xs">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
