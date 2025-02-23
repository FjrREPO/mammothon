import TradingChart from '@/components/chart/chart-trading';
import SkeletonWrapper from '@/components/loader/skeleton-wrapper';
import { MarketData } from '@/types/api/market-data';

export default function TradingView({
  cData,
  cLoading,
}: {
  cData: MarketData[];
  cLoading: boolean;
}) {
  return (
    <SkeletonWrapper isLoading={cLoading}>
      <div className="backdrop-blur-lg bg-background/50 p-6 rounded-xl shadow-2xl overflow-hidden min-h-[400px]">
        <div className="w-full rounded-xl">
          {cData && cData.length > 0 && (
            <TradingChart data={cData} />
          )}
        </div>
      </div>
    </SkeletonWrapper>
  )
}
