import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { NewsArticle } from "./floating-controls";
import { QueueAnimatingBars } from "./queue-animating-bars";
import { cn } from "@/lib/utils";

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMins > 0) return `${diffMins}m ago`;
  return "just now";
}

interface IProps {
  articles: NewsArticle[];
  currentIndex: number;
  isPlaying: boolean;
  activeTrackRef: React.RefObject<HTMLButtonElement | null>;
  onSelectArticle: (index: number) => void;
  tokenSymbol: string | null;
}

export const QueuePanel = (props: IProps) => {
  const {
    articles,
    currentIndex,
    isPlaying,
    activeTrackRef,
    onSelectArticle,
    tokenSymbol,
  } = props;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 10, height: 0 }}
      className="mb-2 overflow-hidden rounded-[14px] bg-[#111213] border-[#202021] border-0.5"
      style={{
        boxShadow:
          "0px 4px 16px 0px #0000000A, 0px 16px 44px 0px #0000000F, 0px 11px 37px 0px #00000040",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="px-4 pt-3 pb-2.5">
        <span className="text-xs text-[#F9F9F9]/50">
          {tokenSymbol} Playlist
        </span>
      </div>
      <div className="flex max-h-90 flex-col overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
        {articles.map((article, i) => {
          const isLast = i === articles.length - 1;
          return (
            <button
              key={article.id}
              ref={i === currentIndex ? activeTrackRef : undefined}
              onClick={() => onSelectArticle(i)}
              className={cn(
                `relative flex cursor-pointer bg-transparent items-center gap-3 border-b border-[#F9F9F90A] px-4.5 py-3 text-left transition-colors hover:bg-white/5`,
                {
                  "border-b-0": isLast,
                },
              )}
            >
              <div className="flex items-center justify-between gap-39">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white/90">
                    {article.title}
                  </p>
                  <p className="text-xs text-[#f9f9f9]/50 pt-1">
                    {article.description}
                  </p>
                  <div className="flex pt-2 items-center gap-1 ">
                    <p className="text-[10px] text-[#f9f9f9]/40 font-medium">
                      {timeAgo(article.published_date)}
                    </p>
                    <div className="size-0.75 rounded-full bg-[#434343]" />
                    <Image
                      src={article.source.asset}
                      alt={article.source.name}
                      width={12}
                      height={12}
                      className="rounded-full"
                    />
                    <p className="text-[10px] text-[#f9f9f9]/70 font-medium">
                      {article.source.name}
                    </p>
                  </div>
                </div>

                <div className="relative w-22 h-20 rounded-[8px] overflow-hidden">
                  <motion.div
                    animate={{
                      filter:
                        i === currentIndex ? "blur(8px)" : "blur(0px)",
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="size-full"
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={88}
                      height={80}
                      className="block w-22 h-20 object-cover"
                    />
                  </motion.div>
                  <AnimatePresence>
                    {i === currentIndex && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center bg-black/60"
                      >
                        <QueueAnimatingBars isPlaying={isPlaying} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};
