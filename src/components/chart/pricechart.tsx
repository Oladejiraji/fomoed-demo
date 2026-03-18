import React, { useState } from "react";
// import { Chart, AreaSeries } from "lightweight-charts-react-components";
import { FXIcon, Indicator, SearchIcon } from "@/icons";
import { cn } from "@/lib/utils";

const durationOptions = [
  { id: 1, label: "ALL", value: "all" },
  { id: 2, label: "5Y", value: "5y" },
  { id: 3, label: "1Y", value: "1y" },
  { id: 4, label: "6M", value: "6m" },
  { id: 5, label: "3M", value: "3m" },
  { id: 6, label: "1M", value: "1m" },
  { id: 7, label: "1W", value: "1w" },
  { id: 8, label: "1D", value: "1d" },
];

function DurationSection() {
  const [selectedDuration, setSelectedDuration] = useState("all");

  return (
    <div className="flex gap-1 items-center">
      {durationOptions.map((item) => {
        const isActive = selectedDuration === item.value;
        const activeClassName =
          "shadow-[0_0_0_1px_rgba(71,71,71,0.25),0_4px_16px_0_rgba(1,1,1,0.25),inset_1px_2px_0_0_rgba(71,71,71,0.55),inset_1px_1px_0_0_rgba(71,71,71,0.85),inset_-1px_1px_0_0_rgba(71,71,71,0.85),inset_-1px_-1px_0_0_rgba(71,71,71,0.55),1px_4px_16px_0_rgba(71,71,71,0.08)] bg-gradient-to-b from-[#474747] to-[#3d3d3d] text-white";

        return (
          <button
            key={item?.id}
            type="button"
            className={cn(
              "font-medium text-xs leading-5 tracking-[-0.0056em] text-[#F9F9F980] py-0.5 px-2.5 rounded-md cursor-pointer",
              isActive && activeClassName,
            )}
            onClick={() => {
              setSelectedDuration(item?.value);
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export function Pricechart() {
  return (
    <div className="bg-[#212121] h-92 max-w-208 w-full rounded-xl flex flex-col overflow-hidden">
      <div className="h-10 flex items-center justify-between border-b border-[#F9F9F905]">
        <div className="flex items-center gap-1">
          <div className="flex items-center w-10">
            <button
              type="button"
              className="text-xs tracking-[-0.0056em] leading-5 text-[#F9F9F9] flex-1"
            >
              1M
            </button>
            <div className="bg-[#F9F9F91A] h-5 w-px"></div>
          </div>

          <div className="w-7 flex justify-center items-center">
            <Indicator />
          </div>

          <div className="flex gap-1 items-center">
            <div className="w-5 flex justify-center items-center">
              <FXIcon />
            </div>
            <p className="text-[#F9F9F94D] text-xs leading-5 tracking-[-0.0056em]">
              Indicators
            </p>
          </div>
        </div>

        <button
          type="button"
          className="w-6 h-6 mr-1.5 flex justify-center items-center"
        >
          <SearchIcon />
        </button>
      </div>
      <div className="flex flex-1">
        <div className="w-10 h-full border-r border-[#F9F9F908]"></div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <div className="absolute top-0 left-0 w-full flex justify-between items-start p-2 pointer-events-none">
              <div className="flex flex-col gap-1.5 pointer-events-auto">
                <h3 className="text-[#F9F9F9] font-semibold text-2xl leading-8 tracking-[-0.0056em]">
                  $72,923.20
                </h3>
                <p className="text-[#6DCB72] font-medium text-sm leading-4 tracking-[-0.0056em]">
                  +200.29 (+5.92%)
                </p>
              </div>

              <div className="flex gap-2 items-center py-1 px-1.5 pointer-events-auto">
                <div className="flex items-center gap-1">
                  <p className="text-[#F9F9F966] text-xs leading-4 tracking-0">
                    O
                  </p>
                  <p className="text-[#F9F9F9] font-medium text-xs leading-4 tracking-0">
                    137.47
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-[#F9F9F966] text-xs leading-4 tracking-0">
                    H
                  </p>
                  <p className="text-[#F9F9F9] font-medium text-xs leading-4 tracking-0">
                    137.47
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-[#F9F9F966] text-xs leading-4 tracking-0">
                    L
                  </p>
                  <p className="text-[#F9F9F9] font-medium text-xs leading-4 tracking-0">
                    137.47
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-[#F9F9F966] text-xs leading-4 tracking-0">
                    C
                  </p>
                  <p className="text-[#F9F9F9] font-medium text-xs leading-4 tracking-0">
                    137.47
                  </p>
                </div>
                <p className="text-[#F9F9F9] font-medium text-xs leading-4 tracking-0">
                  -0.02 (-0.01)
                </p>
              </div>
            </div>
            {/* {
        CHART GOES HERE
      } */}
          </div>
          <div className="h-12 w-full flex items-center justify-between px-1.5 border-t border-[#F9F9F905]">
            <DurationSection />

            <div className="flex items-center gap-2">
              <p className="text-[#F9F9F980] tracking-0 text-xs leading-4 font-medium px-2">
                19:11:43 UTC
              </p>
              <div className="h-5 w-0.5 bg-[#F9F9F91A]"></div>
              <p className="text-[#F9F9F980] tracking-[-0.0056em] text-sm leading-5 font-medium px-2">
                %
              </p>
              <p className="text-[#F9F9F980] tracking-[-0.0056em] text-sm leading-5 font-medium px-2.5">
                Log
              </p>
              <p className="text-[#007CE9] tracking-[-0.0056em] text-sm leading-5 font-medium px-2.5">
                Auto
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
