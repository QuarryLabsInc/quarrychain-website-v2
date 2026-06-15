# API Routes & Data Sources

## Blockscout API (Testnet)

Base URL: `https://explorer.testnet.quarrychain.network`

### Endpoints
```
GET /api/v2/stats                    → total blocks, transactions, addresses
GET /api/v2/blocks?type=block        → latest blocks
GET /api/v2/stats/charts/market      → if token is listed
```

### Usage
- Client component with SWR for polling (every 15s)
- Graceful fallback to static numbers if API unavailable
- Environment variable: `NEXT_PUBLIC_BLOCKSCOUT_URL`

### Expected Response Fields (stats)
- Total blocks
- Total transactions
- Total addresses
- Average block time

## Static Data Sources (from whitepaper/pitch deck)

All static data lives in `src/lib/constants.ts`:

### Tokenomics Allocation (V2 — consolidated)
| Category | Percentage |
|---|---|
| Public Sale & Liquidity | 30% |
| Staking & Farming | 20% |
| Team | 20% |
| Ecosystem & Growth | 15% |
| Private & Angel Rounds | 15% |

### Token Details
- Total Supply: 200,000,000 QRY
- Symbol: QRY
- Decimals: 18
- Seed Price: $0.25 (50% discount)

### Revenue Model
- 0.25% transaction fees
- Smart contract deployment fees
- 1% asset tokenization commission
