import { queryOrderHistorysList } from "@/graphql/indexer/order-history.query";
import { QueryOrderHistorysList } from "@/types/query/graphql/order-history.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useOrderHistorysList = () => {
  const { data, isLoading, error, refetch } = useQuery<QueryOrderHistorysList>({
    queryKey: ['gql-hour-buckets-list'],
    queryFn: async () => {
      return await request(
        process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
        queryOrderHistorysList()
      );
    },
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