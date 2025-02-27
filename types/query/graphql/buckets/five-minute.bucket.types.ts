import { z } from "zod";
import { PageInfoSchema } from "../base.types";

const FiveMinuteBucketSchema = z.object({
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

const FiveMinuteBucketsListSchema = z.object({
  items: z.array(FiveMinuteBucketSchema),
  pageInfo: PageInfoSchema,
  totalCount: z.number(),
});

export const QueryFiveMinuteBucketIdSchema = z.object({
  fiveMinuteBuckets: z.array(FiveMinuteBucketSchema),
});

export const QueryFiveMinuteBucketsListSchema = z.object({
  fiveMinuteBucketss: FiveMinuteBucketsListSchema,
});

export const QueryFiveMinuteBucketsIdSchema = z.object({
  fiveMinuteBucketss: FiveMinuteBucketsListSchema,
});

export type QueryFiveMinuteBucketId = z.infer<typeof QueryFiveMinuteBucketIdSchema>;
export type QueryFiveMinuteBucketsList = z.infer<typeof QueryFiveMinuteBucketsListSchema>;
export type QueryFiveMinuteBucketsId = z.infer<typeof QueryFiveMinuteBucketsIdSchema>;