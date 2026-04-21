"use client";

import FloatingControls from "@/components/screener/floating-controls";
import { TokenRow } from "@/components/screener/screener-row";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { AnimatePresence } from "motion/react";

export interface TokenRowHandle {
  reset: () => void;
}

export interface ScreenerToken {
  id: number;
  symbol: string;
  logo: string;
  price: string;
  change: string;
  changePct: string;
  volume: string;
  marketCap: string;
  marketCapChange: string | null;
  volatility: string | null;
}

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
    symbol: "Chainlink",
    logo: "/images/tokens/chain.svg",
    price: "$10.80",
    change: "-$0.34",
    changePct: "-3.21%",
    volume: "11.20B",
    marketCap: "$94.3B",
    marketCapChange: "-8.40%",
    volatility: null,
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

export default function DragToInteractPage() {
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const [activeNewsSymbol, setActiveNewsSymbol] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Record<number, TokenRowHandle | null>>({});

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
    <>
      <div className="flex min-h-screen items-center justify-center bg-[#09090A] font-sans text-white antialiased">
        <div className="w-170 select-none py-1.5">
          {/* Header */}
          <div
            className="mb-0 flex h-12 w-full items-center rounded-t-2xl px-4"
            style={{
              background: "rgba(18,18,18,0.5)",
              boxShadow: "0 0 0 1px rgba(38,38,38,0.5)",
            }}
          >
            {/* Symbol + Price group */}
            <div className="flex flex-2 items-center">
              {columns.slice(0, 2).map((col, i) => (
                <div
                  key={col.label}
                  className="flex h-6.5 flex-1 items-center justify-start px-1 text-sm font-medium text-white/40"
                  style={{ paddingLeft: i === 1 ? 14 : 0 }}
                >
                  {col.label}
                </div>
              ))}
            </div>
            {/* Remaining columns */}
            {columns
              .slice(2)
              .filter((_, i) => !isMobile || i === 0)
              .map((col) => (
                <div
                  key={col.label}
                  className="flex h-6.5 items-center justify-end text-sm font-medium text-white/40"
                  style={{
                    flex: col.flex,
                    marginLeft: col.marginLeft ?? 0,
                  }}
                >
                  {col.label}
                </div>
              ))}
          </div>

          {/* Rows */}
          <div ref={containerRef} className="flex flex-col gap-0">
            {tokens.map((token) => (
              <TokenRow
                key={token.id}
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
              />
            ))}
          </div>
        </div>
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
    </>
  );
}
