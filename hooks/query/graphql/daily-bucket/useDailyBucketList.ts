import { queryDailyBucketsList } from "@/graphql/indexer/daily-bucket.query";
import { QueryDailyBucketsList } from "@/types/query/graphql/daily-bucket.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useDailyBucketsList = () => {
  const { data, isLoading, error, refetch } = useQuery<QueryDailyBucketsList>({
    queryKey: ['gql-daily-buckets-list'],
    queryFn: async () => {
      return await request(process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", queryDailyBucketsList());
    },
    refetchInterval: 10000,
    staleTime: 10000
  })

  return {
    dbData: data,
    dbLoading: isLoading,
    dbError: error,
    dbRefetch: refetch,
  }
}