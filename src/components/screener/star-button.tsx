import { animate, useMotionValue, motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SPRING = { type: "spring" as const, duration: 0.3, bounce: 0 };

const STAR_PATH =
  "M10.92 2.868a1.25 1.25 0 0 1 2.16 0l2.795 4.798 5.428 1.176a1.25 1.25 0 0 1 .667 2.054l-3.7 4.141.56 5.525a1.25 1.25 0 0 1-1.748 1.27L12 19.592l-5.082 2.24a1.25 1.25 0 0 1-1.748-1.27l.56-5.525-3.7-4.14a1.25 1.25 0 0 1 .667-2.055l5.428-1.176z";

const STAR_OUTLINE_PATH =
  "M12 4.987 9.687 8.959a1.25 1.25 0 0 1-.816.592l-4.492.973 3.062 3.427c.234.262.347.61.312.959l-.463 4.573 4.206-1.854a1.25 1.25 0 0 1 1.008 0l4.206 1.854-.463-4.573a1.25 1.25 0 0 1 .311-.959l3.063-3.427-4.492-.973a1.25 1.25 0 0 1-.816-.592z";

export function StarButton({
  onToggle,
  favourited,
}: {
  onToggle: () => void;
  favourited: boolean;
}) {
  const starScale = useMotionValue(1);
  const [particles, setParticles] = useState<
    {
      id: number;
      angle: number;
      distance: number;
      size: number;
      color: string;
    }[]
  >([]);
  const prevFavourited = useRef(!favourited);

  useEffect(() => {
    const wasFavourited = prevFavourited.current;
    prevFavourited.current = favourited;

    if (favourited && !wasFavourited) {
      // Favourite: scale up + particles
      animate(starScale, 1.2, {
        type: "spring",
        duration: 0.15,
        bounce: 0,
      }).then(() =>
        animate(starScale, 1, { type: "spring", duration: 0.2, bounce: 0 }),
      );
      const colors = ["#FFD700", "#FFA500", "#FFE066", "#FFF4B8", "#FF6B35"];
      const newParticles = Array.from({ length: 14 }, (_, i) => ({
        id: Date.now() + i,
        angle: (360 / 14) * i + Math.random() * 15 - 7.5,
        distance: 22 + Math.random() * 18,
        size: 3.5 + Math.random() * 3.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 700);
    }
  }, [favourited, starScale]);

  return (
    <motion.button
      initial={{
        opacity: 0,
        scale: 0.25,
        filter: "blur(4px)",
        rotate: 0,
      }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)", rotate: 0 }}
      exit={{
        opacity: 0,
        scale: 0.25,
        filter: "blur(4px)",
        rotate: 360,
        transition: { type: "spring", duration: 0.3, bounce: 0 },
      }}
      transition={SPRING}
      whileTap={{ scale: 0.96 }}
      onClick={onToggle}
      className="relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0"
    >
      <AnimatePresence>
        {particles.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, scale: 1.2, x: 0, y: 0 }}
              animate={{
                opacity: [1, 1, 0],
                scale: [1.2, 0.8, 0],
                x: Math.cos(rad) * p.distance,
                y: Math.sin(rad) * p.distance,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="pointer-events-none absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
              }}
            />
          );
        })}
      </AnimatePresence>
      <motion.div
        className="relative flex size-5 items-center justify-center"
        style={{ scale: starScale }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="overflow-visible"
        >
          <path
            d={STAR_PATH}
            fill={favourited ? "#FFD700" : "rgba(255,255,255,0.15)"}
          />
          {!favourited && (
            <path d={STAR_OUTLINE_PATH} fill="rgba(255,255,255,0.65)" />
          )}
        </svg>
      </motion.div>
    </motion.button>
  );
}
