import { useState, useEffect, useId, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Spinner } from "../ui/spinner";
import Image from "next/image";
import { CheckIcon } from "@/icons";

// Curve div is 300×80 (20px headroom + 60px visible).
// Visual top sits at y=20; convex peaks at y=0 (top of element).
const TOP_CONVEX = "path('M 0 80 L 300 80 L 300 20 Q 150 -20 0 20 Z')";
const TOP_CONCAVE = "path('M 0 80 L 300 80 L 300 20 Q 150 60 0 20 Z')";

const USDC_IMAGE =
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png";

function USDCBadge({ shimmerKey }: { shimmerKey: number }) {
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
        boxShadow:
          "0 8px 16px 0 rgba(39,117,202,0.06), 0 16px 28px 0 rgba(19,97,182,0.07)",
      }}
    >
      {/* One-shot shimmer sweep */}
      {shimmerKey > 0 && (
        <motion.div
          key={shimmerKey}
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)",
          }}
          initial={{ transform: "translateX(-110%)" }}
          animate={{ transform: "translateX(110%)" }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        />
      )}

      <Image
        src={USDC_IMAGE}
        width={16}
        height={16}
        alt="USDC"
        className="rounded-full relative z-10"
      />
      <p className="text-white font-medium text-xs leading-none tracking-[-0.003em] relative z-10">
        7,013 USDC
      </p>
    </div>
  );
}

interface IConfirmContent {
  done?: boolean;
  setDone?: Dispatch<SetStateAction<boolean>>;
  onDone?: () => void;
}

function playPulseSound() {
  const audio = new Audio("/audio/pulse.mp3");
  audio.volume = 0.35;
  audio.play();
}

export function ConfirmContent(props: IConfirmContent) {
  const { done = false, setDone = () => {}, onDone } = props;
  const [shimmerKey, setShimmerKey] = useState(0);
  const [expanding, setExpanding] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  // const [done, setDone] = useState(false);

  useEffect(() => {
    // 8 revolutions × 0.75s = 6s — shimmer fires 0.5s before expansion
    const tShimmer = setTimeout(() => setShimmerKey((k) => k + 1), 5500);
    const tExpand = setTimeout(() => setExpanding(true), 6000);
    // Pulse fires at scale peak (0.3s into the 0.6s scale anim)
    const tPulse = setTimeout(() => {
      setPulsing(true);
      playPulseSound();
    }, 6400);
    // Done fires slightly after pulse starts, so icon swap overlaps
    const tDone = setTimeout(() => {
      setDone(true);
      onDone?.();
    }, 6450);
    // Re-shimmer the badge after pulse sweeps past it
    const tShimmer2 = setTimeout(() => setShimmerKey((k) => k + 1), 7950);
    return () => {
      clearTimeout(tShimmer);
      clearTimeout(tExpand);
      clearTimeout(tPulse);
      clearTimeout(tDone);
      clearTimeout(tShimmer2);
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
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2, ease: "easeIn" },
                }}
              >
                <Spinner className="size-7" />
              </motion.div>
            ) : (
              <motion.div
                key="circle"
                className="absolute inset-0 rounded-full bg-[#4CAF82] flex justify-center items-center"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <CheckIcon fill="#fff" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse wave 1 — green */}
          {pulsing && (
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 28,
                height: 28,
                top: 0,
                left: 0,
                background: "#4CAF82",
                borderRadius: "50%",
              }}
              initial={{ scale: 1, opacity: 0.45 }}
              animate={{ scale: 40, opacity: 0 }}
              transition={{ duration: 2.035, ease: [0.23, 1, 0.32, 1] }}
            />
          )}

          {/* Pulse wave 2 — background colour, delayed */}
          {pulsing && (
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 28,
                height: 28,
                top: 0,
                left: 0,
                background: "#c8c8c8",
                borderRadius: "50%",
              }}
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 40, opacity: 0 }}
              transition={{
                duration: 2.035,
                ease: [0.23, 1, 0.32, 1],
                delay: 0.2,
              }}
            />
          )}
        </div>

        <div
          className="flex items-center justify-center"
          style={{ height: 52, padding: 10 }}
        >
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

        <USDCBadge shimmerKey={shimmerKey} />
      </div>

      {/* Bottom section */}
      <div
        className="flex flex-col items-center gap-2 w-full"
        style={{ marginBottom: 18 }}
      >
        <div className="flex flex-col items-center gap-1">
          {/* Title */}
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.p
                key="title-pending"
                style={{ fontFamily: "var(--second-family)" }}
                className="font-medium text-[13px] leading-[1.23] tracking-[-0.01em] text-[#1D1D1D]"
                exit={{
                  opacity: 0,
                  filter: "blur(6px)",
                  transition: { duration: 0.2, ease: "easeIn" },
                }}
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
                style={{
                  fontFamily: "var(--second-family)",
                  color: "rgba(29,29,29,0.7)",
                  width: 268,
                  maxWidth: 268,
                  height: 32,
                  padding: "0 0 0 2px",
                  letterSpacing: "0em",
                }}
                className="font-normal text-[12px] leading-[133%] text-center"
                exit={{
                  opacity: 0,
                  filter: "blur(6px)",
                  transition: { duration: 0.2, ease: "easeIn" },
                }}
              >
                A deposit of 7,012 USDC has been received and is awaiting
                confirmation.
              </motion.p>
            ) : (
              <motion.p
                key="sub-done"
                style={{
                  fontFamily: "var(--second-family)",
                  color: "rgba(29,29,29,0.7)",
                  width: 268,
                  maxWidth: 268,
                  height: 32,
                  padding: "0 0 0 2px",
                  letterSpacing: "0em",
                }}
                className="font-normal text-[12px] leading-[133%] text-center"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.25,
                  ease: [0.23, 1, 0.32, 1],
                  delay: 0.05,
                }}
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

interface IProps {
  handleClose: () => void;
}

export function Confirm(props: IProps) {
  const { handleClose } = props;
  const clipId = useId();

  // objectBoundingBox paths (coords 0-1 relative to element)
  // Start: off-screen at bottom, convex arch (arches up)
  const pathStart = "M 0 1.15 Q 0.5 1 1 1.15 L 1 1.15 L 0 1.15 Z";
  // End: off-screen at top, concave dip
  const pathEnd = "M 0 -0.15 Q 0.5 0 1 -0.15 L 1 1 L 0 1 Z";

  // Stroke-only paths: just the top curve, no sides/bottom
  const strokeStart = "M 0 1.15 Q 0.5 1 1 1.15";
  const strokeEnd = "M 0 -0.15 Q 0.5 0 1 -0.15";

  const [done, setDone] = useState(false);

  const easeFn2 = [0.76, 0, 0.04, 1] as any;

  return (
    <motion.div className="h-102 max-w-75 w-full mx-auto flex  rounded-2xl relative overflow-hidden">
      {/* Hidden SVG for clip-path definition */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <motion.path
              initial={{ d: pathStart }}
              animate={{ d: pathEnd }}
              transition={{
                duration: 1.2,
                ease: easeFn2,
              }}
            />
          </clipPath>
        </defs>
      </svg>
      {/* Visible stroke overlay */}
      <svg
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
      >
        <motion.path
          initial={{ d: strokeStart }}
          animate={{ d: strokeEnd }}
          transition={{ duration: 1.2, ease: easeFn2 }}
          fill="none"
          stroke="#787879"
          strokeWidth="6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <motion.div
        className="flex flex-col z-10 rounded-2xl bg-[linear-gradient(180deg,#d1d1d1_0%,#b3b3b3_100%)] h-full flex-1 relative"
        style={{ clipPath: `url(#${clipId})` }}
        animate={
          done
            ? {
                boxShadow: [
                  "inset 0 0 0px 0px rgba(76,175,130,0)",
                  "inset 0 0 30px 8px rgba(76,175,130,0.45)",
                  "inset 0 0 0px 0px rgba(76,175,130,0)",
                ],
              }
            : {}
        }
        transition={{
          duration: 3.5,
          ease: [0.23, 1, 0.32, 1],
          delay: 0.15,
          times: [0, 0.15, 1],
        }}
      >
        {/* Bottom-lingering glow overlay — masked so only bottom portion shows */}
        <AnimatePresence>
          {done && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none z-30"
              style={{
                boxShadow: "inset 0 0 30px 8px rgba(76,175,130,0.45)",
                maskImage:
                  "linear-gradient(to bottom, transparent 20%, black 70%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 20%, black 70%)",
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 7.5,
                ease: [0.23, 1, 0.32, 1],
                delay: 0.15,
                times: [0, 0.07, 0.55, 1],
              }}
            />
          )}
        </AnimatePresence>

        <div className="flex flex-1 flex-col gap-7.5 h-full px-4 pb-6 pt-3.5">
          <div
            className="flex items-center justify-center"
            onClick={handleClose}
          >
            <AnimatePresence mode="wait">
              {done ? (
                <motion.p
                  key="header-done"
                  className="text-[#1D1D1D] font-medium text-xs leading-4 tracking-[0.003em]"
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                >
                  Deposit Successful
                </motion.p>
              ) : (
                <motion.p
                  key="header-pending"
                  className="text-[#1D1D1D] font-medium text-xs leading-4 tracking-[0.003em]"
                  exit={{
                    opacity: 0,
                    filter: "blur(6px)",
                    transition: { duration: 0.2, ease: "easeIn" },
                  }}
                >
                  Deposit Processing
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <ConfirmContent done={done} setDone={setDone} />
        </div>
      </motion.div>
    </motion.div>
  );
}
