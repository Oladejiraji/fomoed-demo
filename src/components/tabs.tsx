import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";

interface IProps {
  activeTab: string;
  setActiveTab: (_tab: string) => void;
  tabs: Array<{
    label: string;
    value: string;
  }>;
}

const Tabs = (props: IProps) => {
  const { activeTab, tabs, setActiveTab } = props;
  return (
    <div className="flex items-center">
      {tabs.map((tab, i) => {
        return (
          <button
            key={i}
            onClick={() => setActiveTab(tab.value)}
            className="relative flex items-center justify-center cursor-pointer h-8 "
          >
            {activeTab === tab.value ? (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 w-full h-full rounded-full bg-[#191919]"
              ></motion.div>
            ) : null}
            <span
              className={cn(
                "text-[#f9f9f9] text-[13px] font-medium px-4 py-2 relative transition-opacity",
                activeTab === tab.value ? "opacity-100" : "opacity-30",
              )}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
