"use client";
import React from "react";
import { Liveline } from "liveline";
import { useBTCPriceWebSocket } from "@/services/chart";

export function Chart() {
  const { data: btcPriceData, isLoading } = useBTCPriceWebSocket();

  const btcValue = btcPriceData?.[btcPriceData.length - 1]?.value ?? 0;

  return (
    <div className="h-25 max-w-78 w-full bg-[#0B0B0B] relative">
      <Liveline
        loading={isLoading}
        data={btcPriceData || []}
        value={btcValue}
        color="#4CAF82"
        theme="dark"
        showValue={false}
        momentum={false}
        scrub
        degen
        window={2 * 60}
        grid={false}
        badge={false}
      />

      <div className="absolute top-0 left-0 h-full w-[20%] pointer-events-none flex">
        <div
          className="h-full"
          style={{
            width: "75%",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
          }}
        />

        <div
          className="h-full"
          style={{
            width: "25%",
            marginLeft: "-18.75%",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
          }}
        />
        <div
          className="h-full"
          style={{
            width: "25%",
            marginLeft: "-18.75%",
            backdropFilter: "blur(1.5px)",
            WebkitBackdropFilter: "blur(1.5px)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
          }}
        />
        <div
          className="h-full"
          style={{
            width: "25%",
            marginLeft: "-18.75%",
            backdropFilter: "blur(1px)",
            WebkitBackdropFilter: "blur(1px)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
          }}
        />
        <div
          className="h-full"
          style={{
            width: "25%",
            marginLeft: "-18.75%",
            backdropFilter: "blur(0.5px)",
            WebkitBackdropFilter: "blur(0.5px)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
