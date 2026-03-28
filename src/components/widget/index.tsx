"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Small } from "./small";
import { Header } from "./header";
import { Medium } from "./medium";
import { LargeTable } from "./large-table";

export type DataPoint = {
  time: string;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

function makeOHLC(open: number, close: number) {
  const hi = Math.max(open, close);
  const lo = Math.min(open, close);
  return {
    open: parseFloat(open.toFixed(4)),
    high: parseFloat((hi + Math.random() * 0.3).toFixed(4)),
    low: parseFloat((lo - Math.random() * 0.3).toFixed(4)),
    close: parseFloat(close.toFixed(4)),
  };
}

function generateAaveData(): DataPoint[] {
  const points: DataPoint[] = [];
  let prev = 97;
  const now = Date.now();

  for (let i = 100; i >= 0; i--) {
    const change = (Math.random() - 0.48) * 0.01 * prev;
    const close = Math.max(prev + change, 80);
    const t = new Date(now - i * 2000);
    points.push({
      time: t.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      price: parseFloat(close.toFixed(4)),
      ...makeOHLC(prev, close),
    });
    prev = close;
  }
  return points;
}

const sizes = {
  small: { width: 330, height: 330 },
  medium: { width: 688, height: 425 },
  large: { width: 688, height: 688 },
};

const BASE_PRICE = 97;

export function ResizeWidget() {
  const [size, setSize] = useState<keyof typeof sizes>("large");
  const [data, setData] = useState<DataPoint[]>(() => generateAaveData());
  const lastPrice = useRef(data[data.length - 1].price);

  useEffect(() => {
    const interval = setInterval(() => {
      const open = lastPrice.current;
      const change = (Math.random() - 0.48) * 0.01 * open;
      const close = Math.max(open + change, 80);
      lastPrice.current = close;
      const newPoint: DataPoint = {
        time: new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        price: parseFloat(close.toFixed(4)),
        ...makeOHLC(open, close),
      };
      setData((prev) => [...prev.slice(1), newPoint]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const latestPrice = data[data.length - 1]?.price ?? BASE_PRICE;
  const firstPrice = data[0]?.price ?? BASE_PRICE;
  const pctChange = ((latestPrice - firstPrice) / firstPrice) * 100;

  return (
    <motion.div
      initial={{
        width: sizes[size].width,
        height: sizes[size].height,
      }}
      animate={{
        width: sizes[size].width,
        height: sizes[size].height,
      }}
      className="overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#0f1010_0%,#0b0c0c_100%)] border border-[#202021]"
    >
      <div
        className="w-full h-full flex flex-col "
        onClick={() => {
          // setSize(size === "medium" ? "large" : "medium");
        }}
      >
        <Header />
        <div className="flex-1 text-white overflow-y-auto relative">
          <Small
            data={data}
            latestPrice={latestPrice}
            pctChange={pctChange}
            isActive={size === "small"}
          />
          <Medium
            data={data}
            latestPrice={latestPrice}
            pctChange={pctChange}
            isActive={size === "medium" || size === "large"}
          />
          <LargeTable isActive={size === "large"} />
          <motion.div
            key={size}
            className="absolute inset-0 z-2 pointer-events-none"
            initial={{ backdropFilter: "blur(10px)" }}
            animate={{
              backdropFilter: "blur(0px)",
              transition: { duration: 0.3, delay: 0.2 },
            }}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
}
