"use client";
import React from "react";
import { Responsive, useContainerWidth } from "react-grid-layout";
import Screener from "../widgets/screener";
import { PriceChart } from "../widgets/price-chart";
import Dominance from "../widgets/dominance";
import { OrderbookTrades } from "../order-book";
import { News } from "../widgets/news";
import { DraggableWidget } from "../shared/draggable-widget";

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
      className="flex-1 w-full h-full flex overflow-y-auto scrollbar-minimal overflow-x-hidden"
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
          dragConfig={{
            handle: ".app_drag_handle",
          }}
        >
          <DraggableWidget key="1">
            <PriceChart />
          </DraggableWidget>
          <DraggableWidget key="2">
            <Screener />
          </DraggableWidget>
          <DraggableWidget key="3">
            <OrderbookTrades />
          </DraggableWidget>
          <DraggableWidget key="4">
            <News />
          </DraggableWidget>
          <DraggableWidget key="5">
            <Dominance />
          </DraggableWidget>
        </Responsive>
      )}
    </div>
  );
}
