"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface TradeRow {
  id: string;
  time: Date;
  price: number;
  qty: number;
  isBuy: boolean;
}

const BASE_PRICE = 0.000293;
const MAX_TRADES = 50;

function generateTrade(id: string): TradeRow {
  const offset = (Math.random() - 0.5) * 0.00001;
  return {
    id,
    time: new Date(),
    price: parseFloat((BASE_PRICE + offset).toFixed(6)),
    qty: parseFloat((Math.random() * 8000 + 300).toFixed(2)),
    isBuy: Math.random() > 0.5,
  };
}

function generateInitialTrades(): TradeRow[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `init-${i}`,
    time: new Date(Date.now() - (20 - i) * 1800),
    price: parseFloat(
      (BASE_PRICE + (Math.random() - 0.5) * 0.00001).toFixed(6),
    ),
    qty: parseFloat((Math.random() * 8000 + 300).toFixed(2)),
    isBuy: Math.random() > 0.5,
  }));
}

function fmt(n: number, decimals = 6) {
  return n.toFixed(decimals);
}

function fmtSize(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toFixed(0);
}

function fmtTime(d: Date) {
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

interface IProps {
  isActive: boolean;
}

let counter = 0;

export default function Trades(props: IProps) {
  const { isActive } = props;
  const [trades, setTrades] = useState<TradeRow[]>(() =>
    generateInitialTrades(),
  );

  useEffect(() => {
    const interval = setInterval(
      () => {
        const newTrade = generateTrade(`trade-${++counter}`);
        setTrades((prev) => {
          const next = [newTrade, ...prev];
          return next.length > MAX_TRADES ? next.slice(0, MAX_TRADES) : next;
        });
      },
      800 + Math.random() * 400,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-1 flex-col w-full h-full gap-2 overflow-hidden",
        !isActive && "hidden",
      )}
    >
      {/* Header */}
      <div className="flex items-center px-5">
        <div className="flex-1 h-7 px-1 flex items-center">
          <p className="text-[#F9F9F94D] text-xs leading-3 font-medium tracking-[-0.56%]">
            Time
          </p>
        </div>
        <div className="flex-1 h-7 px-1 flex items-center">
          <p className="text-[#F9F9F94D] text-xs leading-3 font-medium tracking-[-0.56%]">
            Price (USDC)
          </p>
        </div>
        <div className="flex-1 h-7 px-1 flex items-center justify-end">
          <p className="text-[#F9F9F94D] text-xs leading-3 font-medium tracking-[-0.56%]">
            Qty
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-0.5 px-5 overflow-y-auto">
        {trades.map((trade) => (
          <div key={trade.id} className="flex items-center h-6 shrink-0">
            <p className="text-[#F9F9F9CC] px-1 text-xs leading-3 tracking-[-0.56%] tabular-nums flex-1">
              {fmtTime(trade.time)}
            </p>
            <p
              className={cn(
                "px-1 text-xs leading-3 tracking-[-0.56%] tabular-nums flex-1",
                trade.isBuy ? "text-[#4CAF82]" : "text-[#E55767]",
              )}
            >
              {fmt(trade.price)}
            </p>
            <p
              className={cn(
                "px-1 text-xs leading-3 tracking-[-0.56%] tabular-nums flex-1 text-right",
                trade.isBuy ? "text-[#4CAF82]" : "text-[#E55767]",
              )}
            >
              {fmtSize(trade.qty)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
