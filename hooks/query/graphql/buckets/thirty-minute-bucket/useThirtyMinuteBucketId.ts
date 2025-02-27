import { queryThirtyMinuteBucketId } from "@/graphql/indexer/buckets/thirty-minute-bucket.query";
import { QueryThirtyMinuteBucketId } from "@/types/query/graphql/buckets/thirty-minute-bucket.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useThirtyMinuteBucket = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<QueryThirtyMinuteBucketId>({
    queryKey: ['gql-thirty-minute-bucket-id', id],
    queryFn: async () => {
      if (id) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryThirtyMinuteBucketId(((id).toString()).toLowerCase())
        );
      }

      return { thirtyMinuteBuckets: [] };
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