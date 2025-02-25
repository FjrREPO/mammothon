import { queryDailyBucketsId } from "@/graphql/indexer/daily-bucket.query";
import { QueryDailyBucketsId } from "@/types/query/graphql/daily-bucket.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useDailyBuckets = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<QueryDailyBucketsId>({
    queryKey: ['gql-daily-buckets-id', id],
    queryFn: async () => {
      if (id) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryDailyBucketsId(((id).toString()).toLowerCase())
        );
      }

      return { dailyBucketss: { items: [], pageInfo: { endCursor: null, hasNextPage: false, hasPreviousPage: false, startCursor: null }, totalCount: 0 } };
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