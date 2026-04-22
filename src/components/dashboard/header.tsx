import { Add, CaretRight, WidgetDashboard } from "@/icons";
import React from "react";

export function Header() {
  return (
    <div className="w-full border-b border-[#262626] px-2 h-10.5 flex items-center gap-2">
      <div className="w-7 h-7 flex justify-center items-center">
        <WidgetDashboard />
      </div>
      <p className="text-[#F9F9F999] text-[13px] leading-4.75 tracking-[-0.56%]">
        Widget dashboard
      </p>
      <div className="w-4 h-4 flex justify-center items-center">
        <CaretRight />
      </div>

      <div className="py-2 gap-2.5 flex items-center">
        <p className="text-[#F9F9F9DE] text-[13px] leading-5 tracking-[-0.56%]">
          BTC Dashboard
        </p>

        <div className="w-2 h-3 flex justify-center items-center">
          <div className="w-px h-full bg-[#F9F9F926]"></div>
        </div>
      </div>

      <button className="w-5 h-5 shadow-[0px_0px_0px_1px_#74747440] rounded-[5px] flex justify-center items-center cursor-pointer">
        <Add />
      </button>
    </div>
  );
}
