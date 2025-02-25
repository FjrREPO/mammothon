import { queryHourBucketsList } from "@/graphql/indexer/hour-bucket.query";
import { QueryHourBucketsList } from "@/types/query/graphql/hour-bucket";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useHourBucketsList = () => {
  const { data, isLoading, error, refetch } = useQuery<QueryHourBucketsList>({
    queryKey: ['gql-hour-buckets-list'],
    queryFn: async () => {
      return await request(
        process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
        queryHourBucketsList()
      );
    },
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