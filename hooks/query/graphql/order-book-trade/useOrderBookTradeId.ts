import { queryOrderBookTradeId } from "@/graphql/indexer/order-book-trade.query";
import { QueryOrderBookTradeId } from "@/types/query/graphql/order-book-trade.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useOrderBookTrade = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<QueryOrderBookTradeId>({
    queryKey: ['gql-order-book-trade-id', id],
    queryFn: async () => {
      if (id) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryOrderBookTradeId(((id).toString()).toLowerCase())
        );
      }

      return { orderBookTrades: [] };
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