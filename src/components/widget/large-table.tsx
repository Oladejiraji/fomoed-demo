import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  isActive: boolean;
}

const dummyOptions = [
  { id: 1, label: "Balances", value: "balances" },
  { id: 2, label: "Open Orders", value: "open_orders" },
  { id: 3, label: "Order History", value: "order_history" },
  { id: 4, label: "Trade History", value: "trade_history" },
];

export function LargeTable(props: IProps) {
  const { isActive } = props;
  const [selectedOption, setSelectedOption] = useState(dummyOptions[0].value);

  return (
    <div
      className={cn(
        "h-full max-h-65.75 flex-1 flex-col",
        isActive ? "flex" : "hidden",
      )}
    >
      <div className="h-10 flex items-center px-3 bg-[#111213]">
        {dummyOptions.map((option) => {
          const isActive = selectedOption === option.value;

          return (
            <button
              key={option.id}
              type="button"
              className={cn(
                "px-4 py-1.5 text-[#D0D6E04D] text-[13px] font-medium leading-4 tracking-[-0.0056em] rounded-lg",
                isActive && "text-[#D0D6E0] bg-[#D0D6E00F]",
              )}
              onClick={() => {
                setSelectedOption(option?.value);
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="h-10">
              <th className="text-[#D0D6E04D] text-[13px] leading-4 font-medium text-left pl-6">
                Coin
              </th>
              <th className="text-[#D0D6E04D] text-[13px] leading-4 font-medium text-center">
                Total Balance
              </th>
              <th className="text-[#D0D6E04D] text-[13px] leading-4 font-medium text-right">
                Available Balance
              </th>
              <th className="text-[#D0D6E04D] text-[13px] leading-4 font-medium text-right">
                USDC Value
              </th>
              <th className="text-[#D0D6E04D] text-[13px] leading-4 font-medium text-right">
                PNL (ROE%)
              </th>
              <th className="text-[#D0D6E04D] text-[13px] leading-4 font-medium text-right">
                Send
              </th>
              <th className="text-[#D0D6E04D] text-[13px] leading-4 font-medium text-right pr-3">
                Transfer
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-10">
              <td className="text-[#D0D6E0] text-[13px] leading-4 font-medium tracking-[-0.0056em] text-left pl-6">
                USDC Perps
              </td>
              <td className="text-[#D0D6E0B2] text-[13px] leading-4 font-medium tracking-[-0.0056em] text-center">
                16,000 USDC
              </td>

              <td className="text-[#D0D6E0B2] text-[13px] leading-4 font-medium tracking-[-0.0056em] text-right">
                1.61 USDC
              </td>

              <td className="text-[#D0D6E0B2] text-[13px] leading-4 font-medium tracking-[-0.0056em] text-right">
                $15,920
              </td>

              <td className="text-[#D0D6E0B2] text-[13px] leading-4 font-medium tracking-[-0.0056em] text-right"></td>

              <td className="text-[#D0D6E0B2] text-[13px] leading-4 font-medium tracking-[-0.0056em] text-right">
                Send
              </td>

              <td className="text-[#D0D6E0B2] text-[13px] leading-4 font-medium tracking-[-0.0056em] text-right pr-3">
                Spot
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
