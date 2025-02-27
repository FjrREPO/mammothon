import { queryFiveMinuteBucketId } from "@/graphql/indexer/buckets/five-minute-bucket.query";
import { QueryFiveMinuteBucketId } from "@/types/query/graphql/buckets/five-minute.bucket.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useFiveMinuteBucket = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<QueryFiveMinuteBucketId>({
    queryKey: ['gql-five-minute-bucket-id', id],
    queryFn: async () => {
      if (id) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryFiveMinuteBucketId(((id).toString()).toLowerCase())
        );
      }

      return { fiveMinuteBuckets: [] };
    },
    enabled: !!id,
    refetchInterval: 10000,
    staleTime: 10000
  })

  return {
    fmbData: data,
    fmbLoading: isLoading,
    fmbError: error,
    fmbRefetch: refetch,
  }
}