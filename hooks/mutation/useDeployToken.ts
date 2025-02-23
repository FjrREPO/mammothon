import { MockTokenABI } from "@/lib/abis/MockTokenABI";
import { useWagmiConfig } from "@/lib/wagmi";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAccount } from "wagmi";
import {
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";

type Status = "idle" | "loading" | "success" | "error";

export const useDeployToken = () => {
  const { address: userAddress } = useAccount();

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

  const [txHash, setTxHash] = useState<HexAddress | null>(null);

  const wagmiConfig = useWagmiConfig();

  const mutation = useMutation({
    mutationFn: async ({
      addressToken,
      amount
    }: {
      addressToken: HexAddress;
      amount: string;
    }) => {
      try {
        setSteps([{ step: 1, status: "idle" }]);

        if (!amount || !userAddress) {
          throw new Error("Invalid parameters");
        }

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 1) {
              return { ...item, status: "loading" };
            }
            return item;
          })
        );

        const txHash = await writeContract(wagmiConfig, {
          address: addressToken,
          abi: MockTokenABI,
          functionName: "deploy",
          args: [
            userAddress,
          ],
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