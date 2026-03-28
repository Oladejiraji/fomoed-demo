"use client";
import React from "react";
import { ResizeWidget } from "@/components/widget";
import { Pricechart } from "@/components/chart/pricechart";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 items-center bg-[#0C0C0C] h-screen py-10">
      {/* <Pricechart /> */}
      <ResizeWidget />
    </div>
  );
}
