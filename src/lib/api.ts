const BLOCKSCOUT_URL =
  process.env.NEXT_PUBLIC_BLOCKSCOUT_URL || "https://explorer.testnet.quarrychain.network";

export interface NetworkStats {
  totalBlocks: number;
  totalTransactions: number;
  activeAddresses: number;
  avgBlockTime: string;
}

export async function fetchNetworkStats(): Promise<NetworkStats | null> {
  try {
    const res = await fetch(`${BLOCKSCOUT_URL}/api/v2/stats`, {
      next: { revalidate: 15 },
    });

    if (!res.ok) return null;

    const data = await res.json();

    return {
      totalBlocks: Number(data.total_blocks) || 0,
      totalTransactions: Number(data.total_transactions) || 0,
      activeAddresses: Number(data.total_addresses) || 0,
      avgBlockTime: data.average_block_time
        ? `${(Number(data.average_block_time) / 1000).toFixed(1)}s`
        : "3.0s",
    };
  } catch {
    return null;
  }
}
