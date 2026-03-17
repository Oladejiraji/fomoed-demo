import { StaticImageData } from "next/image";
import React from "react";

interface IProps {
  assetData: Array<{
    label: string;
    asset: StaticImageData;
  }>;
}

const AssetSelector = () => {
  return <div>AssetSelector</div>;
};

export default AssetSelector;
