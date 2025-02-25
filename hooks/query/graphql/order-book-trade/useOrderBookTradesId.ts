import { queryOrderBookTradesId } from "@/graphql/indexer/order-book-trade.query";
import { QueryOrderBookTradesId } from "@/types/query/graphql/order-book-trade.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useOrderBookTrades = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<QueryOrderBookTradesId>({
    queryKey: ['gql-order-book-trades-id', id],
    queryFn: async () => {
      if (id) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryOrderBookTradesId(((id).toString()).toLowerCase())
        );
      }

      return { orderBookTradess: { items: [], pageInfo: { endCursor: null, hasNextPage: false, hasPreviousPage: false, startCursor: null }, totalCount: 0 } };
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