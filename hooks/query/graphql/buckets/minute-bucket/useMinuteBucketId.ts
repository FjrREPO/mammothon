import { queryMinuteBucketId } from "@/graphql/indexer/buckets/minute-bucket.query";
import { QueryMinuteBucketId } from "@/types/query/graphql/buckets/minute.bucket.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useMinuteBucket = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<QueryMinuteBucketId>({
    queryKey: ['gql-minute-bucket-id', id],
    queryFn: async () => {
      if (id) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryMinuteBucketId(((id).toString()).toLowerCase())
        );
      }

      return { minuteBuckets: [] };
    },
    enabled: !!id,
    refetchInterval: 10000,
    staleTime: 10000
  })

  return {
    mbData: data,
    mbLoading: isLoading,
    mbError: error,
    mbRefetch: refetch,
  }
}