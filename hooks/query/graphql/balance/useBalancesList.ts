import { queryBalancesList } from "@/graphql/indexer/balance.query";
import { QueryBalancesList } from "@/types/query/graphql/balance.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useBalancesList = () => {
  const { data, isLoading, error, refetch } = useQuery<QueryBalancesList>({
    queryKey: ['gql-balances-list'],
    queryFn: async () => {
      return await request(
        process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", 
        queryBalancesList()
      );
    },
    refetchInterval: 10000,
    staleTime: 10000
  })

  return {
    blData: data,
    blLoading: isLoading,
    blError: error,
    blRefetch: refetch,
  }
}