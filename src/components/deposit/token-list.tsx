import React, { useState } from "react";
import { GreenCheck } from "@/icons";
import Image from "next/image";
import { motion } from "motion/react";
import { useAtom } from "jotai";
import { tokens, selectedTokenAtom } from "@/lib/atoms/deposit";

interface IProps {
  handleClose?: () => void;
}

export function TokenList(props: IProps) {
  const { handleClose } = props;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedToken, setSelectedToken] = useAtom(selectedTokenAtom);

  return (
    <div className="max-w-[320px] w-full max-h-86 flex flex-col overflow-hidden shadow-[0_0_0_1px_rgba(92,92,92,0.45)] bg-[linear-gradient(180deg,#1f1f21_0%,#1a1a1c_100%)] rounded-2xl">
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#262626]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-4.5 h-4.5">
                <Image
                  src={selectedToken.image}
                  width={18}
                  height={18}
                  alt={selectedToken.label}
                />
              </div>
            </div>
            <p className="text-[#F9F9F9] font-medium text-xs tracking-[-0.004em]">
              {selectedToken.symbol}
            </p>
          </div>

          <p className="text-[#F9F9F966] font-medium text-xs tracking-[-0.004em]">
            {selectedToken.label}
          </p>
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <GreenCheck />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 flex flex-col relative">
        {hoveredIndex !== null && (
          <motion.div
            className="absolute left-2 right-2 h-9 rounded-lg bg-[#272729] z-1 pointer-events-none"
            initial={{ top: hoveredIndex * 36 }}
            animate={{ top: hoveredIndex * 36 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        {tokens.map((token, index) => {
          return (
            <button
              key={token.id}
              type="button"
              className={`rounded-lg px-2 relative z-2 ${selectedToken.id === token.id ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => {
                if (selectedToken.id !== token.id) {
                  setSelectedToken(token);
                  handleClose?.();
                }
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-2 h-9">
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-4.5 h-4.5">
                      <Image
                        src={token.image}
                        width={18}
                        height={18}
                        alt={token.label}
                      />
                    </div>
                  </div>
                  <p className="text-[#F9F9F9] font-medium text-xs tracking-[-0.004em]">
                    {token.symbol}
                  </p>
                </div>

                <p className="text-[#F9F9F966] font-medium text-xs tracking-[-0.004em]">
                  {token.label}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
