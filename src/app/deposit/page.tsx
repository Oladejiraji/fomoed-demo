"use client";
import React, { useState } from "react";
import { DepositFlow } from "@/components/trade/deposit-flow";
import Swap from "@/components/swap";

export default function DepositPage() {
  const [showDepositModal, setShowDepositModal] = useState(false);

  return (
    <div className="relative flex items-center justify-center bg-[#0C0C0C] h-screen overflow-hidden">
      <div className="w-full max-w-[320px] flex flex-col gap-4">
        <Swap handleClick={() => setShowDepositModal(true)} />
        <button
          type="button"
          onClick={() => setShowDepositModal(true)}
          className="w-full px-5 py-2.5 rounded-xl bg-[rgba(249,249,249,0.08)] text-[#F9F9F9] text-sm font-medium tracking-[-0.004em] cursor-pointer"
        >
          Deposit
        </button>
      </div>

      <DepositFlow
        showDepositModal={showDepositModal}
        setShowDepositModal={setShowDepositModal}
      />
    </div>
  );
}
