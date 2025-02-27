import { queryDailyBucketsList } from "@/graphql/indexer/buckets/daily-bucket.query";
import { QueryDailyBucketsList } from "@/types/query/graphql/buckets/daily-bucket.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

interface cDataItem {
  open: number,
  close: number,
  high: number,
  low: number,
  time: string
}

export const useDailyBucketsList = () => {
  const { data, isLoading, error, refetch } = useQuery<QueryDailyBucketsList>({
    queryKey: ['gql-daily-buckets-list'],
    queryFn: async () => {
      return await request(
        process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
        queryDailyBucketsList()
      );
    },
    refetchInterval: 10000,
    staleTime: 10000
  })

  const cData:cDataItem[] = data ? 
  [
    {
      open: parseInt(data.dailyBucketss.items[0].open),
      close: parseInt(data.dailyBucketss.items[0].close),
      high: parseInt(data.dailyBucketss.items[0].high),
      low: parseInt(data.dailyBucketss.items[0].low),
      time: data.dailyBucketss.items[0].timestamp
    }
  ] : [
    {
      open: 0,
      close: 0,
      high: 0,
      low: 0,
      time: new Date().toISOString().split("T")[0]
    }
  ]

  return {
    cdbData: cData,
    dbData: data,
    dbLoading: isLoading,
    dbError: error,
    dbRefetch: refetch,
  }
}