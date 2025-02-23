"use client";

import { subtitle } from "@/components/primitives";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import MarketWidget from "./_components/MarketWidget";
import TradingView from "./_components/TradingView";
import BuyAndSell from "./_components/BuyAndSell";
import { useTradingToken } from "@/hooks/query/api/useTradingToken";

export default function Page() {
  const {
    cData,
    tnData,
    mData,
    cLoading
  } = useTradingToken("0x912CE59144191C1204E64559FE8253a0e49E6548")

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
          <MarketWidget tnData={tnData} mData={mData} cLoading={cLoading} />
          <TradingView cData={cData} cLoading={cLoading} />
        </div>
        <BuyAndSell />
      </div>
    </div>
  );
}
