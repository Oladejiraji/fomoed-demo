import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useState } from "react";

const tabOptions = [
  {
    id: 1,
    value: "order",
    label: "Order Books",
  },
  {
    id: 2,
    value: "trade",
    label: "Trades",
  },
];

const OrderBook = () => {
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  return (
    <div
      className="px-5 py-4 border border-[#262626] bg-[#262626] rounded-[16px] h-full"
      style={{
        boxShadow:
          "0px 0px 0px 1px #FFFFFF0A inset, 0px 2px 0px 0px #FFFFFF14 inset, 0px 0px 0px 1px #00000029, 0px 1px 1px -0.5px #0000002E, 0px 3px 3px -1.5px #0000002E, 0px 6px 6px -3px #00000040, 0px 12px 12px -6px #0000002E",
      }}
    >
      <div className="bg-[#1D1D1D] px-0.75 py-0.5 rounded-full flex items-center h-9">
        {tabOptions.map((tab, i) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={i}
              onClick={() => setActiveTab(tab.value)}
              className="relative rounded-full flex-1 flex items-center justify-center h-8 cursor-pointer"
            >
              {isActive && (
                <motion.span
                  layoutId="order-book-tab-active"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, #1D1D1D -35%, #242424 167.5%)",
                    border: "1px solid #272727",
                    boxShadow:
                      "0px 0px 0px 1px #FFFFFF0A inset, 0px 2px 0px 0px #FFFFFF14 inset, 0px 0px 0px 1px #00000029, 0px 1px 1px -0.5px #0000002E, 0px 3px 3px -1.5px #0000002E, 0px 6px 6px -3px #00000040, 0px 12px 12px -6px #0000002E",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={cn(
                  "relative text-[13px] font-medium text-[#f9f9f9]",
                  {
                    "opacity-100": isActive,
                    "opacity-30": !isActive,
                  },
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrderBook;
