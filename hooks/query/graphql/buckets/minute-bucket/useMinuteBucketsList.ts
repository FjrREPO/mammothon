import { queryMinuteBucketsList } from "@/graphql/indexer/buckets/minute-bucket.query";
import { QueryMinuteBucketsList } from "@/types/query/graphql/buckets/minute.bucket.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

interface cDataItem {
  open: number,
  close: number,
  high: number,
  low: number,
  time: string
}

export const useMinuteBucketsList = () => {
  const { data, isLoading, error, refetch } = useQuery<QueryMinuteBucketsList>({
    queryKey: ['gql-minute-buckets-list'],
    queryFn: async () => {
      return await request(
        process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
        queryMinuteBucketsList()
      );
    },
    refetchInterval: 10000,
    staleTime: 10000
  })

  let cdata:cDataItem[] = [];

  if (data) {
    const sortedData = data.minuteBucketss.items.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    cdata = sortedData.map(item => ({
      open: parseInt(item.open),
      close: parseInt(item.close),
      high: parseInt(item.high),
      low: parseInt(item.low),
      time: item.timestamp
    }))
  } else {
    cdata = [{
      open: 0,
      close: 0,
      high: 0,
      low: 0,
      time: new Date().toISOString().split("T")[0]
    }]
  }

  return {
    cmbData: cdata,
    mbData: data,
    mbLoading: isLoading,
    mbError: error,
    mbRefetch: refetch,
  }
}