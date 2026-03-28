"use client";
import React from "react";
import { motion } from "motion/react";

const Clip = () => {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="w-70 h-90 bg-[#333] border rounded-lg relative overflow-hidden">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 8, ease: "easeInOut" }}
          className="relative h-full w-full"
        >
          {/* White card — takes up ~85% from the bottom, slides up via transform */}
          <motion.div className="absolute bottom-0 left-0 w-full h-[85%] bg-white " />
          {/* Small block on top (~15%) — clip-path animates from concave to straight */}
          <motion.div
            className="absolute bottom-[85%] left-0 w-full h-[15%] bg-white pointer-events-none"
            initial={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 40%, 0% 100%)",
            }}
            animate={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)",
            }}
            transition={{ duration: 8, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </main>
  );
};

export default Clip;
