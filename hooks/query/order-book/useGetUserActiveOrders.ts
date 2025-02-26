import { OrderBookABI } from "@/lib/abis/OrderBookABI";
import { ADDRESS_ORDERBOOK } from "@/lib/constants";
import { useReadContract } from "wagmi";

export const useGetUserActiveOrders = (user: HexAddress) => {
  const { data, isLoading, error, refetch } = useReadContract({
    address: ADDRESS_ORDERBOOK,
    abi: OrderBookABI,
    functionName: 'getUserActiveOrders',
    args: [
      user
    ] as const,
    query: {
      enabled: !!user,
      refetchInterval: 10000,
      staleTime: 10000
    }
  });

  return {
    guaoData: data,
    guaoLoading: isLoading,
    guaoError: error,
    guaoRefetch: refetch
  }
}