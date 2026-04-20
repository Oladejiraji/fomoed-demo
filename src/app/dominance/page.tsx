"use client";

import {
  BtcWave,
  EthWave,
  OthersWave,
  QuestionIcon,
  ThreeDotsIcon,
} from "@/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Wave = "btc" | "eth" | "others";

const BtcDominance = () => {
  const [active, setActive] = useState<Wave | null>(null);

  const activate = (wave: Wave) => setActive(wave);

  const regularTrack = (wave: Wave) =>
    cn(
      "flex w-[300%] animate-wave-slide transition-opacity duration-500",
      active === wave ? "opacity-0" : "wave-paused"
    );

  const activeTrack = (wave: Wave) =>
    cn(
      "absolute inset-0 flex w-[300%] animate-wave-slide transition-opacity duration-500",
      active === wave ? "" : "wave-paused opacity-0"
    );

  return (
    <main className="h-screen w-screen flex items-center justify-center bg-[#1A1A1A]">
      <div
        className="bg-[#262626] w-172 rounded-[16px] border border-[#262626] overflow-hidden"
        style={{
          boxShadow:
            "0px 0px 0px 1px #FFFFFF0A inset, 0px 2px 0px 0px #FFFFFF14 inset, 0px 0px 0px 1px #00000029, 0px 1px 1px -0.5px #0000002E, 0px 3px 3px -1.5px #0000002E, 0px 6px 6px -3px #00000040, 0px 12px 12px -6px #0000002E",
        }}
      >
        <div className="flex items-center justify-between border-b border-[#222222] px-4 py-3 ">
          <h3 className="text-[#F9F9F9] text-xs font-medium px-3">Dominance</h3>
          <div className="flex items-center">
            <div className="size-6 flex items-center justify-center">
              <QuestionIcon />
            </div>
            <div className="size-6 flex items-center justify-center">
              <ThreeDotsIcon />
            </div>
          </div>
        </div>
        <div className="px-7 py-4 flex items-center">
          <div className="pr-4">
            <h3 className="text-xs text-[#F9F9F999] py-1.5 leading-3 mb-1">
              Token Dominance
            </h3>
            <h2 className="text-[#F9F9F9] font-medium text-2xl">63.09%</h2>
          </div>
          <div className="pl-4 border-l-2 border-[#343434] flex items-center gap-4">
            <div>
              <h3 className="text-[#F9F9F999] text-xs pb-1">Price</h3>
              <h3 className="text-[#F9F9F9] text-xs font-medium">$75,019</h3>
            </div>
            <div>
              <h3 className="text-[#F9F9F999] text-xs pb-1">Growth</h3>
              <h3 className="text-[#F9F9F9] text-xs font-medium">63.09%</h3>
            </div>
            <div>
              <h3 className="text-[#F9F9F999] text-xs pb-1">24h Change</h3>
              <h3 className="text-[#F9F9F9] text-xs font-medium">98.02%</h3>
            </div>
            <div>
              <h3 className="text-[#F9F9F999] text-xs pb-1">
                All time Dominance
              </h3>
              <h3 className="text-[#F9F9F9] text-xs font-medium">98.02%</h3>
            </div>
          </div>
        </div>
        <div className="px-2">
          <div className="flex gap-5 h-1 ">
            {new Array(30).fill(0).map((_, i) => {
              return <div key={i} className="h-1 w-px bg-[#474747]" />;
            })}
          </div>
        </div>

        <div className="relative mt-10 h-55.25">
          <div
            className="absolute inset-x-0 bottom-0 cursor-pointer overflow-hidden"
            onClick={() => activate("btc")}
          >
            <div className={regularTrack("btc")}>
              <BtcWave variant="regular" className="w-1/3 h-auto shrink-0" />
              <BtcWave
                variant="regular"
                className="w-1/3 h-auto shrink-0 -scale-x-100 -ml-px"
                aria-hidden
              />
              <BtcWave
                variant="regular"
                className="w-1/3 h-auto shrink-0 -ml-px"
                aria-hidden
              />
            </div>
            <div className={activeTrack("btc")}>
              <BtcWave variant="active" className="w-1/3 h-auto shrink-0" />
              <BtcWave
                variant="active"
                className="w-1/3 h-auto shrink-0 -scale-x-100 -ml-px"
                aria-hidden
              />
              <BtcWave
                variant="active"
                className="w-1/3 h-auto shrink-0 -ml-px"
                aria-hidden
              />
            </div>
          </div>
          <div
            className="absolute inset-x-0 bottom-0 cursor-pointer overflow-hidden"
            onClick={() => activate("eth")}
          >
            <div className={regularTrack("eth")}>
              <EthWave variant="regular" className="w-1/3 h-auto shrink-0" />
              <EthWave
                variant="regular"
                className="w-1/3 h-auto shrink-0 -scale-x-100 -ml-px"
                aria-hidden
              />
              <EthWave
                variant="regular"
                className="w-1/3 h-auto shrink-0 -ml-px"
                aria-hidden
              />
            </div>
            <div className={activeTrack("eth")}>
              <EthWave variant="active" className="w-1/3 h-auto shrink-0" />
              <EthWave
                variant="active"
                className="w-1/3 h-auto shrink-0 -scale-x-100 -ml-px"
                aria-hidden
              />
              <EthWave
                variant="active"
                className="w-1/3 h-auto shrink-0 -ml-px"
                aria-hidden
              />
            </div>
          </div>
          <div
            className="absolute inset-x-0 bottom-0 cursor-pointer overflow-hidden"
            onClick={() => activate("others")}
          >
            <div className={regularTrack("others")}>
              <OthersWave variant="regular" className="w-1/3 h-auto shrink-0" />
              <OthersWave
                variant="regular"
                className="w-1/3 h-auto shrink-0 -scale-x-100 -ml-px"
                aria-hidden
              />
              <OthersWave
                variant="regular"
                className="w-1/3 h-auto shrink-0 -ml-px"
                aria-hidden
              />
            </div>
            <div className={activeTrack("others")}>
              <OthersWave variant="active" className="w-1/3 h-auto shrink-0" />
              <OthersWave
                variant="active"
                className="w-1/3 h-auto shrink-0 -scale-x-100 -ml-px"
                aria-hidden
              />
              <OthersWave
                variant="active"
                className="w-1/3 h-auto shrink-0 -ml-px"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BtcDominance;
