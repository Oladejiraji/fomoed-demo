"use client";
import React from "react";
import { Liveline } from "liveline";
import { useBTCPriceWebSocket } from "@/services/chart";

export function Chart() {
  const { data: btcPriceData, isLoading } = useBTCPriceWebSocket();

  const btcValue = btcPriceData?.[btcPriceData.length - 1]?.value ?? 0;

  return (
    <div className="h-25 max-w-78 w-full bg-[#0B0B0B]">
      <Liveline
        loading={isLoading}
        data={btcPriceData || []}
        value={btcValue}
        color="#4CAF82"
        theme="dark"
        showValue={false}
        momentum
        scrub
        degen
        window={2 * 60}
        grid={false}
        badge={false}
      />
    </div>
  );
}
