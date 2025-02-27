import { z } from "zod";
import { PageInfoSchema } from "../base.types";

const MinuteBucketSchema = z.object({
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

const MinuteBucketsListSchema = z.object({
  items: z.array(MinuteBucketSchema),
  pageInfo: PageInfoSchema,
  totalCount: z.number(),
});

export const QueryMinuteBucketIdSchema = z.object({
  minuteBuckets: z.array(MinuteBucketSchema),
});

export const QueryMinuteBucketsListSchema = z.object({
  minuteBucketss: MinuteBucketsListSchema,
});

export const QueryMinuteBucketsIdSchema = z.object({
  minuteBucketss: MinuteBucketsListSchema,
});

export type QueryMinuteBucketId = z.infer<typeof QueryMinuteBucketIdSchema>;
export type QueryMinuteBucketsList = z.infer<typeof QueryMinuteBucketsListSchema>;
export type QueryMinuteBucketsId = z.infer<typeof QueryMinuteBucketsIdSchema>;