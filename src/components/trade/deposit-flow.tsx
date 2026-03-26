import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Deposit } from "../deposit/deposit";
import { TokenList } from "../deposit/token-list";
import { NetworkList } from "../deposit/network-list";

interface IProps {
  showDepositModal: boolean;
  setShowDepositModal: (value: boolean) => void;
}

const enterTransition = {
  type: "spring" as const,
  duration: 0.4,
  bounce: 0.1,
};

const exitTransition = {
  duration: 0.2,
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
};

const panelVariants = {
  initial: { transform: "translateY(100%)", opacity: 0, filter: "blur(4px)" },
  animate: {
    transform: "translateY(0%)",
    opacity: 1,
    filter: "blur(0px)",
    transition: enterTransition,
  },
  exit: {
    transform: "translateY(100%)",
    opacity: 0,
    filter: "blur(4px)",
    transition: exitTransition,
  },
};

export function DepositFlow(props: IProps) {
  const { showDepositModal, setShowDepositModal } = props;
  const [showTokens, setShowTokens] = useState(false);
  const [showNetworks, setShowNetworks] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setShowConfirm(true), 4000);
  }, []);

  useEffect(() => {
    if (!showDepositModal) {
      setShowConfirm(false);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      return;
    }
    resetIdleTimer();
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [showDepositModal, resetIdleTimer]);

  return (
    <AnimatePresence>
      {showDepositModal && (
        <div
          key="deposit"
          className="absolute inset-0 z-11 flex items-end pb-px"
          onClick={() => setShowDepositModal(false)}
        >
          <motion.div
            className="w-full"
            onClick={(e) => e.stopPropagation()}
            onPointerMove={resetIdleTimer}
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Deposit
              handleClose={() => setShowDepositModal(false)}
              handleShowTokens={() => setShowTokens(true)}
              handleShowNetworks={() => setShowNetworks(true)}
              handleBack={() => { setShowConfirm(false); }}
              showConfirm={showConfirm}
            />
          </motion.div>
        </div>
      )}

      {showTokens && (
        <div
          key="token-list"
          className="absolute inset-0 z-12 flex items-end pb-px"
          onClick={() => setShowTokens(false)}
        >
          <motion.div
            className="w-full"
            onClick={(e) => e.stopPropagation()}
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <TokenList handleClose={() => setShowTokens(false)} />
          </motion.div>
        </div>
      )}

      {showNetworks && (
        <div
          key="network-list"
          className="absolute inset-0 z-12 flex items-end pb-px"
          onClick={() => setShowNetworks(false)}
        >
          <motion.div
            className="w-full"
            onClick={(e) => e.stopPropagation()}
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <NetworkList handleClose={() => setShowNetworks(false)} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
