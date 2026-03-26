import { motion } from "motion/react";

function Spinner({ className }: { className?: string }) {
  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="14" cy="14" r="11" stroke="#C8C8C8" strokeWidth="2" />
      <path
        d="M14 3 A 11 11 0 0 1 25 14"
        stroke="#4A4A4A"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export { Spinner };
