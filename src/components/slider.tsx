"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

const THUMB_SIZE = 23;
const TRACK_HEIGHT = 16;
const GAP = 4;

function Slider({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
  className,
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const trackRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const percentage = ((currentValue - min) / (max - min)) * 100;

  const tickMarks = React.useMemo(() => {
    const percentages = [0, 25, 50, 75, 100];
    return percentages.map((percent) => ({
      percent,
    }));
  }, []);

  const updateValue = React.useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const raw = min + ratio * (max - min);
      const stepped = Math.round(raw / step) * step;
      const clamped = Math.max(min, Math.min(max, stepped));
      if (!isControlled) setInternalValue(clamped);
      onChange?.(clamped);
    },
    [min, max, step, isControlled, onChange],
  );

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragging.current = true;
      updateValue(e.clientX);
    },
    [disabled, updateValue],
  );

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updateValue(e.clientX);
    },
    [updateValue],
  );

  const onPointerUp = React.useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div className={cn("relative w-full", className)}>
      {/* Percentage label above thumb */}
      <div className="relative mb-2 h-7">
        <div
          className="absolute -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${percentage}%` }}
        >
          <div className="text-[#f9f9f9] font-medium text-sm flex items-center justify-center bg-[#171717] rounded-[5px] px-2 h-6">
            <span>{Math.round(percentage)}%</span>
          </div>
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid #171717",
            }}
          />
        </div>
      </div>

      {/* Custom track */}
      <div
        ref={trackRef}
        className="relative w-full touch-none select-none"
        style={{ height: THUMB_SIZE }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Left (filled) pill */}
        <div
          className="absolute rounded-full top-1/2 -translate-y-1/2 left-0"
          style={{
            height: TRACK_HEIGHT,
            width: `calc(${percentage}% - ${GAP + THUMB_SIZE / 2}px)`,
            minWidth: 0,
            background: "linear-gradient(90deg, #CCFF00 0%, #005E00 100%)",
          }}
        />

        {/* Right (unfilled) pill */}
        <div
          className="absolute rounded-full top-1/2 -translate-y-1/2 right-0 bg-[#202127]"
          style={{
            height: TRACK_HEIGHT,
            width: `calc(${100 - percentage}% - ${GAP + THUMB_SIZE / 2}px)`,
            minWidth: 0,
          }}
        />

        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 rounded-full cursor-grab active:cursor-grabbing"
          style={{
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            left: `${percentage}%`,
            background: "#FFFFFF33",
            boxShadow:
              "0px 0.5px 0.5px 0px #CCFF00 inset, 0px 4px 8px 0px #0000000A, 0px 2px 7px 0px #CCFF0024",
          }}
        />

        {/* Hidden range input for accessibility */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          disabled={disabled}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (!isControlled) setInternalValue(v);
            onChange?.(v);
          }}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          aria-label="Slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
        />
      </div>

      {/* Percentage tick labels below slider */}
      <div className="relative mt-4 h-5">
        {tickMarks.map(({ percent }) => {
          const distance = Math.abs(percentage - percent);
          const opacity = Math.max(0.2, 1 - distance / 30);
          const align =
            percent === 0
              ? "left-0"
              : percent === 100
                ? "right-0"
                : "left-[var(--pos)] -translate-x-1/2";
          return (
            <span
              key={percent}
              className={cn(
                "absolute text-[#f9f9f9] transition-opacity duration-150 text-xs font-medium",
                align,
              )}
              style={{ "--pos": `${percent}%`, opacity } as React.CSSProperties}
            >
              {percent}%
            </span>
          );
        })}
      </div>
    </div>
  );
}

export { Slider };
export type { SliderProps };
