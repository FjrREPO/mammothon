import { queryFiveMinuteBucketsId } from "@/graphql/indexer/buckets/five-minute-bucket.query";
import { QueryFiveMinuteBucketsId } from "@/types/query/graphql/buckets/five-minute.bucket.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useFiveMinuteBuckets = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<QueryFiveMinuteBucketsId>({
    queryKey: ['gql-five-minute-buckets-id', id],
    queryFn: async () => {
      if (id) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryFiveMinuteBucketsId(((id).toString()).toLowerCase())
        );
      }

      return { fiveMinuteBucketss: { items: [], pageInfo: { endCursor: null, hasNextPage: false, hasPreviousPage: false, startCursor: null }, totalCount: 0 } };
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