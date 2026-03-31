"use client";
import React, { useRef, useState, useCallback } from "react";

const MIN = 100;
const MAX = 800;

const SNAP_SIZES = [
  { label: "sm", width: 200, height: 200 },
  { label: "md", width: 400, height: 400 },
  { label: "lg", width: 700, height: 700 },
];

function snapToClosest(width: number, height: number) {
  return SNAP_SIZES.reduce((closest, candidate) => {
    const dCurrent = Math.hypot(width - closest.width, height - closest.height);
    const dCandidate = Math.hypot(
      width - candidate.width,
      height - candidate.height,
    );
    return dCandidate < dCurrent ? candidate : closest;
  });
}

export default function ResizePage() {
  const [size, setSize] = useState({ width: 400, height: 400 });
  const dragState = useRef<{
    edge: "right" | "bottom" | "corner";
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);

  const clamp = (value: number) => Math.min(MAX, Math.max(MIN, value));

  const onMouseDown = useCallback(
    (edge: "right" | "bottom" | "corner") => (e: React.MouseEvent) => {
      e.preventDefault();
      dragState.current = {
        edge,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: size.width,
        startHeight: size.height,
      };

      const onMouseMove = (ev: MouseEvent) => {
        if (!dragState.current) return;
        const { edge, startX, startY, startWidth, startHeight } =
          dragState.current;
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        setSize({
          width: edge === "bottom" ? startWidth : clamp(startWidth + dx),
          height: edge === "right" ? startHeight : clamp(startHeight + dy),
        });
      };

      document.body.style.cursor = "nwse-resize";

      const onMouseUp = () => {
        dragState.current = null;
        document.body.style.cursor = "";
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        setSize((current) => {
          const snapped = snapToClosest(current.width, current.height);
          return { width: snapped.width, height: snapped.height };
        });
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [size.width, size.height],
  );

  return (
    <div className="w-screen h-screen flex flex-col gap-6 items-center justify-center bg-[#0a0a0a]">
      <div
        className="relative bg-[#111213] border border-[#202021] rounded-xl"
        style={{ width: size.width, height: size.height }}
      >
        <div className="p-4 text-[#D0D6E0] text-sm">
          {size.width} × {size.height}
        </div>

        {/* Right handle */}
        <div
          className="absolute top-0 right-0 w-2 h-full cursor-ew-resize bg-[green]"
          onMouseDown={onMouseDown("right")}
        />

        {/* Bottom handle */}
        <div
          className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize bg-[blue]"
          onMouseDown={onMouseDown("bottom")}
        />

        {/* Corner handle */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize bg-[red]"
          onMouseDown={onMouseDown("corner")}
        />
      </div>

      <div
        className="relative bg-[#111213] border border-[#202021] rounded-xl"
        style={{
          width: "300px",
          height: "300px",
          minWidth: MIN,
          minHeight: MIN,
          maxWidth: MAX,
          maxHeight: MAX,
          resize: "both",
          overflow: "auto",
        }}
      ></div>
    </div>
  );
}
