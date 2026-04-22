"use client";
import React from "react";
import { Responsive, useContainerWidth } from "react-grid-layout";

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

export function DashboardGridLayout() {
  const { width, containerRef, mounted } = useContainerWidth({
    measureBeforeMount: false,
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
            className="bg-zinc-300 rounded-2xl overflow-hidden"
            key="1"
          ></div>
          <div
            className="bg-zinc-400 rounded-2xl overflow-hidden"
            key="2"
          ></div>
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
