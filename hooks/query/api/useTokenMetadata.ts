import { CoinMarketCapResponse } from "@/types/api/cmc";
import { useQuery } from "@tanstack/react-query";

export const useTokenMetadata = () => {
  const { data, isLoading, error, refetch } = useQuery<CoinMarketCapResponse[]>({
    queryKey: ['gql-token-metadata'],
    queryFn: async () => {
      return await fetch(`/api/token-metadata`).then(res => res.json());
    },
    refetchInterval: 6000000,
  })

  return {
    tmData: data,
    tmLoading: isLoading,
    tmError: error,
    tmRefetch: refetch,
  }
}