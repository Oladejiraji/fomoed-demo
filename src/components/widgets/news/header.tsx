import React from "react";
import { EllipsisIcon, SearchIcon, VoiceIcon } from "@/icons";
import { Tag } from "./tag";
import { Tokens } from "./tokens";
import { useAtomValue } from "jotai";
import { selectedNewsTokenAtom } from "@/lib/atoms/news";

export function Header() {
  const selectedToken = useAtomValue(selectedNewsTokenAtom);

  return (
    <div className="p-3 pb-5.75 flex items-center justify-between">
      <div className="flex flex-col gap-1.5">
        <Tokens />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <p className="font-medium text-sm leading-[1.43] tracking-[0.0001em] text-[rgba(249,249,249,0.7)]">
              ${selectedToken?.price}
            </p>
            <div className="rounded-[5px] px-0.75 py-0.5 bg-[#4CAF821A]">
              <p className="font-semibold text-xs leading-[1.17] tracking-[0.0001em] text-[#4caf82]">
                +{Math.abs(selectedToken?.change)}%
              </p>
            </div>
          </div>

          <Tag />
        </div>
      </div>

      <div className="flex items-center">
        <button
          type="button"
          className="w-8 h-8 cursor-pointer flex justify-center items-center"
        >
          <SearchIcon />
        </button>

        <button
          type="button"
          className="w-8 h-8 cursor-pointer flex justify-center items-center"
        >
          <VoiceIcon />
        </button>

        <button
          type="button"
          className="w-8 h-8 cursor-pointer flex justify-center items-center"
        >
          <EllipsisIcon fill="#F9F9F980" />
        </button>
      </div>
    </div>
  );
}
