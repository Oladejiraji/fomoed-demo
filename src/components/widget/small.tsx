import React from "react";
import { Price } from "./price";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import { DataPoint } from ".";

interface IProps {
  data: DataPoint[];
  latestPrice?: number;
  pctChange?: number;
  isActive: boolean;
}

interface ISmallChart {
  data: DataPoint[];
}

function SmallChart(props: ISmallChart) {
  const { data } = props;

  return (
    <div className="flex-1 w-full h-full">
      <ResponsiveContainer width="100%" height="100%" minHeight={80}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
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

export function Small(props: IProps) {
  const { data, latestPrice, isActive, pctChange } = props;

  return (
    <div
      className={cn(
        "flex-col gap-1.5 w-full h-full",
        isActive ? "flex" : "hidden",
      )}
    >
      <div className="p-3">
        <Price price={latestPrice} priceChange={pctChange} />
      </div>
      <SmallChart data={data} />
    </div>
  );
}
