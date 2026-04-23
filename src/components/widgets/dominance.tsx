import { QuestionIcon, ThreeDotsIcon } from "@/icons";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const dominanceData = [
  {
    name: "BTC",
    label: "Bitcoin",
    dominance: 53.09,
    price: "75,000",
    bg: "#FA8112",
    image: "/images/tokens/bitcoin.png",
  },
  {
    name: "ETH",
    dominance: 28.9,
    label: "Ethereum",
    bg: "#627EEA",
    price: "2,501",
    image: "/images/tokens/eth.png",
  },
  {
    name: "Others",
    dominance: 18.01,
    label: "Bitcoin",
    bg: "#84EBB4",
    image: "/images/tokens/eth.svg",
  },
];

const othersData = [
  {
    id: 1,
    name: "Avax",
    image: "/images/tokens/avax.png",
  },
  {
    id: 2,
    name: "Mon",
    image: "/images/tokens/mon.png",
  },
  {
    id: 3,
    name: "Trx",
    image: "/images/tokens/trx.png",
  },
  {
    id: 4,
    name: "Usdt",
    image: "/images/tokens/usdt.png",
  },
];

type DominanceDatum = (typeof dominanceData)[number];

function DominanceItem({ dom, index }: { dom: DominanceDatum; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [showDominance, setShowDominance] = useState(false);

  useEffect(() => {
    const flipTimer = setTimeout(() => setFlipped(true), 2800 + index * 200);
    const textTimer = setTimeout(
      () => setShowDominance(true),
      3100 + index * 200,
    );
    return () => {
      clearTimeout(flipTimer);
      clearTimeout(textTimer);
    };
  }, [index]);

  return (
    <motion.div
      className="flex gap-2 items-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1.2, ease: "easeOut" }}
    >
      <div className="w-8 h-8" style={{ perspective: 600 }}>
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {Array.from({ length: 10 }).map((_, edgeIdx) => {
            const z = -2.5 + (5 / 9) * edgeIdx;
            return (
              <div
                key={edgeIdx}
                className="absolute inset-0 rounded-full"
                style={{
                  background: edgeIdx % 2 === 0 ? "#525252" : "#404040",
                  transform: `translateZ(${z}px)`,
                }}
              />
            );
          })}
          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "translateZ(3px)",
            }}
          >
            <Image
              src={dom.image}
              width={32}
              height={32}
              alt={dom.label}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg) translateZ(3px)",
            }}
          >
            <Image
              src="/images/tokens/percentage.png"
              width={32}
              height={32}
              alt="percentage"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
      <div className="relative grid overflow-hidden h-8">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={showDominance ? "dominance" : "price"}
            className="text-2xl font-medium leading-8 text-[#F9F9F9] [grid-area:1/1]"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {showDominance ? `${dom.dominance}%` : `$${dom.price}`}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const Dominance = () => {
  //   const [dominanceState, setDominanceState] = useState(dominanceData);
  return (
    <div
      className="bg-[#262626]  h-full w-full border border-[#262626] overflow-hidden rounded-[16px]"
      style={{
        boxShadow:
          "0px 0px 0px 1px #FFFFFF0A inset, 0px 2px 0px 0px #FFFFFF14 inset, 0px 0px 0px 1px #00000029, 0px 1px 1px -0.5px #0000002E, 0px 3px 3px -1.5px #0000002E, 0px 6px 6px -3px #00000040, 0px 12px 12px -6px #0000002E",
      }}
    >
      <div className="flex items-center justify-between border-b border-[#222222] px-4 py-3 ">
        <h3 className="text-[#F9F9F9] text-xs font-medium px-3">Dominance</h3>
        <div className="flex items-center">
          <div className="size-6 flex items-center justify-center">
            <QuestionIcon />
          </div>
          <div className="size-6 flex items-center justify-center">
            <ThreeDotsIcon />
          </div>
        </div>
      </div>

      <div className="px-7 py-4 flex items-center">
        <div className="pr-4">
          <h3 className="text-xs text-[#F9F9F999] py-1.5 leading-3 mb-1">
            BTC Dominance
          </h3>
          <h2 className="text-[#F9F9F9] font-medium text-2xl">53.09%</h2>
        </div>
        <div className="pl-4 border-l-2 border-[#343434] flex items-center gap-4">
          <div>
            <h3 className="text-[#F9F9F999] text-xs pb-1">Price</h3>
            <h3 className="text-[#F9F9F9] text-xs font-medium">$75,019</h3>
          </div>
          <div>
            <h3 className="text-[#F9F9F999] text-xs pb-1">Growth</h3>
            <h3 className="text-[#F9F9F9] text-xs font-medium">63.09%</h3>
          </div>
          <div>
            <h3 className="text-[#F9F9F999] text-xs pb-1">24h Change</h3>
            <h3 className="text-[#F9F9F9] text-xs font-medium">98.02%</h3>
          </div>
          <div>
            <h3 className="text-[#F9F9F999] text-xs pb-1">
              All time Dominance
            </h3>
            <h3 className="text-[#F9F9F9] text-xs font-medium">98.02%</h3>
          </div>
        </div>
      </div>
      <div className="px-2 mx-6">
        <div className="flex justify-between h-1 w-full">
          {new Array(30).fill(0).map((_, i) => {
            return <div key={i} className="h-1 w-px bg-[#474747]" />;
          })}
        </div>
      </div>

      <div className="mb-6 mt-11 px-6">
        <div className="flex items-center gap-2 pb-6">
          {dominanceData.map((dom, i) => (
            <div key={i} style={{ width: `${dom.dominance}%` }}>
              {dom.name.toLowerCase() !== "others" ? (
                <DominanceItem dom={dom} index={i} />
              ) : (
                <div className="flex items-center">
                  {othersData.map((oth, j) => (
                    <motion.div
                      key={j}
                      className="relative"
                      style={{ left: `-${j * 8}px` }}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 1.5 + j * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <Image
                        src={oth.image}
                        alt={oth.name}
                        width={20}
                        height={20}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className="h-6 rounded-full bg-[#3A3A3A] flex items-center gap-0.5"
          style={{ boxShadow: "0px 4px 28px 0px #00000040" }}
        >
          {dominanceData.map((dom, i) => {
            const gapShare =
              ((dominanceData.length - 1) * 2) / dominanceData.length;
            return (
              <motion.div
                key={i}
                className="relative h-full shrink-0"
                initial={{ width: "0%" }}
                animate={{
                  width: `calc(${dom.dominance}% - ${gapShare}px)`,
                }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  className="h-full w-full rounded-full"
                  style={{
                    backgroundColor: dom.bg,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 pt-3">
          {dominanceData.map((dom, i) => (
            <div key={i} style={{ width: `${dom.dominance}%` }}>
              {dom.name.toLowerCase() !== "others" ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.2, ease: "easeOut" }}
                >
                  <h3 className="font-medium text-xs text-[#F9F9F9]">
                    {dom.name}
                  </h3>
                  <p className="pt-1 text-xs text-[#F9F9F9]/60">{dom.label}</p>
                </motion.div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dominance;
