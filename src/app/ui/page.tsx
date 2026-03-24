"use client";
import React from "react";
import { Chart } from "@/components/chart/index";
import { Pricechart } from "@/components/chart/pricechart";
import { Deposit } from "@/components/deposit/deposit";
import { TokenList } from "@/components/deposit/token-list";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 items-center bg-[#0C0C0C] h-screen py-10">
      {/* <Chart /> */}

      {/* <Pricechart /> */}
      <Deposit />
      <TokenList />
    </div>
  );
}
