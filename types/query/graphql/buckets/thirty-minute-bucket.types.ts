import { z } from "zod";
import { PageInfoSchema } from "../base.types";

const ThirtyMinuteBucketSchema = z.object({
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

const ThirtyMinuteBucketsListSchema = z.object({
  items: z.array(ThirtyMinuteBucketSchema),
  pageInfo: PageInfoSchema,
  totalCount: z.number(),
});

export const QueryThirtyMinuteBucketIdSchema = z.object({
  thirtyMinuteBuckets: z.array(ThirtyMinuteBucketSchema),
});

export const QueryThirtyMinuteBucketsListSchema = z.object({
  thirtyMinuteBucketss: ThirtyMinuteBucketsListSchema,
});

export const QueryThirtyMinuteBucketsIdSchema = z.object({
  thirtyMinuteBucketss: ThirtyMinuteBucketsListSchema,
});

export type QueryThirtyMinuteBucketId = z.infer<typeof QueryThirtyMinuteBucketIdSchema>;
export type QueryThirtyMinuteBucketsList = z.infer<typeof QueryThirtyMinuteBucketsListSchema>;
export type QueryThirtyMinuteBucketsId = z.infer<typeof QueryThirtyMinuteBucketsIdSchema>;