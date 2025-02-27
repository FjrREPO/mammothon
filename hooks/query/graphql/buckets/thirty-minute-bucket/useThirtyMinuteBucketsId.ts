import { queryThirtyMinuteBucketsId } from "@/graphql/indexer/buckets/thirty-minute-bucket.query";
import { QueryThirtyMinuteBucketsId } from "@/types/query/graphql/buckets/thirty-minute-bucket.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useThirtyMinuteBuckets = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<QueryThirtyMinuteBucketsId>({
    queryKey: ['gql-thirty-minute-buckets-id', id],
    queryFn: async () => {
      if (id) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryThirtyMinuteBucketsId(((id).toString()).toLowerCase())
        );
      }

      return { thirtyMinuteBucketss: { items: [], pageInfo: { endCursor: null, hasNextPage: false, hasPreviousPage: false, startCursor: null }, totalCount: 0 } };
    },
    enabled: !!id,
    refetchInterval: 10000,
    staleTime: 10000
  })

  return {
    tmbData: data,
    tmbLoading: isLoading,
    tmbError: error,
    tmbRefetch: refetch,
  }
}