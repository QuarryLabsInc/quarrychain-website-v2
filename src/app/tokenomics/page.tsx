import PageHero from "@/components/layout/PageHero";
import PageCTA from "@/components/layout/PageCTA";
import BlurFade from "@/components/ui/blur-fade";
import TokenAllocationChart from "@/components/sections/tokenomics/TokenAllocationChart";
import AllocationBreakdown from "@/components/sections/tokenomics/AllocationBreakdown";
import TokenUtility from "@/components/sections/tokenomics/TokenUtility";
import VestingTimeline from "@/components/sections/tokenomics/VestingTimeline";
import SupplySchedule from "@/components/sections/tokenomics/SupplySchedule";
import StakingRewards from "@/components/sections/tokenomics/StakingRewards";
import RevenueModel from "@/components/sections/tokenomics/RevenueModel";

export default function TokenomicsPage() {
  return (
    <div className="pt-16">
      <PageHero
        label="Tokenomics"
        headline="Quarry (QRY)"
        subheadline="200 million tokens. Transparent allocation. Built-in deflation."
        shape="sphere"
        shapeColors={{
          primary: "#a855f7",
          secondary: "#14b8a6",
          tertiary: "#3b82f6",
        }}
        showTokenInHeadline
      />

      {/* Token Allocation */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">
              Allocation
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16">
              How QRY is{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">
                distributed.
              </span>
            </h2>
          </BlurFade>
          <TokenAllocationChart />
        </div>
      </section>

      {/* Allocation Breakdown */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-blue font-mono mb-4">
              Breakdown
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16">
              Every token{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-blue to-qc-teal">
                accounted for.
              </span>
            </h2>
          </BlurFade>
          <AllocationBreakdown />
        </div>
      </section>

      {/* Token Utility */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">
              Utility
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16">
              What QRY{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">
                powers.
              </span>
            </h2>
          </BlurFade>
          <TokenUtility />
        </div>
      </section>

      {/* Vesting Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-blue font-mono mb-4">
              Vesting
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Token{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-blue to-qc-teal">
                unlock schedule.
              </span>
            </h2>
            <p className="text-text-secondary text-lg mb-16 max-w-2xl">
              Gradual release over 48 months. Team tokens locked for 12 months. No sudden supply shocks.
            </p>
          </BlurFade>
          <VestingTimeline />
        </div>
      </section>

      {/* Supply Schedule */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">
              Supply
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Circulating supply{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">
                over time.
              </span>
            </h2>
            <p className="text-text-secondary text-lg mb-16 max-w-2xl">
              Cumulative token release across all allocations. Full circulation reached at month 48.
            </p>
          </BlurFade>
          <SupplySchedule />
        </div>
      </section>

      {/* Staking Rewards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">
              Staking
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Stake QRY.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">
                Earn rewards.
              </span>
            </h2>
            <p className="text-text-secondary text-lg mb-16 max-w-2xl">
              Higher stakes earn higher APR. Rewards are distributed alongside Quarry Miner elections.
            </p>
          </BlurFade>
          <StakingRewards />
        </div>
      </section>

      {/* Revenue Model */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-blue font-mono mb-4">
              Revenue
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Sustainable{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-blue to-qc-green">
                revenue model.
              </span>
            </h2>
            <p className="text-text-secondary text-lg mb-16 max-w-2xl">
              Three revenue streams fund network operations, development, and community rewards.
            </p>
          </BlurFade>
          <RevenueModel />
        </div>
      </section>

      <PageCTA
        headline="Explore the QuarryChain ecosystem."
        ctas={[
          { text: "Read Litepaper", href: "/whitepaper", primary: true },
          { text: "Start Building", href: "/developers" },
        ]}
      />
    </div>
  );
}
