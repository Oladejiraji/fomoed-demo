"use client";

import { useState, useEffect, useCallback } from "react";
import { Liveline } from "liveline";

type DataPoint = { time: number; value: number };

function generateInitialData(
  count: number,
  basePrice: number,
  volatility: number
): DataPoint[] {
  const now = Math.floor(Date.now() / 1000);
  const points: DataPoint[] = [];
  let price = basePrice;
  for (let i = count; i > 0; i--) {
    price += (Math.random() - 0.49) * volatility;
    points.push({ time: now - i, value: price });
  }
  return points;
}

export default function Home() {
  const [btcData, setBtcData] = useState<DataPoint[]>(() =>
    generateInitialData(60, 67420, 15)
  );
  const [ethData, setEthData] = useState<DataPoint[]>(() =>
    generateInitialData(60, 3580, 5)
  );
  const [solData, setSolData] = useState<DataPoint[]>(() =>
    generateInitialData(60, 172, 1.2)
  );

  const btcValue = btcData[btcData.length - 1]?.value ?? 0;
  const ethValue = ethData[ethData.length - 1]?.value ?? 0;
  const solValue = solData[solData.length - 1]?.value ?? 0;

  const tick = useCallback(() => {
    const now = Math.floor(Date.now() / 1000);

    const addPoint = (
      prev: DataPoint[],
      volatility: number
    ): DataPoint[] => {
      const last = prev[prev.length - 1];
      const delta = (Math.random() - 0.49) * volatility;
      const next = { time: now, value: last.value + delta };
      return [...prev.slice(-119), next];
    };

    setBtcData((p) => addPoint(p, 15));
    setEthData((p) => addPoint(p, 5));
    setSolData((p) => addPoint(p, 1.2));
  }, []);

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <header className="px-6 py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">
          Liveline Demo
        </h1>
        <p className="text-zinc-400 mt-1">
          Real-time animated charts — powered by{" "}
          <a
            href="https://benji.org/liveline"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            liveline
          </a>
        </p>
      </header>

      <main className="px-6 pb-16 max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* BTC Chart */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-zinc-400">BTC/USD</span>
            <span className="text-xs text-zinc-500">Live</span>
          </div>
          <div className="h-52">
            <Liveline
              data={btcData}
              value={btcValue}
              color="#f7931a"
              theme="dark"
              showValue
              valueMomentumColor
              momentum
              scrub
              exaggerate
              windows={[
                { label: "1m", secs: 60 },
                { label: "2m", secs: 120 },
              ]}
            />
          </div>
        </div>

        {/* ETH Chart */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-zinc-400">ETH/USD</span>
            <span className="text-xs text-zinc-500">Live</span>
          </div>
          <div className="h-52">
            <Liveline
              data={ethData}
              value={ethValue}
              color="#627eea"
              theme="dark"
              showValue
              valueMomentumColor
              momentum
              scrub
              exaggerate
              windows={[
                { label: "1m", secs: 60 },
                { label: "2m", secs: 120 },
              ]}
            />
          </div>
        </div>

        {/* SOL Chart — with degen mode */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-zinc-400">SOL/USD</span>
            <span className="text-xs text-zinc-500">Live</span>
          </div>
          <div className="h-52">
            <Liveline
              data={solData}
              value={solValue}
              color="#9945ff"
              theme="dark"
              showValue
              valueMomentumColor
              momentum
              scrub
              degen
              windows={[
                { label: "1m", secs: 60 },
                { label: "2m", secs: 120 },
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
