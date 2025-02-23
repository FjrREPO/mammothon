import { z } from 'zod';

export const MarketDataCMCSchema = z.object({
  currentPrice: z.number(),
  marketCap: z.number(),
  totalVolume: z.number(),
  priceChangePercentage24h: z.number(),
})

export type MarketDataCMC = z.infer<typeof MarketDataCMCSchema>