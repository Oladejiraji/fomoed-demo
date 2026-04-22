"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Chart } from "@/components/chart/index";
import { Pricechart } from "@/components/chart/pricechart";
import { Deposit } from "@/components/deposit/deposit";
import { TokenList } from "@/components/deposit/token-list";

// bg-[linear-gradient(180deg,#1D1D1D_-35%,#242424_167.5%)]

export default function Page() {
  return (
    <div className="flex flex-col gap-8 items-center bg-[#0C0C0C] h-screen py-10">
      {/* <Chart /> */}

      {/* <Pricechart /> */}
      {/* <Deposit /> */}
      {/* <TokenList /> */}
    </div>
  );
}
