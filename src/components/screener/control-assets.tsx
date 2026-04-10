import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

const TOKEN_DATA: Record<string, { price: string; change: number }> = {
  Aave: { price: "$100.80", change: 10 },
  USDC: { price: "$0.99", change: -2 },
  Chainlink: { price: "$10.80", change: 15 },
  ETH: { price: "$3,245.60", change: -20 },
};

interface IProps {
  tokens: Array<{ name: string; image: string; bg: string }>;
}

const ControlAssets = ({ tokens }: IProps) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => setOpen(false), open);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center cursor-pointer bg-transparent border-none p-0"
      >
        {tokens.map((token, i) => (
          <div
            key={token.name}
            className="relative isolate flex items-center"
            style={{ zIndex: tokens.length - i, marginLeft: i === 0 ? 0 : -8 }}
          >
            <div
              className="size-6 flex items-center justify-center border border-[#151616] rounded-[9px]"
              style={{ background: token.bg }}
            >
              <Image
                src={token.image}
                alt={token.name}
                width={16}
                height={16}
                className="rounded-full"
              />
            </div>
          </div>
        ))}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute p-1.5 bottom-full right-0 mb-2 w-50.25 rounded-[9px] border border-[#202021] bg-[#111213]"
            style={{
              boxShadow:
                "0px 4px 16px 0px #0000000A, 0px 16px 44px 0px #0000000F",
            }}
          >
            <h1 className="text-xs text-[#F9F9F9]/60 py-1.5 px-2.5">
              Tokens in article
            </h1>

            {tokens.map((token) => {
              const data = TOKEN_DATA[token.name];
              const isUp = (data?.change ?? 0) >= 0;
              return (
                <div
                  key={token.name}
                  className={`relative flex items-center justify-between py-1.5 px-2.5 border-[#202021] border-t-[0.3px] mt-1`}
                  onMouseEnter={() => setHovered(token.name)}
                  onMouseLeave={() =>
                    setHovered((h) => (h === token.name ? null : h))
                  }
                >
                  <div className="flex items-center gap-1">
                    <div className="size-fit flex items-center justify-center ">
                      <Image
                        src={token.image}
                        alt={token.name}
                        width={18}
                        height={18}
                        className="rounded-full"
                      />
                    </div>
                    <span className="text-[13px] font-light text-[#F9F9F9]/80">
                      {token.name}
                    </span>
                  </div>
                  <span className="text-[13px] text-[#F9F9F9] tabular-nums border-b border-dashed cursor-pointer">
                    {data?.price ?? "—"}
                  </span>

                  <AnimatePresence>
                    {hovered === token.name && data && (
                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-4 pointer-events-none z-50"
                      >
                        <div
                          className={`px-2.5 py-0.5 rounded-full border text-sm tabular-nums whitespace-nowrap ${
                            isUp
                              ? "bg-[#4CAF8221] border-[#4CAF82B2] border-0.5 text-[#4CAF82B2]"
                              : "bg-[#F36C7821] border-[#F36C78B2] border-0.5 text-[#F36C78]"
                          }`}
                        >
                          {isUp ? "Up" : "Down"} {Math.abs(data.change)}%
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ControlAssets;
