import { OrderBookABI } from "@/lib/abis/OrderBookABI";
import { ADDRESS_ORDERBOOK } from "@/lib/constants";
import { useWagmiConfig } from "@/lib/wagmi";
import { useQuery } from "@tanstack/react-query"
import { readContract } from "wagmi/actions"

export const useGetUserActiveOrders = (user: HexAddress) => {
  const wagmiConfig = useWagmiConfig();
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getUserActiveOrders"],
    queryFn: async () => {
      return await readContract(wagmiConfig, {
        address: ADDRESS_ORDERBOOK,
        abi: OrderBookABI,
        functionName: 'getUserActiveOrders',
        args: [
          user
        ] as const,
      });
    },
    enabled: !!user,
    refetchInterval: 10000,
    staleTime: 10000
  })

  return { 
    guaoData: data, 
    guaoLoading: isLoading, 
    guaoError: error, 
    guaoRefetch: refetch 
  }
}