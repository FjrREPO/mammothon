import { FilterABI } from '@/lib/abis/FilterABI';
import { ADDRESS_BITMAP } from '@/lib/constants';
import { useWagmiConfig } from '@/lib/wagmi';
import { UseFilterOrderbookOptions, UseFilterOrderbookResult, UseFilterOrderbookState } from '@/types/query/filter-orderbook.types';
import { Config, readContract } from '@wagmi/core';
import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_DEBOUNCE_TIME = 1000;
const REFRESH_INTERVAL = 50000;

const createContractReadConfig = (functionName: string, args: unknown[] = []) => ({
  address: ADDRESS_BITMAP,
  abi: FilterABI,
  functionName,
  args,
});

export const useFilterOrderbook = (
  options: UseFilterOrderbookOptions = {}
): UseFilterOrderbookResult => {
  const wagmiConfig = useWagmiConfig() as Config;
  const { debounceTime = DEFAULT_DEBOUNCE_TIME, enabled = true } = options;

  const [state, setState] = useState<UseFilterOrderbookState>({
    loading: true,
    error: null,
    isStale: false,
  });

  const debounceTimeRef = useRef(debounceTime);
  const intervalIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    debounceTimeRef.current = debounceTime;
  }, [debounceTime]);

  const fetchOrderbookData = useCallback(async () => {
    if (!enabled) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null, isStale: false }));

    try {
      const [bids, asks, tick] = await Promise.all([
        readContract(wagmiConfig, createContractReadConfig('topNBestTicks', [true])),
        readContract(wagmiConfig, createContractReadConfig('topNBestTicks', [false])),
        readContract(wagmiConfig, createContractReadConfig('getCurrentTick')),
      ]);

      setState(prev => ({
        ...prev,
        bestBids: bids as bigint[],
        bestAsks: asks as bigint[],
        currentTick: tick as bigint,
        loading: false,
      }));
    } catch (err: unknown) {
      const error = err instanceof Error
        ? err
        : new Error('Failed to fetch orderbook data');

      console.error('Error fetching orderbook data:', error);
      setState(prev => ({ ...prev, error, loading: false }));
    }
  }, [enabled, wagmiConfig]);

  const refresh = useCallback(async () => {
    await fetchOrderbookData();
  }, [fetchOrderbookData]);

  useEffect(() => {
    setState(prev => ({ ...prev, isStale: true }));
  }, []);

  useEffect(() => {
    if (!enabled) return;

    fetchOrderbookData();
    intervalIdRef.current = setInterval(refresh, REFRESH_INTERVAL);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [fetchOrderbookData, refresh, enabled]);

  return {
    ...state,
    refresh,
  };
};

// Example usage:
/*
const {
  bestBids,
  bestAsks,
  currentTick,
  loading,
  error,
  refresh,
  isStale
} = useFilterOrderbook({
  debounceTime: 1000,
  enabled: true
});
*/