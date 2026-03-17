import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../api";
import type { CandlestickData } from "./types";

export const useBTCCandlestick = (
  symbol: string = "BTCUSDT",
  interval: string = "1d",
  limit: number = 100,
) => {
  const response = useQuery({
    queryKey: ["binance", "candlestick", symbol, interval, limit],
    queryFn: async () => {
      const res = await api.get({
        url: `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
      });
      // Transform the raw Binance data into a more usable format
      return res.data.map((candle: any[]) => ({
        time: candle[0] / 1000,
        value: parseFloat(candle[4]),
        // openTime: candle[0],
        // open: candle[1],
        // high: candle[2],
        // low: candle[3],
        // close: candle[4],
        // volume: candle[5],
        // closeTime: candle[6],
        // quoteAssetVolume: candle[7],
        // numberOfTrades: candle[8],
        // takerBuyBaseAssetVolume: candle[9],
        // takerBuyQuoteAssetVolume: candle[10],
      })) as CandlestickData[];
    },
    refetchInterval: false, // Refetch every 30 seconds
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
  });
  return response;
};

export const useBTCPriceWebSocket = (
  symbol: string = "btcusdt",
  interval: string = "5m",
  maxDataPoints: number = 100,
) => {
  const [priceData, setPriceData] = useState<CandlestickData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`,
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newDataPoint: CandlestickData = {
        time: Math.floor(Date.now() / 1000), // Kline start time in seconds
        value: parseFloat(data.k.c), // Close price
      };

      console.log(newDataPoint);

      setPriceData((prev) => {
        const updated = [...prev, newDataPoint];
        // Keep only the last maxDataPoints
        return updated.slice(-maxDataPoints);
      });
      setIsLoading(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsLoading(false);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsLoading(false);
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, [symbol, interval, maxDataPoints]);

  return { data: priceData, isLoading };
};
