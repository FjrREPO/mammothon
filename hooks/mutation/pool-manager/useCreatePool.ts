import { PoolManagerABI } from "@/lib/abis/PoolManagerABI";
import { TokenABI } from "@/lib/abis/TokenABI";
import { denormalize, valueToBigInt } from "@/lib/bignumber";
import { ADDRESS_POOL_MANAGER } from "@/lib/constants";
import { useWagmiConfig } from "@/lib/wagmi";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions"

type Status = "idle" | "loading" | "success" | "error";

export const useCreatePool = () => {
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
    {
      step: 2,
      status: "idle",
    },
  ]);

  const [txHash, setTxHash] = useState<HexAddress | null>(null);

  const wagmiConfig = useWagmiConfig();

  const mutation = useMutation({
    mutationFn: async ({
      quoteCurrency,
      lotSize,
      maxOrderAmount,
      tokenName,
      tokenSymbol,
      tokenTotalSupply,
      bottomAmount,
      anchorAmount,
      discoveryAmount,
      allocationAmount,
      bottomPrice,
      anchorPrice,
      discoveryPrice,
      decimals
    }: {
      quoteCurrency: HexAddress;
      lotSize: number;
      maxOrderAmount: number;
      tokenName: string;
      tokenSymbol: string;
      tokenTotalSupply: number;
      bottomAmount: number;
      anchorAmount: number;
      discoveryAmount: number;
      allocationAmount: number;
      bottomPrice: number;
      anchorPrice: number;
      discoveryPrice: number;
      decimals: number;
    }) => {
      try {
        setSteps([
          { step: 1, status: "idle" },
          { step: 2, status: "idle" }
        ]);

        if (!quoteCurrency || !lotSize || !maxOrderAmount || !tokenName || !tokenSymbol || !decimals) {
          throw new Error("Invalid parameters");
        }

        const formattedMaxOrderAmount = valueToBigInt(denormalize(maxOrderAmount, decimals));
        const formattedLotSize = valueToBigInt(lotSize);
        const formattedTokenTotalSupply = valueToBigInt(denormalize(tokenTotalSupply, decimals));

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 1) {
              return { ...item, status: "loading" };
            }
            return item;
          })
        );

        const approvalHash = await writeContract(wagmiConfig, {
          address: quoteCurrency,
          abi: TokenABI,
          functionName: 'approve',
          args: [
            ADDRESS_POOL_MANAGER,
            formattedMaxOrderAmount
          ] as const,
        });

        const approvalResult = await waitForTransactionReceipt(wagmiConfig, {
          hash: approvalHash,
        });

        if (!approvalResult) {
          throw new Error("Approval failed");
        }

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 1) {
              return { ...item, status: "success" };
            }
            return item;
          })
        );

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 2) {
              return { ...item, status: "loading" };
            }
            return item;
          })
        );

        const txHash = await writeContract(wagmiConfig, {
          address: ADDRESS_POOL_MANAGER,
          abi: PoolManagerABI,
          functionName: 'createPool',
          args: [
            quoteCurrency,
            formattedLotSize,
            formattedMaxOrderAmount,
            tokenName,
            tokenSymbol,
            formattedTokenTotalSupply,
            bottomAmount,
            anchorAmount,
            discoveryAmount,
            allocationAmount,
            bottomPrice,
            anchorPrice,
            discoveryPrice
          ] as const,
        });

        setTxHash(txHash);

        const result = await waitForTransactionReceipt(wagmiConfig, {
          hash: txHash,
        });

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 2) {
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