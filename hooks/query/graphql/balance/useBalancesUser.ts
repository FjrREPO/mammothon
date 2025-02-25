import { queryBalancesUser } from "@/graphql/indexer/balance.query";
import { QueryBalancesUser } from "@/types/query/graphql/balance.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useAccount } from "wagmi";

export const useBalancesUser = () => {
  const { address } = useAccount();

  const { data, isLoading, error, refetch } = useQuery<QueryBalancesUser>({
    queryKey: ['gql-balances-user', address],
    queryFn: async () => {
      if (address) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
          queryBalancesUser(((address).toString()).toLowerCase())
        );
      }

      return { balancess: { items: [], pageInfo: { endCursor: null, hasNextPage: false, hasPreviousPage: false, startCursor: null }, totalCount: 0 } };
    },
    enabled: !!address,
    refetchInterval: 10000,
    staleTime: 10000
  })

  return {
    buData: data,
    buLoading: isLoading,
    buError: error,
    buRefetch: refetch,
  }
}