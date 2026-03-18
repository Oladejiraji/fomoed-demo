"use client";
import React from "react";
import { Chart } from "@/components/chart";
import { Pricechart } from "@/components/chart/pricechart";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 items-center bg-[#0C0C0C] h-screen py-10">
      <Chart />

      <Pricechart />
    </div>
  );
}
