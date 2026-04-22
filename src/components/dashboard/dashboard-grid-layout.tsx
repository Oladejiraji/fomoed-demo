"use client";
import React from "react";
import { Responsive, useContainerWidth } from "react-grid-layout";
import Screener from "../widgets/screener";
import { PriceChart } from "../widgets/price-chart";

const layouts = {
  lg: [
    { i: "1", x: 0, y: 0, w: 8, h: 4 },
    { i: "2", x: 8, y: 0, w: 8, h: 4 },
    { i: "3", x: 0, y: 4, w: 4, h: 4 },
    { i: "4", x: 4, y: 4, w: 4, h: 4 },
    { i: "5", x: 8, y: 4, w: 8, h: 4 },
  ],
  md: [
    { i: "1", x: 0, y: 0, w: 8, h: 4 },
    { i: "2", x: 8, y: 0, w: 8, h: 4 },
    { i: "3", x: 0, y: 4, w: 4, h: 4 },
    { i: "4", x: 4, y: 4, w: 4, h: 4 },
    { i: "5", x: 8, y: 4, w: 8, h: 4 },
  ],
};

interface IProps {
  initialWidth: number;
}

export function DashboardGridLayout(props: IProps) {
  const { initialWidth } = props;
  const { width, containerRef, mounted } = useContainerWidth({
    measureBeforeMount: false,
    initialWidth,
  });

  return (
    <div
      ref={containerRef}
      className="flex-1 w-full h-full flex overflow-y-auto"
    >
      {mounted && (
        <Responsive
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 16, md: 16, sm: 8, xs: 8, xxs: 8 }}
          width={width}
          rowHeight={105}
          margin={[4, 4]}
          className="w-full h-full flex-1"
        >
          <div
            className="rounded-2xl overflow-hidden shadow-[0px_0px_0px_1px_#FFFFFF0A_inset,0px_2px_0px_0px_#FFFFFF14_inset,0px_0px_0px_1px_#00000029,0px_1px_1px_-0.5px_#0000002E,0px_3px_3px_-1.5px_#0000002E,0px_6px_6px_-3px_#00000040,0px_12px_12px_-6px_#0000002E]"
            key="1"
          >
            <PriceChart />
          </div>
          <div className="rounded-2xl overflow-hidden" key="2">
            <Screener />
          </div>
          <div
            className="bg-zinc-500 rounded-2xl overflow-hidden"
            key="3"
          ></div>
          <div
            className="bg-zinc-600 rounded-2xl overflow-hidden"
            key="4"
          ></div>
          <div
            className="bg-zinc-700 rounded-2xl overflow-hidden"
            key="5"
          ></div>
        </Responsive>
      )}
    </div>
  );
}
