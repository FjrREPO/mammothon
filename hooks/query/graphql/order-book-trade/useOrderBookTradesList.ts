import { queryOrderBookTradesList } from "@/graphql/indexer/order-book-trade.query";
import { QueryOrderBookTradesList } from "@/types/query/graphql/order-book-trade.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useOrderBookTradesList = () => {
  const { data, isLoading, error, refetch } = useQuery<QueryOrderBookTradesList>({
    queryKey: ['gql-order-book-trades-list'],
    queryFn: async () => {
      return await request(
        process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
        queryOrderBookTradesList()
      );
    },
    refetchInterval: 10000,
    staleTime: 10000
  })

  return {
    obtData: data,
    obtLoading: isLoading,
    obtError: error,
    obtRefetch: refetch,
  }
}