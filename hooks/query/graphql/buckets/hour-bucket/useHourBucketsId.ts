import { queryHourBucketsId } from "@/graphql/indexer/buckets/hour-bucket.query";
import { QueryHourBucketsId } from "@/types/query/graphql/buckets/hour-bucket";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useHourBuckets = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<QueryHourBucketsId>({
    queryKey: ['gql-hour-buckets-id', id],
    queryFn: async () => {
      if (id) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryHourBucketsId(((id).toString()).toLowerCase())
        );
      }

      return { hourBucketss: { items: [], pageInfo: { endCursor: null, hasNextPage: false, hasPreviousPage: false, startCursor: null }, totalCount: 0 } };
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