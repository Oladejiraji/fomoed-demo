import { useEffect, useState } from "react";
import { animate } from "motion/react";
import { Spinner } from "../ui/spinner";

function ConfirmationBadge() {
  const [confirmations, setConfirmations] = useState(0);

  useEffect(() => {
    const controls = animate(0, 190, {
      duration: 4,
      ease: "easeOut",
      onUpdate: (v) => setConfirmations(Math.round(v)),
    });
    return () => controls.stop();
  }, []);

  return (
    <div className="px-2 py-1 bg-[#C0C0C0] border border-[#BBBBBB] w-40 flex items-center justify-center rounded-[20px]">
      <p className="font-medium text-xs leading-4 text-[#1D1D1DB2] tracking-[-0.003em]">
        Confirmations <span className="tabular-nums">{confirmations}</span> of 190
      </p>
    </div>
  );
}

export function ConfirmContent() {
  return (
    <div className="flex flex-col items-center justify-between w-full pt-2" style={{ height: 284 }}>

      {/* Spinner + price + confirmations */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-7 h-7">
          <Spinner className="size-7 text-[#575757]" />
        </div>
        <p className="text-[#1D1D1D] font-semibold tracking-[-0.0056em] text-[32px] leading-none">
          $7,012
        </p>
        <ConfirmationBadge />
      </div>

      {/* Deposit processing + subcopy */}
      <div className="flex flex-col items-center gap-1">
        <p style={{ fontFamily: "var(--second-family)" }} className="font-medium text-[13px] leading-[1.23] tracking-[-0.01em] text-[#1D1D1D]">
          Deposit Processing
        </p>
        <p className="text-[#1D1D1DB2] font-medium text-xs leading-4 tracking-[-0.003em] text-center max-w-[220px]">
          A deposit of 7,012 USDC has been confirmed and is awaiting confirmation.
        </p>
      </div>
    </div>
  );
}

export function Confirm() {
  return (
    <div className="h-101.5 max-w-75 w-full px-4 pb-6 pt-3.5 flex flex-col gap-7.5 shadow-[0_0_0_1px_rgba(90,90,90,0.25)] bg-[linear-gradient(180deg,#d1d1d1_0%,#b3b3b3_100%)] rounded-2xl">
      <div className="flex items-center justify-center">
        <p className="text-[#1D1D1D] font-medium text-xs leading-4 tracking-[0.003em]">
          Deposit
        </p>
      </div>
      <ConfirmContent />
    </div>
  );
}
