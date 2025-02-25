import { z } from "zod";

export const PageInfoSchema = z.object({
  endCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
  startCursor: z.string().nullable(),
});

export const UserSchema = z.object({
  amount: z.string(),
  currency: z.string(),
  lockedAmount: z.string(),
  user: z.string(),
});

export const PoolSchema = z.object({
  baseCurrency: z.string(),
  coin: z.string(),
  id: z.string(),
  lotSize: z.string(),
  maxOrderAmount: z.string(),
  orderBook: z.string(),
  quoteCurrency: z.string(),
  timestamp: z.string(),
});

export const OrderSchema = z.object({
  expiry: z.string(),
  filled: z.string(),
  id: z.any().nullable().optional(),
  orderId: z.string(),
  poolId: z.string(),
  price: z.string(),
  quantity: z.string(),
  side: z.string(),
  status: z.string(),
  timestamp: z.string(),
  type: z.string(),
  user: UserSchema,
  pool: PoolSchema.optional(),
});