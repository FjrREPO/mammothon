import { queryHourBucketsList } from "@/graphql/indexer/buckets/hour-bucket.query";
import { QueryHourBucketsList } from "@/types/query/graphql/buckets/hour-bucket";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

interface cDataItem {
  open: number,
  close: number,
  high: number,
  low: number,
  time: string
}

export const useHourBucketsList = () => {
  const { data, isLoading, error, refetch } = useQuery<QueryHourBucketsList>({
    queryKey: ['gql-hour-buckets-list'],
    queryFn: async () => {
      return await request(
        process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
        queryHourBucketsList()
      );
    },
    refetchInterval: 10000,
    staleTime: 10000
  })

  const cData:cDataItem[] = data ? 
  data.hourBucketss.items.map( 
    item => ({
      open: parseInt(item.open),
      close: parseInt(item.close),
      high: parseInt(item.high),
      low: parseInt(item.low),
      time: item.timestamp
    })
  ) : [
    {
      open: 0,
      close: 0,
      high: 0,
      low: 0,
      time: new Date().toISOString().split("T")[0]
    }
  ]

  return {
    chbData: cData,
    hbData: data,
    hbLoading: isLoading,
    hbError: error,
    hbRefetch: refetch,
  }
}