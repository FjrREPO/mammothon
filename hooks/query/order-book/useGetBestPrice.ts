import { OrderBookABI } from "@/lib/abis/OrderBookABI";
import { ADDRESS_ORDERBOOK } from "@/lib/constants";
import { useWagmiConfig } from "@/lib/wagmi";
import { useQuery } from "@tanstack/react-query"
import { readContract } from "wagmi/actions"

type Side = 0 | 1; // Assuming 0 = Buy, 1 = Sell

export const useGetBestPrice = (side: Side) => {
  const wagmiConfig = useWagmiConfig();
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getBestPrice"],
    queryFn: async () => {
      return await readContract(wagmiConfig, {
        address: ADDRESS_ORDERBOOK,
        abi: OrderBookABI,
        functionName: 'getBestPrice',
        args: [
          side
        ] as const,
      });
    },
    enabled: !!side,
    refetchInterval: 10000,
    staleTime: 10000
  })

  return { 
    gbpData: data, 
    gbpLoading: isLoading, 
    gbpError: error, 
    gbpRefetch: refetch 
  }
}