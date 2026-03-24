import React from "react";
import { PlusIcon } from "@/icons";

interface IInputProps {
  placeholder: string;
  rightText: string;
}

interface IProps {
  handleClick: () => void;
}

const SwapInput = (props: IInputProps) => {
  const { placeholder, rightText } = props;
  return (
    <div className="h-10 bg-[#121212] rounded-lg relative">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-2.5 py-2 placeholder:text-[#f9f9f9] placeholder:opacity-20 outline-none"
      />
      <p className="text-[#f9f9f9] font-medium text-[13px] absolute right-3 top-6/12 -translate-y-6/12">
        {rightText}
      </p>
    </div>
  );
};

const Swap = (props: IProps) => {
  const { handleClick } = props;
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-[#f9f9f9] font-medium text-xs opacity-30">
          Available Balance
        </p>
        <div className="flex items-center gap-1.5">
          <p className="text-[#f9f9f9] text-xs font-semibold opacity-90">
            $24,293.20
          </p>
          <button
            type="button"
            onClick={handleClick}
            className="size-5 rounded-full flex items-center justify-center bg-[#121212]"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <SwapInput placeholder="Price" rightText="USDC" />
        <SwapInput placeholder="Amount" rightText="BTC" />
      </div>
    </div>
  );
};

export default Swap;
