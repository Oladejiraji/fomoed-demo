import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Spinner } from "../ui/spinner";
import Image from "next/image";

const USDC_IMAGE = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png";

function USDCBadge({ shimmer }: { shimmer: boolean }) {
  return (
    <div
      className="relative flex items-center gap-1.5 overflow-hidden"
      style={{
        width: 106,
        height: 28,
        padding: "4px 8px 4px 6px",
        borderRadius: 20,
        border: "1px solid #67a5e9",
        background: "#2775ca",
        boxShadow: "0 8px 16px 0 rgba(39,117,202,0.06), 0 16px 28px 0 rgba(19,97,182,0.07)",
      }}
    >
      {/* One-shot shimmer sweep */}
      {shimmer && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)",
          }}
          initial={{ transform: "translateX(-110%)" }}
          animate={{ transform: "translateX(110%)" }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        />
      )}

      <Image src={USDC_IMAGE} width={16} height={16} alt="USDC" className="rounded-full relative z-10" />
      <p className="text-white font-medium text-xs leading-none tracking-[-0.003em] relative z-10">
        7,013 USDC
      </p>
    </div>
  );
}

export function ConfirmContent({ onDone }: { onDone?: () => void }) {
  const [shimmer, setShimmer] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // 8 revolutions × 0.75s = 6s — shimmer fires 0.5s before expansion
    const tShimmer = setTimeout(() => setShimmer(true), 5500);
    const tExpand = setTimeout(() => setExpanding(true), 6000);
    return () => {
      clearTimeout(tShimmer);
      clearTimeout(tExpand);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-between w-full flex-1 pt-2">

      {/* Spinner + price + badge */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-7 h-7 relative" style={{ overflow: "visible" }}>
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key="spinner"
                className="absolute inset-0"
                animate={{ scale: expanding ? [1, 1.15, 1] : 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.23, 1, 0.32, 1],
                }}
                exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
                onAnimationComplete={() => {
                  if (expanding) { setDone(true); onDone?.(); }
                }}
              >
                <Spinner className="size-7" />
              </motion.div>
            ) : (
              <motion.div
                key="circle"
                className="absolute inset-0 rounded-full bg-[#4CAF82]"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              />
            )}
          </AnimatePresence>

          {/* Pulse wave 1 — green */}
          {done && (
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ width: 28, height: 28, top: 0, left: 0, background: "#4CAF82" }}
              initial={{ scale: 1, opacity: 0.45 }}
              animate={{ scale: 24, opacity: 0 }}
              transition={{ duration: 2.035, ease: [0.23, 1, 0.32, 1] }}
            />
          )}

          {/* Pulse wave 2 — background colour, delayed */}
          {done && (
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ width: 28, height: 28, top: 0, left: 0, background: "#c8c8c8" }}
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 24, opacity: 0 }}
              transition={{ duration: 2.035, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            />
          )}
        </div>

        <div className="flex items-center justify-center" style={{ height: 52, padding: 10 }}>
          <motion.div
            key={expanding ? "final" : "loop"}
            className="flex items-start"
            animate={done ? { opacity: 1 } : { opacity: [1, 0.55, 1] }}
            transition={
              done
                ? { duration: 0.3 }
                : expanding
                ? { duration: 1.1, ease: "easeInOut" }
                : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <span className="font-semibold tracking-[-0.0056em] text-[18px] leading-none text-[#1D1D1D] mt-[7px] mr-0.5">
              $
            </span>
            <span className="font-semibold tracking-[-0.0056em] text-[32px] leading-none text-[#1D1D1D]">
              7,012
            </span>
          </motion.div>
        </div>

        <USDCBadge shimmer={shimmer} />
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center gap-2 w-full" style={{ marginBottom: 18 }}>
        <div className="flex flex-col items-center gap-1">
          {/* Title */}
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.p
                key="title-pending"
                style={{ fontFamily: "var(--second-family)" }}
                className="font-medium text-[13px] leading-[1.23] tracking-[-0.01em] text-[#1D1D1D]"
                exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.2, ease: "easeIn" } }}
              >
                Deposit Processing
              </motion.p>
            ) : (
              <motion.p
                key="title-done"
                style={{ fontFamily: "var(--second-family)" }}
                className="font-medium text-[13px] leading-[1.23] tracking-[-0.01em] text-[#1D1D1D]"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              >
                Deposit Successful
              </motion.p>
            )}
          </AnimatePresence>

          {/* Subcopy */}
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.p
                key="sub-pending"
                style={{ fontFamily: "var(--second-family)", color: "rgba(29,29,29,0.7)", width: 268, maxWidth: 268, height: 32, padding: "0 0 0 2px", letterSpacing: "0em" }}
                className="font-normal text-[12px] leading-[133%] text-center"
                exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.2, ease: "easeIn" } }}
              >
                A deposit of 7,012 USDC has been received and is awaiting confirmation.
              </motion.p>
            ) : (
              <motion.p
                key="sub-done"
                style={{ fontFamily: "var(--second-family)", color: "rgba(29,29,29,0.7)", width: 268, maxWidth: 268, height: 32, padding: "0 0 0 2px", letterSpacing: "0em" }}
                className="font-normal text-[12px] leading-[133%] text-center"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1], delay: 0.05 }}
              >
                A deposit of 7,012 USDC has been received and is confirmed.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
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
