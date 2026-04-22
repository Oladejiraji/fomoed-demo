import React, {
  useState,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { useSetAtom } from "jotai";
import { priceAtom, pctChangeAtom } from "@/atoms/price";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { FXIcon, Indicator, SearchIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { animate, motion, useSpring } from "motion/react";

// RNDR base price ~$4.20 (approximate current price)
const BASE_PRICE = 4.2;

// Each exchange has a slight price offset and volatility difference
const exchangeConfig: Record<string, { offset: number; volatility: number }> = {
  Robinhood: { offset: 0, volatility: 0.012 },
  "Crypto.com": { offset: 0.03, volatility: 0.015 },
  Kraken: { offset: -0.02, volatility: 0.01 },
  Hyperliquid: { offset: 0.05, volatility: 0.02 },
};

interface DataPoint {
  time: string;
  price: number;
}

const POINT_COUNT = 30;

function generateInitialData(exchange: string): DataPoint[] {
  const config = exchangeConfig[exchange] || { offset: 0, volatility: 0.012 };
  const points: DataPoint[] = [];
  let price = BASE_PRICE + config.offset;
  const now = Date.now();

  for (let i = POINT_COUNT - 1; i >= 0; i--) {
    const change = (Math.random() - 0.48) * config.volatility * price;
    price = Math.max(price + change, BASE_PRICE * 0.85);
    const t = new Date(now - i * 2000);
    points.push({
      time: t.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      price: parseFloat(price.toFixed(4)),
    });
  }
  return points;
}

function generateNextPrice(lastPrice: number, exchange: string): number {
  const config = exchangeConfig[exchange] || { offset: 0, volatility: 0.012 };
  const change = (Math.random() - 0.48) * config.volatility * lastPrice;
  return parseFloat(Math.max(lastPrice + change, BASE_PRICE * 0.85).toFixed(4));
}

const durationOptions = [
  { id: 1, label: "ALL", value: "all" },
  { id: 2, label: "5Y", value: "5y" },
  { id: 3, label: "1Y", value: "1y" },
  { id: 4, label: "6M", value: "6m" },
  { id: 5, label: "3M", value: "3m" },
  { id: 6, label: "1M", value: "1m" },
  { id: 7, label: "1W", value: "1w" },
  { id: 8, label: "1D", value: "1d" },
];

function DurationSection() {
  const [selectedDuration, setSelectedDuration] = useState("all");

  return (
    <div className="flex gap-1 items-center">
      {durationOptions.map((item) => {
        const isActive = selectedDuration === item.value;
        const activeClassName =
          "shadow-[0px_4px_16px_0px_#D2D2D208] bg-[linear-gradient(180deg,#F8F8F8_-35%,#E6E6E6_167.5%)] text-[#3D3D3D]";

        return (
          <button
            key={item?.id}
            type="button"
            className={cn(
              "font-medium text-xs leading-5 tracking-[-0.0056em] text-[#F9F9F980] py-0.5 px-2.5 rounded-md cursor-pointer",
              isActive && activeClassName,
            )}
            onClick={() => {
              setSelectedDuration(item?.value);
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function AnimatedPrice({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 120, damping: 20 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      setDisplay(parseFloat(v.toFixed(4)));
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span suppressHydrationWarning>${display.toLocaleString("en-US")}</span>
  );
}

interface PricechartMorphProps {
  exchange?: string;
  containerClassName?: string;
}

export function PricechartMorph({
  exchange = "Robinhood",
  containerClassName = "",
}: PricechartMorphProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [data, setData] = useState<DataPoint[]>(() =>
    generateInitialData(exchange),
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const liveStartedRef = useRef(false);
  const setPrice = useSetAtom(priceAtom);
  const setPctChange = useSetAtom(pctChangeAtom);

  useEffect(() => {
    const latestPrice = data[data.length - 1]?.price ?? 0;
    const firstPrice = data[0]?.price ?? latestPrice;
    const pct = (((latestPrice - firstPrice) / firstPrice) * 100).toFixed(2);
    setPrice(latestPrice);
    setPctChange(pct);
  }, [data, setPrice, setPctChange]);

  const exchangeRef = useRef(exchange);
  const lastPriceRef = useRef(data[data.length - 1].price);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);

  // Morph to new exchange data on exchange change
  useEffect(() => {
    if (exchange === exchangeRef.current) return;
    exchangeRef.current = exchange;

    const target = generateInitialData(exchange);
    animRef.current?.stop();

    setData((prev) => {
      setIsTransitioning(true);
      const from = prev;

      animRef.current = animate(0, 1, {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (progress) => {
          setData(
            from.map((point, i) => ({
              time: point.time,
              price: parseFloat(
                (
                  point.price +
                  ((target[i]?.price ?? point.price) - point.price) * progress
                ).toFixed(4),
              ),
            })),
          );
        },
        onComplete: () => {
          const finalData = target.map((point, i) => ({
            time: from[i]?.time ?? point.time,
            price: point.price,
          }));
          lastPriceRef.current = finalData[finalData.length - 1].price;
          setData(finalData);
          setIsTransitioning(false);
        },
      });

      return prev; // don't update yet, animation handles it
    });

    return () => animRef.current?.stop();
  }, [exchange]);

  // Stream new price data every 2 seconds, with a 3s delay on first load
  useEffect(() => {
    if (isTransitioning) return;

    let interval: ReturnType<typeof setInterval>;

    const startInterval = () => {
      liveStartedRef.current = true;
      setIsLive(true);
      interval = setInterval(() => {
        setData((prev) => {
          const last = lastPriceRef.current;
          const nextPrice = generateNextPrice(last, exchangeRef.current);
          lastPriceRef.current = nextPrice;
          const now = new Date();
          const newPoint: DataPoint = {
            time: now.toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            price: nextPrice,
          };
          return [...prev.slice(1), newPoint];
        });
      }, 2000);
    };

    const timeout = setTimeout(
      startInterval,
      liveStartedRef.current ? 0 : 3000,
    );

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isTransitioning]);

  // Always derive Y domain from current displayed data
  const prices = data.map((d) => d.price);
  const dataMin = Math.min(...prices);
  const dataMax = Math.max(...prices);
  const dataPadding = (dataMax - dataMin) * 0.15 || 0.01;
  const yDomain: [number, number] = [
    parseFloat((dataMin - dataPadding).toFixed(4)),
    parseFloat((dataMax + dataPadding).toFixed(4)),
  ];

  const latestPrice = data[data.length - 1]?.price ?? BASE_PRICE;
  const firstPrice = data[0]?.price ?? BASE_PRICE;
  const priceChange = latestPrice - firstPrice;
  const pctChange = ((priceChange / firstPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  const ohlc = {
    O: data[0]?.price.toFixed(2) ?? "0",
    H: Math.max(...data.map((d) => d.price)).toFixed(2),
    L: Math.min(...data.map((d) => d.price)).toFixed(2),
    C: latestPrice.toFixed(2),
  };

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "bg-[#212121] h-92 w-207.75 rounded-xl flex flex-col overflow-hidden",
        containerClassName,
      )}
    >
      <div className="h-10 flex items-center justify-between border-b border-[#F9F9F905]">
        <div className="flex items-center gap-1">
          <div className="flex items-center w-10">
            <button
              type="button"
              className="text-xs tracking-[-0.0056em] leading-5 text-[#F9F9F9] flex-1"
            >
              1M
            </button>
            <div className="bg-[#F9F9F91A] h-5 w-px"></div>
          </div>

          <div className="w-7 flex justify-center items-center">
            <Indicator />
          </div>

          <div className="flex gap-1 items-center">
            <div className="w-5 flex justify-center items-center">
              <FXIcon />
            </div>
            <p className="text-[#F9F9F94D] text-xs leading-5 tracking-[-0.0056em]">
              Indicators
            </p>
          </div>
        </div>

        <button
          type="button"
          className="w-6 h-6 mr-1.5 flex justify-center items-center"
        >
          <SearchIcon />
        </button>
      </div>
      <div className="flex flex-1">
        <div className="w-10 h-full border-r border-[#F9F9F908]"></div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <div className="absolute top-0 left-0 w-full flex justify-between items-start p-2 pointer-events-none z-10">
              <motion.div
                className="flex flex-col gap-1.5 pointer-events-auto"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-[#F9F9F9] font-semibold text-2xl leading-8 tracking-[-0.0056em]">
                  <AnimatedPrice value={latestPrice} />
                </h3>
                <p
                  className={cn(
                    "font-medium text-sm leading-4 tracking-[-0.0056em]",
                    isPositive ? "text-[#6DCB72]" : "text-[#CB6D6D]",
                  )}
                >
                  {isPositive ? "+" : ""}
                  {priceChange.toFixed(4)} ({isPositive ? "+" : ""}
                  {pctChange}%)
                </p>
              </motion.div>

              <div className="flex gap-2 items-center py-1 px-1.5 pointer-events-auto">
                {(["O", "H", "L", "C"] as const).map((key) => (
                  <div key={key} className="flex items-center gap-1">
                    <p className="text-[#F9F9F966] text-xs leading-4 tracking-0">
                      {key}
                    </p>
                    <p className="text-[#F9F9F9] font-medium text-xs leading-4 tracking-0">
                      {ohlc[key]}
                    </p>
                  </div>
                ))}
                <p className="text-[#F9F9F9] font-medium text-xs leading-4 tracking-0">
                  {priceChange >= 0 ? "+" : ""}
                  {priceChange.toFixed(2)} ({pctChange}%)
                </p>
              </div>
            </div>

            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 60, right: 5, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="priceGradientMorph"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#6DCB72" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#6DCB72" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis
                    orientation="right"
                    domain={yDomain}
                    stroke="#F9F9F926"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tickCount={8}
                    tickFormatter={(v: number) => `$${v.toFixed(2)}`}
                    tick={{ fill: "#F9F9F966", dx: 16 }}
                    width={55}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: "8px",
                      color: "#f9f9f9",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "#999" }}
                    formatter={(value: number) => [
                      `$${value.toFixed(4)}`,
                      "RNDR",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#6DCB72"
                    strokeWidth={1.5}
                    fill="url(#priceGradientMorph)"
                    isAnimationActive={!isLive}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="h-12 w-full flex items-center justify-between px-1.5 border-t border-[#F9F9F905]">
            <DurationSection />

            <div className="flex items-center gap-2">
              <p className="text-[#F9F9F980] tracking-0 text-xs leading-4 font-medium px-2">
                {new Date().toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: "UTC",
                })}{" "}
                UTC
              </p>
              <div className="h-5 w-0.5 bg-[#F9F9F91A]"></div>
              <p className="text-[#F9F9F980] tracking-[-0.0056em] text-sm leading-5 font-medium px-2">
                %
              </p>
              {/* <p className="text-[#F9F9F980] tracking-[-0.0056em] text-sm leading-5 font-medium px-2.5">
                Log
              </p>
              <p className="text-[#007CE9] tracking-[-0.0056em] text-sm leading-5 font-medium px-2.5">
                Auto
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
