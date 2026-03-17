"use client";
import React from "react";
import { Chart } from "@/components/chart";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <Chart />
      <div className="max-w-80 w-full relative">
        <div className="absolute top-0 left-0 h-full w-[20%] pointer-events-none flex">
          <div
            className="h-full"
            style={{
              width: "75%",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
            }}
          />

          <div
            className="h-full"
            style={{
              width: "25%",
              marginLeft: "-18.75%",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
            }}
          />
          <div
            className="h-full"
            style={{
              width: "25%",
              marginLeft: "-18.75%",
              backdropFilter: "blur(1.5px)",
              WebkitBackdropFilter: "blur(1.5px)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
            }}
          />
          <div
            className="h-full"
            style={{
              width: "25%",
              marginLeft: "-18.75%",
              backdropFilter: "blur(1px)",
              WebkitBackdropFilter: "blur(1px)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
            }}
          />
          <div
            className="h-full"
            style={{
              width: "25%",
              marginLeft: "-18.75%",
              backdropFilter: "blur(0.5px)",
              WebkitBackdropFilter: "blur(0.5px)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 25%, black 70%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
