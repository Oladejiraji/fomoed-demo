import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from "motion/react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Image from "next/image";
import { StarButton } from "@/components/screener/star-button";
import { ScreenerToken } from "@/app/drag-to-interact/page";

const DRAG_OPEN_THRESHOLD = 60;
const FAVORITES_WIDTH = 120;
const ACTIONS_WIDTH = 172;
const NEWS_EXPAND_THRESHOLD = ACTIONS_WIDTH + 50;
const MAX_DRAG_RIGHT = NEWS_EXPAND_THRESHOLD + 30;

const ACTION_BUTTON_WIDTH = ACTIONS_WIDTH / 3;

function ActionButton({
  src,
  label,
  bg,
  labelColor = "#fff",
  dragX,
  index,
  onClick,
  widthOverride,
  zIndexOverride,
}: {
  src: string;
  label: string;
  bg: string;
  labelColor?: string;
  dragX: MotionValue<number>;
  index: number;
  onClick?: () => void;
  widthOverride?: MotionValue<number>;
  zIndexOverride?: MotionValue<number>;
}) {
  const peekOffset = index * 6;
  const finalX = index * ACTION_BUTTON_WIDTH;

  // Position: fan out during phase 1, then scale proportionally in phase 2
  const buttonX = useTransform(dragX, (v) => {
    if (v <= 0) return peekOffset;
    if (v >= ACTIONS_WIDTH) {
      return (index * Math.max(ACTIONS_WIDTH, v)) / 3;
    }
    const t = v / ACTIONS_WIDTH;
    return peekOffset + t * (finalX - peekOffset);
  });

  // Width: fixed during phase 1, grows proportionally in phase 2
  const buttonWidth = useTransform(dragX, (v) => {
    return Math.max(ACTIONS_WIDTH, v) / 3;
  });

  return (
    <motion.div
      className="absolute inset-y-0 left-0"
      style={{
        x: buttonX,
        width: widthOverride ?? buttonWidth,
        zIndex: zIndexOverride ?? index,
      }}
    >
      <button
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-0.5 border-none p-0"
        style={{ background: bg }}
        onClick={onClick}
      >
        <Image src={src} width={28} height={28} className="block" alt={label} />
        <span
          className="whitespace-nowrap text-[10px] font-semibold tracking-wide"
          style={{ color: labelColor }}
        >
          {label}
        </span>
      </button>
    </motion.div>
  );
}

function TokenIcon({ token }: { token: ScreenerToken }) {
  return (
    <Image
      src={token.logo}
      width={28}
      height={28}
      alt={token.symbol}
      className="block shrink-0 rounded-full outline-1 -outline-offset-1 outline-white/10"
    />
  );
}

interface TokenRowHandle {
  reset: () => void;
}

export const TokenRow = forwardRef<
  TokenRowHandle,
  {
    token: ScreenerToken;
    isLocked: boolean;
    isMobile: boolean;
    onDragStart: () => void;
    onDragEnd: () => void;
    onNewsClick?: () => void;
  }
>(function TokenRow(
  { token, isLocked, isMobile, onDragStart, onDragEnd, onNewsClick },
  ref,
) {
  const x = useMotionValue(0);
  const [isFavOpen, setIsFavOpen] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false);

  // News: springs to full x width at threshold, otherwise follows default (x/3)
  const newsWidth = useMotionValue(ACTION_BUTTON_WIDTH);
  const newsZIndex = useMotionValue(0);
  const expandedRef = useRef(false);

  useEffect(() => {
    return x.on("change", (v) => {
      if (v >= NEWS_EXPAND_THRESHOLD && !expandedRef.current) {
        expandedRef.current = true;
        animate(newsWidth, MAX_DRAG_RIGHT, { type: "spring", stiffness: 400, damping: 25 });
        newsZIndex.set(10);
      } else if (v < NEWS_EXPAND_THRESHOLD && expandedRef.current) {
        expandedRef.current = false;
        // Return to proportional width (x/3)
        animate(newsWidth, Math.max(ACTIONS_WIDTH, v) / 3, {
          type: "spring",
          stiffness: 400,
          damping: 25,
        });
        newsZIndex.set(0);
      } else if (expandedRef.current) {
        newsWidth.set(v);
      } else {
        // Keep in sync with proportional width when not expanded
        newsWidth.set(Math.max(ACTIONS_WIDTH, v) / 3);
      }
    });
  }, [x, newsWidth, newsZIndex]);

  useImperativeHandle(ref, () => ({
    reset() {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
      newsWidth.set(ACTION_BUTTON_WIDTH);
      newsZIndex.set(0);
      expandedRef.current = false;
      setIsFavOpen(false);
    },
  }));

  function handleDragEnd() {
    const current = x.get();

    if (current > NEWS_EXPAND_THRESHOLD) {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
      newsWidth.set(ACTION_BUTTON_WIDTH);
      newsZIndex.set(0);
      expandedRef.current = false;
      setIsFavOpen(false);
      onNewsClick?.();
    } else if (current > DRAG_OPEN_THRESHOLD) {
      animate(x, ACTIONS_WIDTH, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
      setIsFavOpen(false);
    } else if (current < -DRAG_OPEN_THRESHOLD) {
      setIsFavOpen(true);
      setIsFavourited((prev) => !prev);
      animate(x, -FAVORITES_WIDTH * 0.65, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.075,
      }).then(() => {
        setIsFavOpen(false);
        animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
      });
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
      setIsFavOpen(false);
    }
    onDragEnd();
  }

  const isNegative = token.changePct.startsWith("-");

  return (
    <div className="relative w-full" style={{ overflow: "clip" }}>
      {/* Favourites panel on right */}
      <div
        className="absolute inset-y-0 right-0 flex items-center justify-end pr-4"
        style={{ width: FAVORITES_WIDTH }}
      >
        <AnimatePresence initial={false}>
          {isFavOpen && (
            <StarButton
              key="star"
              onToggle={() => {}}
              favourited={isFavourited}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Actions revealed underneath */}
      <motion.div
        className="absolute inset-y-0 left-0"
        style={{ width: useTransform(x, (v) => Math.max(ACTIONS_WIDTH, v)) }}
      >
        <ActionButton
          src="/images/tokens/news.svg"
          label="News"
          bg="#A581FA"
          dragX={x}
          index={0}
          onClick={onNewsClick}
          widthOverride={newsWidth}
          zIndexOverride={newsZIndex}
        />
        <ActionButton
          src="/images/tokens/robinhood.svg"
          label="Trade"
          bg="#CCFF00"
          labelColor="#0B0B0B"
          dragX={x}
          index={1}
        />
        <ActionButton
          src="/images/tokens/notifications.svg"
          label="Alerts"
          bg="#151515"
          dragX={x}
          index={2}
        />
      </motion.div>

      {/* Draggable row */}
      <motion.div
        drag={isLocked ? false : "x"}
        dragConstraints={{ left: -FAVORITES_WIDTH, right: MAX_DRAG_RIGHT }}
        dragElastic={{ left: 0.1, right: 0.05 }}
        className="relative z-10 flex h-14 w-full select-none items-center bg-black p-4 font-semibold will-change-transform"
        style={{
          x,
          cursor: isLocked ? "default" : "grab",
        }}
        whileDrag={{ cursor: "grabbing" }}
        onDragStart={onDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Symbol + Price */}
        <div className="flex min-w-0 flex-2 items-center">
          <div className="flex flex-1 items-center gap-3">
            <TokenIcon token={token} />
            <span className="text-[15px] font-medium text-white">
              {token.symbol}
            </span>
          </div>
          <div className="flex flex-1 items-center justify-start pl-3.5 text-sm tabular-nums text-neutral-300">
            {token.price}
          </div>
        </div>

        {/* Change */}
        <div
          className="flex min-w-0 items-center justify-end gap-2"
          style={{ flex: 1.3 }}
        >
          <span className="text-sm tabular-nums text-neutral-300">
            {token.change}
          </span>
          <span
            className={`rounded-md px-1.5 py-0.5 text-xs tabular-nums ${
              isNegative
                ? "bg-red-400/10 text-red-400"
                : "bg-green-400/12 text-green-400"
            }`}
          >
            {token.changePct}
          </span>
        </div>

        {/* Volume */}
        {!isMobile && (
          <div className="flex min-w-0 flex-1 items-center justify-end text-sm tabular-nums text-neutral-300">
            {token.volume}
          </div>
        )}

        {/* MarketCap */}
        {!isMobile && (
          <div
            className="flex min-w-0 items-center justify-end gap-2 pl-12"
            style={{ flex: 1.3 }}
          >
            <span className="text-sm tabular-nums text-neutral-300">
              {token.marketCap}
            </span>
            {token.marketCapChange && (
              <span className="rounded-md bg-green-400/12 px-1.5 py-0.5 text-xs tabular-nums text-green-400">
                {token.marketCapChange}
              </span>
            )}
          </div>
        )}

        {/* Volatility */}
        {!isMobile && (
          <div
            className="flex min-w-0 items-center justify-end text-sm tabular-nums text-neutral-300"
            style={{ flex: 1.2 }}
          >
            {token.volatility ?? "—"}
          </div>
        )}
      </motion.div>
    </div>
  );
});
