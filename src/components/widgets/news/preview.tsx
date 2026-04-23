import React, { useRef } from "react";
import { motion, Transition } from "motion/react";
import { Play } from "@/icons";
import { INewsItem } from ".";

import Image from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface IProps {
  newsItem: INewsItem;
  handleClose: () => void;
}

const transition: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 32,
};

export function Preview(props: IProps) {
  const { newsItem, handleClose } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, handleClose, true);

  return (
    <motion.div
      ref={containerRef}
      layoutId={`app_news_layout_${newsItem?.id}`}
      transition={transition}
      className="absolute top-0 left-0 right-0 bottom-0 z-5 bg-[#111213] rounded-[24px] p-1.5 flex flex-col gap-0.75 overflow-hidden"
    >
      <div
        className="h-50 w-full rounded-[18px] flex justify-center items-center"
        style={{ background: newsItem?.bg }}
      >
        <motion.div
          className="w-25"
          layoutId={`app_news_layout_${newsItem?.id}_image`}
          transition={transition}
        >
          <Image
            src={newsItem?.img}
            alt="img"
            width={100}
            height={78}
            className="w-full"
          />
        </motion.div>
      </div>

      <motion.div
        layout="position"
        className="flex items-start justify-between p-3 gap-10.75"
      >
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium tracking-[-1.5%] leading-5 text-white line-clamp-2">
              {newsItem?.title}
            </p>
            <p className="text-sm tracking-[-0.4%] leading-5 text-white opacity-80 line-clamp-3">
              {newsItem?.description}
            </p>
          </div>

          <p className="text-xs font-medium tracking-[-0.4%] leading-3.5 text-[#F9F9F9B2]">
            {newsItem?.time}
          </p>
        </div>

        <button
          type="button"
          className="h-8 w-8 bg-[#1F2020] border border-[#202021] cursor-pointer rounded-full flex justify-center items-center"
        >
          <Play />
        </button>
      </motion.div>

      <div className="p-3 flex-1 flex overflow-y-auto scrollbar-minimal">
        <ul className="flex flex-col gap-2.5 list-disc list-outside pl-3 flex-1">
          {newsItem?.bullets?.map((bullet, i) => (
            <li
              key={i}
              className="text-white leading-5 text-sm tracking-[-0.4%] marker:text-[#f9f9f9] opacity-80"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
