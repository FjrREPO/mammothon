export type OrderbookData = {
  bestBids: bigint[];
  bestAsks: bigint[];
  currentTick: bigint;
};

export interface UseFilterOrderbookOptions {
  debounceTime?: number;
  enabled?: boolean;
}

export interface UseFilterOrderbookState extends Partial<OrderbookData> {
  loading: boolean;
  error: Error | null;
  isStale: boolean;
}

export interface UseFilterOrderbookResult extends UseFilterOrderbookState {
  refresh: () => Promise<void>;
}