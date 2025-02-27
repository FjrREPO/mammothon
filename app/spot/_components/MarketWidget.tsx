'use client'

import { ArrowUpIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Image } from '@heroui/image'
import { formatNumber } from '@/lib/custom-helper'
import { Card, CardBody } from '@heroui/card'
import { Skeleton } from '@heroui/skeleton'
import { Tooltip } from '@heroui/tooltip'
import { Select, SelectItem } from '@heroui/select'
import { useState } from 'react'
import { MarketDataCMC } from '@/types/api/market-data.cmc'

interface DataItemProps {
  label: string;
  value: string;
  content?: string;
}

const DataItem = ({ label, value, content }: DataItemProps) => (
  <Tooltip content={content ?? "I am a tooltip"}>
    <div className="text-xs space-y-1">
      <div className="text-gray-400 font-semibold">{label}</div>
      <div className="text-white font-medium">{value}</div>
    </div>
  </Tooltip>
);

export default function MarketWidget({
  tnData,
  mData,
  cLoading,
}: {
  tnData: string;
  mData: MarketDataCMC | null;
  cLoading: boolean;
}) {
  const priceChange = mData?.priceChangePercentage24h ?? 0;
  const PriceChangeIcon = priceChange >= 0 ? TrendingUpIcon : TrendingDownIcon;
  const [ timeFrame, setTimeFrame ] = useState<Set<string>>(new Set([]));

  return (
    <Card className="hover:border-gray-700 transition-colors duration-200">
      <CardBody className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 space-y-4 sm:space-y-0">
        {cLoading ? (
          <Skeleton className="h-14 w-52 rounded-xl" />
        ) : (
          <div className="flex items-center space-x-3">
            <Image
              src="/icon/eth-usdc.svg"
              alt={`${tnData} Logo`}
              className="w-12 h-12 rounded-full"
              loading="eager"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg text-white">{tnData}</span>
                <span className="text-emerald-500 text-xs px-2 py-1 bg-emerald-500/10 rounded-full font-medium">
                  Spot
                </span>
              </div>
              <div className="flex items-center mt-1">
                <span className="text-2xl font-bold text-white">
                  {formatNumber(mData?.currentPrice ?? 0, { prefix: '$' })}
                </span>
                <div className={cn(
                  "flex items-center ml-2 text-sm font-medium",
                  priceChange >= 0 ? "text-emerald-500" : "text-red-500"
                )}>
                  <PriceChangeIcon className="w-4 h-4 mr-1" />
                  {formatNumber(priceChange, {
                    prefix: priceChange >= 0 ? '+' : '',
                    suffix: '%'
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='flex flex-row items-center gap-5'>
          <div className="grid grid-cols-3 gap-4 w-full sm:w-auto">
            {cLoading ? (
              Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-12 w-28 rounded-xl" />
              ))
            ) : (
              <>
                <DataItem 
                  label='Price'
                  value={formatNumber(mData?.currentPrice ?? 0, { prefix: '$', compact: true })}
                  content='The latest price of the token.'
                />

                <DataItem
                  label="24h Volume"
                  value={formatNumber(mData?.totalVolume ?? 0, { prefix: '$', compact: true })}
                  content={`Full volume: ${formatNumber(mData?.totalVolume ?? 0, { prefix: '$' })}`}
                />

                <DataItem
                  label="Market Cap"
                  value={formatNumber(mData?.marketCap ?? 0, { prefix: '$', compact: true })}
                  content={`Full market cap: ${formatNumber(mData?.marketCap ?? 0, { prefix: '$' })}`}
                />

                <DataItem 
                  label='BLV'
                  value={formatNumber(mData?.currentPrice ? mData.currentPrice * 0.5 : 0, { prefix: '$', compact: true })}
                  content='The Floor price of the token.'
                />

                <div className="text-xs space-y-1 col-span-2">
                  <div className="text-gray-400 font-semibold">Bump</div>
                  <div className="text-white font-medium">
                    <div className="w-48 h-4 bg-gray-800 rounded relative overflow-hidden">
                      <div className="absolute inset-0 flex">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-full w-8 ${
                              i < 6 ? "bg-yellow-400" : "bg-gray-700"
                            } transform -skew-x-12 border-r border-gray-800`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {cLoading ? (
            <Skeleton className="h-8 w-32 rounded-xl" />
          ) : (
            <div className='flex flex-col gap-4'>
              <Tooltip content="Contract Address">
                <button
                  onClick={() => window.open(`https://etherscan.io/address/0x0d01...11ec`, '_blank')}
                  className="flex items-center text-xs text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-800"
                >
                  0x0d01...11ec
                  <ArrowUpIcon className="w-3 h-3 ml-1 rotate-45" />
                </button>
              </Tooltip>
              <Select label="Time Frame" selectedKeys={timeFrame} onSelectionChange={(keys) => setTimeFrame(new Set(Array.from(keys).map(String)))}>
                <SelectItem key="d" value="d">D</SelectItem>
                <SelectItem key="h" value="h">h</SelectItem>
                <SelectItem key="30m" value="30m">30m</SelectItem>
                <SelectItem key="5m" value="5m">5m</SelectItem>
                <SelectItem key="m" value="m">m</SelectItem>
              </Select>
            </div>
          )}
        </div>

      </CardBody>
    </Card>
  )
}
