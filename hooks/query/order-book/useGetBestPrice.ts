import { OrderBookABI } from "@/lib/abis/OrderBookABI";
import { ADDRESS_ORDERBOOK } from "@/lib/constants";
import { useReadContract } from "wagmi";

type Side = 0 | 1; // Assuming 0 = Buy, 1 = Sell

export const useGetBestPrice = (side: Side) => {
  const { data, isLoading, error, refetch } = useReadContract({
    address: ADDRESS_ORDERBOOK,
    abi: OrderBookABI,
    functionName: 'getBestPrice',
    args: [
      side
    ] as const,
    query: {
      enabled: !!side,
      refetchInterval: 10000,
      staleTime: 10000
    }
  });

  return {
    gbpData: data,
    gbpLoading: isLoading,
    gbpError: error,
    gbpRefetch: refetch
  }
}