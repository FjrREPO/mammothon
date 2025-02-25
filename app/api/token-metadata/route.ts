import { NextResponse } from "next/server";
import axios from "axios";
import { CoinMarketCapResponse } from "@/types/api/cmc";

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_API_CRYPTO_URL;
    if (!url) {
      return NextResponse.json({ error: "API URL is required" }, { status: 400 });
    }

    const response = await axios.get(url);

    if (!response.data || !Array.isArray(response.data)) {
      return NextResponse.json({ error: "Invalid API response format" }, { status: 500 });
    }

    const coins: CoinMarketCapResponse[] = response.data;

    return NextResponse.json(coins);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to fetch data", details: errorMessage }, { status: 500 });
  }
}
