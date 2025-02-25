import { queryOrderHistorysUser } from "@/graphql/indexer/order-history.query";
import { QueryOrderHistorysUser } from "@/types/query/graphql/order-history.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useAccount } from "wagmi";

export const useOrderHistorysUser = () => {
  const { address } = useAccount();

  const { data, isLoading, error, refetch } = useQuery<QueryOrderHistorysUser>({
    queryKey: ['gql-order-historys-user', address],
    queryFn: async () => {
      if (address) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "",
          queryOrderHistorysUser(((address).toString()).toLowerCase())
        );
      }

      return { orderHistorys: { items: [], pageInfo: { endCursor: null, hasNextPage: false, hasPreviousPage: false, startCursor: null }, totalCount: 0 } };
    },
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