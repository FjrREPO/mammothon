import { queryDailyBucketId } from "@/graphql/indexer/daily-bucket.query";
import { QueryDailyBucketId } from "@/types/query/graphql/daily-bucket.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useDailyBucket = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<QueryDailyBucketId>({
    queryKey: ['gql-daily-bucket-id', id],
    queryFn: async () => {
      if (id) {
        return await request(process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", queryDailyBucketId(((id).toString()).toLowerCase()));
      }

      return { dailyBuckets: [] };
    },
    enabled: !!id,
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