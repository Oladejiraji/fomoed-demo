"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Element is 300×460 (60px extra at top for the convex bump).
// Visual top sits at y=60; bump uses that 0–60 headroom.
const CONVEX = "path('M 0 460 L 300 460 L 300 60 Q 150 0 0 60 Z')";
const CONCAVE = "path('M 0 460 L 300 460 L 300 60 Q 150 120 0 60 Z')";

export default function DepositTestPage() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 bg-black">
      <button
        onClick={() => setVisible((v) => !v)}
        className="px-4 py-2 rounded bg-white text-black text-sm"
      >
        {visible ? "Hide" : "Show"}
      </button>
      <AnimatePresence>
        {visible && (
          <motion.div
            style={{ width: 300, height: 460, marginTop: -60, background: "white" }}
            initial={{ clipPath: CONVEX, y: "100%", opacity: 0 }}
            animate={{ clipPath: CONCAVE, y: 0, opacity: 1 }}
            exit={{ clipPath: CONVEX, y: "100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
