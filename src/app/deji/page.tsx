"use client";

import { useState } from "react";
import { Slider } from "@/components/slider";
import Tabs from "@/components/tabs";
import Swap from "@/components/swap";
import { Chart } from "@/components/chart";

const tabData = [
  {
    label: "Markets",
    value: "markets",
  },
  {
    label: "Trade",
    value: "trade",
  },
  {
    label: "Portfolio",
    value: "portfolio",
  },
];

export default function Deji() {
  const [value, setValue] = useState(25);
  const [activeTab, setActiveTab] = useState(tabData[0].value);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center ">
      <div className="w-full max-w-78">
        <div>
          <Chart />
        </div>
        <div className="my-12">
          <Tabs
            tabs={tabData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="mb-12">
          <Slider value={value} onChange={setValue} />
        </div>
        <div>
          <Swap />
        </div>
      </div>
    </div>
  );
}
