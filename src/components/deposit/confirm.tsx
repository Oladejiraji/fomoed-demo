import { useCallback, useEffect, useState } from "react";
import { animate } from "motion/react";
import { TextMorph } from "torph/react";
import { Spinner } from "../ui/spinner";
import { CheckIcon } from "@/icons";

function ConfirmationBadge({ onComplete }: { onComplete: () => void }) {
  const [confirmations, setConfirmations] = useState(0);

  useEffect(() => {
    const controls = animate(0, 190, {
      duration: 4,
      onUpdate: (v) => setConfirmations(Math.round(v)),
      onComplete,
    });
    return () => controls.stop();
  }, [onComplete]);

  return (
    <div className="px-2 py-1 bg-[#C0C0C0] border border-[#BBBBBB] w-40 flex items-center justify-center rounded-[20px]">
      <p className="font-medium text-xs leading-4 text-[#1D1D1DB2] tracking-[-0.003em]">
        Confirmations <span className="tabular-nums">{confirmations}</span> of
        190
      </p>
    </div>
  );
}

export function Confirm() {
  const [done, setDone] = useState(false);
  const handleComplete = useCallback(() => setDone(true), []);

  return (
    <div className="h-101.5 max-w-75 w-full px-4 pb-6 pt-3.5 flex flex-col gap-7.5 shadow-[0_0_0_1px_rgba(90,90,90,0.25)] bg-[linear-gradient(180deg,#d1d1d1_0%,#b3b3b3_100%)] rounded-2xl">
      <div className="flex items-center justify-center">
        <p className="text-[#1D1D1D] font-medium text-xs leading-4 tracking-[0.003em]">
          Deposit
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-22.5">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-8.5 h-8.5">
            {done ? (
              <div className="w-full h-full flex items-center justify-center bg-[#4CAF82] rounded-full">
                <CheckIcon fill="#fff" />
              </div>
            ) : (
              <Spinner className="size-8.5 text-[#575757]" />
            )}
          </div>
          <p className="text-[#1D1D1D] font-semibold tracking-[-0.0056em] text-[32px]">
            $7,012
          </p>
          <ConfirmationBadge onComplete={handleComplete} />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <TextMorph className="text-[#1D1D1D] font-medium leading-4 text-xs tracking-[-0.0056em]">
            {done ? "Deposit Successful" : "Deposit Processing"}
          </TextMorph>

          {!done && (
            <p className="text-[#1D1D1DB2] font-medium leading-4 text-xs tracking-[-0.003em] text-center">
              A deposit of 7,012 USDC has been confirmed and is awaiting
              confirmation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
