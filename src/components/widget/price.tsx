import React from "react";

interface IProps {
  price?: number;
  priceChange?: number;
}

export function Price(props: IProps) {
  const { price, priceChange = 0 } = props;

  const isPositive = priceChange >= 0;
  const symbol = isPositive ? "+" : "";
  const priceChangeString = `${symbol}${priceChange.toFixed(2)}%`;

  return (
    <div className="flex flex-col gap-2 items-start">
      <h2 className="text-[#D0D6E0] font-medium text-[32px] leading-none tracking-[-0.0256em]">
        ${price ? price.toFixed(2) : "0.00"}
      </h2>

      <div
        className="flex py-0.5 px-0.75 rounded-[5px] "
        style={{
          background: isPositive ? "#4CAF821A" : "#E557672B",
        }}
      >
        <p
          className=" text-[#E55767] font-semibold text-sm leading-5 tracking-[-0.0056em]"
          style={{
            color: isPositive ? "#4CAF82" : "#E55767",
          }}
        >
          {priceChangeString}
        </p>
      </div>
    </div>
  );
}
