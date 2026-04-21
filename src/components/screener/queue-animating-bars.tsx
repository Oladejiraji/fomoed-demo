import { useEffect, useState } from "react";
import { motion } from "motion/react";

const BARS = [
  { heights: ["40%", "100%", "60%", "85%", "40%"], duration: 0.8 },
  { heights: ["100%", "50%", "80%", "40%", "100%"], duration: 0.7 },
  { heights: ["60%", "80%", "40%", "100%", "60%"], duration: 0.9 },
  { heights: ["80%", "40%", "90%", "50%", "80%"], duration: 0.75 },
  { heights: ["50%", "90%", "40%", "70%", "50%"], duration: 0.85 },
];

const GROW_DELAY = 0.4;
const GROW_DURATION = 0.35;
const BOUNCE_DELAY = 0.4;

export const QueueAnimatingBars = ({
  isPlaying = true,
}: {
  isPlaying?: boolean;
}) => {
  const [hasMounted, setHasMounted] = useState(false);
  const initialDelay = hasMounted ? 0 : GROW_DELAY + GROW_DURATION + BOUNCE_DELAY;

  useEffect(() => {
    const id = setTimeout(
      () => setHasMounted(true),
      (GROW_DELAY + GROW_DURATION + BOUNCE_DELAY) * 1000,
    );
    return () => clearTimeout(id);
  }, []);

  return (
    <motion.div
      className="flex items-center gap-0.5 h-3.5 origin-center"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{
        delay: GROW_DELAY,
        duration: GROW_DURATION,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {BARS.map((bar, j) => (
        <motion.span
          key={j}
          className="w-[1.5px] rounded-full bg-[#F9F9F966]"
          initial={{ height: bar.heights[0] }}
          animate={isPlaying ? { height: bar.heights } : { height: "40%" }}
          transition={
            isPlaying
              ? {
                  delay: initialDelay,
                  duration: bar.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : { duration: 0.2, ease: "easeOut" }
          }
        />
      ))}
    </motion.div>
  );
};
