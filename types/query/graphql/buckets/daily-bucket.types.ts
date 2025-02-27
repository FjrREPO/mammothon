import { z } from "zod";
import { PageInfoSchema } from "../base.types";

const DailyBucketSchema = z.object({
  average: z.string(),
  close: z.string(),
  count: z.string(),
  high: z.string(),
  id: z.string(),
  low: z.string(),
  open: z.string(),
  poolId: z.string(),
  timestamp: z.string(),
});

const DailyBucketsListSchema = z.object({
  items: z.array(DailyBucketSchema),
  pageInfo: PageInfoSchema,
  totalCount: z.number(),
});

export const QueryDailyBucketIdSchema = z.object({
  dailyBuckets: z.array(DailyBucketSchema),
});

export const QueryDailyBucketsListSchema = z.object({
  dailyBucketss: DailyBucketsListSchema,
});

export const QueryDailyBucketsIdSchema = z.object({
  dailyBucketss: DailyBucketsListSchema,
});

export type QueryDailyBucketId = z.infer<typeof QueryDailyBucketIdSchema>;
export type QueryDailyBucketsList = z.infer<typeof QueryDailyBucketsListSchema>;
export type QueryDailyBucketsId = z.infer<typeof QueryDailyBucketsIdSchema>;