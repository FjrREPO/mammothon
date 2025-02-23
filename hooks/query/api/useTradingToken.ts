import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function getRandomNumber(min: number, max: number, fixed: number = 8): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(fixed));
}

const tDat = {
  "quote": {
    "USD": {
      "price": getRandomNumber(4, 4.99),
      "volume_24h": getRandomNumber(1000, 1000000, 2),
      "volume_change_24h": getRandomNumber(-10, 10, 2),
      "percent_change_1h": getRandomNumber(-5, 5, 2),
      "percent_change_24h": getRandomNumber(-20, 20, 2),
      "percent_change_7d": getRandomNumber(-50, 50, 2),
      "percent_change_30d": getRandomNumber(-80, 80, 2),
      "percent_change_60d": getRandomNumber(-100, 100, 2),
      "percent_change_90d": getRandomNumber(-150, 150, 2),
      "market_cap": getRandomNumber(1000000, 500000000, 2),
      "market_cap_dominance": getRandomNumber(0, 100, 2),
      "fully_diluted_market_cap": getRandomNumber(10000, 100000000, 2),
      "tvl": null,
      "last_updated": new Date().toISOString()
    }
  }
};


export const useTradingToken = (address: string) => {
  const { data: cgDdata, isLoading: cgLoading, error: cgError, refetch: cgRefetch } = useQuery({
    queryKey: ['coingecko-token', address],
    queryFn: async () => {
      if (!address) return;
      const response = await axios.get(`/api/coingecko?address=${address}`);

      return response.data;
    },
    enabled: !!address,
    refetchInterval: 20000,
    staleTime: 20000
  });

  const match = cgDdata?.tokenName?.match(/\((.*?)\)/);
  const symbol = match ? match[1] : null;

  const { data: cmcData, isLoading: cmcLoading, error: cmcError, refetch: cmcRefetch } = useQuery({
    queryKey: ['cmc-token', symbol],
    queryFn: async () => {
      if (!symbol) return;
      // const response = await axios.get(`/api/cmc-proxy?symbol=${symbol}`);

      // const tokenData = response.data.data[Object.keys(response.data.data)[0]];
      // if (!tokenData) return;

      return {
        chartData: cgDdata?.chartData || [],
        tokenName: symbol,
        marketData: {
          currentPrice: tDat.quote.USD.price,
          marketCap: tDat.quote.USD.market_cap,
          totalVolume: tDat.quote.USD.volume_24h,
          priceChangePercentage24h: tDat.quote.USD.percent_change_24h,
        }
      };
    },
    enabled: !!symbol,
    refetchInterval: 60000,
    staleTime: 60000,
  });

  const finalData = {
    chartData: cgDdata?.chartData || [],
    tokenName: cgDdata?.tokenName || cmcData?.tokenName,
    marketData: cmcData?.marketData || null,
  };

  return {
    cData: finalData.chartData,
    tnData: finalData.tokenName,
    mData: finalData.marketData,
    cLoading: cgLoading || cmcLoading,
    cError: cgError || cmcError,
    cRefetch: () => {
      cgRefetch();
      cmcRefetch();
    }
  };
};
