import { ArrowDownIcon, ExpandIcon, XIcon } from "@/icons";
import GeneralAssets from "@/lib/assets";
import Image from "next/image";
import React from "react";

const Balance = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex items-center gap-1.5 pl-1 pr-2 py-1.5 bg-[#151515] rounded-[8px] w-fit">
        <div>
          <Image
            src={GeneralAssets.Avatar}
            alt="Avatar"
            width={20}
            height={20}
          />
        </div>
        <p className="text-[#f9f9f9] font-medium text-[13px]">0x1o1...1821</p>
        <ArrowDownIcon />
      </div>
      <div className="size-6 flex items-center justify-center">
        <ExpandIcon />
      </div>
      <div className="size-6 flex items-center justify-center">
        <XIcon />
      </div>
    </div>
  );
};

export default Balance;
