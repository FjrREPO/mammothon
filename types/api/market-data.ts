import { z } from 'zod';

export const MarketDataSchema = z.object({
  time: z.string(),
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
})

export type MarketData = z.infer<typeof MarketDataSchema>