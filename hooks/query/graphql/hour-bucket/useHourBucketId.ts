import { queryHourBucketId } from "@/graphql/indexer/hour-bucket.query";
import { QueryHourBucketId } from "@/types/query/graphql/hour-bucket";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useHourBucket = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<QueryHourBucketId>({
    queryKey: ['gql-hour-bucket-id', id],
    queryFn: async () => {
      if (id) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryHourBucketId(((id).toString()).toLowerCase())
        );
      }

      return { hourBuckets: [] };
    },
    enabled: !!id,
    refetchInterval: 10000,
    staleTime: 10000
  })

  return {
    hbData: data,
    hbLoading: isLoading,
    hbError: error,
    hbRefetch: refetch,
  }
}