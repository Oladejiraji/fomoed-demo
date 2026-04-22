import React from "react";
import { PricechartMorph } from "../chart/pricechart-morph";
import { AaveIcon, CaretDown, Ellipse, QuestionIcon } from "@/icons";

function Header() {
  return (
    <div className="h-12 flex items-center justify-between px-3">
      <div className="flex items-center gap-4 ml-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#9391F7] flex justify-center rounded-[10px] items-center">
            <AaveIcon />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <p className="text-[#F9F9F9] text-xs leading-[100%] tracking-[-0.4%] font-medium">
                Aave
              </p>
              <div className="w-2.5 h-2.5 flex justify-center items-center">
                <CaretDown />
              </div>
            </div>
            <p className="text-[#F9F9F966] text-[10px] leading-[100%] tracking-[-0.4%]">
              Perps
            </p>
          </div>
        </div>

        {/* <div className="flex flex-col gap-0.5">
          <p className="text-[#F9F9F9] text-xs leading-[100%] tracking-[-0.4%] font-medium">
            $4.9
          </p>
          <div className="py-0.5 px-1 rounded-[3px] bg-[#4CAF821A]">
            <p className="text-[#4CAF82] text-[10px] leading-3 tracking-[-0.56%] font-semibold">
              +5.92%
            </p>
          </div>
        </div> */}
      </div>
      <div className="flex items-center">
        <button
          type="button"
          className="w-6 h-6 flex justify-center items-center"
        >
          <QuestionIcon />
        </button>

        <button
          type="button"
          className="w-6 h-6 flex justify-center items-center"
        >
          <Ellipse />
        </button>
      </div>
    </div>
  );
}

export function PriceChart() {
  return (
    <div className="w-full h-full flex flex-col bg-[#262626]">
      <Header />
      <div className="flex-1 w-full h-full border-t border-[#222222]">
        <PricechartMorph containerClassName="h-full w-full bg-[transparent] rounded-0" />
      </div>
    </div>
  );
}
