import { SkipIcon } from "@/icons";
import { Pause, Play } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import ControlAssets from "./control-assets";

interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (seconds: number) => void;
  progress: number; // 0–1
  elapsed: number; // seconds
  total: number; // seconds
  tokens: Array<{ name: string; image: string; bg: string }>;
}

function formatTime(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const PlayerControls = ({
  isPlaying,
  onTogglePlay,
  onPrev,
  onNext,
  onSeek,
  progress,
  elapsed,
  total,
  tokens,
}: PlayerControlsProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  const displayProgress = isDragging ? dragProgress : progress;

  function getProgressFromEvent(clientX: number): number {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return Math.min(1, Math.max(0, ratio));
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    const next = getProgressFromEvent(e.clientX);
    setIsDragging(true);
    setDragProgress(next);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setDragProgress(getProgressFromEvent(e.clientX));
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    const next = getProgressFromEvent(e.clientX);
    setIsDragging(false);
    onSeek(next * total);
  }

  return (
    <div className="flex items-center justify-between mb-2.5 w-full gap-25">
      <div className="flex items-center w-full flex-1 gap-2">
        <div className="flex items-center justify-center gap-2.5 ">
          <button
            onClick={onPrev}
            className="cursor-pointer border-none bg-transparent p-2 -m-2 transition-all duration-150 hover:scale-115 active:scale-95"
          >
            <SkipIcon className="rotate-180" />
          </button>
          <button
            onClick={onTogglePlay}
            className="cursor-pointer border-none bg-transparent p-2 -m-2 transition-all duration-150 hover:scale-115 active:scale-95"
          >
            {isPlaying ? (
              <Pause className="size-3 text-white" fill="white" />
            ) : (
              <Play className="size-3 text-white" fill="white" />
            )}
          </button>
          <button
            onClick={onNext}
            className="cursor-pointer border-none bg-transparent p-2 -m-2 transition-all duration-150 hover:scale-115 active:scale-95"
          >
            <SkipIcon className="" />
          </button>
        </div>

        <span className="text-[10px] text-white/40 tabular-nums">
          {formatTime(elapsed)}
        </span>
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="group relative h-3 w-full flex items-center cursor-pointer touch-none"
        >
          <div className="h-0.5 w-full rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-white/50"
              style={{ width: `${displayProgress * 100}%` }}
            />
          </div>
          <motion.div
            className="absolute size-2.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_4px_rgba(0,0,0,0.4)] opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              left: `${displayProgress * 100}%`,
              opacity: isDragging ? 1 : undefined,
            }}
            animate={{ scale: isDragging ? 1.15 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        </div>
        <span className="text-[10px] text-white/40 tabular-nums">
          {formatTime(total)}
        </span>
      </div>

      <div className="w-18 shrink-0 flex justify-end">
        <ControlAssets tokens={tokens} />
      </div>
    </div>
  );
};
