import React, { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import { Popover } from "react-tiny-popover";
import { CaretDown } from "@/icons";
import { selectedNewsTokenAtom, selectNewsTokenAtom } from "@/lib/atoms/news";
import { tokens } from "./tokens-data";

export function Tokens() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const selected = useAtomValue(selectedNewsTokenAtom);
  const selectNewsToken = useSetAtom(selectNewsTokenAtom);

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom", "top", "left", "right"]}
      align="start"
      onClickOutside={() => {
        setIsPopoverOpen(false);
      }}
      content={
        <div className="w-52.5 p-1.5 bg-[#212121] border border-[#202021] rounded-xl flex flex-col mt-1.5">
          {tokens?.map((item) => {
            return (
              <button
                key={item?.symbol}
                type="button"
                className="h-8.5 w-full hover:bg-[#323232] rounded-[6px] cursor-pointer"
                onClick={() => {
                  selectNewsToken(item);
                  setIsPopoverOpen(false);
                }}
              >
                <div className="flex items-center gap-2 pl-2.75">
                  <div className="w-4 h-4 rounded-full">
                    <Image src={item?.logo} alt="logo" width={16} height={16} />
                  </div>
                  <p className="text-[#F9F9F9] leading-none tracking-[-0.4%] text-xs font-medium">
                    {item?.symbol}
                  </p>
                  <p className="text-[#F9F9F966] leading-none tracking-[-0.4%] text-xs font-medium">
                    {item?.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      }
    >
      <button
        type="button"
        onClick={() => {
          setIsPopoverOpen((prev) => !prev);
        }}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="w-6 h-6 flex justify-center items-center rounded-lg overflow-hidden">
          <Image
            src={selected.logo}
            alt={selected.name}
            width={24}
            height={24}
          />
        </div>

        <div className="flex items-center gap-0.5">
          <p className="text-[#F9F9F9] font-medium text-sm tracking-[-0.01em] leading-5">
            {selected.symbol}
          </p>

          <div className="w-4 h-4 flex justify-center items-center">
            <CaretDown />
          </div>
        </div>
      </button>
    </Popover>
  );
}
