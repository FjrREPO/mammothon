import { z } from "zod";
import { OrderSchema, PageInfoSchema } from "./base.types";

const TradeSchema = z.object({
  id: z.string(),
  order: OrderSchema,
});

const TradeListSchema = z.object({
  items: z.array(TradeSchema),
  pageInfo: PageInfoSchema,
  totalCount: z.number(),
});

export const QueryTradeIdSchema = z.object({
  trades: z.array(TradeSchema),
});

export const QueryTradesListSchema = z.object({
  tradess: TradeListSchema,
});

export const QueryTradesIdSchema = z.object({
  tradess: TradeListSchema,
});

export type QueryTradeId = z.infer<typeof QueryTradeIdSchema>;
export type QueryTradesList = z.infer<typeof QueryTradesListSchema>;
export type QueryTradesId = z.infer<typeof QueryTradesIdSchema>;