import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AnimatingBars } from "./animating-bars";
import { CaretDown, FolderIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { QueuePanel } from "./queue-panel";
import { PlayerControls } from "./player-controls";
import Image from "next/image";

export type TokenInfo = { name: string; image: string; bg: string };

export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  audio: string;
  source: { name: string; asset: string };
  duration: string;
  published_date: string;
  tokens: TokenInfo[];
}

export interface TokenNewsData {
  token: { name: string; image: string; bg: string };
  articles: NewsArticle[];
}

const SOURCE_ICONS: Record<string, string> = {
  CoinDesk: "/images/sources/coindesk.png",
  "The Block": "/images/sources/theblock.png",
  Decrypt: "/images/sources/decrypt.png",
  "DeFi Pulse": "/images/sources/defipulse.png",
  CoinTelegraph: "/images/sources/cointelegraph.png",
  "The Defiant": "/images/sources/thedefiant.png",
  Blockworks: "/images/sources/blockworks.png",
  "DeFi Llama": "/images/sources/defillama.png",
  Bloomberg: "/images/sources/bloomberg.png",
  Forbes: "/images/sources/forbes.png",
  Reuters: "/images/sources/reuters.png",
  "Financial Times": "/images/sources/ft.png",
  CryptoSlate: "/images/sources/cryptoslate.png",
  Messari: "/images/sources/messari.png",
  TechCrunch: "/images/sources/techcrunch.png",
  "The Verge": "/images/sources/theverge.png",
};

export const TOKEN_DATA: Record<string, TokenInfo> = {
  Aave: { name: "Aave", image: "/images/tokens/aave.svg", bg: "#9391F7" },
  USDC: { name: "USDC", image: "/images/tokens/usdc.svg", bg: "#2775CA" },
  Chainlink: {
    name: "Chainlink",
    image: "/images/tokens/chain.svg",
    bg: "#0847F7",
  },
  ETH: { name: "ETH", image: "/images/tokens/eth.svg", bg: "#627EEA" },
  USDT: { name: "USDT", image: "/images/tokens/usdt.png", bg: "#26A17B" },
  AVAX: { name: "AVAX", image: "/images/tokens/avax.png", bg: "#E84142" },
  TRX: { name: "TRX", image: "/images/tokens/trx.png", bg: "#FF060A" },
  MON: { name: "MON", image: "/images/tokens/mon.png", bg: "#836EF9" },
};

const MOCK_NEWS: Record<string, TokenNewsData> = {
  Aave: {
    token: TOKEN_DATA.Aave,
    articles: [
      {
        id: 1,
        title: "Aave V4 Launch Sparks DeFi Rally",
        description:
          "The latest protocol upgrade introduces modular architecture and unified liquidity layers.",
        image: "/images/news/cover1.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "CoinDesk", asset: SOURCE_ICONS.CoinDesk },
        duration: "2:34",
        published_date: "2026-04-07",
        tokens: [TOKEN_DATA.Aave, TOKEN_DATA.ETH],
      },
      {
        id: 2,
        title: "Aave Expands to Solana Network",
        description:
          "Cross-chain deployment brings Aave lending markets to Solana's high-speed ecosystem.",
        image: "/images/news/cover2.png",
        audio: "/images/tracks/news_track2.mp3",
        source: { name: "The Block", asset: SOURCE_ICONS["The Block"] },
        duration: "1:58",
        published_date: "2026-04-06",
        tokens: [TOKEN_DATA.Aave],
      },
      {
        id: 3,
        title: "Aave Treasury Hits $100M Milestone",
        description:
          "Protocol revenue and fee accumulation push the DAO treasury past a record threshold.",
        image: "/images/news/cover3.png",
        audio: "/images/tracks/news_track3.mp3",
        source: { name: "Decrypt", asset: SOURCE_ICONS.Decrypt },
        duration: "3:12",
        published_date: "2026-04-05",
        tokens: [TOKEN_DATA.Aave, TOKEN_DATA.USDC, TOKEN_DATA.ETH],
      },
      {
        id: 4,
        title: "Aave Governance Proposal #291 Passes",
        description:
          "Community votes to adjust interest rate curves and onboard new collateral types.",
        image: "/images/news/cover4.png",
        audio: "/images/tracks/news_track4.mp3",
        source: { name: "DeFi Pulse", asset: SOURCE_ICONS["DeFi Pulse"] },
        duration: "1:45",
        published_date: "2026-04-04",
        tokens: [TOKEN_DATA.Aave],
      },
      {
        id: 5,
        title: "Aave Integrates Chainlink CCIP for Cross-Chain Lending",
        description:
          "New integration enables seamless borrowing and lending across multiple blockchains.",
        image: "/images/news/cover5.png",
        audio: "/images/tracks/news_track5.mp3",
        source: { name: "CoinTelegraph", asset: SOURCE_ICONS.CoinTelegraph },
        duration: "2:10",
        published_date: "2026-04-03",
        tokens: [TOKEN_DATA.Aave, TOKEN_DATA.Chainlink, TOKEN_DATA.ETH],
      },
      {
        id: 6,
        title: "Aave GHO Stablecoin Reaches $500M Market Cap",
        description:
          "The protocol-native stablecoin continues to gain traction among DeFi users.",
        image: "/images/news/cover6.png",
        audio: "/images/tracks/news_track6.mp3",
        source: { name: "The Defiant", asset: SOURCE_ICONS["The Defiant"] },
        duration: "3:45",
        published_date: "2026-04-02",
        tokens: [TOKEN_DATA.Aave, TOKEN_DATA.USDC],
      },
      {
        id: 7,
        title: "Aave DAO Votes to Deploy on Base Network",
        description:
          "Coinbase's L2 becomes the latest chain to host Aave lending markets.",
        image: "/images/news/cover7.png",
        audio: "/images/tracks/news_track7.mp3",
        source: { name: "Blockworks", asset: SOURCE_ICONS.Blockworks },
        duration: "1:32",
        published_date: "2026-04-01",
        tokens: [TOKEN_DATA.Aave, TOKEN_DATA.ETH],
      },
      {
        id: 8,
        title: "Aave Flash Loan Volume Hits All-Time High",
        description:
          "Arbitrage and liquidation activity drive flash loan usage to unprecedented levels.",
        image: "/images/news/cover8.png",
        audio: "/images/tracks/news_track8.mp3",
        source: { name: "DeFi Llama", asset: SOURCE_ICONS["DeFi Llama"] },
        duration: "2:55",
        published_date: "2026-03-31",
        tokens: [TOKEN_DATA.Aave, TOKEN_DATA.ETH, TOKEN_DATA.USDC],
      },
      {
        id: 9,
        title: "Aave Risk Parameters Updated After Market Volatility",
        description:
          "Governance adjusts LTV ratios and liquidation thresholds in response to price swings.",
        image: "/images/news/cover9.png",
        audio: "/images/tracks/news_track9.mp3",
        source: { name: "The Block", asset: SOURCE_ICONS["The Block"] },
        duration: "4:01",
        published_date: "2026-03-30",
        tokens: [TOKEN_DATA.Aave],
      },
      {
        id: 10,
        title: "Aave Launches Institutional Lending Pool",
        description:
          "KYC-gated pools open Aave lending to institutional participants for the first time.",
        image: "/images/news/cover10.png",
        audio: "/images/tracks/news_track10.mp3",
        source: { name: "Bloomberg", asset: SOURCE_ICONS.Bloomberg },
        duration: "2:22",
        published_date: "2026-03-29",
        tokens: [TOKEN_DATA.Aave, TOKEN_DATA.USDC],
      },
    ],
  },
  USDC: {
    token: TOKEN_DATA.USDC,
    articles: [
      {
        id: 1,
        title: "Circle Plans IPO for Late 2026",
        description:
          "The stablecoin issuer prepares to go public amid growing regulatory clarity.",
        image: "/images/news/cover1.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "Bloomberg", asset: SOURCE_ICONS.Bloomberg },
        duration: "3:01",
        published_date: "2026-04-07",
        tokens: [TOKEN_DATA.USDC],
      },
      {
        id: 2,
        title: "USDC Surpasses USDT in On-Chain Volume",
        description:
          "Transparent reserves and regulatory compliance drive a shift in stablecoin dominance.",
        image: "/images/news/cover2.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "The Block", asset: SOURCE_ICONS["The Block"] },
        duration: "2:15",
        published_date: "2026-04-06",
        tokens: [TOKEN_DATA.USDC, TOKEN_DATA.ETH],
      },
      {
        id: 3,
        title: "New USDC Integration with Major Banks",
        description:
          "Several top-tier banks begin supporting USDC for commercial payments and settlements.",
        image: "/images/news/cover3.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "CoinDesk", asset: SOURCE_ICONS.CoinDesk },
        duration: "2:42",
        published_date: "2026-04-05",
        tokens: [TOKEN_DATA.USDC],
      },
      {
        id: 4,
        title: "Circle Launches USDC on 5 New Chains",
        description:
          "Multi-chain expansion targets emerging L2 ecosystems and alternative L1 networks.",
        image: "/images/news/cover4.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "CoinTelegraph", asset: SOURCE_ICONS.CoinTelegraph },
        duration: "1:48",
        published_date: "2026-04-04",
        tokens: [TOKEN_DATA.USDC, TOKEN_DATA.Chainlink, TOKEN_DATA.ETH],
      },
      {
        id: 5,
        title: "USDC Reserves Audit Shows Full Backing",
        description:
          "Independent audit confirms 1:1 backing with cash and short-term U.S. treasuries.",
        image: "/images/news/cover5.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "Forbes", asset: SOURCE_ICONS.Forbes },
        duration: "3:15",
        published_date: "2026-04-03",
        tokens: [TOKEN_DATA.USDC],
      },
      {
        id: 6,
        title: "Circle Partners with Visa for USDC Settlements",
        description:
          "Visa integrates USDC for real-time merchant settlement across its global network.",
        image: "/images/news/cover6.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "Reuters", asset: SOURCE_ICONS.Reuters },
        duration: "2:30",
        published_date: "2026-04-02",
        tokens: [TOKEN_DATA.USDC, TOKEN_DATA.ETH],
      },
      {
        id: 7,
        title: "USDC Cross-Border Payments Hit Record Volume",
        description:
          "Remittance corridors see surging adoption of USDC for low-cost international transfers.",
        image: "/images/news/cover7.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "Blockworks", asset: SOURCE_ICONS.Blockworks },
        duration: "1:55",
        published_date: "2026-04-01",
        tokens: [TOKEN_DATA.USDC],
      },
      {
        id: 8,
        title: "Regulators Approve USDC for EU Markets",
        description:
          "MiCA compliance paves the way for USDC to operate across all EU member states.",
        image: "/images/news/cover8.png",
        audio: "/images/tracks/news_track1.mp3",
        source: {
          name: "Financial Times",
          asset: SOURCE_ICONS["Financial Times"],
        },
        duration: "4:12",
        published_date: "2026-03-31",
        tokens: [TOKEN_DATA.USDC, TOKEN_DATA.Aave],
      },
    ],
  },
  Chainlink: {
    token: TOKEN_DATA.Chainlink,
    articles: [
      {
        id: 1,
        title: "Chain Protocol Announces Major Upgrade",
        description:
          "New consensus mechanism promises 10x throughput improvement and lower fees.",
        image: "/images/news/cover9.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "CryptoSlate", asset: SOURCE_ICONS.CryptoSlate },
        duration: "2:20",
        published_date: "2026-04-07",
        tokens: [TOKEN_DATA.Chainlink, TOKEN_DATA.ETH],
      },
      {
        id: 2,
        title: "Chain Partners with Enterprise Giants",
        description:
          "Fortune 500 companies sign on to build supply chain solutions on the network.",
        image: "/images/news/cover10.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "Forbes", asset: SOURCE_ICONS.Forbes },
        duration: "3:30",
        published_date: "2026-04-06",
        tokens: [TOKEN_DATA.Chainlink],
      },
      {
        id: 3,
        title: "Chain Staking Rewards Increase to 8%",
        description:
          "Protocol incentives boosted to attract more validators and secure the network.",
        image: "/images/news/cover1.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "Decrypt", asset: SOURCE_ICONS.Decrypt },
        duration: "1:55",
        published_date: "2026-04-05",
        tokens: [TOKEN_DATA.Chainlink, TOKEN_DATA.ETH],
      },
      {
        id: 4,
        title: "Chain NFT Marketplace Goes Live",
        description:
          "Native NFT trading platform launches with zero-fee listings for early creators.",
        image: "/images/news/cover2.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "The Block", asset: SOURCE_ICONS["The Block"] },
        duration: "2:08",
        published_date: "2026-04-04",
        tokens: [TOKEN_DATA.Chainlink],
      },
      {
        id: 5,
        title: "Chain Developer Grants Program Launches",
        description:
          "A $10M fund aims to attract builders and grow the application ecosystem.",
        image: "/images/news/cover3.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "CoinDesk", asset: SOURCE_ICONS.CoinDesk },
        duration: "1:40",
        published_date: "2026-04-03",
        tokens: [TOKEN_DATA.Chainlink, TOKEN_DATA.USDC],
      },
      {
        id: 6,
        title: "Chain Network Processes 1M Daily Transactions",
        description:
          "Growing user activity pushes the network past a major throughput milestone.",
        image: "/images/news/cover4.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "Messari", asset: SOURCE_ICONS.Messari },
        duration: "3:22",
        published_date: "2026-04-02",
        tokens: [TOKEN_DATA.Chainlink, TOKEN_DATA.ETH, TOKEN_DATA.Aave],
      },
      {
        id: 7,
        title: "Chain Foundation Raises $50M Series B",
        description:
          "New funding will accelerate protocol development and ecosystem partnerships.",
        image: "/images/news/cover5.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "TechCrunch", asset: SOURCE_ICONS.TechCrunch },
        duration: "2:50",
        published_date: "2026-04-01",
        tokens: [TOKEN_DATA.Chainlink],
      },
      {
        id: 8,
        title: "Chain Wallet Adds Biometric Authentication",
        description:
          "Fingerprint and face ID support improve security for mobile wallet users.",
        image: "/images/news/cover6.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "The Verge", asset: SOURCE_ICONS["The Verge"] },
        duration: "1:35",
        published_date: "2026-03-31",
        tokens: [TOKEN_DATA.Chainlink, TOKEN_DATA.ETH],
      },
    ],
  },
  ETH: {
    token: TOKEN_DATA.ETH,
    articles: [
      {
        id: 1,
        title: "Ethereum Pectra Upgrade Goes Live on Mainnet",
        description:
          "The long-awaited upgrade brings account abstraction and validator improvements.",
        image: "/images/news/cover7.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "CoinDesk", asset: SOURCE_ICONS.CoinDesk },
        duration: "3:10",
        published_date: "2026-04-07",
        tokens: [TOKEN_DATA.ETH],
      },
      {
        id: 2,
        title: "ETH Staking Yields Climb to 5.2%",
        description:
          "Increased network activity and MEV rewards push staking returns to yearly highs.",
        image: "/images/news/cover8.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "The Block", asset: SOURCE_ICONS["The Block"] },
        duration: "2:25",
        published_date: "2026-04-06",
        tokens: [TOKEN_DATA.ETH, TOKEN_DATA.Aave],
      },
      {
        id: 3,
        title: "Ethereum L2 TVL Surpasses $80B",
        description:
          "Rollup adoption accelerates as Base, Arbitrum, and Optimism see record inflows.",
        image: "/images/news/cover9.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "DeFi Llama", asset: SOURCE_ICONS["DeFi Llama"] },
        duration: "2:48",
        published_date: "2026-04-05",
        tokens: [TOKEN_DATA.ETH, TOKEN_DATA.USDC],
      },
      {
        id: 4,
        title: "Vitalik Proposes New Gas Fee Model",
        description:
          "EIP draft aims to reduce fee volatility and improve UX for everyday transactions.",
        image: "/images/news/cover10.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "Decrypt", asset: SOURCE_ICONS.Decrypt },
        duration: "1:55",
        published_date: "2026-04-04",
        tokens: [TOKEN_DATA.ETH],
      },
      {
        id: 5,
        title: "Ethereum Foundation Restructures Governance",
        description:
          "New council-based model gives the community more direct influence over protocol funding.",
        image: "/images/news/cover1.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "CoinTelegraph", asset: SOURCE_ICONS.CoinTelegraph },
        duration: "3:30",
        published_date: "2026-04-03",
        tokens: [TOKEN_DATA.ETH],
      },
      {
        id: 6,
        title: "ETH Spot ETFs See $1.2B Weekly Inflow",
        description:
          "Institutional demand surges as Ethereum ETFs hit a new weekly record.",
        image: "/images/news/cover2.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "Bloomberg", asset: SOURCE_ICONS.Bloomberg },
        duration: "2:15",
        published_date: "2026-04-02",
        tokens: [TOKEN_DATA.ETH, TOKEN_DATA.USDC],
      },
      {
        id: 7,
        title: "Ethereum DeFi Volume Hits All-Time High",
        description:
          "DEX and lending protocol activity reaches unprecedented levels across the ecosystem.",
        image: "/images/news/cover3.png",
        audio: "/images/tracks/news_track1.mp3",
        source: { name: "The Defiant", asset: SOURCE_ICONS["The Defiant"] },
        duration: "2:40",
        published_date: "2026-04-01",
        tokens: [TOKEN_DATA.ETH, TOKEN_DATA.Aave, TOKEN_DATA.USDC],
      },
      {
        id: 8,
        title: "Major Banks Test Ethereum for Bond Settlement",
        description:
          "Pilot programs explore tokenized government bonds on Ethereum's public chain.",
        image: "/images/news/cover4.png",
        audio: "/images/tracks/news_track1.mp3",
        source: {
          name: "Financial Times",
          asset: SOURCE_ICONS["Financial Times"],
        },
        duration: "3:55",
        published_date: "2026-03-31",
        tokens: [TOKEN_DATA.ETH, TOKEN_DATA.Chainlink],
      },
    ],
  },
};

// Placeholder aliases: new tokens reuse existing articles until real data is added.
MOCK_NEWS.USDT = { token: TOKEN_DATA.USDT, articles: MOCK_NEWS.USDC.articles };
MOCK_NEWS.AVAX = { token: TOKEN_DATA.AVAX, articles: MOCK_NEWS.ETH.articles };
MOCK_NEWS.TRX = { token: TOKEN_DATA.TRX, articles: MOCK_NEWS.ETH.articles };
MOCK_NEWS.MON = { token: TOKEN_DATA.MON, articles: MOCK_NEWS.ETH.articles };

interface FloatingControlsProps {
  tokenSymbol: string | null;
  onClose: () => void;
}

const FloatingControls = ({ tokenSymbol, onClose }: FloatingControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [queueOpen, setQueueOpen] = useState(false);
  const [gooeyBubble, setGooeyBubble] = useState<"idle" | "glowing">("idle");
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeTrackRef = useRef<HTMLButtonElement | null>(null);

  const tokenNews = MOCK_NEWS[tokenSymbol!];
  const articles = tokenNews?.articles ?? [];
  const current = articles[currentIndex];

  // Sync play/pause state with the audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentIndex]);

  if (!current) return null;

  const goToArticle = (index: number) => {
    setCurrentIndex(index);
    setElapsed(0);
    setDuration(0);
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
      className="fixed bottom-10 left-1/2 z-50 w-126.75 -translate-x-1/2"
    >
      <AnimatePresence>
        {queueOpen && (
          <QueuePanel
            tokenSymbol={tokenSymbol}
            articles={articles}
            currentIndex={currentIndex}
            isPlaying={isPlaying}
            activeTrackRef={activeTrackRef}
            onSelectArticle={handleSelectArticle}
          />
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src={current.audio}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onTimeUpdate={(e) => setElapsed(e.currentTarget.currentTime)}
        onEnded={handleNext}
      />

      <div>
        <PlayerControls
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onPrev={handlePrev}
          onNext={handleNext}
          onSeek={(seconds) => {
            const audio = audioRef.current;
            if (audio) {
              audio.currentTime = seconds;
              setElapsed(seconds);
            }
          }}
          progress={duration > 0 ? elapsed / duration : 0}
          elapsed={elapsed}
          total={duration}
          tokens={current.tokens}
        />

        <div className="relative">
          {/* <button
            onClick={() => {
              if (gooeyBubble === "glowing") return;
              setGooeyBubble("glowing");
            }}
            className={cn(
              "folder-glow absolute top-1/2 -translate-y-1/2 size-10 rounded-full bg-[#151616] flex items-center justify-center cursor-pointer",
            )}
            style={{ left: -53 }}
            onAnimationEnd={() => {
              if (gooeyBubble === "glowing") setGooeyBubble("idle");
            }}
          >
            <span className="relative z-10">
              <FolderIcon />
            </span>
          </button> */}

          {/* Actual controls content */}
          <div className="flex items-center justify-between bg-[#151616] relative rounded-[12px] border border-[#202021] px-1.5 py-[2px] gap-3">
            <div className="flex items-center gap-3">
              <div className="size-8 relative">
                <Image
                  alt={current.title}
                  // width={32}
                  // height={32}
                  src={current.image}
                  fill
                  className="rounded-[8px]"
                />
              </div>
              {/* Now playing info */}
              <div className="flex items-center gap-1">
                <div className=" flex flex-col">
                  <span
                    className="text-sm truncate max-w-75 text-[#F9F9F9E5]"
                    // className="truncate text-sm text-white"
                    title={current.title}
                  >
                    {current.title}
                  </span>
                </div>

                {/* Queue toggle */}
                <button
                  onClick={() => {
                    const opening = !queueOpen;
                    setQueueOpen(opening);
                    if (opening) {
                      setTimeout(() => {
                        activeTrackRef.current?.scrollIntoView({
                          block: "nearest",
                          behavior: "smooth",
                        });
                      }, 150);
                    }
                  }}
                  className={`cursor-pointer size-4 flex items-center justify-center border-none bg-transparent p-0 transition-colors ${
                    queueOpen
                      ? "text-purple-400"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <CaretDown
                    className={cn(
                      "transition-transform",
                      queueOpen ? "rotate-180" : "",
                    )}
                  />
                </button>
                {!queueOpen && (
                  <div className="size-4 flex items-center justify-center">
                    <AnimatingBars isPlaying={isPlaying} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-0.5 pr-3">
              <p className="text-sm text-[#F9F9F9]">English</p>
              <div className="size-4 flex items-center justify-center">
                <CaretDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingControls;
