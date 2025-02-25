import { queryOrderHistorysId } from "@/graphql/indexer/order-history.query";
import { QueryOrderHistorysId } from "@/types/query/graphql/order-history.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useOrderHistorys = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<QueryOrderHistorysId>({
    queryKey: ['gql-order-historys-id', id],
    queryFn: async () => {
      if (id) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryOrderHistorysId(((id).toString()).toLowerCase())
        );
      }

      return { orderHistorys: { items: [], pageInfo: { endCursor: null, hasNextPage: false, hasPreviousPage: false, startCursor: null }, totalCount: 0 } };
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