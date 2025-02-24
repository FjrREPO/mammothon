import { z } from "zod";
import { PageInfoSchema, OrderSchema } from "./base.types";

const OrderListSchema = z.object({
  items: z.array(OrderSchema),
  pageInfo: PageInfoSchema,
  totalCount: z.number(),
});

export const QueryOrderIdSchema = z.object({
  orders: z.array(OrderSchema),
});

export const QueryOrdersListSchema = z.object({
  orderss: OrderListSchema,
});

export const QueryOrdersUserSchema = z.object({
  orderss: OrderListSchema,
});

export const QueryOrdersIdSchema = z.object({
  orderss: OrderListSchema,
});

export type QueryOrderId = z.infer<typeof QueryOrderIdSchema>;
export type QueryOrdersList = z.infer<typeof QueryOrdersListSchema>;
export type QueryOrdersUser = z.infer<typeof QueryOrdersUserSchema>;
export type QueryOrdersId = z.infer<typeof QueryOrdersIdSchema>;