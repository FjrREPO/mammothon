import { erc20Abi } from "viem"
import { useReadContract } from "wagmi"

export const useDecimals = ({
  addressToken
}: {
  addressToken: HexAddress
}) => {
  const { data } = useReadContract({
    address: addressToken,
    abi: erc20Abi,
    functionName: "decimals",
    args: [],
    query: {
      enabled: !!addressToken,
      refetchInterval: 60000,
      staleTime: 60000
    }
  })

  return {
    decimals: Number(data)
  }
}