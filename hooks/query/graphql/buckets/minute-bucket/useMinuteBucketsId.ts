import { queryMinuteBucketsId } from "@/graphql/indexer/buckets/minute-bucket.query";
import { QueryMinuteBucketsId } from "@/types/query/graphql/buckets/minute.bucket.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useMinuteBuckets = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<QueryMinuteBucketsId>({
    queryKey: ['gql-minute-buckets-id', id],
    queryFn: async () => {
      if (id) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryMinuteBucketsId(((id).toString()).toLowerCase())
        );
      }

      return { minuteBucketss: { items: [], pageInfo: { endCursor: null, hasNextPage: false, hasPreviousPage: false, startCursor: null }, totalCount: 0 } };
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