"use client";

import { QuestionIcon, ThreeDotsIcon } from "@/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import FloatingControls from "@/components/screener/floating-controls";
import { TokenRow } from "@/components/screener/screener-row";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { RowContextMenu } from "@/components/screener/row-context-menu";
import type {
  ScreenerToken,
  TokenRowHandle,
} from "@/app/drag-to-interact/page";

const tokens: ScreenerToken[] = [
  {
    id: 1,
    symbol: "Aave",
    logo: "/images/tokens/aave.svg",
    price: "$100.80",
    change: "$20.03",
    changePct: "+5.92%",
    volume: "11.20B",
    marketCap: "$94.3B",
    marketCapChange: "+12.20%",
    volatility: "5.01%",
  },
  {
    id: 2,
    symbol: "USDC",
    logo: "/images/tokens/usdc.svg",
    price: "$0.99",
    change: "$0.03",
    changePct: "+5.92%",
    volume: "121.20B",
    marketCap: "$283T",
    marketCapChange: "+12.20%",
    volatility: "0.01%",
  },
  {
    id: 3,
    symbol: "Chain",
    logo: "/images/tokens/chain.svg",
    price: "$10.80",
    change: "-$0.34",
    changePct: "-3.21%",
    volume: "11.20B",
    marketCap: "$94.3B",
    marketCapChange: "-8.40%",
    volatility: null,
  },
  {
    id: 4,
    symbol: "ETH",
    logo: "/images/tokens/eth.svg",
    price: "$3,420.12",
    change: "$142.80",
    changePct: "+4.36%",
    volume: "48.60B",
    marketCap: "$412.5B",
    marketCapChange: "+4.18%",
    volatility: "3.42%",
  },
  {
    id: 5,
    symbol: "USDT",
    logo: "/images/tokens/usdt.png",
    price: "$1.00",
    change: "$0.00",
    changePct: "+0.02%",
    volume: "142.70B",
    marketCap: "$112.4B",
    marketCapChange: "+0.10%",
    volatility: "0.01%",
  },
  {
    id: 6,
    symbol: "AVAX",
    logo: "/images/tokens/avax.png",
    price: "$38.42",
    change: "$1.82",
    changePct: "+4.97%",
    volume: "4.10B",
    marketCap: "$15.6B",
    marketCapChange: "+4.30%",
    volatility: "5.80%",
  },
  {
    id: 7,
    symbol: "TRX",
    logo: "/images/tokens/trx.png",
    price: "$0.1820",
    change: "-$0.0045",
    changePct: "-2.41%",
    volume: "1.95B",
    marketCap: "$16.2B",
    marketCapChange: "-1.90%",
    volatility: "3.10%",
  },
  {
    id: 8,
    symbol: "MON",
    logo: "/images/tokens/mon.png",
    price: "$2.34",
    change: "$0.28",
    changePct: "+13.60%",
    volume: "620.40M",
    marketCap: "$1.1B",
    marketCapChange: "+11.20%",
    volatility: "9.40%",
  },
  {
    id: 9,
    symbol: "Aave",
    logo: "/images/tokens/aave.svg",
    price: "$112.66",
    change: "$8.44",
    changePct: "+8.10%",
    volume: "1.62B",
    marketCap: "$1.6B",
    marketCapChange: "+7.55%",
    volatility: "7.21%",
  },
  {
    id: 10,
    symbol: "USDC",
    logo: "/images/tokens/usdc.svg",
    price: "$0.99",
    change: "-$0.01",
    changePct: "-0.10%",
    volume: "54.30B",
    marketCap: "$32.8B",
    marketCapChange: "-0.40%",
    volatility: "0.03%",
  },
];

const columns = [
  { label: "Symbol", width: 180, align: "left" as const, headerOffset: 0 },
  { label: "Price", width: 100, align: "left" as const, headerOffset: 0 },
  { label: "Change(%)", width: 150, align: "right" as const, flex: 1.3 },
  { label: "Volume", width: 110, align: "right" as const, flex: 1 },
  {
    label: "MarketCap",
    width: 120,
    align: "right" as const,
    flex: 1.3,
    marginLeft: 48,
  },
  { label: "Vol. Score", width: 120, align: "right" as const, flex: 1.2 },
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Favorites", value: "favorites" },
  { label: "Volume (24h)", value: "volume" },
  { label: "Mcap (24h)", value: "marketcap" },
] as const;
type FilterValue = (typeof FILTERS)[number]["value"];

function parseNumeric(value: string | null): number {
  if (!value) return 0;
  const cleaned = value.replace(/[$,\s]/g, "");
  const suffix = cleaned.slice(-1).toUpperCase();
  const multipliers: Record<string, number> = {
    T: 1e12,
    B: 1e9,
    M: 1e6,
    K: 1e3,
  };
  if (multipliers[suffix]) {
    return parseFloat(cleaned.slice(0, -1)) * multipliers[suffix];
  }
  return parseFloat(cleaned) || 0;
}

const Screener = () => {
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const [activeNewsSymbol, setActiveNewsSymbol] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [favouriteIds, setFavouriteIds] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Record<number, TokenRowHandle | null>>({});

  const visibleTokens = useMemo(() => {
    switch (activeFilter) {
      case "favorites":
        return tokens.filter((t) => favouriteIds.has(t.id));
      case "volume":
        return [...tokens].sort(
          (a, b) => parseNumeric(b.volume) - parseNumeric(a.volume),
        );
      case "marketcap":
        return [...tokens].sort(
          (a, b) => parseNumeric(b.marketCap) - parseNumeric(a.marketCap),
        );
      default:
        return tokens;
    }
  }, [activeFilter, favouriteIds]);

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        Object.values(rowRefs.current).forEach((ref) => ref?.reset());
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div
      className="bg-[#262626]  h-full w-full border border-[#262626] overflow-hidden"
      style={{
        boxShadow:
          "0px 0px 0px 1px #FFFFFF0A inset, 0px 2px 0px 0px #FFFFFF14 inset, 0px 0px 0px 1px #00000029, 0px 1px 1px -0.5px #0000002E, 0px 3px 3px -1.5px #0000002E, 0px 6px 6px -3px #00000040, 0px 12px 12px -6px #0000002E",
      }}
    >
      <div className="flex items-center justify-between border-b border-[#222222] pl-4 pr-4 py-3 ">
        <div className="flex items-center gap-1">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`relative rounded-lg px-3 py-1 text-xs transition-colors cursor-pointer ${
                  isActive
                    ? "text-[#F9F9F9]"
                    : "text-[#F9F9F9]/40 hover:text-[#F9F9F9]/70"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="screener-filter-active"
                    className="absolute inset-0 rounded-lg bg-[#1B1B1B]"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center">
          <div className="size-6 flex items-center justify-center">
            <QuestionIcon />
          </div>
          <div className="size-6 flex items-center justify-center">
            <ThreeDotsIcon />
          </div>
        </div>
      </div>
      <div className="h-full">
        <div className="select-none ">
          <div
            className="mb-0 flex h-10 w-full items-center px-4"
            style={
              {
                //   background: "rgba(18,18,18,0.5)",
                //   boxShadow: "0 0 0 1px rgba(38,38,38,0.5)",
              }
            }
          >
            <div className="flex flex-2 items-center">
              {columns.slice(0, 2).map((col, i) => (
                <div
                  key={col.label}
                  className="flex h-6.5 flex-1 items-center justify-start px-1 text-xs font-medium text-[#F9F9F9]/40"
                  style={{ paddingLeft: i === 1 ? 14 : 0 }}
                >
                  {col.label}
                </div>
              ))}
            </div>
            {columns
              .slice(2)
              .filter((_, i) => !isMobile || i === 0)
              .map((col) => (
                <div
                  key={col.label}
                  className="flex h-6.5 items-center justify-end text-xs font-medium text-[#F9F9F9]/40"
                  style={{
                    flex: col.flex,
                    marginLeft: col.marginLeft ?? 0,
                  }}
                >
                  {col.label}
                </div>
              ))}
          </div>

          <motion.div
            ref={containerRef}
            className="flex flex-col gap-0 max-h-85 overflow-y-auto"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.04, delayChildren: 0.05 },
              },
            }}
          >
            <AnimatePresence mode="popLayout">
              {visibleTokens.map((token) => (
                <motion.div
                  key={token.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <RowContextMenu
                    isFavourited={favouriteIds.has(token.id)}
                    onToggleFavourite={() => {
                      setFavouriteIds((prev) => {
                        const copy = new Set(prev);
                        if (copy.has(token.id)) copy.delete(token.id);
                        else copy.add(token.id);
                        return copy;
                      });
                    }}
                  >
                    <TokenRow
                      ref={(el) => {
                        rowRefs.current[token.id] = el;
                      }}
                      token={token}
                      isMobile={isMobile}
                      isLocked={draggingId !== null && draggingId !== token.id}
                      onDragStart={() => {
                        setDraggingId(token.id);
                        Object.entries(rowRefs.current).forEach(([id, ref]) => {
                          if (Number(id) !== token.id) ref?.reset();
                        });
                      }}
                      onDragEnd={() => setDraggingId(null)}
                      onNewsClick={() => setActiveNewsSymbol(token.symbol)}
                      favourited={favouriteIds.has(token.id)}
                      onFavouriteChange={(next) => {
                        setFavouriteIds((prev) => {
                          const copy = new Set(prev);
                          if (next) copy.add(token.id);
                          else copy.delete(token.id);
                          return copy;
                        });
                      }}
                    />
                  </RowContextMenu>
                </motion.div>
              ))}
            </AnimatePresence>
            {visibleTokens.length === 0 && (
              <div className="px-4 py-8 text-center text-xs text-[#F9F9F9]/40">
                No tokens match this filter.
              </div>
            )}
          </motion.div>
        </div>
        <AnimatePresence>
          {activeNewsSymbol && (
            <FloatingControls
              key={activeNewsSymbol}
              tokenSymbol={activeNewsSymbol}
              onClose={() => setActiveNewsSymbol(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Screener;
