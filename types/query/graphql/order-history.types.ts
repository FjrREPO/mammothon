import { z } from "zod";
import { UserSchema, PageInfoSchema, PoolSchema } from "./base.types";

const OrderSchema = z.object({
  expiry: z.string(),
  filled: z.string(),
  id: z.string(),
  orderId: z.string(),
  poolId: z.string(),
  price: z.string(),
  quantity: z.string(),
  side: z.string(),
  status: z.string(),
  timestamp: z.string(),
  type: z.string(),
  user: UserSchema,
});

const OrderHistorySchema = z.object({
  filled: z.string(),
  id: z.string(),
  order: OrderSchema,
  orderId: z.string(),
  pool: PoolSchema,
  poolId: z.string(),
  status: z.string(),
  timestamp: z.string(),
});

const OrderHistoryListSchema = z.object({
  items: z.array(OrderHistorySchema),
  pageInfo: PageInfoSchema,
  totalCount: z.number(),
});

export const QueryOrderHistoryIdSchema = z.object({
  orderHistory: z.array(OrderHistorySchema),
});

export const QueryOrderHistorysListSchema = z.object({
  orderHistorys: OrderHistoryListSchema,
});

export const QueryOrderHistorysIdSchema = z.object({
  orderHistorys: OrderHistoryListSchema,
});

export const QueryOrderHistorysUserSchema = z.object({
  orderHistorys: OrderHistoryListSchema,
});

export type QueryOrderHistoryId = z.infer<typeof QueryOrderHistoryIdSchema>;
export type QueryOrderHistorysList = z.infer<typeof QueryOrderHistorysListSchema>;
export type QueryOrderHistorysId = z.infer<typeof QueryOrderHistorysIdSchema>;
export type QueryOrderHistorysUser = z.infer<typeof QueryOrderHistorysUserSchema>;