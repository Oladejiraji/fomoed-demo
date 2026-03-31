import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  isActive: boolean;
}

const balanceRows = [
  {
    coin: "USDC Perps",
    totalBalance: "16,000 USDC",
    availableBalance: "1.61 USDC",
    usdcValue: "$15,920",
    pnl: "-$80 (-0.5%)",
    transfer: "Spot",
  },
  {
    coin: "BTC Spot",
    totalBalance: "0.42 BTC",
    availableBalance: "0.12 BTC",
    usdcValue: "$26,880",
    pnl: "+$1,240 (4.8%)",
    transfer: "Perp",
  },
  {
    coin: "ETH Spot",
    totalBalance: "3.75 ETH",
    availableBalance: "1.20 ETH",
    usdcValue: "$13,500",
    pnl: "-$320 (-2.3%)",
    transfer: "Perp",
  },
  {
    coin: "SOL Spot",
    totalBalance: "120 SOL",
    availableBalance: "45 SOL",
    usdcValue: "$19,200",
    pnl: "+$880 (4.7%)",
    transfer: "Perp",
  },
  {
    coin: "ARB Spot",
    totalBalance: "8,500 ARB",
    availableBalance: "3,200 ARB",
    usdcValue: "$9,350",
    pnl: "-$150 (-1.6%)",
    transfer: "Perp",
  },
  {
    coin: "OP Spot",
    totalBalance: "5,000 OP",
    availableBalance: "1,800 OP",
    usdcValue: "$11,000",
    pnl: "+$430 (4.1%)",
    transfer: "Perp",
  },
  {
    coin: "AVAX Spot",
    totalBalance: "210 AVAX",
    availableBalance: "80 AVAX",
    usdcValue: "$7,560",
    pnl: "+$210 (2.9%)",
    transfer: "Perp",
  },
  {
    coin: "MATIC Spot",
    totalBalance: "22,000 MATIC",
    availableBalance: "9,500 MATIC",
    usdcValue: "$8,140",
    pnl: "-$90 (-1.1%)",
    transfer: "Perp",
  },
  {
    coin: "LINK Spot",
    totalBalance: "900 LINK",
    availableBalance: "340 LINK",
    usdcValue: "$12,600",
    pnl: "+$560 (4.6%)",
    transfer: "Perp",
  },
  {
    coin: "DOGE Spot",
    totalBalance: "85,000 DOGE",
    availableBalance: "30,000 DOGE",
    usdcValue: "$10,200",
    pnl: "+$720 (7.6%)",
    transfer: "Perp",
  },
];

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
                "px-4 py-1.5 text-[#D0D6E04D] text-[13px] font-medium leading-4 tracking-[-0.0056em] rounded-lg cursor-pointer",
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
          <thead className="sticky top-0 bg-[#111213] z-10">
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
            {balanceRows.map((row) => (
              <tr key={row.coin} className="h-10">
                <td className="text-[#D0D6E0] text-[13px] leading-4 font-medium tracking-[-0.0056em] text-left pl-6">
                  {row.coin}
                </td>
                <td className="text-[#D0D6E0B2] text-[13px] leading-4 font-medium tracking-[-0.0056em] text-center">
                  {row.totalBalance}
                </td>
                <td className="text-[#D0D6E0B2] text-[13px] leading-4 font-medium tracking-[-0.0056em] text-right">
                  {row.availableBalance}
                </td>
                <td className="text-[#D0D6E0B2] text-[13px] leading-4 font-medium tracking-[-0.0056em] text-right">
                  {row.usdcValue}
                </td>
                <td
                  className="text-[13px] leading-4 font-medium tracking-[-0.0056em] text-right"
                  style={{
                    color: row.pnl
                      ? row.pnl.startsWith("+")
                        ? "#4CAF82"
                        : "#E55767"
                      : "#D0D6E0B2",
                  }}
                >
                  {row.pnl}
                </td>
                <td className="text-[#D0D6E0B2] text-[13px] leading-4 font-medium tracking-[-0.0056em] text-right">
                  Send
                </td>
                <td className="text-[#4CAF82] text-[13px] leading-4 font-medium tracking-[-0.0056em] text-right pr-3">
                  {row.transfer}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
