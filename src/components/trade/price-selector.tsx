import React, { useState } from "react";
import { Chart } from "../chart";
import Tabs from "../tabs";
import { Slider } from "../slider";
import Swap from "../swap";
import { DepositFlow } from "./deposit-flow";

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

export function PriceSelector() {
  const [value, setValue] = useState(25);
  const [activeTab, setActiveTab] = useState(tabData[0].value);
  const [showDepositModal, setShowDepositModal] = useState(false);

  return (
    <div className="max-w-[320px] w-full relative overflow-hidden">
      <div className="w-full max-w-75 mx-auto h-135">
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
          <Swap
            handleClick={() => {
              setShowDepositModal(true);
            }}
          />
        </div>
      </div>
      <DepositFlow
        showDepositModal={showDepositModal}
        setShowDepositModal={setShowDepositModal}
      />
    </div>
  );
}
