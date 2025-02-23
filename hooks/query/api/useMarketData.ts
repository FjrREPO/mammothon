import { useQuery } from "@tanstack/react-query"

export interface MarketData {
  price: number | null
  volume24h: number | null
  marketCap: number | null
  priceChange24h: number | null
  priceChangePercent24h: number | null
}

export const useMarketData = () => {
  const { data: mData, isLoading: mLoading } = useQuery<MarketData>({
    queryKey: ["market-data"],
    queryFn: async () => {
      const tickerData = await fetch('https://www.okx.com/api/v5/market/ticker?instId=ETH-USDC').then(r => r.json())

      if (tickerData.data?.[0]) {
        const ticker = tickerData.data[0]
        const priceChange = parseFloat(ticker.last) - parseFloat(ticker.open24h)
        const priceChangePercent = (priceChange / parseFloat(ticker.open24h)) * 100

        return {
          price: parseFloat(ticker.last),
          volume24h: parseFloat(ticker.volCcy24h),
          marketCap: 8515433868, // Hardcoded for demo
          priceChange24h: priceChange,
          priceChangePercent24h: priceChangePercent,
        }
      }
      return {
        price: null,
        volume24h: null,
        marketCap: null,
        priceChange24h: null,
        priceChangePercent24h: null,
      }
    },
    refetchInterval: 1000,
  })

  return { mData, mLoading }
}