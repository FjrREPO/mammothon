import { BalanceManagerABI } from "@/lib/abis/BalanceManagerABI";
import { ADDRESS_BALANCE_MANAGER } from "@/lib/constants";
import { useReadContract } from "wagmi";

export const useGetBestPrice = ({
  userAddress,
  currency
}: {
  userAddress: HexAddress;
  currency: HexAddress;
}) => {
  const { data, isLoading, error, refetch } = useReadContract({
    address: ADDRESS_BALANCE_MANAGER,
    abi: BalanceManagerABI,
    functionName: 'getBalance',
    args: [
      userAddress,
      currency
    ] as const,
    query: {
      enabled: !!userAddress && !!currency,
      refetchInterval: 5000,
      staleTime: 5000
    }
  });

  return {
    gbData: data,
    gbLoading: isLoading,
    gbError: error,
    gbRefetch: refetch
  }
}