import { z } from "zod";
import { PageInfoSchema } from "./base.types";

const HourBucketSchema = z.object({
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

const HourBucketsListSchema = z.object({
  items: z.array(HourBucketSchema),
  pageInfo: PageInfoSchema,
  totalCount: z.number(),
});

export const QueryHourBucketIdSchema = z.object({
  hourBuckets: z.array(HourBucketSchema),
});

export const QueryHourBucketsListSchema = z.object({
  hourBucketss: HourBucketsListSchema,
});

export const QueryHourBucketsIdSchema = z.object({
  hourBucketss: HourBucketsListSchema,
});

export type QueryHourBucketId = z.infer<typeof QueryHourBucketIdSchema>;
export type QueryHourBucketsList = z.infer<typeof QueryHourBucketsListSchema>;
export type QueryHourBucketsId = z.infer<typeof QueryHourBucketsIdSchema>;