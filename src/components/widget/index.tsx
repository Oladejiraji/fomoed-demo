"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { isAnimationActiveAtom, widgetSizeAtom } from "@/lib/atoms/widget";
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

function clamp(value: number, min = 300, max = 800) {
  return Math.min(max, Math.max(min, value));
}

const SNAP_SIZES = [
  { label: "small", width: 330, height: 330 },
  { label: "medium", width: 688, height: 425 },
  { label: "large", width: 688, height: 688 },
];

const sizes = {
  small: { width: 330, height: 330 },
  medium: { width: 688, height: 425 },
  large: { width: 688, height: 688 },
};

function snapToClosest(width: number, height: number) {
  return SNAP_SIZES.reduce((closest, candidate) => {
    const dCurrent = Math.hypot(width - closest.width, height - closest.height);
    const dCandidate = Math.hypot(
      width - candidate.width,
      height - candidate.height,
    );
    return dCandidate < dCurrent ? candidate : closest;
  });
}

const BASE_PRICE = 97;

export function ResizeWidget() {
  const [size, setWidgetSize] = useAtom(widgetSizeAtom);
  const setisAnimationActive = useSetAtom(isAnimationActiveAtom);

  const [dragSize, setDragSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<DataPoint[]>(() => generateAaveData());

  const displaySize = dragSize ?? sizes[size];

  const dragState = useRef<{
    edge: "right" | "bottom" | "corner";
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);

  const onMouseDown = useCallback(
    (edge: "right" | "bottom" | "corner") => (e: React.MouseEvent) => {
      e.preventDefault();
      const startWidth = sizes[size].width;
      const startHeight = sizes[size].height;
      setDragSize({ width: startWidth, height: startHeight });
      dragState.current = {
        edge,
        startX: e.clientX,
        startY: e.clientY,
        startWidth,
        startHeight,
      };

      const onMouseMove = (ev: MouseEvent) => {
        if (!dragState.current) return;
        const { edge, startX, startY, startWidth, startHeight } =
          dragState.current;
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        setDragSize({
          width: edge === "bottom" ? startWidth : clamp(startWidth + dx),
          height: edge === "right" ? startHeight : clamp(startHeight + dy),
        });
      };

      document.body.style.cursor = "nwse-resize";

      const onMouseUp = () => {
        dragState.current = null;
        document.body.style.cursor = "";
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        setDragSize((current) => {
          if (!current) return null;
          const snapped = snapToClosest(current.width, current.height);
          setWidgetSize(snapped.label as typeof size);
          return null;
        });
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [size, setWidgetSize],
  );

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timeout);
  }, []);

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
      setisAnimationActive(false);
      setData((prev) => [...prev.slice(1), newPoint]);
    }, 5000);
    return () => clearInterval(interval);
  }, [setisAnimationActive]);

  const lastPrice = useRef(data[data.length - 1].price);
  const latestPrice = data[data.length - 1]?.price ?? BASE_PRICE;
  const firstPrice = data[0]?.price ?? BASE_PRICE;
  const pctChange = ((latestPrice - firstPrice) / firstPrice) * 100;

  if (!isLoaded) return null;

  return (
    <motion.div
      initial={{
        width: sizes[size].width,
        height: sizes[size].height,
      }}
      animate={{
        // width: sizes[size].width,
        // height: sizes[size].height,
        width: displaySize.width,
        height: displaySize.height,
      }}
      transition={{
        duration: 0.1,
      }}
      // drag
      className="overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#0f1010_0%,#0b0c0c_100%)] border border-[#202021] relative"
    >
      <div className="w-full h-full flex flex-col">
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
            initial={{ backdropFilter: "blur(4px)" }}
            animate={{
              backdropFilter: dragSize ? "blur(4px)" : "blur(0px)",
              transition: {
                duration: dragSize ? 0 : 0.3,
                delay: dragSize ? 0 : 0.2,
              },
            }}
          ></motion.div>
        </div>
      </div>
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
        onMouseDown={onMouseDown("corner")}
      />
    </motion.div>
  );
}
