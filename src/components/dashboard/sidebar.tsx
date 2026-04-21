import React from "react";

import { Fomoed, Home, Search, Settings } from "@/icons";
import Image from "next/image";

export function Sidebar() {
  return (
    <div className="w-13 flex flex-col justify-between pt-3 pb-6 items-center">
      <div className="flex flex-col gap-4">
        <button
          type="button"
          className="cursor-pointer w-6 h-6 justify-center items-center flex"
        >
          <Fomoed />
        </button>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="cursor-pointer w-7 h-7 justify-center items-center flex"
          >
            <Home />
          </button>

          <button
            type="button"
            className="cursor-pointer w-7 h-7 justify-center items-center flex"
          >
            <Search />
          </button>

          <button
            type="button"
            className="cursor-pointer w-7 h-7 justify-center items-center flex"
          >
            <Search />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="cursor-pointer w-7 h-7 justify-center items-center flex"
        >
          <Settings />
        </button>

        <button
          type="button"
          className="cursor-pointer w-7 h-7 justify-center items-center flex"
        >
          <Image src="/images/dp.png" alt="dp" width={28} height={28} />
        </button>
      </div>
    </div>
  );
}
