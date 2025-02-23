import { useCallback, useState } from 'react';
import { writeContract, waitForTransactionReceipt, Config } from '@wagmi/core';
import { decodeEventLog, Log, zeroAddress } from 'viem';
import { useWagmiConfig } from '@/lib/wagmi';
import { AVSAbi } from '@/lib/abis/AVSAbi';
import { PlaceOrderEvent, PlaceOrderParams, PlaceOrderResult, UsePlaceOrderOptions, UsePlaceOrderReturn } from '@/types/query/orderbook';

export const findEventLog = (logs: Log[], eventName: string): Log | undefined => {
  return logs.find((log: Log) => {
    try {
      const event = decodeEventLog({
        abi: AVSAbi,
        data: log.data,
        topics: log.topics,
      });
      return event.eventName === eventName;
    } catch {
      return false;
    }
  });
};

export const decodeEvent = <T>(log: Log): T => {
  return decodeEventLog({
    abi: AVSAbi,
    data: log.data,
    topics: log.topics,
  }) as unknown as T;
};

export const usePlaceOrder = (
  options: UsePlaceOrderOptions = {}
): UsePlaceOrderReturn => {
  const wagmiConfig = useWagmiConfig() as Config;
  const { onSuccess, onError } = options;
  const [isPlacing, setIsPlacing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handlePlaceOrderTransaction = useCallback(
    async (hash: `0x${string}`): Promise<PlaceOrderResult> => {
      const receipt = await waitForTransactionReceipt(wagmiConfig, { hash });

      const placeOrderLog = findEventLog(receipt.logs, 'PlaceOrder');
      if (!placeOrderLog) {
        throw new Error('PlaceOrder event not found in transaction logs');
      }

      const event = decodeEvent<PlaceOrderEvent>(placeOrderLog);

      return {
        orderIndex: event.orderIndex,
        executedTick: event.tick,
        remainingVolume: event.remainingVolume,
        receipt,
      };
    }, [wagmiConfig]);

  const placeOrder = useCallback(
    async (params: PlaceOrderParams): Promise<PlaceOrderResult> => {
      setIsPlacing(true);
      setError(null);

      try {
        const hash = await writeContract(wagmiConfig, {
          address: zeroAddress,
          abi: AVSAbi,
          functionName: 'placeOrder',
          args: [params.tick, params.volume, params.user, params.isBuy, params.isMarket],
        });

        const result = await handlePlaceOrderTransaction(hash);
        onSuccess?.(result);
        return result;
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error('Failed to place order');
        setError(error);
        onError?.(error);
        throw error;
      } finally {
        setIsPlacing(false);
      }
    },
    [onSuccess, onError, wagmiConfig, setIsPlacing, setError, handlePlaceOrderTransaction]
  );

  return {
    placeOrder,
    isPlacing,
    error,
  };
};