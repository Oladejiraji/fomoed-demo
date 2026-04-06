import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipForward, SkipBack, ListMusic, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface NewsArticle {
  id: number;
  title: string;
  source: string;
  duration: string;
}

const MOCK_NEWS: Record<string, NewsArticle[]> = {
  Aave: [
    {
      id: 1,
      title: "Aave V4 Launch Sparks DeFi Rally",
      source: "CoinDesk",
      duration: "2:34",
    },
    {
      id: 2,
      title: "Aave Expands to Solana Network",
      source: "The Block",
      duration: "1:58",
    },
    {
      id: 3,
      title: "Aave Treasury Hits $100M Milestone",
      source: "Decrypt",
      duration: "3:12",
    },
    {
      id: 4,
      title: "Aave Governance Proposal #291 Passes",
      source: "DeFi Pulse",
      duration: "1:45",
    },
    {
      id: 5,
      title: "Aave Integrates Chainlink CCIP for Cross-Chain Lending",
      source: "CoinTelegraph",
      duration: "2:10",
    },
    {
      id: 6,
      title: "Aave GHO Stablecoin Reaches $500M Market Cap",
      source: "The Defiant",
      duration: "3:45",
    },
    {
      id: 7,
      title: "Aave DAO Votes to Deploy on Base Network",
      source: "Blockworks",
      duration: "1:32",
    },
    {
      id: 8,
      title: "Aave Flash Loan Volume Hits All-Time High",
      source: "DeFi Llama",
      duration: "2:55",
    },
    {
      id: 9,
      title: "Aave Risk Parameters Updated After Market Volatility",
      source: "The Block",
      duration: "4:01",
    },
    {
      id: 10,
      title: "Aave Launches Institutional Lending Pool",
      source: "Bloomberg",
      duration: "2:22",
    },
  ],
  USDC: [
    {
      id: 1,
      title: "Circle Plans IPO for Late 2026",
      source: "Bloomberg",
      duration: "3:01",
    },
    {
      id: 2,
      title: "USDC Surpasses USDT in On-Chain Volume",
      source: "The Block",
      duration: "2:15",
    },
    {
      id: 3,
      title: "New USDC Integration with Major Banks",
      source: "CoinDesk",
      duration: "2:42",
    },
    {
      id: 4,
      title: "Circle Launches USDC on 5 New Chains",
      source: "CoinTelegraph",
      duration: "1:48",
    },
    {
      id: 5,
      title: "USDC Reserves Audit Shows Full Backing",
      source: "Forbes",
      duration: "3:15",
    },
    {
      id: 6,
      title: "Circle Partners with Visa for USDC Settlements",
      source: "Reuters",
      duration: "2:30",
    },
    {
      id: 7,
      title: "USDC Cross-Border Payments Hit Record Volume",
      source: "Blockworks",
      duration: "1:55",
    },
    {
      id: 8,
      title: "Regulators Approve USDC for EU Markets",
      source: "Financial Times",
      duration: "4:12",
    },
  ],
  Chain: [
    {
      id: 1,
      title: "Chain Protocol Announces Major Upgrade",
      source: "CryptoSlate",
      duration: "2:20",
    },
    {
      id: 2,
      title: "Chain Partners with Enterprise Giants",
      source: "Forbes",
      duration: "3:30",
    },
    {
      id: 3,
      title: "Chain Staking Rewards Increase to 8%",
      source: "Decrypt",
      duration: "1:55",
    },
    {
      id: 4,
      title: "Chain NFT Marketplace Goes Live",
      source: "The Block",
      duration: "2:08",
    },
    {
      id: 5,
      title: "Chain Developer Grants Program Launches",
      source: "CoinDesk",
      duration: "1:40",
    },
    {
      id: 6,
      title: "Chain Network Processes 1M Daily Transactions",
      source: "Messari",
      duration: "3:22",
    },
    {
      id: 7,
      title: "Chain Foundation Raises $50M Series B",
      source: "TechCrunch",
      duration: "2:50",
    },
    {
      id: 8,
      title: "Chain Wallet Adds Biometric Authentication",
      source: "The Verge",
      duration: "1:35",
    },
  ],
};

interface FloatingControlsProps {
  tokenSymbol: string | null;
  onClose: () => void;
}

function parseDuration(dur: string): number {
  const [min, sec] = dur.split(":").map(Number);
  return min * 60 + sec;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const FloatingControls = ({ tokenSymbol, onClose }: FloatingControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [queueOpen, setQueueOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeTrackRef = useRef<HTMLButtonElement | null>(null);

  const articles = MOCK_NEWS[tokenSymbol!] ?? [];
  const [remaining, setRemaining] = useState(() => {
    const first = articles[0];
    return first ? parseDuration(first.duration) : 0;
  });
  const current = articles[currentIndex];

  // Countdown timer
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isPlaying || !current) return;

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setCurrentIndex((i) => (i + 1) % articles.length);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, current, articles.length]);

  if (!current) return null;

  const goToArticle = (index: number) => {
    setCurrentIndex(index);
    setRemaining(parseDuration(articles[index].duration));
  };

  const handleNext = () => {
    const next = (currentIndex + 1) % articles.length;
    goToArticle(next);
  };

  const handlePrev = () => {
    const prev = (currentIndex - 1 + articles.length) % articles.length;
    goToArticle(prev);
  };

  const handleSelectArticle = (index: number) => {
    goToArticle(index);
    setIsPlaying(true);
    setQueueOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-10 left-1/2 z-50 w-92 -translate-x-1/2"
    >
      <AnimatePresence>
        {queueOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            className="mb-2 overflow-hidden rounded-2xl"
            style={{
              background: "rgba(18,18,18,0.85)",
              boxShadow: "0 0 0 1px rgba(38,38,38,0.5)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="px-4 pt-3 pb-2">
              <span className="text-xs font-medium text-white/50">Queue</span>
            </div>
            <div className="flex max-h-60 flex-col overflow-y-auto">
              {articles.map((article, i) => (
                <button
                  key={article.id}
                  ref={i === currentIndex ? activeTrackRef : undefined}
                  onClick={() => handleSelectArticle(i)}
                  className={`flex cursor-pointer items-center gap-3 border-none px-4 py-2.5 text-left transition-colors hover:bg-white/5 ${
                    i === currentIndex ? "bg-white/8" : "bg-transparent"
                  }`}
                >
                  <div className="flex size-6 shrink-0 items-center justify-center">
                    {i === currentIndex && isPlaying ? (
                      <div className="flex items-end gap-0.75 h-3.5">
                        {[
                          {
                            heights: ["40%", "100%", "60%", "85%", "40%"],
                            duration: 0.8,
                          },
                          {
                            heights: ["100%", "50%", "80%", "40%", "100%"],
                            duration: 0.7,
                          },
                          {
                            heights: ["60%", "80%", "40%", "100%", "60%"],
                            duration: 0.9,
                          },
                        ].map((bar, j) => (
                          <motion.span
                            key={j}
                            className="w-0.75 rounded-full bg-purple-400"
                            animate={{ height: bar.heights }}
                            transition={{
                              duration: bar.duration,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-white/30">{i + 1}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">
                      {article.title}
                    </p>
                    <p className="text-xs text-white/40">
                      {article.source} · {article.duration}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="flex items-center gap-3 rounded-full px-4 py-3"
        style={{
          background: "rgba(18,18,18,0.5)",
          boxShadow: "0 0 0 1px rgba(38,38,38,0.5)",
          backdropFilter: "blur(20px)",
        }}
      >
          {/* Now playing info */}
          <div className="mr-1 flex w-48 flex-col">
            <span
              className="truncate text-xs font-medium text-white"
              title={current.title}
            >
              {current.title}
            </span>
            <span className="text-[10px] text-white/40">
              {current.source} · {formatTime(remaining)}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="cursor-pointer border-none bg-transparent p-0"
            >
              <SkipBack className="size-4 text-white" fill="white" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="cursor-pointer border-none bg-transparent p-0"
            >
              {isPlaying ? (
                <Pause className="size-4 text-white" fill="white" />
              ) : (
                <Play className="size-4 text-white" fill="white" />
              )}
            </button>
            <button
              onClick={handleNext}
              className="cursor-pointer border-none bg-transparent p-0"
            >
              <SkipForward className="size-4 text-white" fill="white" />
            </button>
          </div>

          {/* Queue toggle */}
          <button
            onClick={() => {
              const opening = !queueOpen;
              setQueueOpen(opening);
              if (opening) {
                setTimeout(() => {
                  activeTrackRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
                }, 150);
              }
            }}
            className={`cursor-pointer border-none bg-transparent p-0 transition-colors ${
              queueOpen ? "text-purple-400" : "text-white/60 hover:text-white"
            }`}
          >
            <ListMusic className="size-4" />
          </button>

          {/* Close */}
          <button
            onClick={() => {
              setQueueOpen(false);
              onClose();
            }}
            className="cursor-pointer border-none bg-transparent p-0"
          >
            <X className="size-4 text-white/40 hover:text-white" />
          </button>
      </div>
    </motion.div>
  );
};

export default FloatingControls;
