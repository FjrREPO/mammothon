import { OrderBookABI } from "@/lib/abis/OrderBookABI";
import { valueToBigInt } from "@/lib/bignumber";
import { ADDRESS_ORDERBOOK } from "@/lib/constants";
import { useWagmiConfig } from "@/lib/wagmi";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAccount } from "wagmi";
import {
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";

type Side = 0 | 1; // Assuming 0 = Buy, 1 = Sell

type Status = "idle" | "loading" | "success" | "error";

export const usePlaceMarketOrder = () => {
  const [steps, setSteps] = useState<
    Array<{
      step: number;
      status: Status;
      error?: string;
    }>
  >([
    {
      step: 1,
      status: "idle",
    },
  ]);

  const { address: userAddress } = useAccount();

  const [txHash, setTxHash] = useState<HexAddress | null>(null);

  const wagmiConfig = useWagmiConfig();

  const mutation = useMutation({
    mutationFn: async ({
      quantity,
      side
    }: {
      quantity: number;
      side: Side;
    }) => {
      try {
        setSteps([{ step: 1, status: "idle" }]);

        if (!side || !quantity) {
          throw new Error("Invalid parameters");
        }

        const formattedQuantity = valueToBigInt(quantity);

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 1) {
              return { ...item, status: "loading" };
            }
            return item;
          })
        );

        const txHash = await writeContract(wagmiConfig, {
          address: ADDRESS_ORDERBOOK,
          abi: OrderBookABI,
          functionName: 'placeMarketOrder',
          args: [
            formattedQuantity,
            side,
            userAddress as HexAddress
          ] as const,
        });

        setTxHash(txHash);

        const result = await waitForTransactionReceipt(wagmiConfig, {
          hash: txHash,
        });

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 1) {
              return { ...item, status: "success" };
            }
            return item;
          })
        );

        return result;
      } catch (e) {
        console.error("Error", e);

        setSteps((prev) =>
          prev.map((step) => {
            if (step.status === "loading") {
              return { ...step, status: "error", error: (e as Error).message };
            }
            return step;
          })
        );

        throw e;
      }
    },
  });

  return { steps, mutation, txHash };
};