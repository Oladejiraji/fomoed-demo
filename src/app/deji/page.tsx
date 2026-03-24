"use client";

import { useState } from "react";
import { Slider } from "@/components/slider";
import Tabs from "@/components/tabs";
import Swap from "@/components/swap";
import { Chart } from "@/components/chart";
import GeneralAssets from "@/lib/assets";
import { StaticImageData } from "next/image";
import AssetSelector from "@/components/asset-selector";
import Balance from "@/components/balance";

export interface AssetType {
  label: string;
  asset: StaticImageData;
}

const assetData = [
  { label: "Robinhood", asset: GeneralAssets.Robinhood },
  { label: "Crypto.com", asset: GeneralAssets.Cryptodotcom },
  { label: "Kraken", asset: GeneralAssets.Kraken },
  { label: "Hyperliquid", asset: GeneralAssets.Hyperliquid },
];

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
  const [selectedAsset, setSelectedAsset] = useState<AssetType>(assetData[0]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center ">
      <div className="w-full max-w-78">
        {/* <div>
          <AssetSelector
            assetData={assetData}
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
          />
        </div> */}
        {/* <div>
          <Chart />
        </div> */}
        {/* <div className="my-12">
          <Tabs
            tabs={tabData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div> */}
        <div className="mb-12">
          <Slider value={value} onChange={setValue} />
        </div>
        {/* <div>
          <Swap />
        </div> */}
        {/* <div className="mt-12">
          <Balance />
        </div> */}
      </div>
    </div>
  );
}
