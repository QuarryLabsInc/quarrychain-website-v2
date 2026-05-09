# Build Plan

## Phase 1 — Homepage POC

### Setup & Foundation
- [x] Initialize Next.js 15 + TypeScript + Tailwind + pnpm
- [x] Configure Tailwind with custom dark theme colors/tokens
- [x] Set up fonts (Space Grotesk, Inter, JetBrains Mono via next/font)
- [x] Create globals.css with CSS custom properties
- [x] Install dependencies: motion, gsap, three, @types/three, recharts, lucide-react, swr
- [x] Copy in Aceternity UI components needed (blur-fade, spotlight, bento-grid, moving-border, timeline)
- [x] Copy in Magic UI components needed (number-ticker, animated-gradient-text, orbit)
- [x] Set up cn() utility and base shadcn config
- [x] Create layout.tsx with metadata, fonts, body classes

### Navigation
- [x] Build Navbar (fixed, backdrop-blur, logo + links + CTA)
- [x] Build MobileNav (hamburger + slide drawer)
- [x] Scroll-aware: subtle background opacity increase on scroll

### Hero Section
- [x] Build HexGrid.tsx Three.js component (hex wireframe mesh, wave deformation, mouse reactivity)
- [x] Dynamic import HexGrid with loading skeleton
- [x] Hero overlay: pill badge, headline, subheadline, two CTA buttons
- [x] Scroll indicator animation at bottom
- [x] Performance: lazy load, requestAnimationFrame throttle, dispose on unmount

### StatsBar (V2 — replaces ProblemSolution)
- [x] 5-column stat bar: TPS, Finality, Fees, Validators, EVM Compatible
- [x] NumberTicker animated count-up on scroll
- [x] Responsive: 3+2 layout on mobile, 5-col on desktop

### Key Features Bento Grid (V2 — updated)
- [x] Bento grid layout (asymmetric cards) — no section header
- [x] Tightened copy (max 2 sentences per card)
- [x] Spotlight/glow hover effect on each card
- [x] QuarrySwap card
- [x] Asset Tokenization card

### DeveloperCTA (V2 — NEW)
- [x] Two-column: copy left, code block right
- [x] Solidity code block with syntax highlighting
- [x] Copy-to-clipboard button
- [x] EVM compatibility badges
- [x] "Read the Docs" + "View on GitHub" CTAs

### Ecosystem Grid (V2 — updated)
- [x] Updated headline: "One chain. Everything you need."
- [x] Tightened taglines (one line max)
- [x] 2×3 card grid with spotlight effect

### GovernancePreview (V2 — NEW)
- [x] 27-node circular visualization with 3 active highlights
- [x] Slow rotation animation (respects reduced-motion)
- [x] Stats row: 6hr voting, 1 QRY minimum, 100% community-elected

### Live Network Stats
- [x] Blockscout API integration (SWR polling)
- [x] Stats banner: block height, total txns, addresses, block time
- [x] Animated number transitions on data refresh
- [x] Fallback static values if API unavailable

### Tokenomics (V2 — updated)
- [x] Fixed symbol QRC → QRY
- [x] Consolidated 9 slices → 5 slices
- [x] Animated donut chart (Recharts, dark themed)
- [x] Revenue model callout

### Roadmap
- [x] Timeline component with 4 phases
- [x] Scroll-triggered phase highlighting
- [x] Status indicators (complete, in progress, upcoming, future)

### Team
- [x] Abstract cards: name + role only
- [x] Staggered entrance animation
- [x] Minimal, clean layout

### CTA + Footer (V2 — updated)
- [x] CTA: "Start building on QuarryChain." (statement, not question)
- [x] CTAs: "Read the Docs" / "Join Discord"
- [x] Footer: removed tagline, just logo

### Polish & QA
- [x] Responsive testing (mobile, tablet, desktop)
- [x] prefers-reduced-motion fallbacks
- [x] Lighthouse audit (84 perf, 96 best practices)
- [x] OG image and meta tags
- [x] Favicon (SVG)
- [x] Vercel deployment config
- [x] All homepage buttons wired to real destinations
- [x] Social links updated (X, GitHub, LinkedIn confirmed)

## Phase 1.5 — V2 Overhaul (Completed 2026-04-10)
- [x] Removed ProblemSolution section from homepage
- [x] Removed HowDPoSWorks from homepage (kept file for /technology page)
- [x] Created StatsBar section
- [x] Created DeveloperCTA section with code block
- [x] Created GovernancePreview section with node visualization
- [x] Updated Features (removed header, tightened copy)
- [x] Updated Ecosystem (new headline, tightened taglines)
- [x] Updated Tokenomics (QRY fix, 5 slices)
- [x] Updated CTA (statement copy)
- [x] Updated Footer (removed tagline)
- [x] New section order in page.tsx

## Phase 2 — Subpages (Completed 2026-04-11)

### Shared Infrastructure
- [x] PageHero component (centered text + wireframe shape backdrop)
- [x] PageCTA component (reusable CTA footer)
- [x] WireframeShape component (5 geometries, 3-layer, 3-color)
- [x] Navbar moved to root layout (all pages)
- [x] Footer moved to root layout (all pages)
- [x] MobileNav updated for page routes
- [x] Nav links: Technology, Ecosystem, Developers, Blog
- [x] CTA button: "Start Building" → /developers

### /technology
- [x] DPoS timeline (4 steps, vertical with colored icons)
- [x] Consensus comparison grid (PoW vs PoS vs DPoS, animated counters)
- [x] QVM section with compatibility badges
- [x] Token standards (QRC-10 / QRC-20 cards)
- [x] Gradient text accents on section headlines
- [x] Torus knot wireframe hero (blue/red/green)

### /developers
- [x] Quick start (3 steps with colored icons)
- [x] Terminal typing animation (auto-types deploy commands)
- [x] Resources grid (6 cards, "Coming soon" badges)
- [x] EVM compatibility badge row
- [x] Gradient text accents
- [x] Octahedron wireframe hero (teal/green/red)

### /ecosystem
- [x] Hub page with 3D tilt cards (6 products)
- [x] /ecosystem/quarryswap — swap animation, yield stacking, fee structure
- [x] /ecosystem/quarrywallet — 4 feature cards with spotlight
- [x] Gradient text accents on headlines
- [x] Unique wireframe shapes per page

### /blog
- [x] MDX-based (gray-matter frontmatter)
- [x] 4 starter posts
- [x] PostCard with reading time
- [x] Blog post page with markdown rendering
- [x] Static generation via generateStaticParams
- [x] Icosahedron wireframe hero (red/blue/green)

### /whitepaper
- [x] Page counter animation (81 counts up)
- [x] Key highlights with numbered list
- [x] Table of contents with left border
- [x] Gradient text on counter and headlines
- [x] Tetrahedron wireframe hero (teal/blue/red)

### /privacy
- [x] Standard privacy policy text page
- [x] Proper heading hierarchy

### Color & Polish
- [x] Gradient text on key headlines across all subpages
- [x] Colored icon backgrounds per section
- [x] Brand colors (teal, blue, red, green) used in wireframe shapes
- [x] SectionGlow divider component

## Phase 3 — Enhancements

### /tokenomics (Completed 2026-04-13)
- [x] PageHero with sphere wireframe shape (purple/teal/blue)
- [x] Enhanced donut chart (larger, synced legend)
- [x] Allocation breakdown (5 SpotlightCards with descriptions, vesting pills)
- [x] Token utility section (5 use cases: gas, staking, rewards, deployment, tokenization)
- [x] Vesting timeline with progress bars
- [x] Supply schedule AreaChart (stacked cumulative over 48 months)
- [x] Staking rewards grid (4 tiers with APR + NumberTicker)
- [x] Revenue model (3 stream cards + deflationary callout)
- [x] Nav link added, Footer link added
- [x] New "sphere" ShapeType added to WireframeShape

### Sanity CMS Integration (Completed 2026-04-13)
- [x] Sanity schemas: blogPost (with cover image), teamMember, roadmapPhase
- [x] Sanity client with dual-mode data layer (Sanity if env configured, MDX fallback)
- [x] Blog pages updated to async with ISR (60s revalidation)
- [x] Portable Text renderer for rich content
- [x] Embedded Sanity Studio at /studio (fullscreen overlay, basePath set)
- [x] Revalidation webhook at /api/revalidate
- [x] Cover image support on blog index cards and post detail hero
- [x] Sanity project created (ID: owhgeovj), CORS configured for localhost + production
- [x] Vercel env vars configured (project ID, dataset, webhook secret)
- [x] All 4 existing MDX posts migrated into Sanity dataset
- [x] Lenis smooth-scroll disabled on /studio routes (was hijacking Studio scroll)
- [x] Lazy-loaded sanity.config.ts in Studio page (avoids build-time projectId validation)

### Brand Page Enhancements (Completed 2026-04-13)
- [x] Geometric Shapes section with all 6 wireframe geometries
- [x] DownloadableShape component — 1024x1024 PNG export with transparent background
- [x] Section assignment legend (which shape goes where)

### Git + Deploy Hygiene (Completed 2026-04-14)
- [x] Push Session 4 work to GitHub (was live on Vercel via CLI but never committed)
- [x] Confirm Vercel ↔ GitHub auto-deploy works (push triggers production build)
- [x] Set global git identity to GitHub username + noreply email

### Hero rebuild: scroll-reactive Goldberg hex-sphere (Completed 2026-04-16)
- [x] Replace Hero's `HexGrid` (2D shader hex pattern) with a new `ScrollSphere` component rendering a true 3D hex-tiled sphere (Goldberg polyhedron — the dual of a subdivided icosahedron: 12 pentagons + N hexagons, no gaps at rest)
- [x] Per-cell scroll-reactive displacement — each cell translates outward along its radial direction noise-modulated so cells spread apart unevenly at peak ("blooming" fragmentation)
- [x] Vertical color gradient (blue top → teal bottom) with red accent lerp on displaced cells
- [x] Subtle idle breathing (per-cell sin phase offset) + mouse-tilt + auto-rotate on the parent group
- [x] Restructure `Hero.tsx` as a tall (250vh) outer section with an inner `position: sticky` content div → expand-contract-hold triangle wave of progress across the pin, then unstick
- [x] `HOLD_FRACTION` final portion of the pin holds the contracted state before unstick
- [x] Two backdrop layers behind the hex-sphere (octahedron + dodecahedron wireframes) for ambient depth — same pattern as pre-rebuild
- [x] `getScrollProgress` prop on `ScrollSphere` lets the pinned hero own the scroll math; falls back to `window.scrollY` if standalone
- [x] Respects `prefers-reduced-motion`; proper dispose on unmount
- [x] Kept `HexGrid.tsx` on disk for quick revert if needed

### HexDivider accent between DeveloperCTA and Ecosystem (Completed 2026-04-16)
- [x] New `FloatingHex` component: extruded hex prism + sparse octahedron shell wrapping it, counter-rotating for depth parallax. Accepts color / opacity / backdrop props.
- [x] New `HexDivider` section component: positions a green `FloatingHex` at the right edge of the `max-w-7xl` container, uses negative vertical margin (`-my-24 md:-my-32`) to overlap into adjacent sections' padding → zero net page height added
- [x] Wired into `page.tsx` between `<DeveloperCTA />` and `<Ecosystem />`

### Wire Team + Roadmap to Sanity (Completed 2026-04-16)
- [x] Add `sanityGetTeamMembers` / `sanityGetRoadmapPhases` GROQ queries + types
- [x] Create `src/lib/team.ts` and `src/lib/roadmap.ts` dual-mode data layers (mirror `blog.ts`)
- [x] Convert `Team.tsx` and `Roadmap.tsx` from client to async server components
- [x] Also converted litepaper `§11 Roadmap` and `§12 Team` to async (they read the same data)
- [x] Added `revalidate = 60` to `src/app/page.tsx` AND `src/app/whitepaper/page.tsx`
- [x] Extended `/api/revalidate` webhook to dispatch by `_type` (blogPost / teamMember / roadmapPhase)
- [x] Seed script at `scripts/seed-sanity.mjs` (idempotent via deterministic `_id`s), `pnpm seed:sanity` runs it
- [x] Seeded Sanity dataset with current TEAM (6 members) and ROADMAP (4 phases)

### Litepaper — /whitepaper as on-site read experience (Completed 2026-04-14)
- Decision: /whitepaper page BECOMES the litepaper (read-on-site). NO PDF download button — the litepaper IS the experience.
- Source PDF lives at `docs/whitepaper-source.pdf` (81 pages, NOT served publicly) — reference material for content distillation only.
- Decision: **Static TSX**, not Sanity. A litepaper isn't blog content — it's a marketing asset that gets rewritten every few months. The big win for Sanity (non-dev edits) doesn't outweigh the friction of stuffing custom React (tokenomics chart, roadmap, team grid, wireframe shapes) through Portable Text.
- [x] Read source whitepaper from docs/whitepaper-source.pdf, distill into 13 litepaper sections
- [x] Build sticky TOC sidebar component with IntersectionObserver scroll-spy (`TocSidebar.tsx`)
- [x] Skip dedicated reading progress bar — global `ScrollProgress` already does this
- [x] Build mobile TOC drawer (floating button + slide-out sheet, `MobileTocDrawer.tsx`)
- [x] Build `LitepaperLayout` (grid: sticky TOC + content cell), `LitepaperSection` (consistent section wrapper with number/label/headline)
- [x] Single source of truth for section metadata: `src/lib/litepaper.ts`
- [x] Refactor `/tokenomics` — extract all 7 inline sections into `src/components/sections/tokenomics/` so both `/tokenomics` and the litepaper §9 can reuse them
- [x] Rewrite `/whitepaper/page.tsx` as litepaper layout, drop the page-counter animation
- [x] Write all 13 sections: intro, architecture, consensus (with TaPoS callout), QVM, economics (5K free daily bandwidth), token standards (QRC-10/20/1400/721), RWA tokenization, governance, tokenomics (reuses 4 shared components), ecosystem & dev tools, roadmap, team, ask
- [x] Build passes (`pnpm build` exit 0, 19 routes, /whitepaper static)
- Future: invite the brand team to edit the litepaper directly via PRs once the structure is locked in.

### Session 9 Tweaks — content/data fixes + page restructure (Completed 2026-04-19)
**Tier 1 — copy/data scrubs:**
- [x] Strip "6-hour voting" specificity sitewide → "time-based voting" (Features, GovernancePreview, /technology DPoS step, /tokenomics staking body, /blog what-is-dpos, whitepaper §03+§08, content-copy.md, brand-voice-guidelines.md)
- [x] GovernancePreview stat #1 swapped from `{ value: 6, suffix: "hr" }` NumberTicker to static `{ display: "Time-Based", label: "Voting model" }`
- [x] Drop "Coin" from QRY naming (Tokenomics.tsx, /tokenomics page hero, litepaper.ts §09 title, content-copy.md)
- [x] Swap `TOKENOMICS.allocation` from 5 → 9 slices (30/20/20/10/5/5/5/2.5/2.5 from whitepaper PDF)
- [x] Expand `TOKENOMICS_DETAILS` to 9 entries (vesting for 4 new slices inferred — flagged in comment)
- [x] Swap `ROADMAP` to live-site scraped phases + re-seed Sanity dataset (Foundation & Network Launch / Ecosystem Infrastructure & Private Sale / Network Maturation & Public Entry / Global Ecosystem & Marketplace)
- [x] Remove HexDivider from homepage (component files kept on disk)

**Tier 3 — page restructure:**
- [x] Move QVM Architecture section from /technology → /developers (replaces old generic "EVM Compatibility" section)
- [x] Merge QVM badge lists: EVM Compatible, Solidity, Web3.js, Ethers.js, MetaMask, Hardhat, Remix, Truffle, OpenZeppelin
- [x] Remove QVM section + BADGES const from /technology
- [x] Create `/ecosystem/asset-tokenization` page (simplified copy distilled from whitepaper §07-rwa)
- [x] Icosahedron hero (green/purple/blue) + 5 asset categories + 4-step process + 6 benefits
- [x] Standardize section max-width to `max-w-5xl` across page (alignment fix after user flag)
- [x] Wire /ecosystem hub + homepage Ecosystem constants: QVM href → /developers, Asset Tokenization href → /ecosystem/asset-tokenization (no more "Coming soon")
- [x] Add `Product` type annotation on /ecosystem hub PRODUCTS array
- [x] Add `NoCodeSection.tsx` component — full dark-mode reskin of QuarrySwap Token Generator with window chrome, app header, wizard form (Name/Symbol/Supply/Type/Badge Permissions) + Deployment Preview panel + 5-step progress bar
- [x] Wire NoCodeSection into /developers between Terminal Animation and Resources
- [x] Commit `docs/no-code-dapp-starter-prompt.md` — bootstrap prompt for the separate No-Code DApp repo

**Sanity ops:**
- [x] Generate + use + remove session-scoped write token for re-seed
- [ ] User to revoke `seed-script` token at https://sanity.io/manage/project/owhgeovj/api/tokens

### Brand Style Guide PDF — redesign (Flagged 2026-04-14)
- Current `public/QuarryChain_Brand_Style_Guide.pdf` is bad and doesn't match the website aesthetic
- Last attempt was commit `120e40f` ("style: redesign brand PDF to match website dark theme") — apparently still off
- [ ] Redesign brand PDF from scratch using actual brand colors/fonts/wireframe shapes from /brand page
- [ ] Match the dark-mode site aesthetic: bg #08080f, Space Grotesk display, JetBrains Mono labels, teal/blue/red/green accents
- [ ] Use the same wireframe geometric shapes as the /brand page Geometric Shapes section

### Remaining
- [ ] Light mode toggle
- [ ] Real Discord/Telegram/YouTube handles (currently placeholder patterns)
- [x] Whitepaper PDF as content source at docs/whitepaper-source.pdf (added 2026-04-14, 81 pages, NOT served publicly — litepaper has no download button)
- [ ] Invite team members to Sanity Studio (Editor role for marketing)

### Session 11 — QRY ICO teaser + tokenomics swap + "Shasta" strip (Completed 2026-04-21)

**Context:** user dropped the `ico-research-2026-04-21.pdf` + `quarrychain-pitch-deck-2026.pdf` into the chat. Together they resolved the Session 10 intake for QRY ICO page + tokenomics swap. One direct instruction from Alec: remove "Shasta" sitewide.

**Shipped:**
- [x] Stripped "Shasta" from [10-ecosystem.tsx](src/app/whitepaper/sections/10-ecosystem.tsx) (line 44 DEV_TOOLS body + lines 132-141 two-networks callout) and [13-ask.tsx](src/app/whitepaper/sections/13-ask.tsx) (lines 29, 35) — 4 edits, zero Shasta hits remaining on `/whitepaper` HTML. Historical `changelog.md` references left alone.
- [x] Copied both source PDFs into `docs/`: `ico-research-2026-04-21.pdf` (28 pages, strategy) + `quarrychain-pitch-deck-2026.pdf` (18 pages, Alec's investor deck).
- [x] Wrote [docs/ico-research-summary.md](docs/ico-research-summary.md) — distilled strategy doc covering legal posture, KYC (Sumsub), chains (Base + Arbitrum omnichain via LayerZero V2 OFT), payment tokens, allocation mechanic (Priority → Lottery → Overflow), vesting, testnet utility per Alec's Phase 2/3. Flags one open contradiction: **deck says Seed is Reg CF, research PDF says Reg D 506(c)** — counsel-dependent decision.
- [x] Swapped `TOKENOMICS.allocation` from the Session 9 9-slice whitepaper breakdown to the **deck's 4-slice breakdown**: Public Sale 50% / 100M · Staking & Farming 20% / 40M · Team 20% / 40M · Angel Investors 10% / 20M. Added `publicPrice: 0.5` constant.
- [x] Rewrote `TOKENOMICS_DETAILS` as 4 entries with per-slice vesting (Public 25% TGE + 6mo linear · Staking 48mo emission · Team 12mo cliff + 4yr 25%/yr · Angel 4yr 25%/yr).
- [x] Rewrote `VESTING_SCHEDULE` unlock-% columns to match the 4 slices (dropped `ecosystem` + `privateRound` columns, added `angelInvestors`).
- [x] Updated [SupplySchedule.tsx](src/components/sections/tokenomics/SupplySchedule.tsx) scale factors to the new slice sizes + 4-series chart (dropped Private purple series, Team now green, Angel Investors new red).
- [x] Built `/ico` top-level teaser page ([src/app/ico/page.tsx](src/app/ico/page.tsx)):
  - PageHero with dodecahedron wireframe (amber/blue/teal) — first use of that shape
  - Two-round comparison cards (Seed $0.25 vs Public $0.50) with allocation / raise cap / vesting / eligibility / chain & payment
  - 4-step flow (Registration 14d → Priority 24h → Lottery 48h → Overflow FCFS)
  - Wallets + chains strip (MetaMask/WalletConnect/Coinbase/Rainbow/Rabby · Base+Arbitrum omnichain via LayerZero V2)
  - Compliance grid (KYC gated · Reg-compliant · Geographically restricted · Cleanliness audit trail) + counsel disclaimer
  - "Buy today. Use tomorrow." testnet-utility section + Instant-Stake bonus callout (10% QRY bonus + Founding Validator badge for locking liquid 25% for +6mo)
  - 6-item FAQ hedged on the Reg CF vs Reg D question
  - PageCTA to Discord + litepaper
- [x] Added `{ label: "ICO", href: "/ico" }` to `NAV_LINKS` (between Tokenomics and Developers).
- [x] Added ICO link to Footer Technology column + fixed stale Asset Tokenization footer link (`/ecosystem` → `/ecosystem/asset-tokenization`) + fixed QVM footer link (`/technology` → `/developers`, carryover from Session 9 restructure).
- [x] Wrote [docs/qry-ico-starter-prompt.md](docs/qry-ico-starter-prompt.md) — bootstrap prompt for the separate `quarrychain-ico` functional launchpad repo. Matches `no-code-dapp-starter-prompt.md` format. Covers stack (Next.js + wagmi + RainbowKit + Sumsub + LayerZero V2 + Supabase + Chainlink VRF + Chainalysis/TRM), project structure, design tokens, security/compliance rules (geoblock in middleware, KYC before purchase, no custody, treasury shield), 7-phase build plan, and slash commands.

**Verified via Claude Preview (no errors):**
- `/ico` renders — hero + two-round cards + flow + compliance + testnet utility + FAQ all structured correctly
- `/tokenomics` still renders with new 4-slice legend (confirmed exact strings: "Public Sale 50%", "Staking & Farming 20%", "Team 20%", "Angel Investors 10%")
- Homepage nav shows "ICO" between Tokenomics and Developers
- `/whitepaper` HTML has zero "Shasta" matches

### Session 11 — Homepage hero ICO touchpoints (Completed 2026-04-21)
Added after user feedback that `/ico` existed but had no direct CTA from the homepage. Three touchpoints now visible on first page load:
- [x] Pulsing teal pill above the headline: "● QRY ICO · Registration opens soon →" → `/ico`
- [x] Primary hero CTA swapped from "Read Whitepaper" → "View the ICO" (links to `/ico`)
- [x] Secondary CTA renamed "Read Whitepaper" → "Read the Litepaper" → `/whitepaper` (matches actual doc type)
- [x] Dropped "Explore Testnet" CTA from hero — still discoverable via `/developers` + `/ecosystem`
- Nav link + Footer column link from the earlier batch remain in place

### Session 11 — still open after this batch
- [ ] **Resolve Reg CF vs Reg D 506(c) Seed posture** (deck vs research PDF contradiction) — blocks US-retail inclusion decision and final geoblock list for the separate launchpad repo. Ask Alec.
- [ ] **Flag WP vs investor-deck inconsistencies beyond tokenomics** — user-flagged, do not execute unprompted. Tokenomics has already been reconciled; remaining areas to audit: market-size claims (deck cites $16T by 2030 · $80B DApp 2025 · $232B tokenization 2030 — none of these are in the current litepaper); problem-statement framing (deck emphasizes environmental cost + PoS centralization, litepaper §03 Consensus doesn't lean on that angle); deck slide 10 QuarrySwap "AI-based automated smart contract auditing" as a feature (referenced in content-copy but not in litepaper §10 tools list); deck revenue model exactly matches litepaper (0.25% tx / deploy fees / 1% tokenization) ✅; deck "Get quality, with quarry" tagline was explicitly dropped from site in Session 1/2.
- [x] **Commit the pitch deck + research PDF + starter prompt + /ico page + tokenomics swap + Shasta strip** — shipped as 4 commits (`8be3257` Shasta strip · `84b49c6` tokenomics+ico · `c0b3c5d` docs package · `75050e1` hero touchpoints) and pushed to `origin/main`. Vercel auto-deployed.

### Session 11 addendum — Ethereum mainnet chain correction (Completed 2026-04-22)
Alec clarified after the initial Session 11 wrap that QRY will launch as a **standard ERC-20 on Ethereum mainnet** for both rounds — not Base + Arbitrum via LayerZero V2 OFT as the research PDF recommended.
- [x] `/ico` page: Seed card chain → Ethereum, Public card chain → Ethereum, wallets strip + FAQ rewritten for single-chain
- [x] `docs/ico-research-summary.md`: "Deposit chain — Ethereum mainnet" section replaces the Base/Arbitrum section with an explicit supersession flag + institutional-legitimacy reasoning + gas-economics tradeoff
- [x] `docs/qry-ico-starter-prompt.md`: **full rewrite** — Foundry project under `contracts/`, single-chain wagmi config, NetworkGuard component, gas estimate in purchase modal, authoritative product spec inlined (tokenomics / rounds / vesting / geoblock / Miami Safeguard), all slash commands + rules files specified with file contents
- [x] New Alec open question: minimum contribution floor ($500–$1,000 per gas analysis) — needed before launchpad repo Phase 3
- [x] Shipped as commit `43caa49`; Vercel auto-deployed

### Session 10 intake — user-flagged priorities (2026-04-20) — mostly resolved in Session 11

**PRIORITY — QRY ICO page** — ✅ Session 11 delivered `/ico` as a teaser (marketing page in this repo). Functional launchpad product spec written to `docs/qry-ico-starter-prompt.md` for a separate `quarrychain-ico` repo. Route decision: `/ico` top-level.

**Tokenomics — swap back to investor deck values** — ✅ Session 11 swapped to the 4-slice deck breakdown. Supersedes Session 9's 9-slice WP revert.

**No-Code API litepaper section**
- [ ] Alec will provide the info; once received, add a section to `/whitepaper` (litepaper) covering the No-Code Token Generator — probably slots into §10 Ecosystem & Tools or a new dedicated section
- Blocked on Alec

**Logo integration sitewide**
- [ ] User has logo assets but they're fitted for light mode; waiting on designer to adapt for dark mode
- [ ] Once dark-mode assets arrive, integrate on QuarrySwap page + other relevant pages (see Tier 2 below)

### Tier 2 — asset drop-ins (blocked on designer/photo work)
- [x] QRY token logo — Alec sent dark-treatable SVG; recolored for dark mode + built reusable 3D `<QuarryToken />` component (Session 12). Currently wired only into the QuarrySwap swap-animation row. **Awaiting Alec's call on which body sections to place it in** — user has explicitly said "not in the hero."
- [ ] Team headshots to replace abstract cards

### Session 12 — QRY token logo: dark-mode reskin + 3D coin component + hero text bug fix (Completed 2026-05-08)

**Logo work:**
- [x] Optimized Alec's `Quarry-token-logo.svg` — stripped Adobe Illustrator's `<aipgf>` editing blob (5600+ lines of zstd/base64 → gone). Final file 250 lines / 24 KB (was 5875 lines / 434 KB).
- [x] Dark-mode color reskin in [public/quarry-token.svg](public/quarry-token.svg) — frame `st0–st4` darkened to a `#1c1e2b → #11131a` gunmetal palette; brand wedges (`st6/12` green, `st7/11` red, `st8/10` blue) kept exactly as Alec sent them per direct feedback ("keep the logo colors as they were from the beginning"); dark Q-letter detail (`st9/13`) preserved at original `#151514 / #3C3C3A`; chrome glint streaks (`st19`) faded to `rgba(255,255,255,0.06)` — they read as ambient instead of metallic.
- [x] Built [src/components/ui/QuarryToken.tsx](src/components/ui/QuarryToken.tsx) — true 3D coin via stacked CSS discs (between front/back SVG faces). Props: `size`, `depth` (default 14px), `edgeLayers` (7), `bodyInset` (7.5%, keeps stacked discs aligned with the actual SVG disc, not the bounding box). Animations: `spin` (perspective + rotateY), `glow` (radial pulse), `float` (gentle Y bob). All respect `prefers-reduced-motion`.
- [x] Added three keyframes to [globals.css](src/app/globals.css): `qry-spin`, `qry-pulse`, `qry-bob`.
- [x] Wired [QuarrySwap swap-animation row](src/app/ecosystem/quarryswap/page.tsx) — QRY token replaces the plain teal "QRY" text-circle on the left of the swap arrows. USDT placeholder circle on the right unchanged.
- [x] **Heroes reverted.** Initial integration put the token at 40% opacity behind /tokenomics + /ico headlines (replacing PageHero's wireframe sphere / dodecahedron). User feedback: "I would rather them live in sections." Both pages restored to their original PageHero. Token + component stay on disk waiting for Alec's section placements.

**Bug fix:**
- [x] Hero text race ("for What's Next" sometimes invisible, highlight-to-reveal). Diagnosed via DOM eval — all six [Hero.tsx](src/components/sections/Hero.tsx) `<TextReveal>` motion.spans stuck at initial state (`translateY(96px), opacity: 0`). Cause: `useInView({ once: true })` IntersectionObserver registered AFTER the element was already in view during initial paint — IntersectionObserver only fires on transitions, never sees out→in, so the animation never started. Selection rendering bypasses inline `opacity: 0`, which is why highlighting "revealed" the text. Fix: dropped useInView entirely from [text-reveal.tsx](src/components/ui/text-reveal.tsx) — TextReveal is only used in the hero (always in view on first paint), so the gate served no purpose. Animation now runs on mount unconditionally. Verified across 2 cache-busted reloads, all 6 words at `opacity: 1` both times.

**Open after Session 12:**
- [ ] **Logo placement** — user to identify which body sections should host the `<QuarryToken />`. Component + SVG ready, just need section placements. Pages to consider per Tier 2 build-plan: QuarrySwap (swap-animation token already wired), `/tokenomics` (anywhere not-hero), `/ico` (anywhere not-hero), homepage `<Tokenomics />` section, `<CTA />` background, possibly `/whitepaper` §09 tokenomics.
- [ ] **Uncommitted work** to be committed once placements land (see "Note for next session" in this file's changelog entry).

### Tier 4 — design lift
- [ ] Homepage ecosystem section rework: custom interconnected diagram + "View Ecosystem" CTA linking to /ecosystem
- [ ] Watch Demo video URL (TBD) + CTA on NoCodeSection

### Future — ICO Marketplace (distinct from QRY ICO page above)
- Note: the "ICO Marketplace" is a SEPARATE concept — a platform for discovering/investing in multiple ICO projects (seen at `94e3-...easysite.ai`). The priority QRY ICO page above is for QuarryChain's OWN token sale. Do not conflate.
- [ ] `/ecosystem/ico-marketplace` marketing page (same pattern as /ecosystem/quarryswap)
- [ ] Separate repo for the functional ICO Marketplace product (wallet, investment flows, KYC)

### Future — No-Code DApp functional product
- [ ] Spin up separate repo via `docs/no-code-dapp-starter-prompt.md`
- [ ] Wallet connect + wagmi/viem stack, token wizard flows, badge-based role system, dashboard, DeFi instruments

## Pending Data / Blockers
- Logo SVG refinement from client (dark-mode adaptation)
- Team headshots
- Watch Demo video URL
- Discord/Telegram/YouTube exact handles TBD
- Blockscout API availability on testnet TBD
- Public/stable beta URL for Token Generator (currently points at internal easysite URL)
