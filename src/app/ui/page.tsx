"use client";
import React from "react";
import { News } from "@/components/widgets/news";

// bg-[linear-gradient(180deg,#1D1D1D_-35%,#242424_167.5%)]

export default function Page() {
  return (
    <div className="flex flex-col gap-8 items-center bg-[#0C0C0C] h-screen py-10">
      {/* <Chart /> */}

      {/* <Pricechart /> */}
      {/* <Deposit /> */}
      {/* <TokenList /> */}
      <div className="max-w-100 w-full h-175">
        <News />
      </div>
    </div>
  );
}
