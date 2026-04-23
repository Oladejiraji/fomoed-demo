import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import OrderBook from "./order-book";
import Trades from "./trades";

interface IOrderbookSectionTitle {
  onClick: () => void;
  isActive: boolean;
  label: string;
}

function OrderbookSectionTitle(props: IOrderbookSectionTitle) {
  const { onClick, isActive, label } = props;

  return (
    <button className="flex-1 relative cursor-pointer" onClick={onClick}>
      <p
        className={cn(
          "py-1.5 tracking-[-0.56%] leading-5 text-[13px] relative z-2 font-medium text-[#F9F9F94D]",
          isActive && "text-[#F9F9F9]",
        )}
      >
        {label}
      </p>

      {isActive && (
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 bg-[linear-gradient(180deg,#1D1D1D_-35%,#242424_167.5%)] rounded-[36px] border border-[#272727]"
          layoutId="app_orderbook_indicator"
          style={{
            boxShadow: `
    inset 0px 0px 0px 1px #FFFFFF0A,
    inset 0px 2px 0px 0px #FFFFFF14,
    0px 0px 0px 1px #00000029,
    0px 1px 1px -0.5px #0000002E,
    0px 3px 3px -1.5px #0000002E,
    0px 6px 6px -3px #0000002E,
    0px 12px 12px -6px #0000002E
  `,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        ></motion.div>
      )}
    </button>
  );
}

export function OrderbookTrades() {
  const [section, setSection] = useState<"order_book" | "trades">("order_book");

  return (
    <div className="w-full h-full bg-[#262626] pt-5 pb-4 px-0 overflow-hidden">
      <div className="flex flex-col gap-3 overflow-hidden w-full h-full">
        <div className="flex items-center rounded-[20px] bg-[#1D1D1D] overflow-hidden p-0.5 mx-5">
          <OrderbookSectionTitle
            label="Order Books"
            isActive={section === "order_book"}
            onClick={() => {
              setSection("order_book");
            }}
          />
          <OrderbookSectionTitle
            label="Trades"
            isActive={section === "trades"}
            onClick={() => {
              setSection("trades");
            }}
          />
        </div>

        <OrderBook isActive={section === "order_book"} />
        <Trades isActive={section === "trades"} />
      </div>
    </div>
  );
}
