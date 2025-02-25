import { z } from "zod";
import { PageInfoSchema } from "./base.types";

const MatchOrderEvent = z.object({
    id: z.string(),
    is_market: z.boolean(),
    is_buy: z.boolean(),
    order_index: z.string(),
    tick: z.string(),
    timestamp: z.number(),
    user: z.string(),
    volume: z.string(),
});

const MatchOrderEventSchema = z.object({
  items: z.array(MatchOrderEvent),
  pageInfo: PageInfoSchema,
});

export const MatchOrderSchema = z.object({
  matchOrderEvent: MatchOrderEventSchema,
});

export type MatchOrder = z.infer<typeof MatchOrderSchema>;