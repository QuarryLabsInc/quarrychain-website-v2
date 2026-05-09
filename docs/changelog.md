# Changelog

## 2026-05-09 — Session 14: QRY token placements + hero text fixes + ICO register button

### What was built

Four thrusts: token placed in the homepage donut chart and /tokenomics hero, hero text bugs fixed permanently, ICO register button wired, and the Token Generator beta URL updated.

#### QRY token in homepage Tokenomics donut
- Replaced the static "200M / QRY Total" center text with `<QuarryToken size={150} glow={false} />` rocking in the donut hole.
- Added a floating pill label (absolute top-0 centered) that fades in on slice/legend hover showing `name · token count · percentage` in the slice's accent color. Fades out when nothing is hovered.
- `data` array in `Tokenomics.tsx` augmented with `tokens` field pulled from `TOKENOMICS_DETAILS[i]?.tokens` (index-matched).

#### QRY token in /tokenomics page hero
- Added `showTokenInHeadline?: boolean` prop to `PageHero`. When true, wraps the headline in an `inline-flex items-center justify-center gap-3` span with `<QuarryToken size={72} glow={false} />` to the left.
- `PageHero` imports `QuarryToken` directly (already `"use client"`).
- `/tokenomics/page.tsx` passes `showTokenInHeadline` to the `PageHero` call.
- Size iterated 56 → 72 per user feedback ("make it a little larger").

#### Hero text fixes (two root causes)
- **BlurFade `useInView` race** — all above-fold `BlurFade` usages in `Hero.tsx` (pill, subheadline, CTAs) stayed at `opacity: 0` because IntersectionObserver registered after the element was already in viewport and never saw an out→in transition. Added `forceAnimate?: boolean` to `blur-fade.tsx` that bypasses the observer entirely (`const inView = forceAnimate || inViewFromObserver`). All hero BlurFades now pass `forceAnimate`.
- **"for What's Next" gradient words disappearing on scroll-back** — `TextReveal` motion.spans (with `y` transforms) were nested inside the `bg-clip-text text-transparent` parent. Descendant transforms create a stacking context that breaks the gradient mask, especially after a compositor invalidation on scroll. Fix per CLAUDE.md rule: replaced with a single `motion.span` that carries both the gradient classes AND the transform (`initial={{ opacity: 0, y: 8 }}` → `animate={{ opacity: 1, y: 0 }}`). Transform and clip on the same element = no conflict.
- **Block-element gap** — the `BlurFade` (div) wrapper around the gradient span was creating a block-level break inside the `h1`, pushing "for What's Next" down from "Built" with extra vertical space. Fixed by switching to `motion.span` (inline-block), which flows naturally within the headline text.

#### /ico page — Register button
- Added `ctas` prop to the `/ico` `PageHero` call: `{ text: "Register for ICO", href: "https://quarrychain-4pzmvo3c8-garvonious-uis-projects.vercel.app/", primary: true }`.
- Button renders below the subheadline using the existing primary CTA style.

#### NoCodeSection beta URL
- "Try the Beta" href updated from the internal `easysite.ai` URL to `https://qc-token-gen.vercel.app/`.

### Decisions
- **Token in donut hole over center text.** The "200M / QRY Total" label was redundant (same info in the stat cards below). The rocking coin gives the chart a visual anchor and reinforces brand identity without adding noise.
- **`forceAnimate` over fixing the root IntersectionObserver race.** The real fix for above-fold content is to skip the observer entirely — there's no meaningful "is it in view?" check when the element is always visible on first paint. `forceAnimate` is explicit about intent, doesn't change behavior for below-fold BlurFades, and is easy to audit.
- **`motion.span` over `BlurFade` for gradient text.** BlurFade renders a `div`. Even with `className="inline"`, a div breaks the inline text flow of the h1. `motion.span` with `inline-block` stays in flow. The gradient + transform on the same element also eliminates the stacking context issue permanently.

### Files changed
- **Modified**: `src/components/sections/Tokenomics.tsx` (QuarryToken in hole, hover pill, tokens data field)
- **Modified**: `src/components/layout/PageHero.tsx` (showTokenInHeadline prop + QuarryToken import)
- **Modified**: `src/app/tokenomics/page.tsx` (showTokenInHeadline on PageHero)
- **Modified**: `src/components/ui/blur-fade.tsx` (forceAnimate prop)
- **Modified**: `src/components/sections/Hero.tsx` (forceAnimate on BlurFades, motion.span gradient text)
- **Modified**: `src/app/ico/page.tsx` (Register for ICO CTA)
- **Modified**: `src/components/sections/NoCodeSection.tsx` (beta URL → qc-token-gen.vercel.app)
- **Modified**: `docs/build-plan.md`, `docs/changelog.md`

### Current status
- Phase 1 + 1.5 + 2 — ✅ complete
- Phase 3 — all prior sessions ✅ + **Session 14: token placements (donut + /tokenomics hero) ✅, hero text race + gradient fix ✅, ICO register button ✅, beta URL updated ✅**
- Remaining: brand PDF redesign · light-mode toggle · real social handles · Sanity Studio team invites · Tier 2 (more token placements TBD by user, team headshots) · Tier 4 (ecosystem diagram, watch-demo URL) · ICO Marketplace future · separate repos (No-Code DApp, quarrychain-ico launchpad) · WP vs deck inconsistency audit.
- Live on `quarrychain-web.vercel.app` — push to `main` triggers auto-deploy.

## 2026-05-09 — Session 13: QRY 3D token rework (rocking coin) + brand Logo Files cleanup

### What was built

Two thrusts. (1) Reworked yesterday's `<QuarryToken />` from a full-rotation 3D coin into a gentle ±30° rocking flat SVG, dropping the stacked-disc thickness rig entirely. (2) Cleaned up the `/brand` page Logo Files section from 5 cards to 3, replacing the bare-icon "Icon + Wordmark" preview with the actual navbar treatment, and added a live `$QRY 3D Token` card.

#### Session bootstrapped by committing yesterday's uncommitted Session 12 work
- Yesterday's session left work uncommitted in a sibling worktree (`sweet-bell-6abc6c`): `public/quarry-token.svg`, `src/components/ui/QuarryToken.tsx`, `src/app/globals.css` keyframes, `src/app/ecosystem/quarryswap/page.tsx` call site, `src/components/ui/text-reveal.tsx` race fix, `CLAUDE.md` notes.
- Committed in two commits on the sibling branch and fast-forward pushed to `origin/main`:
  - `7708d87` feat: dark-mode QRY token SVG + 3D `<QuarryToken />` component + hero text race fix
  - `9f49d47` docs: log Session 12 (QRY token logo + 3D component + hero text race fix)
- Worktree (`fervent-bohr-a6e819`) fast-forwarded to `9f49d47` so today's work runs against the correct base.

#### `<QuarryToken />` v2 — rocking coin
- **User feedback on yesterday's coin (Session 12 carry-over)**: (1) "looks wider" straight-on because the original SVG art is drawn at a baked-in 3/4 perspective and the flat CSS discs behind it stick out past the asymmetric outline, (2) individual disc layers visible during 360° rotation, (3) too thick (depth 14), (4) wanted to see what a lighter/silver frame looks like.
- **First iteration** addressed (1)–(3) by tightening the disc rig: `depth 14 → 8`, `edgeLayers 7 → 12`, `bodyInset 7.5% → 12.5%`. Created `quarry-token-light.svg` as a frame-recolored variant (silver `#d8dce5 → #a0a4af`, chrome glints `st19` flipped from white to black at 6% opacity for legibility on light bg). Built a temp 4-up A/B comparison block on `/brand` showing dark/light × original/slim variants.
- **User reply**: "instead of making it rotate all the way around we have it start in its default state and then just have it rotate a little to the left and then a little to the right so we don't have to worry about the thickness and the layers."
- **Decision: drop the 3D thickness rig entirely.** Since the rocking motion never exposes the coin edge, the stacked-disc body, the back face, and the perspective-clipped front face all become dead weight. Component is now a single `<Image>` of the SVG inside a parent that animates `rotateY`.
- **Final params**: ±30° rock through center every 6s (after iterating from 12° → 20° → 30° on user feedback), `ease-in-out` so the motion pauses naturally at the extremes and crosses through the default 0° state on every half-cycle. New CSS custom properties `--qry-rock-angle` / `--qry-rock-angle-neg` let callers override per instance.
- **`frame` prop dropped, dark variant deleted.** User picked silver. `quarry-token-light.svg` renamed to canonical `quarry-token.svg`; old dark-frame file removed.
- **Component now**: ~70 lines (was ~140). Props: `size, rockAngle, rockDuration, glow, glowColor, float, rock, className, priority`. Defaults: 240/30/6/glow on/light frame.
- `globals.css` `qry-spin` keyframe replaced with `qry-rock`. `qry-pulse` and `qry-bob` kept.
- QuarrySwap swap-animation row call site updated `spinDuration={14}` → `rockDuration={5}`. Auto-picks up the silver frame since `frame` was the only thing it didn't pass.

#### Brand `/brand` Logo Files section cleanup
- Trimmed the LOGOS array of 5 entries to 2; replaced the uniform `.map()` render with explicit JSX for each of the 3 cards (each card is now visually distinct).
- Dropped: Wordmark (SVG) `/quarrychain_name.svg`, Original Mark `/logo-original.png`, Nav Icon `/nav_icon.png`.
- Card 1 "Icon + Wordmark" — preview renders icon + styled "QuarryChain" wordmark inline (Space Grotesk Bold, "Quarry" in `qc-blue`, "Chain" in `text-primary`). Replaces the previous bare-icon-with-mismatched-name approach.
- Card 2 renamed "Icon Only (SVG)" → "Icon", icon shown at `h-20 w-20`.
- Card 3 added — live `<QuarryToken size={104} glow={false} />` rocking inside the preview cell. Spotlight glow tinted teal to match the token's brand color. Download link → `/quarry-token.svg`.
- **Icon source corrected**: initially built the combined SVG with `logo-hero.png` (the navbar version with the green speech-bubble tail). User flagged it as wrong, pointed at `logo-original.png` (clean Q hex, no tail). Card 1 + Card 2 previews + the combined SVG asset all switched to `logo-original.png`. **Navbar and footer left on `logo-hero.png`** per user direction ("leave as is") — accepted mismatch between brand-asset version and live-site version.

#### New combined asset — `public/logo-icon-wordmark.svg`
- Self-contained 7.5KB SVG. Embeds `logo-original.png` as base64 in an `<image>` element, plus a `<text>` element with "Quarry" / "Chain" tspans.
- Space Grotesk Bold loaded via `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700')` inside `<defs><style>`. Falls back to system-ui / sans-serif when the SVG is opened in a tool that can't fetch external fonts.
- ViewBox 600×140. Icon at (20, 20) sized 100×100, text at (140, 92) at 72px font-size with -0.02em letter-spacing.
- Card 1 download link points to this file. First time the brand guide has had a working "icon + wordmark" download — previously it served just the bare icon despite the label.

#### Temp design-iteration block on `/brand`
- During the iteration we added a "Frame comparison" block at the top of `/brand` showing 4 then 2 variants of the token. Removed before commit.

### Decisions
- **Drop the 3D thickness rig once we committed to a non-rotating motion.** With ±30° rock, you only ever see the front face at varying angles. Stacked discs, back face, and perspective transforms are dead weight. Cleaner code, fewer DOM nodes, no banding/protrusion artifacts ever. Worth the one-way trip — full-rotation 3D coin is a different design that we can re-introduce as a separate component if needed.
- **Silver frame over dark gunmetal.** The dark frame `#1c1e2b → #11131a` was so close to page bg `#08080f` that the disc silhouette nearly disappeared, leaving only the brand wedges floating in space. Silver gives the artwork something to sit in. The Tier 2 "logo fitted for light mode → needs dark-mode adaptation" build-plan goal turns out to mean "use a light frame on a dark page is fine."
- **`logo-original.png` is the brand-asset icon, `logo-hero.png` stays as the navbar/footer icon.** User explicitly chose to keep the speech-bubble-tail variant in the live site even after the brand guide standardized on the cleaner version. Documented mismatch.
- **Combined SVG embeds the icon as base64 PNG, not redrawn vector paths.** We have no SVG of `logo-original.png`. Embedding the PNG keeps the file self-contained at 7.5KB. If we ever need a vector-perfect version, we'd have to redraw the icon as SVG paths.
- **Google Fonts `@import` for the wordmark text.** Works in browsers (where most users will view it). Tools without internet fall back to sans-serif. Acceptable for a brand-page download since the consumers are mostly working in browsers, Figma, or decks where Space Grotesk is either fetched or installable.
- **Don't re-render the wordmark as outlined SVG paths.** Would be vector-perfect everywhere but is tedious to generate by hand and locks the wordmark to one font weight. Defer until a real need surfaces.
- **Logo placements still TBD.** User said "I want to figure out where we are going to add the 3d logo. I'll lyk." Component + asset are production-ready; placements come in a follow-up session.

### Verification
- `pnpm tsc --noEmit` clean throughout.
- Lenis smooth-scroll prevents the Claude Preview tool from programmatically scrolling on `/brand` (custom anchor click + wheel events + scrollTop assignment all blocked — Lenis runs a RAF loop that resets scrollTop to its internal target). Verified the changes via direct HTML scrape (`curl localhost:3000/brand | grep`) instead: confirmed only "Icon + Wordmark", "Icon", "$QRY 3D Token" headings present, no traces of the dropped variants or temp comparison block.
- Loaded `/logo-icon-wordmark.svg` directly in the preview — renders correctly with the clean Q hex (no tail) + "Quarry"/"Chain" wordmark in Space Grotesk Bold.

### Files changed (this session)
- **New**: `public/logo-icon-wordmark.svg` (combined nav-style logo asset, 7.5KB).
- **Renamed/replaced**: `public/quarry-token.svg` (was dark-frame, now silver/light-frame — was previously `quarry-token-light.svg`).
- **Modified**: `src/components/ui/QuarryToken.tsx` (rewritten — flat SVG + rock animation, no thickness rig, no `frame` prop).
- **Modified**: `src/app/globals.css` (`qry-spin` → `qry-rock` keyframe, with `--qry-rock-angle` custom-property fallbacks).
- **Modified**: `src/app/ecosystem/quarryswap/page.tsx` (`spinDuration` → `rockDuration`).
- **Modified**: `src/app/brand/page.tsx` (Logo Files section rewritten: 5 cards → 3, explicit JSX, live `$QRY 3D Token` card).
- **Modified**: `docs/build-plan.md` (Session 13 entry, Tier 2 token logo updated).
- **Modified**: `docs/changelog.md` (this entry).

### Issues / gotchas to address
- **Logo placement still open.** User will identify which body sections should host the `<QuarryToken />`.
- **Brand-asset icon vs navbar icon mismatch is now documented and intentional** (clean vs tailed). Worth revisiting next time the navbar gets touched — same asset everywhere is the long-run answer.
- **`logo-original.png` is the new canonical brand icon** but it's still a PNG. Vector source would be ideal. Add to designer asks list.
- **Lenis blocks programmatic scroll in dev preview tools.** Use `curl + grep` for HTML verification or screenshot at the natural fold position. Future sessions: don't waste time fighting Lenis.

### Current status of overall build
- Phase 1 + 1.5 + 2 — ✅ complete
- Phase 3 — Tokenomics page ✅, Sanity CMS ✅, Brand page ✅, Litepaper ✅, Team+Roadmap → Sanity ✅, Hero hex-sphere ✅, Tier 1 copy/data scrubs ✅, QVM restructure ✅, /ecosystem/asset-tokenization ✅, No-Code section ✅, /ico teaser ✅, Tokenomics 4-slice deck swap ✅, Ethereum mainnet correction ✅, QRY token logo dark-mode + 3D component (Session 12) ✅, **3D coin rework as rocking flat SVG + brand Logo Files cleanup + combined icon+wordmark asset ✅ (this session)**.
- Remaining: brand PDF redesign · light-mode toggle · real social handles · Sanity Studio team invites · Tier 2 (logo placements pending user, team headshots) · Tier 4 (homepage ecosystem diagram, watch-demo URL) · ICO Marketplace future · separate No-Code DApp repo · separate `quarrychain-ico` launchpad repo · WP vs deck inconsistency audit.
- Live on `quarrychain-web.vercel.app` — push to `main` triggers auto-deploy.

## 2026-05-08 — Session 12: QRY token logo dark-mode reskin + 3D `<QuarryToken />` component + hero text race fix

### What was built

Alec sent a `Quarry-token-logo.svg` that was treated for a light-mode site and asked us to integrate it. Three substantive thrusts:

#### 1. Logo optimization + dark-mode recolor
- The source SVG was 434 KB / 5875 lines. ~96% of that was Adobe Illustrator's `<aipgf i:pgfEncoding="zstd/base64">` block — proprietary editing metadata browsers ignore. Stripped it. Also dropped the `<switch>`/`<foreignObject>` wrapper, the `xmlns:x|i|graph|...` Adobe namespaces, and the `<!DOCTYPE>`/entity declarations. Final: **250 lines, 24 KB**.
- Two iterations on color. **First pass** changed all ~14 colors at once: dark gunmetal frame, slightly-muted "brand-palette" wedges (red/blue/green snapped to our `#ef4444`/`#3b82f6`/`#22c55e`), and swapped the original near-black Q-letter detail to teal `#14b8a6` to give us 4-color brand presence. **Second pass after Alec feedback** ("keep the logo colors as they were from the beginning, just make the coin part itself a bit darker"): reverted wedges to the original `#00A900 / #00D500` greens, `#EE0000 / #FA2728` reds, `#0060E7 / #009EFF` blues, and the Q-letter detail back to `#151514 / #3C3C3A`. Only `st0–st4` (the silver/light coin frame) became the new dark `#1c1e2b → #11131a` palette. The radial chrome streaks (`st19`) faded to `rgba(255,255,255,0.06)` so they read as soft ambient glow instead of metallic shine.
- Final SVG lives at [public/quarry-token.svg](public/quarry-token.svg).

#### 2. `<QuarryToken />` component — true 3D coin
- [src/components/ui/QuarryToken.tsx](src/components/ui/QuarryToken.tsx) — first version was just an `<Image>` of the SVG inside a CSS `transform: rotateY(360deg)` spinner. It looked paper-thin at the 90° edge angle. User asked for "more 3D so it looks like an actual coin when it spins."
- Rebuilt as a 3D coin: front face (the SVG), back face (same SVG, mirror-flipped via `scaleX(-1)` so the Q-mark reads correctly from behind), and **N stacked metallic discs** between them (default 7) at increasing `translateZ` values. The discs are positioned via a `bodyInset` (default 7.5%) so they match the SVG's actual disc bounds, not the SVG's bounding-box corners — otherwise they peeked out at oblique rotations.
- At rotation 0°/180°: faces visible, stack hidden behind. At 30–60°: stack peeks past the foreshortened face as a visible "thickness." At ~90°: faces are edge-on (`backface-visibility: hidden` clips them) and you see the stack as a thin vertical strip — that's the coin's spine. Verified at rotation 82° in the preview.
- Three composable motion modes: `spin` (perspective + rotateY), `glow` (pulsing radial gradient at configurable color), `float` (gentle Y bob). All respect `prefers-reduced-motion`.
- New keyframes added to [globals.css](src/app/globals.css): `qry-spin`, `qry-pulse`, `qry-bob`.

#### 3. Hero text race fix (`text-reveal.tsx`)
- Bug report: "the 'For Whats Next' text in the hero disappears, and if you highlight it it reappears."
- Diagnosed by DOM eval — all six `<TextReveal>` motion.spans inside [Hero.tsx](src/components/sections/Hero.tsx) were stuck at `transform: translateY(96px), opacity: 0` (the initial state of the slide-up reveal). The `useInView({ once: true, margin: "-50px" })` gate never fired its callback.
- Root cause: IntersectionObserver only emits on entry/exit *transitions*. If the observer registers AFTER the element is already in the viewport (which is what happens during Next.js client-side hydration when the hero is at the top of the page), it never sees an out-→in transition. With `once: true` it can never recover. Result: the animation start never triggers, motion.spans stay at initial state, and `overflow: hidden` on the word wrapper clips the translated text out of view + the `opacity: 0` makes the rest invisible. The "highlight reveals it" tell was the giveaway: text-selection rendering paints its own color independent of inline `opacity: 0`.
- Why "for What's Next" looked uniquely missing while "The Blockchain Built" looked merely "still loading": same bug across all 6 words, but the gradient half is visually distinct enough to read as "missing" while a stuck slide on the dark/white half just looks like animation pending.
- Fix: dropped `useInView` from [text-reveal.tsx](src/components/ui/text-reveal.tsx) entirely — confirmed via grep that TextReveal is *only* used in `Hero.tsx`, which is always in view on first paint. The gate served no purpose. Animation now runs on mount unconditionally. Verified across 2 cache-busted reloads, all 6 words at `opacity: 1` both times.

### Decisions
- **Brand-wedge colors are sacred.** Alec's source values stay (`#00A900` greens, `#EE0000` reds, `#0060E7` blues, `#151514` dark Q-letter). Dark mode = recolor the FRAME only. Don't try to be clever and "snap to brand palette" — Alec specifically caught and reverted that.
- **Coin frame palette: gunmetal `#1c1e2b → #11131a`.** Slightly above page-bg `#08080f` so the disc reads as a recessed coin against the page, not a hole.
- **3D via stacked CSS discs, not Three.js extrusion.** The site already uses Three.js for the hero hex-sphere + WireframeShape backdrops, but adding a 4th Three.js scene per page just for a coin is heavy. CSS 3D with `transform-style: preserve-3d` + `perspective` + ~7 absolutely-positioned discs gets the job done with ~9 DOM nodes per coin and looks coin-like at oblique rotations. Three.js extrude stays available for a future "coin-as-page-hero showpiece" if we ever want one.
- **Token NOT in heroes.** Initial integration put the spinning token at 40% opacity behind the `/tokenomics`, `/ico`, and `/ecosystem/quarryswap` headlines. User feedback was direct: "I dont like them in the hero. I would rather them live in sections. I will identify the areas that we should put them." Both `/tokenomics` and `/ico` reverted to their original PageHero (sphere / dodecahedron). The QuarrySwap swap-animation token (in the body, not hero) was preserved.
- **Drop `useInView` over architecting around it.** The IntersectionObserver-init race is a real edge case but only matters for above-fold animations. TextReveal had only 2 callsites, both in the hero (above-fold). The simple fix — animate on mount — is more reliable than trying to detect "already in view at observer-registration time" and force-fire the callback. If TextReveal gets used below-fold later, we'd want to bring `useInView` back, but with a fallback path.

### Bugs found / issues to address
- **Pending: logo placement.** User will identify which body sections should host `<QuarryToken />`. Awaiting Alec's call before any further integration.
- **Recharts `width(-1)` warnings** persist on `SupplySchedule.tsx` (visible in Session 6 changelog too). Pre-existing, harmless — `ResponsiveContainer` has no measured size at SSG/initial-paint, the chart only renders client-side once `useInView` triggers. Logging only.
- **HMR didn't pick up the `text-reveal.tsx` change** initially — had to fully restart the dev server before the bug fix took effect. This is consistent with Next.js dev's known flakiness around HMR for `"use client"` components that are deeply nested in the tree. If you ever edit a client-component utility used inside a complex hero/section and the changes don't appear, restart `pnpm dev` instead of debugging the change.

### Files changed (uncommitted as of session end)
- **New:** `public/quarry-token.svg` (24 KB, dark-mode token)
- **New:** `src/components/ui/QuarryToken.tsx` (3D coin component)
- **Modified:** `src/app/globals.css` (+3 keyframes: `qry-spin`, `qry-pulse`, `qry-bob`)
- **Modified:** `src/app/ecosystem/quarryswap/page.tsx` (QuarryToken replaces "QRY" text-circle in swap animation row)
- **Modified:** `src/components/ui/text-reveal.tsx` (dropped `useInView` gate — bug fix)

`/tokenomics/page.tsx` and `/ico/page.tsx` were edited mid-session but reverted, so they don't appear in `git diff`.

### Current status of overall build
- Phase 1 + 1.5 + 2 — ✅ complete
- Phase 3 — Tokenomics page ✅, Sanity CMS ✅, Brand page ✅, Litepaper ✅, Team+Roadmap → Sanity ✅, Hero hex-sphere ✅, Tier 1 copy/data scrubs ✅, QVM restructure ✅, /ecosystem/asset-tokenization ✅, No-Code section ✅, /ico teaser ✅, Tokenomics 4-slice deck swap ✅, Ethereum mainnet correction ✅, **QRY token logo dark-mode + `<QuarryToken />` component + hero text race fix ✅ (this session, uncommitted)**.
- Remaining: brand PDF redesign · light-mode toggle · real social handles · Sanity Studio team invites · Tier 2 (logo section placements pending Alec, team headshots) · Tier 4 (homepage ecosystem diagram, watch-demo URL) · ICO Marketplace future · separate No-Code DApp repo · separate `quarrychain-ico` launchpad repo · WP vs deck inconsistency audit.
- Live on `quarrychain-web.vercel.app` — push to `main` triggers auto-deploy.

## 2026-04-22 — Session 11 addendum: Ethereum mainnet chain correction + launchpad starter prompt rewrite

### What changed

Alec clarified after the initial Session 11 wrap that QRY will launch as a **standard ERC-20 on Ethereum mainnet** for both the Seed round and the Public ICO — not Base + Arbitrum via LayerZero V2 OFT as the `ico-research-2026-04-21.pdf` recommended. Superseded the chain recommendation in three artifacts + rewrote the separate-launchpad bootstrap prompt comprehensively.

#### `/ico` page (`src/app/ico/page.tsx`)
- Seed card `chain: "Base · USDC"` → `"Ethereum · USDC"`
- Public card `chain: "Arbitrum · USDC, USDT, ETH"` → `"Ethereum · USDC, USDT, ETH"`
- Wallets + Chains strip body: dropped LayerZero / omnichain language. New copy: *"Standard ERC-20 on Ethereum mainnet. Seed round accepts USDC only; Public ICO accepts USDC, USDT, or ETH. Testnet QRY is airdropped to your wallet automatically after purchase — no bridging required."*
- FAQ "What tokens can I pay with?" rewritten to reflect single-chain + flag the $500-$1,000 gas floor expectation.
- Verified `/ico` HTML has zero `Base` / `Arbitrum` / `LayerZero` / `Omnichain` matches after deploy.

#### `docs/ico-research-summary.md`
- Replaced the "Deposit chains — Base + Arbitrum (omnichain)" section with "Deposit chain — Ethereum mainnet (single-chain ERC-20)" including:
  - Explicit ⚠️ flag that this **supersedes** the research PDF recommendation
  - Institutional-legitimacy reasoning (Solana / Avalanche / Polygon all raised on Ethereum mainnet; UAE/MENA + EU MiCA whales expect it at $50M+ scale)
  - Gas-economics tradeoff (retail ticket floor ~$500-$1,000; mitigated by visible gas estimate + minimum contribution)
- Updated Cross-Chain Listener section: watches Ethereum mainnet Purchase events now (was Arbitrum / Base).
- Updated deferred-to-launchpad-repo list to say "Purchase contracts on Ethereum mainnet (standard ERC-20, no cross-chain OFT)".

#### `docs/qry-ico-starter-prompt.md` — full rewrite
Comprehensive bootstrap prompt for the separate `quarrychain-ico` repo. Changes from the previous version:
- **Chain:** Ethereum mainnet (production) + Sepolia (test). Dropped Base, Arbitrum, LayerZero V2 OFT, intent-based bridges (Across / deBridge).
- **Contracts:** `QRYToken.sol` (standard ERC-20), `QRYPurchaseVault.sol`, `QRYVesting.sol`, `TestnetDistributor.sol`. Foundry project under `contracts/` with Forge tests + deploy scripts + Etherscan verification workflow.
- **Tech stack:** Added Foundry for Solidity dev. Added NetworkGuard component to enforce Ethereum mainnet. Added gas-estimate-in-modal rule.
- **Project structure:** Now includes full `.claude/rules/` (ui-components, web3, security, three-js, animation) + full `docs/` set (architecture, build-plan, design-system, content-copy, api-routes, legal-posture, contracts, kyc-flow, changelog).
- **Design system:** Ported exactly from quarrychain-web — CSS custom properties, Space Grotesk / Inter / JetBrains Mono, card / button / pill patterns, **the max-w-5xl alignment rule learned from Session 9**.
- **Authoritative product spec:** 4-slice tokenomics, round prices + caps + vesting, launch-day flow, Miami Safeguard, geoblock default list, payment-token rules — all inlined so there's no ambiguity.
- **Open items:** Reg CF vs Reg D still flagged. Added: minimum contribution floor ($500–$1,000 per gas analysis) as a new Alec question.
- **Slash commands + rules files** specified with full file contents (4-space indent trick for nested markdown code blocks so the whole doc copies cleanly).

### Decisions
- **Ethereum mainnet over L2s for the launchpad.** Alec's call. Institutional legitimacy signal outweighs retail gas friction at $50M scale. Gas friction mitigated with $500-$1,000 minimum contribution floor + visible gas estimate in the purchase modal before signing.
- **Single-chain simplicity wins the audit + ship-velocity tradeoff.** No LayerZero OFT = smaller surface area + simpler audit scope + no chain-switch UX + no bridge vector. The research PDF's Base + Arbitrum recommendation was optimizing for retail gas; Alec's Ethereum-mainnet call optimizes for trust signal + simplicity.
- **Starter prompt is now the single source of truth for the launchpad repo bootstrap.** Future edits to ICO strategy propagate here first.

### Shipped
One commit to `origin/main`: `43caa49` — "content: correct chain to Ethereum mainnet per Alec (supersedes research PDF)". Three files changed (+452/-172). Vercel auto-deployed.

### Issues / gotchas to address
- **Research PDF in `docs/` still says Base + Arbitrum.** Can't edit the PDF. The summary doc explicitly flags the supersession at the top of the deposit-chain section; anyone reading should hit that flag before the PDF's recommendation.
- **Minimum contribution floor ($500-$1,000) is a new Alec question.** Flagged in the starter prompt as open. Not in any public copy yet — the `/ico` FAQ just says "likely $500-$1,000". Lock this with Alec before launchpad repo Phase 3.
- **No test of the Sepolia deploy path yet.** Starter prompt describes the Foundry workflow but nothing's been deployed. First session of the launchpad repo should spin up a Hello-World contract on Sepolia to prove the deploy + verify pipeline works before writing real contracts.

### Current status of overall build
- quarrychain-web — marketing site, fully shipped for the ICO teaser. `/ico` accurate, tokenomics matches deck, Shasta scrubbed.
- quarrychain-ico — separate repo not yet initialized. Starter prompt (`docs/qry-ico-starter-prompt.md`) is paste-ready for a fresh Claude Code session.
- Live on `quarrychain-web.vercel.app` — push to `main` triggers auto-deploy.

## 2026-04-21 — Session 11: QRY ICO teaser + tokenomics swap + Shasta strip + hero touchpoints

### What was built

User dropped two source documents into the chat mid-session — the 28-page `ico-research-2026-04-21.pdf` (compliance/strategy) and Alec's 18-page `quarrychain-pitch-deck-2026.pdf` (investor deck). Together they resolved the Session 10 intake for the QRY ICO page + tokenomics swap, and included a direct instruction from Alec to strip "Shasta" references while the testnet is renamed. Four commits shipped.

#### Shasta strip (per Alec's direct instruction in the research PDF p. 25-26)
- Stripped "Shasta" from `src/app/whitepaper/sections/10-ecosystem.tsx` (line 44 DEV_TOOLS body + lines 132-141 two-networks callout) and `src/app/whitepaper/sections/13-ask.tsx` (lines 29, 35). Four edits total. Replaced with generic "testnet" throughout.
- Historical mentions in `docs/changelog.md` deliberately left alone as a historical record.
- Verified `/whitepaper` HTML has zero "Shasta" matches.
- Context from Alec: the testnet was informally named after TRON's Shasta testnet because QuarryChain's architecture is TRON-derived (DPoS + QVM fork of TVM/EVM + QRC-10/20 mirror of TRC-10/20). Being renamed while Phase 3 (staking/delegation + minimum QM stake) lands.

#### Tokenomics swap to investor-deck 4-slice
Replaced Session 9's 9-slice WP breakdown with the deck's 4-slice split (slide 14):
- Public Sale 50% / 100M QRY / $0.50
- Staking & Farming 20% / 40M QRY
- Team 20% / 40M QRY
- Angel Investors 10% / 20M QRY / $0.25 (Seed)

Changes:
- Rewrote `TOKENOMICS.allocation` + added `publicPrice: 0.5` constant to `src/lib/constants.ts`.
- Rewrote `TOKENOMICS_DETAILS` as 4 entries with per-slice vesting synthesized from deck + research PDF (Public 25% TGE + 6mo linear · Staking 48mo emission · Team 12mo cliff + 4yr 25%/yr · Angel 4yr 25%/yr per deck slide 15).
- Rewrote `VESTING_SCHEDULE` unlock-% columns to match the 4 slices (dropped `ecosystem` + `privateRound`, added `angelInvestors`).
- Updated `src/components/sections/tokenomics/SupplySchedule.tsx` scale factors to new slice sizes + 4-series chart (dropped Private purple series, Team now green, Angel Investors new red).

#### `/ico` top-level teaser page
New `src/app/ico/page.tsx` — marketing-only teaser (functional launchpad lives in separate `quarrychain-ico` repo; see starter prompt below):
- `PageHero` with `dodecahedron` wireframe (amber/blue/teal) — first use of that shape; all other pages use torusKnot / octahedron / icosahedron / tetrahedron / sphere.
- Two-round comparison cards (Seed $0.25 vs Public $0.50) with allocation / raise cap / vesting / eligibility / chain & payment per deck.
- 4-step flow per research PDF: Registration 14d → Priority 24h (testnet reputation) → Lottery 48h (VRF) → Overflow FCFS.
- Wallets + chains strip (MetaMask/WalletConnect/Coinbase/Rainbow/Rabby · Base+Arbitrum omnichain via LayerZero V2).
- Compliance grid (KYC gated · Reg-compliant · Geographically restricted · Cleanliness audit trail) + explicit disclaimer: *"The final eligible-countries list is subject to verification by QuarryLabs legal counsel."*
- "Buy today. Use tomorrow." testnet-utility section — hedged per Alec's Phase 3 reality (DPoS validator signup + governance voting not live yet).
- Instant-Stake bonus callout — the "Miami Safeguard" from the research PDF. Lock liquid 25% for +6mo at TGE → 10% QRY bonus + Founding Validator badge.
- 6-item FAQ hedged on the Reg CF vs Reg D question (doesn't commit to US posture).
- `PageCTA` → Discord + litepaper. Waitlist-style framing.
- Added `{ label: "ICO", href: "/ico" }` to `NAV_LINKS`. Added ICO link to Footer Technology column.
- Fixed stale Footer links discovered during the wire-up: Asset Tokenization `/ecosystem` → `/ecosystem/asset-tokenization`, QVM `/technology` → `/developers` (both carryovers from Session 9 restructure).

#### Separate `quarrychain-ico` repo starter prompt
- Wrote `docs/qry-ico-starter-prompt.md` matching the format of `no-code-dapp-starter-prompt.md`. Bootstraps a separate functional launchpad repo with:
  - Stack: Next.js 15 + wagmi + RainbowKit + Sumsub React SDK + LayerZero V2 OFT + Supabase + Chainlink VRF + Chainalysis/TRM
  - Project structure with `api/geoblock`, `api/kyc/webhook`, `api/sanctions`, `api/lottery/draw` routes
  - Contract scaffolding: `QRYPurchaseVault.sol`, `QRYVesting.sol`, `TestnetDistributor.sol`, `QRYToken.sol` (LayerZero OFT)
  - Non-negotiable security rules (geoblock in middleware, KYC before purchase, never custody, Treasury Shield auto-convert, audit log everything)
  - 7-phase build plan (Scaffolding → Wallet+KYC → Contracts+Registration → Round mechanics → Vesting+Instant-Stake → Testnet utility → Admin+audit)
  - Slash commands (`/start`, `/wrap`, `/checkpoint`, `/status`)

#### Research docs landed in `docs/`
- `docs/ico-research-2026-04-21.pdf` — 28 pages of compliance/strategy
- `docs/quarrychain-pitch-deck-2026.pdf` — Alec's 18-page investor deck
- `docs/ico-research-summary.md` — distilled plaintext summary of both, flagging the Reg CF vs Reg D contradiction. Authoritative reference for all ICO work going forward.

#### Homepage hero ICO touchpoints (follow-up after user flagged no homepage CTA)
- Pulsing teal pill above the headline: "● QRY ICO · Registration opens soon →" linking to `/ico`
- Primary CTA swapped from "Read Whitepaper" → "View the ICO" → `/ico`
- Secondary CTA renamed "Read Whitepaper" → "Read the Litepaper" → `/whitepaper` (matches the actual doc type)
- "Explore Testnet" CTA dropped from hero (still discoverable via `/developers` nav + `/ecosystem` hub)
- Three touchpoints total on first load: nav link, pill, primary CTA. Plus Footer Technology column link.

### Decisions
- **Deck is source of truth for tokenomics, whitepaper wins on deep technical content.** User-confirmed preference saved as memory. When the two disagree on tokenomics / Seed mechanics / allocation / vesting, the deck wins. For DPoS / TaPoS / QVM / bandwidth-energy economics the whitepaper remains authoritative — the deck doesn't cover those.
- **Reg CF vs Reg D 506(c) for the Seed round is NOT resolved in code.** Deck slide 15 says Reg CF; research PDF says Reg D 506(c). They're materially different (Reg CF = US retail INCLUDED via funding portal, $5M cap; Reg D 506(c) = US accredited ONLY). The `/ico` page copy hedges with "regulatory posture finalizing with counsel" and does NOT hard-code US posture. Must be resolved with Alec + counsel before the launchpad repo can do US-specific geoblock logic.
- **Tokenomics is now a 4-slice split per the deck, supersedes Session 9's 9-slice WP revert.** Session 9's comment "confirm with the deck before public launch" is now satisfied.
- **`/ico` is a teaser in `quarrychain-web`; functional launchpad is a separate repo.** Follows the established pattern (QuarrySwap marketing page in quarrychain-web + functional app in separate repo; No-Code Token Generator marketing section + separate repo per `no-code-dapp-starter-prompt.md`). Reasoning: the launchpad needs wagmi/viem/RainbowKit + Sumsub SDK + LayerZero OFT + Supabase backend + Chainalysis/TRM sanctions + Chainlink VRF — totally different stack, different security surface, different deploy cadence from marketing.
- **Route decision: `/ico` top-level, not `/tokenomics/ico`.** Cleaner URL, matches investor search behavior, and positions the ICO page as a standalone investor concern (like `/tokenomics`) rather than a sub-page of tokenomics.
- **Hero gets three ICO touchpoints, not one.** Pill + primary CTA + nav link. Industry pattern for L1 sites with active ICOs (Monad / MegaETH / Fogo). Single touchpoint gets missed on first scan.
- **Hedge language on `/ico` is explicit and visible.** "This list is subject to final verification by QuarryLabs legal counsel" appears in italics after the compliance grid. Protects from regulators updating their Digital Securities list (the 18-asset list mentioned in the March 17 2026 Joint Interpretive Release) mid-launch.
- **Dropped the "Explore Testnet" hero CTA.** Keeping two focused CTAs (ICO + Litepaper) beats three competing ones. Testnet explorer is still in `/developers` + `/ecosystem` hub + Footer.
- **"Miami Safeguard" / Instant-Stake is surfaced as a first-class section on `/ico`.** Per research PDF, it defends the $0.50 price floor by reducing sellable supply at TGE from 25% → ~10-12%. Lock liquid 25% for +6mo → 10% QRY bonus + Founding Validator badge. Badge format (NFT vs SBT vs off-chain registry) is TBD — left flexible in the copy.

### Verification
- Claude Preview verified `/ico` renders (hero + rounds + flow + compliance + testnet utility + FAQ).
- `/tokenomics` verified showing new 4-slice legend (exact strings: "Public Sale 50%", "Staking & Farming 20%", "Team 20%", "Angel Investors 10%").
- Homepage nav verified showing "ICO" between Tokenomics and Developers.
- `/whitepaper` HTML verified to have zero "Shasta" matches.
- Hero desktop screenshot verified: pulsing teal pill, "View the ICO" primary CTA, "Read the Litepaper" secondary CTA, all centered over the Goldberg hex-sphere.
- Vercel production build verified Ready (`quarrychain-j376g8l2d-garvonious-uis-projects.vercel.app`); canonical URL `quarrychain-web.vercel.app/ico` returns 200 with title "QRY ICO — QuarryChain", `age: 0` on first fetch, `x-vercel-cache: HIT` on repeat.
- No console errors across `/`, `/ico`, `/tokenomics`, `/whitepaper` in dev preview.

### Shipped
Four commits to `origin/main` (`b4d7190..75050e1`), each auto-deployed by Vercel:
- `8be3257` content: strip "Shasta" references per Alec (2 files, +7/-8)
- `84b49c6` feat: swap tokenomics to investor-deck values + add /ico teaser page (4 files, +548/-94, new `src/app/ico/page.tsx`)
- `c0b3c5d` docs: add QRY ICO research + deck + summary + launchpad starter prompt (5 files, +436/-13, two new PDFs + two new markdown files + build-plan.md Session 11 entries)
- `75050e1` feat: surface QRY ICO on homepage hero (1 file, +16/-6)

### Issues / gotchas to address
- **Reg CF vs Reg D 506(c) Seed posture is still open.** The `/ico` page dodges this with hedging copy, but the launchpad repo can't ship US-specific geoblock logic until Alec + counsel land this. Affects whether US retail sees the Seed round at all.
- **Vercel CLI `vercel ls` still shows some Canceled + one-off deploys from several days ago** — nothing new, but worth glancing at logs next time we're in Vercel.
- **Memory files are in `~/.claude/projects/…/memory/`, not in this repo.** Saved 3 memories this session (Shasta rename, ICO doc pointers, deck-wins-over-WP feedback). They're NOT committed to git — they're local to the Claude harness. Future sessions on the same machine will auto-load them; sessions on other machines won't see them. If the user wants these portable, we'd need to copy them into the repo docs.
- **`zsh` read-only variable collision in Monitor script.** The deployment-status poll used `$status` as a loop variable and `zsh` treats that as read-only. Harmless — the deploy actually succeeded. Next time a monitor script is needed for zsh, use a different variable name (`$deployState`, `$buildStatus`, etc.).
- **WP vs deck inconsistencies beyond tokenomics flagged but NOT audited.** User explicitly said don't do it now — left as a pending todo in build-plan.md with the specific areas to check: market-size stats ($16T by 2030, $80B DApp, $232B tokenization), problem-statement framing (deck leans on environmental cost + PoS centralization more than litepaper), deck slide 10 "AI-based automated smart contract auditing" as a QuarrySwap feature (in content-copy.md but not in litepaper §10).
- **The "Founding Validator" badge format is open** — NFT, SBT, or off-chain registry? Governance weight at mainnet? Left flexible in `/ico` copy but needs to be decided before the launchpad repo builds the mint flow.
- **Testnet reputation scoring criteria** for the Priority Round 24h allocation — what counts? Galxe quests? Layer3? Hard-coded to testnet transactions? Blocked on Alec.
- **Mainnet launch / TGE date target** — drives all the countdowns and sale window dates. Unknown. Blocked on Alec.

### Current status of overall build
- Phase 1 (Homepage POC) — ✅ complete
- Phase 1.5 (V2 overhaul) — ✅ complete
- Phase 2 (Subpages) — ✅ complete
- Phase 3 — Tokenomics page ✅ · Sanity CMS ✅ · Brand page ✅ · Litepaper ✅ · Team+Roadmap → Sanity ✅ · Hero hex-sphere ✅ · HexDivider (shipped S8, removed S9) · Tier 1 copy/data scrubs ✅ · QVM restructure ✅ · `/ecosystem/asset-tokenization` ✅ · No-Code section ✅ · No-Code DApp starter prompt ✅ · **Shasta strip ✅ · Tokenomics 4-slice deck swap ✅ · `/ico` teaser page ✅ · `quarrychain-ico` starter prompt ✅ · Hero ICO touchpoints ✅ (this session)**.
- Remaining: brand PDF redesign · light-mode toggle · real social handles · Sanity Studio team invites · Tier 2 assets (logo dark-mode + headshots) · Tier 4 ecosystem diagram rework · ICO Marketplace future work · spin up separate No-Code DApp repo · spin up separate `quarrychain-ico` launchpad repo · WP vs deck inconsistency audit.
- Live on `quarrychain-web.vercel.app` — push to `main` triggers auto-deploy.

## 2026-04-19 — Session 9: Tier 1 content/data fixes + Tier 3 page restructure

### What was built
A user-flagged batch of sitewide tweaks from a copy audit plus a structural refactor moving developer content into /developers. Three thrusts — copy scrubs, data swaps, page restructure — shipped in six commits.

#### Tier 1 — truth/accuracy copy scrubs
- "6-hour voting" specificity stripped sitewide (Features card, GovernancePreview subhead + stat card, /technology DPoS step, /tokenomics staking body, /blog what-is-dpos post, whitepaper §03-consensus + §08-governance, content-copy.md, brand-voice-guidelines.md). Replaced with "time-based voting" — the intended phrasing until mainnet ships and the exact interval is locked in.
- `GovernancePreview` stat #1 swapped from `{ value: 6, suffix: "hr" }` NumberTicker to a static `{ display: "Time-Based", label: "Voting model" }`. Conditional render in the stat card: if `display` is set, render as plain text; otherwise drive the NumberTicker. Type union added for the two shapes.
- "Quarry Coin" dropped from token naming. `Tokenomics.tsx` homepage headline, `/tokenomics` page hero, `litepaper.ts` §09 title, `content-copy.md` all now read "Quarry (QRY)".
- docs/content-copy.md + `.claude/brand-voice-guidelines.md` synced.

#### Tier 1 — data swaps
- `TOKENOMICS.allocation` rewritten from 5 slices to the 9-slice whitepaper breakdown (Public Sale / Liquidity 30%, Staking & Farming 20%, Team 20%, Dev 10%, Ecosystem 5%, Marketing 5%, Angel Investors 5%, Private Sale 2.5%, Private Presale 2.5%). Colors extended beyond the core brand palette (blue/teal/red/green) with amber/pink/purple/cyan/indigo for the smaller slices.
- `TOKENOMICS_DETAILS` expanded to 9 entries. Vesting for the 4 WP-only slices (Dev, Marketing, Angel-split, Private Sale, Private Presale) is inferred from existing patterns and flagged in a comment above the array — "confirm with the deck before public launch."
- `ROADMAP` constant replaced with the live-site scraped phases (curled + grep'd `main.9f1cba67.js` off quarrychain.network since it's a React SPA that returns an empty shell via plain fetch). Deterministic `_id`-based re-seed through `scripts/seed-sanity.mjs`. Sanity write token was session-scoped (generated, used, removed from `.env.local` — user to revoke in dashboard).
- `HexDivider` unwired from homepage. Component + `FloatingHex` kept on disk for potential reuse (same "keep for revert" pattern as `HexGrid.tsx`).

#### Tier 3 — page restructure
- **QVM migrated `/technology` → `/developers`.** Replaced the generic "EVM Compatibility" section on /developers with the full QVM explainer (Turing-complete, fully EVM-compatible, connects to Web3.js/Ethers.js/Hardhat/Remix). Badge lists merged — old /technology had 7 badges, old /developers had 8; union is 9 (EVM Compatible, Solidity, Web3.js, Ethers.js, MetaMask, Hardhat, Remix, Truffle, OpenZeppelin). /technology now cleanly covers DPoS + Consensus Comparison + Token Standards only.
- **New `/ecosystem/asset-tokenization` page.** Copy distilled from the litepaper §07-rwa (kept the 5 asset categories grid, simplified the 4-step process, narrowed benefits from 8 → 6). Icosahedron hero in green/purple/blue (the "RWA green" accent established in the litepaper). Page CTAs link to /developers + /whitepaper#rwa.
- **Alignment fix after user flag:** sections were using mixed max-widths (intro `max-w-3xl`, categories `max-w-5xl`, process `max-w-4xl`, benefits `max-w-5xl`) which made the content column's left edge jump as you scroll. Standardized all content sections to `max-w-5xl`; constrained just the intro prose to `max-w-3xl` inside the wider wrapper so reading line-length stays comfortable without breaking section alignment.
- **New `NoCodeSection.tsx`** on /developers. Full dark-mode reskin of the QuarrySwap Token Generator demo (found via linktr.ee/QuarryChain — Chrome extension needed a reconnect mid-session). Mock includes window chrome (3 dots + URL bar), app header with QS logo + navigation + "QuarryChain Mainnet" pill + Connect Wallet button, 2-column wizard body (Create Token form on left with Name/Symbol/Supply/Type dropdown/Badge Permissions pills, Deployment Preview panel on right with contract address + gas + status + 5-dot wizard progress bar), 5-step flow row, Try the Beta → / Read the Litepaper CTAs. Placed between Terminal Animation and Resources on /developers.
- **Wiring updates:**
  - `ECOSYSTEM` constants: QVM `href: "/technology"` → `"/developers"` (now that QVM lives there), Asset Tokenization `href: "/ecosystem"` → `"/ecosystem/asset-tokenization"`.
  - /ecosystem hub: QVM card repointed, Asset Tokenization card dropped `comingSoon: true` and repointed to the new URL. Added a `Product` type annotation to preserve the optional `comingSoon` field in the union (removing it from all entries narrowed the inferred type and broke rendering conditionals).

#### Starter prompt for separate No-Code DApp repo
- Committed `docs/no-code-dapp-starter-prompt.md` — a self-contained bootstrap prompt for spinning up the functional Token Generator product in its own repo. Includes: tech stack (Next.js + TS + Tailwind + wagmi/viem), project structure, design tokens (matching quarrychain-web exactly), critical rules, slash command file contents (`/start`, `/wrap`, `/checkpoint`, `/status`), rules files, and a 6-phase build plan seed.
- Rendering trick used: nested markdown code blocks (the slash command file contents) written with 4-space indentation instead of triple-backticks so the whole doc can be copied as a single markdown block without outer-fence collision.

### Decisions
- **Token Generator = two repos.** Marketing preview (reskinned mock on /developers in this repo) + functional product (wallet connect, contract deploy, badge permissions) in a separate repo. Matches the existing pattern of /ecosystem/quarryswap being a marketing page while the actual QuarrySwap app lives elsewhere. Rationale: marketing evolves slowly, product needs a different stack (wagmi/viem, contract ABIs, potentially a backend), different deploy cadence, independent failure domain.
- **ICO Marketplace parked per user.** When picked up, same split: `/ecosystem/ico-marketplace` marketing page here + functional repo separately.
- **WP tokenomics restored as source of truth.** Session 2 had consolidated 9 → 5 slices "for cleaner visualization." User wanted the original 9-slice breakdown back. Inferred vesting for the 4 additional slices — flagged in comment.
- **Asset Tokenization lives at `/ecosystem/asset-tokenization`.** Matches `/ecosystem/quarryswap` + `/ecosystem/quarrywallet` pattern — product-tier offering within the ecosystem hub, not a top-level route.
- **QVM moved to /developers (not kept on /technology).** User framing: no-code and code-path are both developer workflows. /technology can stay focused on the protocol/consensus story. Net architectural shift: from "technology-speak" organization to "who you are as a chain user" (developer / consumer / investor).
- **NoCodeSection uses green→teal gradient accents**, mirroring the green accent from the asset-tokenization page. Gives the "no-code developer path" a consistent color signature across /developers and /ecosystem.
- **Alignment fix: standardize section max-width per page, constrain prose inline.** Pattern worth generalizing — mixing `max-w-*` on adjacent section containers creates visually jumpy column edges. Always use a consistent section wrapper; shrink prose line-length by adding `max-w-3xl` to the inner `<p>`, not by narrowing the whole section.
- **Starter prompt committed, not gitignored.** Version-controlled so it's available from any machine and editable over time as the quarrychain-web patterns evolve.

### Verification
- `pnpm tsc --noEmit` clean throughout.
- Preview server (Claude Preview) verified: `/developers` QVM + No-Code sections rendering, `/technology` QVM-removed, `/ecosystem` Asset Tokenization no longer "Coming soon", `/ecosystem/asset-tokenization` new page + alignment fix (all content sections at `innerLeft: 124px, innerWidth: 1024px` on desktop).
- Direct GROQ query against Sanity CDN confirmed new roadmap docs live after seed (4 phases with new titles and item lists).
- Visual screenshots captured the 9-slice donut chart, the No-Code mock window with form fields + deployment preview, and the asset-tokenization icosahedron hero.

### Shipped
Six commits to `origin/main` (`860b6e7..25c341c`):
- `191a52f` content: drop 6-hour voting specificity + "Coin" from QRY naming
- `1754b1b` feat: swap tokenomics to 9-slice WP allocation + live-site roadmap, drop HexDivider
- `6aad6c0` style: thicken wireframe shape lines on /brand + hero gradient tweak (included the user's other-session work + a carry-over Hero.tsx teal→blue gradient tweak)
- `0d058db` feat: move QVM to /developers + add No-Code Token Generator section
- `1161f13` feat: add /ecosystem/asset-tokenization page + ecosystem wiring
- `25c341c` docs: starter prompt for No-Code DApp repo

Vercel auto-deployed on each push.

### Issues / gotchas to address
- **Revoke the `seed-script` Sanity token.** https://sanity.io/manage/project/owhgeovj/api/tokens — user action only. Token was session-scoped and is no longer in `.env.local`.
- **Tokenomics vesting for the 4 new WP-only slices is inferred.** Confirm with the pitch deck before public launch. Comment above `TOKENOMICS_DETAILS` marks which ones.
- **"Try the Beta →" CTA on NoCodeSection points at the internal-looking `easysite.ai` URL.** Swap to a stable/public beta URL when one's ready.
- **Watch Demo video URL still TBD.** Placeholder remains — no "Watch Demo" CTA wired.
- **Chrome extension connection was flaky mid-session.** User reinstalled from the Web Store and it came back. Same steps if it happens again.
- **Tier 2 still blocked on assets:** QRY token logo (light-mode assets exist but need dark-mode rework from designer), team headshots.
- **Tier 4 untouched:** homepage ecosystem diagram rework + "View Ecosystem" CTA still on the board.
- **Mobile responsiveness of NoCodeSection mock** — not stress-tested on actual phones. The 2-column wizard layout stacks vertically on mobile (grid-cols-1 fallback) but the tight horizontal spacing inside the form may feel cramped. Worth a real-device check.
- **ICO Marketplace parked.** Will use the same "marketing page here + functional product in own repo" pattern when picked up.

### Current status of overall build
- Phase 1 (Homepage POC) — ✅ complete
- Phase 1.5 (V2 overhaul) — ✅ complete
- Phase 2 (Subpages) — ✅ complete
- Phase 3 — Tokenomics ✅, Sanity CMS ✅, Brand page ✅, Litepaper ✅, Team+Roadmap → Sanity ✅, Hero hex-sphere ✅, HexDivider (shipped Session 8, removed this session), **Tier 1 copy/data scrubs ✅, QVM restructure ✅, /ecosystem/asset-tokenization ✅, No-Code section ✅, No-Code DApp starter prompt ✅ (this session)**. Remaining: brand PDF redesign, light-mode toggle, real social handles, Sanity Studio team invites, Tier 2 assets (logo + headshots), Tier 4 ecosystem diagram rework, ICO Marketplace future work, spin up the separate No-Code DApp repo.
- Live on `quarrychain-web.vercel.app` — git push triggers auto-deploy.

## 2026-04-16 — Session 8: Hero rebuild (hex-sphere) + HexDivider accent

### What was built
Two visual overhauls to the homepage. Both are live in local dev but the hex-sphere has known tuning follow-ups.

#### Hero — HexGrid replaced with scroll-reactive Goldberg hex-sphere (`ScrollSphere.tsx`)
- The old `HexGrid.tsx` was a full-screen **fragment-shader hex pattern** on an orthographic quad — 2D, ambient, generic. Replaced with a **true 3D hex-tiled sphere** rendered as wireframe line segments.
- **Geometry:** build a subdivided icosahedron (subdiv 3 → 642 unique vertices), merge identical positions (three.js's PolyhedronGeometry ships unindexed with duplicated corner verts), then compute the dual: for each vertex, collect adjacent face centroids and sort them tangentially around the vertex normal into a polygon. Result: 12 pentagons + N hexagons (Goldberg polyhedron / fullerene / geodesic-dome pattern). No gaps at rest.
- **Per-cell scroll reaction:** each polygon has a stable random noise seed (0..1). On scroll, each cell translates outward along its own radial direction by `scrollProgress * (0.3 + noise * 0.7) * MAX_DISPLACEMENT`. Cells spread apart unevenly at peak — "blooming" fragmentation rather than uniform expansion. Colors lerp from per-cell gradient (blue top → teal bottom) toward red (`COLOR_DISPLACED`) proportional to displacement.
- **Per-frame buffer rewrites:** each polygon owns a contiguous region of one shared `LineSegments` position + color buffer. Animate loop rewrites displaced positions + updated colors per cell, then flags `needsUpdate`. ~4k floats/frame for positions, same for colors; cheap.
- **Pin-and-hold scroll behavior in `Hero.tsx`:** restructured the hero as a **250vh outer section with an inner `position: sticky; top: 0` content div**. Scroll math:
  - Outer rect.top = 0 → -150vh: inner is sticky-pinned. Triangle wave progress 0 → 1 → 0 (80% of pin) → held at 0 (final 20%, `HOLD_FRACTION`).
  - Outer rect.top = -150vh → -250vh: inner unsticks naturally, section exits normally. Shape is already at 0 (compact) — no further animation during exit.
- **`getScrollProgress` controller prop** on `ScrollSphere` so the pinned hero owns the scroll math (triangle wave across pin duration); falls back to raw `window.scrollY / vh` mapping if the prop is omitted (keeps the component usable standalone).
- **Backdrop layers:** octahedron (radius 1.8, blue, 10% opacity) + dodecahedron (radius 2.5, teal, 7% opacity), simple wireframes, auto-rotate only. Same pattern from earlier iteration — restored after an experimental Path-B phase with three colored brand hexagons (red top / blue bottom-left / green bottom-right framing the sphere) was built, tried, and removed.
- **Mouse tilt + auto-rotate** on the parent group (unchanged behavior from the shader era). Reduced-motion respected (no scroll response, no rotation, static render).

#### HexDivider — section-to-section accent between DeveloperCTA and Ecosystem
- **`FloatingHex.tsx`** (new) — extruded hexagonal prism rendered as `EdgesGeometry` + `LineSegments` (wireframe silhouette, no tessellation noise). Counter-rotating **octahedron shell** at 1.75× the hex's radius wraps it — subdivision 0 (8 faces, 12 edges) so it reads as a sparse geometric envelope, not a dense cage. All colors, opacities, and scale exposed as props.
- **`HexDivider.tsx`** (new) — section component that positions a green `FloatingHex` at the right edge of the standard `max-w-7xl` content container. Uses **negative vertical margin** (`-my-24 md:-my-32`) exactly equal to half the hex container's height (`w-48 md:w-64`), so the hex overlaps into DeveloperCTA's bottom padding and Ecosystem's top padding without adding net page height.
- Wired into `page.tsx` between `<DeveloperCTA />` and `<Ecosystem />`.

### Decisions
- **Goldberg polyhedron over triangulated icosphere.** The original icosphere wireframe shows triangle edges — fine but generic. The goldberg shows the dual (hex + pent tiling) — feels bespoke and matches the brand's hex-heavy visual vocabulary. Built manually (dedup verts from unindexed three.js geometry, sort adjacent centroids by tangent-plane angle) rather than importing a library.
- **Per-cell rigid translation, not per-vertex noise displacement.** Earlier prototype had each cell vertex move independently (cells distort/shear at peak). Current version translates each cell as a rigid unit outward. Cells stay visually coherent as hexes/pentagons throughout, which is more brand-aligned. Gaps form between cells at peak rather than cells warping.
- **Sticky pin is CSS-native, not GSAP.** We have GSAP available but `position: sticky` works out-of-the-box with Lenis smooth scroll, doesn't fight with Next.js hydration, and requires no plugin registration. Good enough.
- **Triangle-wave + hold phase.** User wanted the expand-contract-settle narrative fully contained in the pin, then unstick with the shape already compact. `HOLD_FRACTION = 0.2` at the top of `Hero.tsx` gives the contracted state a beat to register before the section releases.
- **Zero-net-height divider.** `HexDivider` uses negative vertical margin exactly equal to half its container's height, so the hex visually lives "in the gap" between sections without pushing them apart. A key user-driven constraint: "you don't need to add more space."
- **Tried Path B (three colored brand hexes) and removed it.** Experimented with red/blue/green brand hexagons framing the hex-sphere in the hero — looked like the literal logo rendered in 3D. User felt the hero was missing something different (the octahedron/dodecahedron backdrops from an earlier iteration), so the brand-frame hexes came out. Noted for reuse "further down the homepage" — the green solo hex in the divider is the first reuse.
- **Kept `HexGrid.tsx` on disk unused.** Easy revert path if the hex-sphere direction is ever wrong for some future redesign.

### Verification
- `pnpm build` exits 0. 19 routes. `/` still shows `1m` revalidate (ISR preserved).
- TypeScript clean (`pnpm tsc --noEmit`).
- Visually tuned through several rounds of user feedback (starting size, displacement amplitude, hold fraction, cell density, backdrop shape selection, divider position/size). Current state is a functional v1 — user flagged "gonna want to tweak more later."

### Issues / gotchas to address
- **`ICO_SUBDIV = 3`** gives 642 cells — dense and readable. Bumping to 4 gives 2562 cells (heavier render; a wireframe becomes nearly solid from distance). Bumping to 2 → 162 cells (classic soccer-ball look, more legible hexes). Worth eyeballing on different viewport sizes.
- **The pin's "weight" is controlled by `SECTION_HEIGHT_VH = 250`.** Higher = more scroll-distance pinned = more dramatic. Lower = snappier. The HOLD_FRACTION is also tunable. Both are at the top of `Hero.tsx`.
- **`FloatingHex` backdrop** currently defaults to `backdropColor = 0x14b8a6` (teal), `backdropOpacity = 0.2`. If we scatter more `HexDivider`s throughout the homepage (red between Tokenomics/Roadmap, blue between Ecosystem/GovernancePreview, etc.), we'd want to vary these defaults per divider.
- **Mobile responsiveness of the pinned hero** is unverified on actual phones. `position: sticky` + Lenis works in principle; worth a real-device check.

### Current status of overall build
- Phase 1 (Homepage POC) — ✅ complete
- Phase 1.5 (V2 overhaul) — ✅ complete
- Phase 2 (Subpages) — ✅ complete
- Phase 3 — Tokenomics ✅, Sanity CMS for blog ✅, Brand page enhancements ✅, Litepaper ✅, Team + Roadmap → Sanity ✅, **Hero rebuild + HexDivider ✅ (this session, v1 — more tuning pending)**. Remaining: light mode toggle, real social handles, brand PDF redesign, Sanity Studio team invites.
- Live on `quarrychain-web.vercel.app` — push triggers an auto-deploy.

## 2026-04-16 — Session 7: Team + Roadmap → Sanity

### What was built
The homepage `<Team />` and `<Roadmap />` sections (and their twins in the litepaper at §11/§12) now pull from Sanity instead of the hardcoded constants in `src/lib/constants.ts`. Dual-mode data layer — if Sanity is configured AND has docs, use Sanity; otherwise fall back to constants. Seeded the dataset with the current 6 team members and 4 roadmap phases. This closes out the Phase 3 Sanity integration that Session 5 started planning.

#### New queries (`src/lib/sanity/queries.ts`)
- `sanityGetTeamMembers()` — ordered by `order asc, name asc`
- `sanityGetRoadmapPhases()` — ordered by `phase asc`
- Types: `SanityTeamMember`, `SanityRoadmapPhase`

#### New dual-mode data layers
- **`src/lib/team.ts`** — `getTeamMembers()` async function. If `isSanityConfigured()` AND Sanity returns ≥1 doc, use it; else constants. The "has docs" check means an empty Sanity dataset during onboarding won't blank out the homepage.
- **`src/lib/roadmap.ts`** — same pattern for `getRoadmapPhases()`.

#### Components converted to async server components
- **`Team.tsx`** — dropped `"use client"`, now `async function Team()`. Renders `<BlurFade>` (which is still client-side) as a server→client boundary, works fine in App Router.
- **`Roadmap.tsx`** — same treatment.
- **`src/app/whitepaper/sections/11-roadmap.tsx` + `12-team.tsx`** — also converted to async so the litepaper reflects Sanity edits alongside the homepage.

#### ISR + revalidation
- Added `export const revalidate = 60` to `src/app/page.tsx` and `src/app/whitepaper/page.tsx`. Build output confirms both now show `1m` revalidate alongside `/blog`.
- Extended **`src/app/api/revalidate/route.ts`** to dispatch by Sanity's `_type`:
  - `blogPost` → revalidates `/blog` + `/blog/[slug]`
  - `teamMember` or `roadmapPhase` → revalidates `/` + `/whitepaper`
  - Missing/unknown `_type` → revalidates everything (safe default)
  - Returns which paths were revalidated in the response body

#### Seed script (`scripts/seed-sanity.mjs`)
- One-shot `.mjs` script using Node's native `--env-file=.env.local` flag (requires Node 20.6+). No new devDeps.
- Uses `createOrReplace` with deterministic `_id`s (`team-alec-arrambide`, `roadmap-phase-1`) so re-runs overwrite rather than duplicate.
- Data is a snapshot of TEAM/ROADMAP constants inlined in the script — one-time bootstrap, not an ongoing sync. After seeding, Sanity is the source of truth; edits happen in Studio.
- New script entry in `package.json`: `pnpm seed:sanity`.
- Requires `SANITY_API_TOKEN` (Editor role) in `.env.local` at seed time. Token generated, used, and removed from `.env.local` in the same session — production Vercel env never gets write credentials, reads use the public CDN with just `NEXT_PUBLIC_SANITY_PROJECT_ID`.

### Decisions
- **Dual-mode with graceful fallback on empty dataset.** If a future dev clones the repo and configures Sanity env vars but hasn't seeded the dataset, the homepage still renders from constants instead of going blank. The `members.length > 0` check costs nothing and removes a whole class of "Sanity configured but not populated" footgun.
- **Also wired the litepaper sections 11/12 to Sanity, not just the homepage.** Same source of truth — otherwise a team edit in Studio would desync the two renderings.
- **Extended webhook via request body parse, not path params.** Sanity's default webhook payload includes `_type`, and parsing it server-side lets one webhook URL cover all doc types. Falls back to revalidating everything if the body's missing or malformed — cheap insurance.
- **Kept constants.ts as the fallback instead of deleting it.** Local dev without Sanity env vars still works exactly as before. Constants stay wired into places that don't need Sanity (e.g. the `<Footer />` link lists).
- **Write token is session-scoped, not Vercel-scoped.** The production site literally doesn't need write credentials — all reads go through `useCdn: true`. Token was added to `.env.local`, used for the one-shot seed, and removed immediately after. The line is left in `.env.local` commented out as a reminder for future re-seeds.

### Verification
- `pnpm build` exits 0. 19 routes. Build output confirms `/` and `/whitepaper` now show `Revalidate 1m Expire 1y`.
- `pnpm tsc --noEmit` clean.
- Direct GROQ query against `owhgeovj.apicdn.sanity.io/v2024-01-01/data/query/production` returns all 6 team members and 4 roadmap phases in the correct order. Data is live on the public CDN.

### Issues / gotchas to address
- **Studio has no team/roadmap UI polish.** Default list view only shows the preview fields defined in the schema. If we want a better editing experience (e.g. drag-to-reorder for team members), we'd need to add orderable-document-list plugin and/or custom preview components. Fine for now — 6 team members and 4 phases isn't hard to manage in the default UI.
- **Seed script's data is frozen at commit time.** If someone edits constants.ts in the future and re-runs the seed, it'll overwrite any Studio edits that diverged. Safer long-term: drop the data from the script and document "seed runs once, edit in Studio after." Not urgent.
- **Write token needs to be revoked by hand.** Go to https://www.sanity.io/manage/project/owhgeovj/api/tokens and delete the `seed-script` token. The `.env.local` line is commented out so it's not reused accidentally.

### Current status of overall build
- Phase 1 (Homepage POC) — ✅ complete
- Phase 1.5 (V2 overhaul) — ✅ complete
- Phase 2 (Subpages) — ✅ complete
- Phase 3 — Tokenomics page ✅, Sanity CMS for blog ✅, Brand page enhancements ✅, Litepaper ✅, **Team + Roadmap → Sanity ✅ (this session)**. Remaining: light mode toggle, real social handles, brand PDF redesign, Sanity Studio team invites.
- Live on `quarrychain-web.vercel.app` — push triggers an auto-deploy.

## 2026-04-14 — Session 6: Litepaper

### What was built
The `/whitepaper` route is no longer a "download a PDF" landing page — it's now a long-form, on-site **litepaper** distilled from the 81-page source PDF in `docs/whitepaper-source.pdf`. 13 sections, sticky TOC sidebar with scroll-spy, mobile drawer, full content. Live at `/whitepaper`.

#### Infrastructure (`src/components/litepaper/`, `src/lib/litepaper.ts`)
- **`lib/litepaper.ts`** — single source of truth for section metadata (id, number, label, title, accent color). Used by both the layout (rendering) and the TOC (scroll-spy + links). Drives ordering, accent colors, and the URL hash for every section.
- **`LitepaperLayout.tsx`** — grid wrapper: 220px sticky TOC sidebar on lg+, content cell on the right. `min-w-0` on the content cell so it shrinks correctly inside the grid. Mounts `MobileTocDrawer` for mobile.
- **`TocSidebar.tsx`** — sticky TOC, hidden on <lg. Uses `IntersectionObserver` with `rootMargin: "-80px 0px -60% 0px"` to mark a section "active" once its top reaches ~40% of the viewport. Active link highlights with the section's accent color and a left-border indicator. Smooth scroll on click is handled globally by Lenis (`SmoothScroll.tsx`) — no per-component anchor handling needed.
- **`MobileTocDrawer.tsx`** — fixed "Contents" button bottom-right on mobile (<lg). Tapping opens a slide-out sheet from the right with the same TOC list, locks body scroll, closes on backdrop tap, item tap, or Escape.
- **`LitepaperSection.tsx`** — consistent section wrapper. Renders `<section id={meta.id}>` with `scroll-mt-24` (so anchor scrolls land below the navbar), the number + label + accent-divider header, the gradient headline, and a `space-y-6` body slot.
- **No dedicated reading progress bar** — the global `ScrollProgress` in the root layout already renders a 2px gradient bar at the top of every page, so adding a litepaper-specific one would be duplicate UI.

#### Tokenomics refactor (`src/components/sections/tokenomics/`)
- All 7 sections that were inlined in `/tokenomics/page.tsx` are now extracted into individual content-only components: `TokenAllocationChart`, `AllocationBreakdown`, `TokenUtility`, `VestingTimeline`, `SupplySchedule`, `StakingRewards`, `RevenueModel`.
- Each component is "content only" — no `<section>` wrapper, no header. Both `/tokenomics` and the litepaper §9 import them and provide their own wrapper styling.
- `/tokenomics/page.tsx` is now a clean import + section list. Dropped `"use client"` from the page itself — it's now a server component rendering client component children.
- Litepaper §9 uses 4 of the 7 (allocation chart, breakdown, vesting, supply schedule). Skips staking tiers and revenue model — those are deeper investor content covered elsewhere on the site.

#### Litepaper sections (`src/app/whitepaper/sections/01-13.tsx`)
13 TSX files, one per section, each importing `LitepaperSection` and the relevant `meta` from `lib/litepaper.ts`. Content is distilled directly from the whitepaper PDF — skipping the educational fluff (no "what is a blockchain" / "what is a hash"), keeping the project-specific tech.

1. **Intro** — one-paragraph thesis + 4 stat cards (TPS, finality, validators, EVM).
2. **Architecture** — 3-layer stack (Application / Core / Storage). LevelDB + KhaosDB. Google Protobuf. RESTful HTTP fallback.
3. **Consensus** — DPoS basics, 27 Quarry Miners, 6hr rounds, 9999 QRC burn cost. **TaPoS callout** (transactions include a recent block hash — defends against DoS, 51%, selfish mining, double-spend). 3 node types (Witness / Full / Solidity).
4. **QVM** — forked from EVM, Solidity ^0.4.24, ~100% bytecode compatible. 4 properties grid: Lightweight, Robust, EVM-Compatible, Low Cost.
5. **Economics** — the 5,000 free daily bandwidth points (the killer feature). Bandwidth vs Energy (smart contracts use Energy, separate from bandwidth). Fixed fee table for the few operations that cost QRC.
6. **Token Standards** — QRC-10 vs QRC-20 (today, with the 1000× transfer cost difference called out). QRC-1400 + QRC-721 (roadmap).
7. **Real-World Asset Tokenization** — the most differentiated section. 5 asset categories grid (collectibles, metals, consumables, financial instruments, intangible assets), 4-step technical approach, 8 benefits.
8. **Governance** — 2-layer split: Quarry Mining (election + rewards, with the Vote Reward + Block Reward math at 230 QRC/round / 336,700 QRC/year) and the Committee (27 QM, 19/27 to pass, 3-day voting window, dynamic parameter changes without a hard fork).
9. **Tokenomics** — embeds 4 shared tokenomics components inline (allocation chart, breakdown, vesting, supply schedule). Demonstrates the refactor's payoff.
10. **Ecosystem & Tools** — core apps grid (QuarryWallet, QuarrySwap, QuarryScan, QVM) + dev toolchain grid (QuarryStudio, QuarryBox, QuarryGrid, QuarryWeb) + Shasta/mainnet callout.
11. **Roadmap** — 4-phase grid (inlined from `ROADMAP` constant, since the homepage `<Roadmap />` component has its own `<section id="roadmap">` wrapper that would conflict with `<LitepaperSection>`'s id).
12. **Team** — 6-person grid (inlined from `TEAM` constant for the same conflict reason).
13. **The Ask** — 2-paragraph close + 3 CTAs (Read the Docs, Join Discord, GitHub).

#### `/whitepaper/page.tsx`
- Stripped down to a clean composition: `PageHero` (kept the tetrahedron wireframe shape, dropped the page-counter animation since "81 pages" no longer makes sense), then `LitepaperLayout` containing all 13 section components in order.
- `metadata` updated for SEO (title + description focused on litepaper content, not "download PDF").

### Decisions
- **Static TSX over Sanity.** The litepaper isn't a blog — it's a marketing asset that gets rewritten every few months, and inline JSX makes it trivial to embed `<TokenAllocationChart />`, custom diagrams, and code blocks anywhere. The Sanity win (non-dev edits) didn't outweigh the friction of stuffing custom React through Portable Text.
- **Skip dedicated reading progress bar.** The global `ScrollProgress` in `app/layout.tsx` already renders a 2px gradient bar across every page. A litepaper-specific one would be duplicate UI.
- **Refactor `/tokenomics` first, then build litepaper §9.** Extracting the 7 tokenomics sections into shared components paid off twice: `/tokenomics` got cleaner (the page is now a server component composing client component children), and §9 got a concise import list instead of 200 lines of duplicated chart code.
- **Inline Roadmap and Team grids in §11/§12 instead of importing the homepage components.** The homepage `<Roadmap />` and `<Team />` render their own `<section id="roadmap">` and `<section id="team">` wrappers, which would have collided with `<LitepaperSection>`'s anchor IDs. Inlining the grid markup (with the `ROADMAP` and `TEAM` constants still as the source of truth) was simpler than refactoring the homepage components.
- **§13 Ask is litepaper-specific copy, not the homepage `<CTA />`.** The homepage CTA has a Three.js WireframeGem background that doesn't fit inside the litepaper grid layout and would feel disconnected from the rest of the long-form read.
- **Conflicts with the source PDF** (whitepaper is older than current site state) resolved in favor of the site: QRY symbol (PDF says QRC), $0.25 seed price (PDF says $0.05/$0.10), 5-slice tokenomics (PDF has 9), 100K TPS (PDF says 20K-100K range). Dropped the "Get Quality with Quarry" tagline and the "no inflation before Jan 1, 2022" governance note.

### Verification
- `pnpm build` exits 0. 19 routes built, `/whitepaper` is a static page in the route list. TypeScript pass at 85s. The pre-existing Recharts `width(-1)` warnings on the `SupplySchedule` chart are harmless — `ResponsiveContainer` has no measured size at SSG time, but the chart only renders client-side once `useInView` triggers.
- `pnpm tsc --noEmit` clean after the mobile drawer was added.
- Visual eyeball pass on `quarrychain-web.vercel.app/whitepaper` after the deploy — user confirmed "looks good". No deep scroll-spy / mobile-drawer interaction test yet, but the page renders, content is right, the hero loads, and section anchors are in place.

### Shipped
Three commits, pushed in order to `origin/main` (`d60bac7..d7b17d6`):
- **`9c57077`** refactor: extract /tokenomics sections into shared components (8 files changed, +622/-473)
- **`cdffa14`** feat: add /whitepaper as on-site litepaper (20 files changed, +1693/-95 — includes `.claude/launch.json` for future Claude Preview sessions)
- **`d7b17d6`** docs: log Session 6 (litepaper)

Vercel auto-deployed from the push (`quarrychain-tl52kb7na`, status ● Ready, 1m build time). Live at `quarrychain-web.vercel.app/whitepaper`.

### Issues / gotchas to address
- **§9 reuses 4 tokenomics components** that fit inside the litepaper content cell. The `TokenAllocationChart` uses a `lg:grid-cols-2` layout that may feel cramped at the litepaper width (~676px at lg, ~868px at xl). Worth a visual check.
- **Roadmap `sm:grid-cols-2` works fine** at the content cell width, but the homepage uses `md:grid-cols-4` — the litepaper version is intentionally narrower.
- **`/api/revalidate` webhook** still doesn't cover `/whitepaper`. Static page, no Sanity content, so this is fine for now — but if we ever move litepaper content into Sanity, the webhook needs to revalidate `/whitepaper` too.

### Current status of overall build
- Phase 1 (Homepage POC) — ✅ complete
- Phase 1.5 (V2 overhaul) — ✅ complete
- Phase 2 (Subpages) — ✅ complete
- Phase 3 — Tokenomics page ✅, Sanity CMS for blog ✅, Brand page enhancements ✅, **Litepaper ✅ (this session)**. Remaining: Team + Roadmap → Sanity (started Session 5, picking up later), light mode toggle, real social handles, brand PDF redesign, Sanity Studio team invites.
- Live on `quarrychain-web.vercel.app` — push triggers an auto-deploy.

## 2026-04-14 — Session 5: Git/Vercel Reconciliation + Phase 3 Planning

### What was built
No new feature code shipped. This was an infra/operations session:

- **Reconciled git ↔ Vercel state.** All of Session 4 (tokenomics page, Sanity CMS, brand geometric shapes) was live on `quarrychain-web.vercel.app` but had never been committed to GitHub — discovered the Vercel deployments had been pushed via `vercel --prod` CLI, bypassing git entirely. Working tree was 13 files modified + 6 untracked directories.
- **Committed Session 4 in 4 logical batches** and pushed to `origin/main`:
  - `4169c99` feat: integrate Sanity CMS for blog content (sanity config/lib/studio/api, blog data layer rewrite, PortableTextRenderer, PostCard cover images, Lenis /studio fix, Sanity deps)
  - `293c359` feat: add /tokenomics deep-dive page (route, sphere ShapeType, constants additions, Footer link)
  - `9b0f793` feat: add geometric shapes section to /brand page (DownloadableShape + brand/page.tsx updates)
  - `437fda5` docs: log Session 4
- **Confirmed Vercel auto-deploy from git is live.** The push triggered a fresh production build (`dpl_Ao1BnP9RrzU9wFiLTrWQaZKeRpN5`, status ● Ready). Verified via the `quarrychain-web-git-main-...` alias that Vercel only generates for git-sourced deploys, and confirmed the build output included `studio/[[...tool]]` and `api/revalidate` routes (proving Session 4 code shipped).
- **Set global git identity** to `garvonious-ui <258640365+garvonious-ui@users.noreply.github.com>` so future commits attribute to the GitHub profile (avatar, contribution graph) without exposing a real email. Existing 4 commits left as-is.
- **Started Phase 3 Sanity work.** Explored teamMember/roadmapPhase schemas, blog dual-mode pattern, and current Team.tsx/Roadmap.tsx components. Designed a full implementation plan but stopped before writing code — picking up next session.

### Decisions
- **Stop using `vercel --prod` CLI for deploys.** Git is now the single source of truth: commit → push → Vercel auto-builds. Mixing CLI deploys with git creates the exact "live but not in git" drift we just untangled.
- **GitHub noreply email format.** Used the standard `{userId}+{username}@users.noreply.github.com` pattern instead of a personal email — keeps the public repo's git history private while still attributing commits to the GitHub profile.
- **Did not force-push to rewrite the 4 commits' author.** Force-pushing main is destructive shared-state and would invalidate the SHAs Vercel's deployment record points at. The cosmetic mismatch (4 commits show `Lou Cesario <loucesario@MacBook-Air-8.local>`, everything from now uses the GitHub identity) is acceptable.
- **Team + Roadmap → Sanity will mirror the blog dual-mode pattern.** New `src/lib/team.ts` and `src/lib/roadmap.ts` files, NOT modifications to `constants.ts`. Constants stay as the fallback exactly like blog MDX files do, so local dev without Sanity env vars still works.
- **Will convert Team.tsx and Roadmap.tsx from client to async server components.** BlurFade child stays a client component — server parent + client child works fine in App Router.

### Issues / gotchas to address
- **3 errored deployments in Vercel history from ~24h ago.** Latest production is healthy, but worth a glance at the logs next time we're in Vercel to make sure nothing structural is broken.
- **`/api/revalidate` webhook only revalidates blog tags right now (presumably).** When team/roadmap go to Sanity, need to either extend the webhook to cover the homepage `/` path, OR add `export const revalidate = 60` to `src/app/page.tsx`. Either works; need to pick one.
- **Sanity dataset has no team/roadmap content yet.** Studio will be empty for those types until either we seed it with a migration script (mirror what was done for blog posts) or the user manually populates via Studio.

### Current status of overall build
- Phase 1 (Homepage POC) — ✅ complete
- Phase 1.5 (V2 overhaul) — ✅ complete
- Phase 2 (Subpages: /technology, /developers, /ecosystem, /blog, /whitepaper, /privacy) — ✅ complete
- Phase 3 — Tokenomics page ✅, Sanity CMS for blog ✅, Brand page enhancements ✅. Started: Team + Roadmap → Sanity. Remaining: light mode toggle, real social handles, whitepaper PDF, Sanity Studio team invites.
- **Live on `quarrychain-web.vercel.app`** with auto-deploy from `main` branch pushes confirmed working.

## 2026-04-13 — Session 4: Tokenomics Page + Sanity CMS

### /tokenomics Page
- Created full deep-dive tokenomics page with 7 content sections
- Enhanced donut chart (larger, interactive legend sync)
- Allocation breakdown with SpotlightCards, vesting pills, and lock icons
- Token utility timeline (5 use cases: gas, staking, rewards, deployment, tokenization)
- Vesting schedule with per-allocation progress bars and milestone pills
- Supply schedule stacked AreaChart showing cumulative unlock over 48 months
- Staking rewards grid with 4 tiers (Bronze/Silver/Gold/Diamond), APR + NumberTicker
- Revenue model cards (3 streams) + deflationary pressure callout
- Added "sphere" as 6th ShapeType to WireframeShape (purple/teal/blue)
- Added Tokenomics to NAV_LINKS and Footer
- Expanded constants.ts with TOKENOMICS_DETAILS, TOKEN_UTILITY, VESTING_SCHEDULE, STAKING_TIERS, REVENUE_STREAMS

### Sanity CMS Integration
- Installed sanity, next-sanity, @sanity/client, @portabletext/react, @sanity/image-url, @sanity/vision
- Created Sanity schemas: blogPost (Portable Text body), teamMember, roadmapPhase
- Created sanity.config.ts at project root
- Embedded Sanity Studio at /studio via NextStudio
- Rewrote blog.ts to async dual-mode: Sanity when NEXT_PUBLIC_SANITY_PROJECT_ID is set, MDX file fallback otherwise
- Blog pages now use ISR with 60s revalidation
- Created PortableTextRenderer component with styled blocks, marks, and lists
- Created /api/revalidate webhook for on-demand revalidation from Sanity
- Existing MDX content preserved — zero breaking changes when Sanity is not configured

### Sanity Live Setup
- Created Sanity project (ID: owhgeovj) under Quarry Labs organization
- Authenticated via GitHub, added CORS origins for localhost:3000 and quarrychain.network
- Added env vars to .env.local AND Vercel production (project ID, dataset, webhook secret)
- Installed @sanity/code-input plugin (fixed schema error for code blocks in body)
- Added basePath: "/studio" to sanity.config.ts (fixed "Tool not found: studio" routing error)
- Made Sanity client lazy (getSanityClient) — was failing build-time projectId validation
- Lazy-loaded sanity.config.ts in Studio page via dynamic import
- Made Studio page a fullscreen fixed overlay (z-9999) so it's not constrained by site layout
- Disabled Lenis smooth scroll on /studio routes — Lenis was hijacking all scroll events globally and preventing the Studio's internal scroll containers from working
- Migrated all 4 existing MDX blog posts into Sanity dataset via @sanity/client write API
- Added cover image field to blogPost schema (with hotspot + alt text)
- Created /lib/sanity/image.ts with urlFor() helper using @sanity/image-url
- Updated PostCard to display cover image (16:9 aspect, hover zoom)
- Updated blog post detail page to display hero image between metadata and body

### Brand Page
- Added "Geometric Shapes" section with all 6 wireframe geometries (torusKnot, octahedron, dodecahedron, icosahedron, tetrahedron, sphere)
- Created DownloadableShape component — renders Three.js wireframe in card with PNG download button
- PNG export uses preserveDrawingBuffer + offscreen renderer at 1024x1024 with transparent background
- Section assignment legend showing which shape is used on which page

### Decisions
- Dual-mode blog: no Sanity account required for local dev — MDX files work exactly as before
- Team and roadmap schemas defined but not yet wired to components (ready for Phase 3+)
- Revalidation set to 60s — fast enough for blog content, gentle on Sanity CDN
- Studio rendered as fullscreen overlay rather than embedded in main layout — cleanest way to bypass site chrome (navbar, footer, smooth scroll, cursor glow)
- Lenis disabled on /studio routes specifically (not removed entirely) — site keeps its smooth scroll, Studio gets native scroll behavior
- PNG export captures current rotation from live preview so the downloaded image matches what the user sees

## 2026-04-10 — Session 2: V2 Homepage Overhaul
- Removed ProblemSolution and HowDPoSWorks from homepage (kept files for future /technology page)
- Created StatsBar section — 5-column stat bar (TPS, Finality, Fees, Validators, EVM) with NumberTicker animations, responsive 3+2 mobile layout
- Created DeveloperCTA section — two-column with Solidity code block, syntax highlighting, copy-to-clipboard, EVM compatibility badges, "Read the Docs" / "View on GitHub" CTAs
- Created GovernancePreview section — 27-node circular visualization with 3 active highlights, slow rotation, governance stats row
- Updated Features — removed "Built Different" header and subtitle titles, tightened card copy to max 2 sentences
- Updated Ecosystem — headline changed to "One chain. Everything you need.", tightened taglines
- Updated Tokenomics — fixed symbol QRC → QRY, consolidated 9 chart slices to 5
- Updated CTA — "Start building on QuarryChain." (statement not question), "Read the Docs" / "Join Discord"
- Updated Footer — removed "Get quality, with quarry." tagline
- Updated constants.ts — new ecosystem taglines, consolidated tokenomics allocation, QRY symbol fix
- New page.tsx section order: Hero → StatsBar → AsSeenIn → Features → DeveloperCTA → Ecosystem → GovernancePreview → LiveStats → Tokenomics → Roadmap → Team → CTA → Footer

### Decisions
- ProblemSolution/HowDPoSWorks are educational content, not homepage content — moved to Phase 2 /technology page
- DeveloperCTA is critical — every serious L1 needs a "deploy in 5 lines" section
- Tokenomics consolidated from 9 to 5 slices for cleaner visualization
- Copy direction: stop explaining, start stating. Solana doesn't justify, neither should we.

### Remaining
- Responsive testing across all new sections
- Social link hrefs still placeholder
- LiveStats may show zeros if testnet API unavailable — consider gating

## 2026-04-08 — Session 1
- Initialized full project structure: CLAUDE.md, docs/, .claude/commands/, .claude/rules/
- Created Next.js 15 + TypeScript + Tailwind CSS 4 project with pnpm
- Installed all deps: framer-motion, gsap, three, recharts, lucide-react, swr, clsx, tailwind-merge
- Configured dark theme with QuarryChain brand tokens in globals.css
- Set up fonts: Space Grotesk (display), Inter (body), JetBrains Mono (mono)
- Built all 10 homepage sections with real content (not placeholders)
- Built animated UI components: BlurFade (scroll-triggered entrance), NumberTicker (animated counters), SpotlightCard (mouse-tracking glow), AnimatedGradientText
- Built Three.js HexGrid hero: hexagonal wireframe mesh with sine-wave deformation + mouse-reactive ripple, proper disposal on unmount, reduced-motion support
- Wired up SWR polling for Blockscout API live stats with fallback values
- All sections have BlurFade scroll-triggered entrance animations with stagger
- prefers-reduced-motion support in globals.css and Three.js hero
- Production build passes clean, dev server serves correctly

### Decisions
- Used Framer Motion variant labels (not inline Variant objects) to avoid type conflicts
- Recharts Tooltip formatter uses untyped `value` param for compatibility
- Three.js hex grid uses ~900 hexagons (gridSize=16) — good visual density without perf issues
- No GSAP ScrollTrigger yet — Framer Motion's useInView handles scroll reveals well enough for now

### Remaining for Polish
- OG image and favicon from client
- Logo SVG from client
- DPoS orbit animation (nice-to-have)
- Node visualization diagram (nice-to-have)
- Responsive fine-tuning once visuals are reviewed in browser
- Vercel deployment config
