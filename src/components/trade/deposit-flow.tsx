import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Deposit } from "../deposit/deposit";
import { TokenList } from "../deposit/token-list";
import { NetworkList } from "../deposit/network-list";
import { Confirm } from "../deposit/confirm";

interface IProps {
  showDepositModal: boolean;
  setShowDepositModal: (value: boolean) => void;
}

export function DepositFlow(props: IProps) {
  const { showDepositModal, setShowDepositModal } = props;
  const [showTokens, setShowTokens] = useState(false);
  const [showNetworks, setShowNetworks] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <AnimatePresence>
      {showDepositModal && (
        <div
          key="deposit"
          className="absolute inset-0 z-11 flex items-end"
          onClick={() => setShowDepositModal(false)}
        >
          <motion.div
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
            }}
            initial={{ y: "100%", filter: "blur(4px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            exit={{ y: "100%", filter: "blur(4px)" }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            // transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Deposit
              handleClose={() => setShowDepositModal(false)}
              handleShowTokens={() => setShowTokens(true)}
              handleShowNetworks={() => setShowNetworks(true)}
            />
          </motion.div>
        </div>
      )}

      {showTokens && (
        <div
          key="token-list"
          className="absolute inset-0 z-12 flex items-end"
          onClick={() => setShowTokens(false)}
        >
          <motion.div
            className="w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%", filter: "blur(4px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            exit={{ y: "100%", filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <TokenList handleClose={() => setShowTokens(false)} />
          </motion.div>
        </div>
      )}

      {showNetworks && (
        <div
          key="network-list"
          className="absolute inset-0 z-12 flex items-end"
          onClick={() => setShowNetworks(false)}
        >
          <motion.div
            className="w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%", filter: "blur(4px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            exit={{ y: "100%", filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <NetworkList handleClose={() => setShowNetworks(false)} />
          </motion.div>
        </div>
      )}

      {showConfirm && (
        <div
          key="confirm"
          className="absolute inset-0 z-12 flex items-end"
          onClick={() => setShowConfirm(false)}
        >
          <motion.div
            className="w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%", filter: "blur(4px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            exit={{ y: "100%", filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Confirm />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
