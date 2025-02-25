import React from 'react'
import ChartPnL from '@/components/chart/chart-pnl'

export const projects = [
  {
    title: "Total Deployed Token",
    description:
      "10 Tokens",
    link: "https://netflix.com",
  },
  {
    title: "Total Orders",
    description:
      "20 Orders",
    link: "https://google.com",
  }
];

export default function DashboardOverview() {
  return (
    <div className='flex flex-col gap-5'>
      <span>PnL Chart</span>
      <ChartPnL />
    </div>
  )
}