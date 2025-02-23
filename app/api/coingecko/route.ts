import { NextResponse } from "next/server";
import axios from "axios";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  platforms: { [key: string]: string };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json({ error: "Token address is required" }, { status: 400 });
    }

    const coinsResponse = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list?include_platform=true"
    );

    const coin = coinsResponse.data.find((coin: Coin) =>
      Object.values(coin.platforms || {}).includes(address.toLowerCase())
    );

    if (!coin) {
      return NextResponse.json({ error: "Token not found on CoinGecko" }, { status: 404 });
    }

    const ohlcResponse = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin.id}/ohlc?vs_currency=usd&days=30`
    );

    const formattedData = ohlcResponse.data.map((item: number[]) => ({
      time: Math.floor(item[0] / 1000),
      open: item[1],
      high: item[2],
      low: item[3],
      close: item[4],
    }));

    return NextResponse.json({
      tokenName: `${coin.name} (${coin.symbol.toUpperCase()})`,
      chartData: formattedData,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to fetch data", details: errorMessage }, { status: 500 });
  }
}
