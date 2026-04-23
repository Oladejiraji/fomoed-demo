"use client";
import React, { Fragment, useState } from "react";
import { Header } from "./header";
import { NewsItem } from "./news-item";
import { Preview } from "./preview";
import { AnimatePresence } from "motion/react";
import { useAtomValue } from "jotai";
import { isNewsLoadingAtom } from "@/lib/atoms/news";

const data = [
  {
    id: 1,
    link: "Aave.com",
    title:
      "Aave V4 launches with unified liquidity layer and cross-chain borrowing",
    description:
      "The latest Aave upgrade introduces a new architecture that allows liquidity to flow seamlessly across networks, reducing fragmentation and improving capital efficiency.",
    time: "9:14 AM",
    context: "aave",
    price: 168.42,
    change: 4.37,
    img: "/images/news-item/news-item.png",
    bg: "#9391F7",
    bullets: [
      "Aave V4 introduces a unified liquidity layer that pools assets across chains, eliminating the siloed pools that previously caused capital to sit idle on less active networks.",
      "Cross-chain borrowing is now native to the protocol, letting users collateralize assets on one chain and borrow on another without manually bridging funds first.",
      "Capital efficiency improves significantly as the new architecture dynamically routes liquidity to where demand is highest, reducing borrowing rates across the board.",
      "The simplified developer API lowers the barrier for third-party integrations, making it easier for wallets and aggregators to build on top of Aave V4.",
    ],
  },
  {
    id: 2,
    link: "X.com",
    title: "Coinbase adds support for USDC yield directly in retail accounts",
    description:
      "Coinbase is rolling out native USDC rewards for US customers, offering up to 4.7% APY without needing to move funds to a separate protocol or wallet.",
    time: "10:33 AM",
    context: "coinbase",
    price: 184.91,
    change: 1.83,
    img: "/images/news-item/news-item2.png",
    bg: "#004FFE",
    bullets: [
      "Coinbase is offering up to 4.7% APY on USDC balances for US retail customers, making it one of the highest stablecoin yields available on a centralized platform.",
      "Users don't need to bridge funds or interact with a separate DeFi protocol — the yield accrues directly inside existing Coinbase accounts with no extra steps.",
      "The feature rolls out gradually across the US, with Coinbase positioning it as a savings alternative to traditional bank accounts offering sub-1% interest.",
      "The move is widely seen as a play to retain idle stablecoin balances on-platform rather than losing users to competing yield protocols like Aave or Morpho.",
    ],
  },
  {
    id: 3,
    link: "Cryptopanic.com",
    title: "Crypto markets flash red as macro fears weigh on risk assets",
    description:
      "Bitcoin dipped below $82K overnight as traders reacted to stronger-than-expected jobs data, raising expectations of a prolonged high-rate environment.",
    time: "11:47 AM",
    context: "cryptopanic",
    price: 81740,
    change: -3.56,
    img: "/images/news-item/news-item3.png",
    bg: "#ccff00",
    bullets: [
      "Bitcoin fell below $82K overnight after US jobs data came in stronger than expected, signalling a resilient labour market that gives the Fed less reason to cut rates.",
      "Markets have now pushed back their first rate cut expectation to late 2025 at the earliest, with some traders pricing in no cuts at all this year.",
      "The sell-off was broad, with Ethereum, Solana, and major altcoins all dropping 4–8% in tandem as risk appetite dried up across global markets.",
      "Analysts note that crypto remains closely correlated with tech equities in macro-driven environments, leaving it vulnerable to further downside if inflation stays sticky.",
    ],
  },
  {
    id: 4,
    link: "Yahoo.finance",
    title: "Aave treasury surpasses $100M as protocol revenue hits new high",
    description:
      "Aave's DAO treasury has crossed the $100M mark for the first time, fueled by record borrowing volumes on Ethereum and Arbitrum over the past quarter.",
    time: "2:05 PM",
    context: "aave",
    price: 168.42,
    change: 5.14,
    img: "/images/news-item/news-item.png",
    bg: "#9391F7",
    bullets: [
      "Aave's DAO treasury has crossed the $100M mark for the first time, a milestone that reflects sustained protocol growth and rising fee revenue over the past 12 months.",
      "Record borrowing volumes on Ethereum and Arbitrum have been the primary driver, with both networks seeing a surge in demand for leveraged positions and stablecoin loans.",
      "Protocol revenue has hit new highs as rising TVL and utilisation rates push more fees back to the DAO, accelerating treasury accumulation ahead of schedule.",
      "The growing treasury gives Aave's DAO a longer runway to fund grants, security audits, and ecosystem incentives without relying on token emissions or external funding.",
    ],
  },
];

export type INewsItem = (typeof data)[0];

export function News() {
  const [selectedNews, setSelectedNews] = useState<INewsItem | null>(null);
  const isNewsTokenLoading = useAtomValue(isNewsLoadingAtom);

  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <div className="w-full h-full rounded-2xl bg-[#262626] border border-[#202021] flex flex-col relative pb-1">
        <div className="app_news_container  rounded-xl">
          {isNewsTokenLoading && (
            <Fragment>
              <div className="app_news_container__animated__bottom"></div>
              <div className="app_news_container__animated__bottom__color"></div>
            </Fragment>
          )}
        </div>
        <Header />
        <div className="flex-1 relative">
          {!isNewsTokenLoading && (
            <div className="absolute -inset-x-4 inset-y-0 overflow-y-scroll scrollbar-minimal flex flex-col px-4 pb-px">
              {data?.map((item, index) => {
                const isLast = index === data?.length - 1;

                return (
                  <Fragment key={item?.id}>
                    <NewsItem
                      item={item}
                      index={index}
                      handleActive={() => {
                        setSelectedNews(item);
                      }}
                      isLast={index === data?.length - 1}
                    />
                    {!isLast && (
                      <div className="w-full border-b border-[#F9F9F90A]"></div>
                    )}
                  </Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait">
        {selectedNews && (
          <Preview
            key={selectedNews?.id}
            newsItem={selectedNews}
            handleClose={() => {
              setSelectedNews(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// border border-[#202021]
