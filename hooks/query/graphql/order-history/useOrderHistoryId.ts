import { queryOrderHistoryId } from "@/graphql/indexer/order-history.query";
import { QueryOrderHistoryId } from "@/types/query/graphql/order-history.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useOrderHistory = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<QueryOrderHistoryId>({
    queryKey: ['gql-order-history-id', id],
    queryFn: async () => {
      if (id) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryOrderHistoryId(((id).toString()).toLowerCase())
        );
      }

      return { orderHistory: [] };
    },
    enabled: !!id,
    refetchInterval: 10000,
    staleTime: 10000
  })

  return {
    ohData: data,
    ohLoading: isLoading,
    ohError: error,
    ohRefetch: refetch,
  }
}