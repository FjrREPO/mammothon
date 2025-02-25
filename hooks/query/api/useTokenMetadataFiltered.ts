import { CoinMarketCapResponse } from "@/types/api/cmc";
import { useQuery } from "@tanstack/react-query";

export const useTokenMetadataFiltered = ({
  symbol,
  address
}: {
  symbol?: string;
  address?: string;
}) => {
  const { data, isLoading, error, refetch } = useQuery<CoinMarketCapResponse>({
    queryKey: ['gql-token-metadata-filtered', symbol, address],
    queryFn: async () => {
      if (symbol) {
        return await fetch(`/api/token-metadata/filter?symbol=${symbol}`).then(res => res.json());
      } else if (address) {
        return await fetch(`/api/token-metadata/filter?address=${address}`).then(res => res.json());
      }

      return {};
    },
    enabled: !!symbol || !!address,
    refetchInterval: 6000000,
    staleTime: 6000000
  })

  return {
    tmfData: data,
    tmfLoading: isLoading,
    tmfError: error,
    tmfRefetch: refetch,
  }
}