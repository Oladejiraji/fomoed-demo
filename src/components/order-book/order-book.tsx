"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface OrderbookRow {
  id: string;
  price: number;
  size: number;
  total: number;
  depthPct: number;
}

function generateOrders(
  basePrice: number,
  count: number,
  isBuy: boolean,
): OrderbookRow[] {
  const rows: OrderbookRow[] = [];
  let cumTotal = 0;

  for (let i = 0; i < count; i++) {
    const offset = (i + 1) * (0.000001 + Math.random() * 0.000003);
    const price = isBuy ? basePrice - offset : basePrice + offset;
    const size = parseFloat((Math.random() * 8000 + 300).toFixed(2));
    cumTotal += size;
    rows.push({
      id: `${isBuy ? "buy" : "sell"}-${i}`,
      price: parseFloat(price.toFixed(6)),
      size,
      total: parseFloat(cumTotal.toFixed(2)),
      depthPct: 0,
    });
  }

  const maxTotal = cumTotal;
  return rows.map((r) => ({
    ...r,
    depthPct: parseFloat(((r.total / maxTotal) * 100).toFixed(1)),
  }));
}

function fmt(n: number, decimals = 6) {
  return n.toFixed(decimals);
}

function fmtSize(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toFixed(0);
}

interface IOrderbookItem {
  row: OrderbookRow;
  isBuy?: boolean;
}

function OrderbookItem({ row, isBuy = false }: IOrderbookItem) {
  return (
    <div className="h-6 flex shrink-0">
      <div className="flex-1 flex items-center">
        <p
          className={cn(
            "text-[#E55767] px-1 text-xs leading-3 tracking-[-0.56%] tabular-nums",
            isBuy && "text-[#4CAF82]",
          )}
        >
          {fmt(row.price)}
        </p>
      </div>
      <div className="flex-2 flex items-center relative" style={{ flex: 2 }}>
        <motion.div
          className={cn(
            "absolute top-0 right-0 bottom-0 bg-[#E557672B]",
            isBuy && "bg-[#4CAF821A]",
          )}
          animate={{ width: `${row.depthPct}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        <div className="flex-1 relative z-10">
          <p className="text-[#F9F9F9CC] px-1 text-xs leading-3 tracking-[-0.56%] text-right">
            {fmtSize(row.size)}
          </p>
        </div>
        <div className="flex-1 relative z-10">
          <p className="text-[#F9F9F9CC] px-1 text-xs leading-3 tracking-[-0.56%] text-right">
            {fmtSize(row.total)}
          </p>
        </div>
      </div>
    </div>
  );
}

const BASE_PRICE = 0.000293;
const ROW_COUNT = 7;

function generateBook(midPrice: number) {
  const asks = generateOrders(midPrice, ROW_COUNT, false);
  const bids = generateOrders(midPrice, ROW_COUNT, true);
  return { asks, bids };
}

interface IProps {
  isActive: boolean;
}

export default function OrderBook(props: IProps) {
  const { isActive } = props;
  const [midPrice, setMidPrice] = useState(BASE_PRICE);
  const [{ asks, bids }, setBook] = useState(() => generateBook(BASE_PRICE));

  useEffect(() => {
    const interval = setInterval(() => {
      setMidPrice((prev) => {
        const drift = (Math.random() - 0.49) * 0.000002;
        const next = parseFloat((prev + drift).toFixed(7));
        setBook(generateBook(next));
        return next;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const spread =
    asks[0] && bids[0]
      ? parseFloat((asks[0].price - bids[0].price).toFixed(7))
      : 0;
  const spreadPct =
    asks[0] && bids[0] ? ((spread / bids[0].price) * 100).toFixed(3) : "0.000";

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
          <p className="text-[#F9F9F9] text-xs leading-3 font-medium tracking-[-0.56%]">
            Price
          </p>
        </div>
        <div className="flex-1 h-7 px-1 flex items-center justify-end">
          <p className="text-[#F9F9F94D] text-xs leading-3 font-medium tracking-[-0.56%]">
            Size (USDC)
          </p>
        </div>
        <div className="flex-1 h-7 px-1 flex items-center justify-end">
          <p className="text-[#F9F9F94D] text-xs leading-3 font-medium tracking-[-0.56%]">
            Total (USDC)
          </p>
        </div>
      </div>

      <div className="flex flex-col flex-1 w-full h-full gap-1 overflow-y-auto px-5 scrollbar-minimal">
        {/* Asks — lowest ask at bottom, so reverse */}
        <div className="flex flex-col gap-0.5">
          {[...asks].reverse().map((row) => (
            <OrderbookItem key={row.id} row={row} isBuy={false} />
          ))}
        </div>

        {/* Spread */}
        <div className="flex items-center gap-2 py-1 px-1">
          <motion.p
            key={midPrice}
            initial={{ opacity: 0.6, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[#F9F9F9] text-xs font-semibold"
          >
            {fmt(midPrice)}
          </motion.p>
          <p className="text-[#F9F9F94D] text-[10px]">
            Spread {spread.toFixed(7)} ({spreadPct}%)
          </p>
        </div>

        {/* Bids */}
        <div className="flex flex-col gap-0.5">
          {bids.map((row) => (
            <OrderbookItem key={row.id} row={row} isBuy />
          ))}
        </div>
      </div>
    </div>
  );
}
