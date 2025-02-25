import { queryOrdersList } from "@/graphql/indexer/order.query";
import { QueryOrdersList } from "@/types/query/graphql/order.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useOrdersList = () => {
  const { data, isLoading, error, refetch } = useQuery<QueryOrdersList>({
    queryKey: ['gql-orders-list'],
    queryFn: async () => {
      return await request(
        process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
        queryOrdersList()
      );
    },
    refetchInterval: 60000,
    staleTime: 60000
  })

  return {
    oData: data,
    oLoading: isLoading,
    oError: error,
    oRefetch: refetch,
  }
}