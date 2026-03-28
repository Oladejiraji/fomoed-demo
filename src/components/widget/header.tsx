import React from "react";
import { AeveIcon, CaretDown, EllipsisIcon, QuestionIcon } from "@/icons";

export function Header() {
  return (
    <div className="h-12 shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] bg-[#111213] flex items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#9391F7] flex justify-center items-center rounded-sm">
          <AeveIcon />
        </div>
        <div className="flex items-center gap-0.5">
          <div className="flex items-center gap-1">
            <p className="text-[#D0D6E0] font-medium text-xs tracking-[-0.004em] leading-none">
              Aave
            </p>
            <p className="text-[#D0D6E066] text-[10px] tracking-[-0.004em] leading-none">
              Perps
            </p>
          </div>
          <button
            type="button"
            className="w-4 h-4 flex justify-center items-center"
          >
            <CaretDown />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="w-6 h-6 flex justify-center items-center"
        >
          <QuestionIcon />
        </button>
        <button
          type="button"
          className="w-6 h-6 rounded-full flex justify-center items-center bg-[#161718]"
        >
          <EllipsisIcon />
        </button>
      </div>
    </div>
  );
}
