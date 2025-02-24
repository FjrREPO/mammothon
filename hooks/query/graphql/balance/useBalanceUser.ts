import { queryBalanceUser } from "@/graphql/indexer/balance.query";
import { QueryBalanceUser } from "@/types/query/graphql/balance.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useAccount } from "wagmi";

export const useBalanceUser = () => {
  const { address } = useAccount();

  const { data, isLoading, error, refetch } = useQuery<QueryBalanceUser>({
    queryKey: ['gql-balance-user', address],
    queryFn: async () => {
      if (address) {
        return await request(process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", queryBalanceUser(((address).toString()).toLowerCase()));
      }

      return { balances: [] };
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