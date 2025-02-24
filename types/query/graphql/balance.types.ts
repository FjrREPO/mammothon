import { z } from "zod";
import { PageInfoSchema } from "./base.types";

const BalanceSchema = z.object({
  amount: z.string(),
  currency: z.string(),
  lockedAmount: z.string(),
  user: z.string(),
});

const BalancesListSchema = z.object({
  items: z.array(BalanceSchema),
  pageInfo: PageInfoSchema,
  totalCount: z.number(),
});

export const QueryBalanceUserSchema = z.object({
  balances: z.array(BalanceSchema),
});

export const QueryBalancesListSchema = z.object({
  balancess: BalancesListSchema,
});

export const QueryBalancesUserSchema = z.object({
  balancess: BalancesListSchema,
});

export type QueryBalanceUser = z.infer<typeof QueryBalanceUserSchema>;
export type QueryBalancesList = z.infer<typeof QueryBalancesListSchema>;
export type QueryBalancesUser = z.infer<typeof QueryBalancesUserSchema>;