import { z } from "zod";
import { PoolSchema, PageInfoSchema } from "./base.types";

const PoolListSchema = z.object({
  items: z.array(PoolSchema),
  pageInfo: PageInfoSchema,
  totalCount: z.number(),
});

export const QueryPoolIdSchema = z.object({
  pools: z.array(PoolSchema),
});

export const QueryPoolsListSchema = z.object({
  poolss: PoolListSchema,
});

export const QueryPoolsIdSchema = z.object({
  poolss: PoolListSchema,
});

export type QueryPoolId = z.infer<typeof QueryPoolIdSchema>;
export type QueryPoolsList = z.infer<typeof QueryPoolsListSchema>;
export type QueryPoolsId = z.infer<typeof QueryPoolsIdSchema>;