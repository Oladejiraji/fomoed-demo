import { AssetType } from "@/app/deji/page";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

interface IProps {
  assetData: Array<AssetType>;
  selectedAsset: AssetType;
  setSelectedAsset: (_asset: AssetType) => void;
}

const AssetSelector = (props: IProps) => {
  const { assetData, selectedAsset, setSelectedAsset } = props;
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1 items-center  h-7 w-28">
        <div className="">
          <Image
            src={selectedAsset.asset}
            alt={selectedAsset.label}
            width={28}
            height={28}
          />
        </div>
        <motion.p
          key={selectedAsset.label}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.3 }}
          className="text-[#f9f9f9] font-semibold text-[13px]"
        >
          {selectedAsset.label}
        </motion.p>
      </div>
      <div className="flex items-center">
        {assetData.map((asset, i) => {
          return (
            <button
              key={i}
              className="relative group isolate flex items-center  cursor-pointer"
              style={{ zIndex: assetData.length - i, right: `${i * 8}px` }}
              onClick={() => setSelectedAsset(asset)}
            >
              <div className="transition-transform duration-200 group-hover:-translate-y-2 relative">
                <Image
                  src={asset.asset}
                  alt={asset.label}
                  width={24}
                  height={24}
                />
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-1 relative right-6">
        <div className="size-1 bg-[#999999] rounded-full" />
        <p>{assetData.length}</p>
      </div>
    </div>
  );
};

export default AssetSelector;
