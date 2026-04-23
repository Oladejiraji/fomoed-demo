import React from "react";
import Image from "next/image";
import { motion, Transition } from "motion/react";
import { INewsItem } from ".";

interface IProps {
  item: INewsItem;
  handleActive?: () => void;
  isLast?: boolean;
  index?: number;
}

const transition: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 32,
  // opacity: { duration: 0, delay: 0 },
};

export function NewsItem(props: IProps) {
  const { item, handleActive = () => {}, isLast, index = 0 } = props;

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePressStart = () => {
    timerRef.current = setTimeout(() => {
      handleActive();
    }, 500);
  };

  const handlePressEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <motion.button
      type="button"
      className="cursor-pointer text-left w-full"
      onPointerDown={handlePressStart}
      onPointerUp={handlePressEnd}
      onPointerLeave={handlePressEnd}
      initial={{
        y: 24,
        opacity: 0,
        filter: "blur(6px)",
      }}
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 28,
        delay: index * 0.1,
        opacity: { duration: 0.2, ease: "easeOut", delay: index * 0.08 },
        filter: { duration: 0.25, ease: "easeOut", delay: index * 0.1 },
      }}
    >
      <motion.div
        layoutId={`app_news_layout_${item?.id}`}
        transition={transition}
        className={
          "p-3 flex justify-between items-center gap-6 hover:bg-[#323232] transition-colors"
        }
        whileTap={{
          scale: 1.02,
          boxShadow: "0 2px 8px rgba(255,255,255,0.025)",
          cursor: "grabbing",
        }}
        style={{
          borderBottomLeftRadius: isLast ? "1rem" : "0",
          borderBottomRightRadius: isLast ? "1rem" : "0",
        }}
      >
        <motion.div layout="position" className="flex flex-col gap-2 flex-1">
          <p className="text-xs leading-none text-[#F9F9F980]">{item?.link}</p>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium leading-5 tracking-[-1.5%] text-white line-clamp-2">
              {item?.title}
            </p>

            <p className="text-[13px] leading-[1.38] tracking-[0] text-[#F9F9F980] line-clamp-2">
              {item?.description}
            </p>
          </div>

          <p className="text-xs font-medium leading-3.5 tracking-[-0.4%] text-[#F9F9F966] line-clamp-2">
            {item?.time}
          </p>
        </motion.div>
        <motion.div
          layout="position"
          className="h-24.75 w-32.25 rounded-lg"
          layoutId={`app_news_layout_${item?.id}_image`}
          transition={transition}
        >
          <Image src={item?.img} alt="news" width={129} height={99} />
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
