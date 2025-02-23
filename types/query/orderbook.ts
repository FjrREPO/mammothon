import { TransactionReceipt } from "viem";

export interface PlaceOrderParams {
  tick: bigint;
  volume: bigint;
  user: `0x${string}`;
  isBuy: boolean;
  isMarket: boolean;
}

export interface PlaceOrderResult {
  orderIndex: bigint;
  executedTick: bigint;
  remainingVolume: bigint;
  receipt: TransactionReceipt;
}

export interface PlaceOrderEvent {
  user: `0x${string}`;
  tick: bigint;
  orderIndex: bigint;
  isBuy: boolean;
  isMarket: boolean;
  volume: bigint;
  remainingVolume: bigint;
}

export interface UsePlaceOrderOptions {
  onSuccess?: (result: PlaceOrderResult) => void;
  onError?: (error: Error) => void;
}

export interface UsePlaceOrderReturn {
  placeOrder: (params: PlaceOrderParams) => Promise<PlaceOrderResult>;
  isPlacing: boolean;
  error: Error | null;
}