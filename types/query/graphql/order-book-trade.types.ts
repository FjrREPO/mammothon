import { z } from "zod";
import { PageInfoSchema } from "./base.types";

const OrderBookTradeSchema = z.object({
  amount: z.string(),
  blockTimestamp: z.string(),
  id: z.string(),
  poolId: z.string(),
  price: z.string(),
  tokenIn: z.string(),
  tokenOut: z.string(),
  transactionHash: z.string(),
});

const OrderBookTradesListSchema = z.object({
  items: z.array(OrderBookTradeSchema),
  pageInfo: PageInfoSchema,
  totalCount: z.number(),
});

export const QueryOrderBookTradeIdSchema = z.object({
  orderBookTrades: z.array(OrderBookTradeSchema),
});

export const QueryOrderBookTradesListSchema = z.object({
  orderBookTradess: OrderBookTradesListSchema,
});

export const QueryOrderBookTradesIdSchema = z.object({
  orderBookTradess: OrderBookTradesListSchema,
});

export type QueryOrderBookTradeId = z.infer<typeof QueryOrderBookTradeIdSchema>;
export type QueryOrderBookTradesList = z.infer<typeof QueryOrderBookTradesListSchema>;
export type QueryOrderBookTradesId = z.infer<typeof QueryOrderBookTradesIdSchema>;