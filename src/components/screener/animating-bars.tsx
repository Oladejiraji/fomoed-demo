import { motion } from "motion/react";

const BARS = [
  { heights: ["40%", "100%", "60%", "85%", "40%"], duration: 0.8 },
  { heights: ["100%", "50%", "80%", "40%", "100%"], duration: 0.7 },
  { heights: ["60%", "80%", "40%", "100%", "60%"], duration: 0.9 },
  { heights: ["80%", "40%", "90%", "50%", "80%"], duration: 0.75 },
  { heights: ["50%", "90%", "40%", "70%", "50%"], duration: 0.85 },
];

export const AnimatingBars = ({
  isPlaying = true,
}: {
  isPlaying?: boolean;
}) => (
  <div className="flex items-center gap-0.5 h-3.5">
    {BARS.map((bar, j) => (
      <motion.span
        key={j}
        className="w-[1.5px] rounded-full bg-[#F9F9F966]"
        animate={isPlaying ? { height: bar.heights } : { height: "40%" }}
        transition={
          isPlaying
            ? {
                duration: bar.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : { duration: 0.2, ease: "easeOut" }
        }
      />
    ))}
  </div>
);
