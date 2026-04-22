"use client";

import { useState } from "react";
import { PricechartMorph } from "@/components/chart/pricechart-morph";
import AssetSelector from "@/components/asset-selector";
import GeneralAssets from "@/lib/assets";
import { StaticImageData } from "next/image";

export interface AssetType {
  label: string;
  asset: StaticImageData;
}

export const assetData = [
  { label: "Robinhood", asset: GeneralAssets.Robinhood },
  { label: "Crypto.com", asset: GeneralAssets.Cryptodotcom },
  { label: "Kraken", asset: GeneralAssets.Kraken },
  { label: "Hyperliquid", asset: GeneralAssets.Hyperliquid },
];

export default function FullChartPage() {
  const [selectedAsset, setSelectedAsset] = useState<AssetType>(assetData[0]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="flex flex-col gap-6">
        <AssetSelector
          assetData={assetData}
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
        />
        <PricechartMorph exchange={selectedAsset.label} />
      </div>
    </div>
  );
}
