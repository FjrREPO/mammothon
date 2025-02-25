import { NextResponse } from "next/server";
import axios from "axios";
import { CoinMarketCapResponse } from "@/types/api/cmc";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");
    const symbol = searchParams.get("symbol");

    const url = process.env.NEXT_PUBLIC_API_CRYPTO_URL;
    if (!url) {
      return NextResponse.json({ error: "API URL is required" }, { status: 400 });
    }

    const response = await axios.get(url);

    if (!response.data || !Array.isArray(response.data)) {
      return NextResponse.json({ error: "Invalid API response format" }, { status: 500 });
    }

    const coins: CoinMarketCapResponse[] = response.data;
    let coin: CoinMarketCapResponse | undefined;

    if (address) {
      coin = coins.find(
        (c) =>
          c.platform?.token_address?.toLowerCase() === address.toLowerCase() ||
          c.contract_address?.some(
            (contract) => contract.contract_address.toLowerCase() === address.toLowerCase()
          )
      );
    } else if (symbol) {
      coin = coins.find((c) => c.symbol?.toLowerCase() === symbol.toLowerCase());
    } else {
      return NextResponse.json({ error: "Token address or symbol is required" }, { status: 400 });
    }

    if (!coin) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 });
    }

    return NextResponse.json(coin);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to fetch data", details: errorMessage }, { status: 500 });
  }
}
