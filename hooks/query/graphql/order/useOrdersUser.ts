import { queryOrdersUser } from "@/graphql/indexer/order.query";
import { QueryOrdersUser } from "@/types/query/graphql/order.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useAccount } from "wagmi";

export const useOrdersUser = () => {
  const { address } = useAccount();

  const { data, isLoading, error, refetch } = useQuery<QueryOrdersUser>({
    queryKey: ['gql-orders-user', address],
    queryFn: async () => {
      if (address) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryOrdersUser(((address).toString()).toLowerCase())
        );
      }

      return { orderss: { items: [], pageInfo: { endCursor: null, hasNextPage: false, hasPreviousPage: false, startCursor: null }, totalCount: 0 } };
    },
    enabled: !!address,
    refetchInterval: 10000,
    staleTime: 10000
  })

  return {
    oData: data,
    oLoading: isLoading,
    oError: error,
    oRefetch: refetch,
  }
}