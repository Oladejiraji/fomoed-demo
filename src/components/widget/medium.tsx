import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FXIcon, Indicator, SearchIcon } from "@/icons";
import { DurationSection } from "../chart/pricechart";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Price } from "./price";
import { DataPoint } from ".";

interface IMediumChart {
  data: DataPoint[];
}

interface IProps {
  isActive: boolean;
  data: DataPoint[];
  latestPrice?: number;
  pctChange?: number;
}

function getTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  });
}

function Time() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p
      suppressHydrationWarning
      className="text-[#F9F9F980] tracking-0 text-xs leading-4 font-medium px-2 tabular-nums"
    >
      {time ?? "--:--:--"} UTC
    </p>
  );
}

function MediumChart(props: IMediumChart) {
  const { data } = props;

  return (
    <div className="flex-1 w-full h-full">
      <ResponsiveContainer width="100%" height="100%" minHeight={80}>
        <AreaChart
          data={data}
          margin={{ top: 70, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="time" hide />
          <YAxis domain={["auto", "auto"]} hide />

          <Tooltip
            contentStyle={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#f9f9f9",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#999" }}
            formatter={(value) => [`$${Number(value).toFixed(4)}`, "AAVE"]}
          />
          <Area
            type="linear"
            dataKey="price"
            stroke="#4CAF82"
            fill="#4CAF8218"
            isAnimationActive={false}
            strokeWidth={1.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Medium(props: IProps) {
  const { isActive, data, latestPrice, pctChange } = props;

  return (
    <div
      className={cn("w-full h-full max-h-93.75", isActive ? "flex" : "hidden")}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-10 flex items-center justify-between border-b border-[#F9F9F905]">
          <div className="flex items-center gap-1">
            <div className="flex items-center w-10">
              <button
                type="button"
                className="text-xs tracking-[-0.0056em] leading-5 text-[#F9F9F9] flex-1"
              >
                1M
              </button>
              <div className="bg-[#F9F9F91A] h-5 w-px"></div>
            </div>

            <div className="w-7 flex justify-center items-center">
              <Indicator />
            </div>

            <div className="flex gap-1 items-center">
              <div className="w-5 flex justify-center items-center">
                <FXIcon />
              </div>
              <p className="text-[#F9F9F94D] text-xs leading-5 tracking-[-0.0056em]">
                Indicators
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-6 h-6 mr-1.5 flex justify-center items-center"
          >
            <SearchIcon />
          </button>
        </div>
        <div className="flex flex-1">
          <div className="w-10 h-full border-r border-[#F9F9F908]"></div>
          <div className="flex-1 flex flex-col">
            <div className="flex-1 relative">
              <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-2 z-2">
                <Price price={latestPrice} priceChange={pctChange} />
              </div>
              <MediumChart data={data} />
            </div>
            <div className="h-12 w-full flex items-center justify-between px-1.5 border-t border-[#F9F9F905]">
              <DurationSection />

              <div className="flex items-center gap-2">
                <Time />
                <div className="h-5 w-0.5 bg-[#F9F9F91A]"></div>
                <p className="text-[#F9F9F980] tracking-[-0.0056em] text-sm leading-5 font-medium px-2">
                  %
                </p>
                {/* <p className="text-[#F9F9F980] tracking-[-0.0056em] text-sm leading-5 font-medium px-2.5">
                  Log
                </p>
                <p className="text-[#007CE9] tracking-[-0.0056em] text-sm leading-5 font-medium px-2.5">
                  Auto
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
