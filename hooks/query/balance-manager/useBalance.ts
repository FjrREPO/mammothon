import { BalanceManagerABI } from "@/lib/abis/BalanceManagerABI";
import { ADDRESS_BALANCE_MANAGER } from "@/lib/constants";
import { useWagmiConfig } from "@/lib/wagmi";
import { useQuery } from "@tanstack/react-query"
import { readContract } from "wagmi/actions"

export const useGetBestPrice = ({
  userAddress,
  currency
}: {
  userAddress: HexAddress;
  currency: HexAddress;
}) => {
  const wagmiConfig = useWagmiConfig();
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getBalance"],
    queryFn: async () => {
      return await readContract(wagmiConfig, {
        address: ADDRESS_BALANCE_MANAGER,
        abi: BalanceManagerABI,
        functionName: 'getBalance',
        args: [
          userAddress, 
          currency
        ] as const,
      });
    },
    enabled: !!userAddress && !!currency,
    refetchInterval: 5000,
    staleTime: 5000
  })

  return { 
    gbData: data, 
    gbLoading: isLoading, 
    gbError: error, 
    gbRefetch: refetch 
  }
}