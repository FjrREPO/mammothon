"use client";

import { subtitle } from "@/components/primitives";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import MarketWidget from "./_components/MarketWidget";
import TradingView from "./_components/TradingView";
import BuyAndSell from "./_components/BuyAndSell";
import { useTradingToken } from "@/hooks/query/api/useTradingToken";
import { useDailyBucketsList } from "@/hooks/query/graphql/buckets/daily-bucket/useDailyBucketsList";
import { useHourBucketsList } from "@/hooks/query/graphql/buckets/hour-bucket/useHourBucketsList";
import { useFiveMinuteBucketsList } from "@/hooks/query/graphql/buckets/five-minute-bucket/useFiveMinuteBucketsList";
import { useMinuteBucketsList } from "@/hooks/query/graphql/buckets/minute-bucket/useMinuteBucketsList";
import { useThirtyMinuteBucketsList } from "@/hooks/query/graphql/buckets/thirty-minute-bucket/useThirtyMinuteBucketsList";
import { Select, SelectItem } from "@heroui/select";
import { useState } from "react";

export default function Page() {
  const {
    tnData,
    mData,
    cLoading
  } = useTradingToken('0x912CE59144191C1204E64559FE8253a0e49E6548');

  const { cdbData, dbLoading, dbError } = useDailyBucketsList();
  const { chbData, hbLoading, hbError } = useHourBucketsList();
  const { ctmbData, tmbLoading, tmbError } = useThirtyMinuteBucketsList();
  const { cfmbData, fmbLoading, fmbError } = useFiveMinuteBucketsList();
  const { cmbData, mbLoading, mbError } = useMinuteBucketsList();

  const [ timeFrame, setTimeFrame ] = useState<Set<string>>(new Set([]));
  
  const getChartComponent = () => {
    const time = Array.from(timeFrame)[0];
    
    switch (time) {
      case "d":
        return <TradingView cData={cdbData} cLoading={dbLoading} error={dbError} />;
      case "h":
        return <TradingView cData={chbData} cLoading={hbLoading} error={hbError} />;
      case "30m":
        return <TradingView cData={ctmbData} cLoading={tmbLoading} error={tmbError} />;
      case "5m":
        return <TradingView cData={cfmbData} cLoading={fmbLoading} error={fmbError} />;
      case "m":
        return <TradingView cData={cmbData} cLoading={mbLoading} error={mbError} />;
      default:
        return <TradingView cData={cdbData} cLoading={dbLoading} error={dbError} />;
    }
  };

  return (
    <div className="py-5 pt-24 overflow-x-hidden w-full">
      <div className="flex flex-col gap-5 items-start">
        <div className="flex flex-col items-start justify-start pb-5">
          <motion.span
            className={cn(subtitle({ sizeText: "txl" }), "font-bold text-start")}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            SPOT
          </motion.span>
          <motion.span
            className={cn(subtitle(), "text-start")}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Trade your token here.
          </motion.span>
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <div className="w-full overflow-hidden flex flex-col gap-5">
          {/* <AdvancedRealTimeChartNoSSR
          symbol="BINANCE:BTCUSDT"
          theme="dark"
          autosize
        /> */}
          <Select label="Time Frame" selectedKeys={timeFrame} onSelectionChange={(keys) => setTimeFrame(new Set(Array.from(keys).map(String)))}>
            <SelectItem key="d" value="d">Daily</SelectItem>
            <SelectItem key="h" value="h">Hour</SelectItem>
            <SelectItem key="30m" value="30m">30 Minute</SelectItem>
            <SelectItem key="5m" value="5m">5 Minute</SelectItem>
            <SelectItem key="m" value="m">Minute</SelectItem>
          </Select>
          <MarketWidget tnData={tnData} mData={mData} cLoading={cLoading} />
          <div>
            {getChartComponent()}
          </div>
        </div>
        <BuyAndSell />
      </div>
    </div>
  );
}
