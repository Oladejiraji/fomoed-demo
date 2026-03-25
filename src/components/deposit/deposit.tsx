import React, { useState, useCallback } from "react";
import { CaretDown, CloseIcon, Copy, CheckIcon } from "@/icons";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { selectedTokenAtom, selectedNetworkAtom } from "@/lib/atoms/deposit";
import { TextMorph } from "torph/react";

interface IProps {
  handleClose?: () => void;
  handleShowTokens?: () => void;
  handleShowNetworks?: () => void;
}

function shortenAddress(address: string, length = 32): string {
  if (address.length <= length) return address;
  const keep = Math.floor((length - 3) / 2);
  return `${address.slice(0, keep)}...${address.slice(-keep)}`;
}

const DEPOSIT_ADDRESS = "0x072461657Cce07B6469Eb0f9D5E564531bB45e79";

export function Deposit(props: IProps) {
  const { handleClose, handleShowTokens, handleShowNetworks } = props;
  const selectedToken = useAtomValue(selectedTokenAtom);
  const selectedNetwork = useAtomValue(selectedNetworkAtom);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(DEPOSIT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);
  return (
    <div className="max-w-75 w-full mx-auto pt-3.5 px-4 pb-6 rounded-2xl shadow-[0_0_0_1px_rgba(90,90,90,0.25)] bg-[linear-gradient(180deg,#141416_0%,#141414_100%)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="w-6 h-6 invisible"></div>

        <p style={{ fontFamily: "var(--second-family)" }} className="font-medium text-[13px] leading-[1.23] tracking-[-0.01em] text-[#f9f9f9]">
          Deposit
        </p>

        <button
          type="button"
          onClick={handleClose}
          className="w-6 h-6 rounded-full flex justify-center items-center bg-[#171719] cursor-pointer"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="flex gap-4 flex-col">
        <div className="flex gap-2 flex-col">
          <div className="flex flex-col gap-1">
            <p style={{ fontFamily: "var(--second-family)" }} className="py-1 pl-0.5 text-[12px] font-medium text-[rgba(249,249,249,0.3)] tracking-[0em] leading-none">
              Select Token
            </p>
            <button
              onClick={handleShowTokens}
              className="rounded-[10px] shadow-[0_0_0_1px_rgba(91,91,91,0.25),0_8px_24px_0_rgba(0,0,0,0.02)] bg-[rgba(249,249,249,0.05)] overflow-hidden cursor-pointer"
            >
              <div className="flex items-center justify-between py-2 px-2.5">
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6">
                    <Image
                      src={selectedToken.image}
                      width={24}
                      height={24}
                      alt={selectedToken.label}
                      className={selectedToken.imageClassName}
                    />
                  </div>
                  <p className="text-xs leading-none font-medium tracking-[-0.004em] text-[#F9F9F9]">
                    {selectedToken.symbol}
                  </p>
                </div>

                <div className="">
                  <CaretDown />
                </div>
              </div>
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <p style={{ fontFamily: "var(--second-family)" }} className="py-1 pl-0.5 text-[12px] font-medium text-[rgba(249,249,249,0.3)] tracking-[0em] leading-none">
              Select Network
            </p>
            <button onClick={handleShowNetworks} className="rounded-[10px] shadow-[0_0_0_1px_rgba(91,91,91,0.25),0_8px_24px_0_rgba(0,0,0,0.02)] bg-[rgba(249,249,249,0.05)] overflow-hidden cursor-pointer">
              <div className="flex items-center justify-between py-2 px-2.5">
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6">
                    <Image
                      src={selectedNetwork.image}
                      width={24}
                      height={24}
                      alt={selectedNetwork.label}
                    />
                  </div>
                  <p className="text-xs leading-none font-medium tracking-[-0.004em] text-[#F9F9F9]">
                    {selectedNetwork.symbol}
                  </p>
                </div>

                <div className="">
                  <CaretDown />
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p style={{ fontFamily: "var(--second-family)" }} className="py-1 pl-0.5 text-[12px] font-medium text-[rgba(249,249,249,0.3)] tracking-[0em] leading-none">
            Your deposit address
          </p>

          <div className="rounded-lg bg-[#171717] border border-[#1e1e1e] overflow-hidden flex flex-col">
            <div className="h-8 flex items-center px-2.5 line-clamp-1">
              <p className="text-[#d1d1d1] text-xs leading-3.5 tracking-[-0.004em] w-full text-center">
                {shortenAddress(DEPOSIT_ADDRESS, 36)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center justify-center h-10 shadow-[0_8px_24px_0_rgba(0,0,0,0.02)] bg-[rgba(249,249,249,0.05)] cursor-pointer"
            >
              <div className="h-6 w-6 flex justify-center items-center relative">
                <div
                  className="absolute inset-0 flex justify-center items-center"
                  style={{
                    opacity: copied ? 0 : 1,
                    filter: copied ? "blur(4px)" : "blur(0px)",
                    transform: copied ? "scale(0.85)" : "scale(1)",
                    transition: "transform 160ms ease-out, opacity 160ms ease-out, filter 160ms ease-out",
                  }}
                >
                  <Copy />
                </div>
                <div
                  className="absolute inset-0 flex justify-center items-center"
                  style={{
                    opacity: copied ? 1 : 0,
                    filter: copied ? "blur(0px)" : "blur(4px)",
                    transform: copied ? "scale(1)" : "scale(0.85)",
                    transition: "transform 160ms ease-out, opacity 160ms ease-out, filter 160ms ease-out",
                  }}
                >
                  <CheckIcon fill="#F9F9F9" />
                </div>
              </div>
              <TextMorph className="text-[#F9F9F9E5] font-medium tracking-[-0.004em] text-xs">
                {copied ? "Address Copied" : "Copy Address"}
              </TextMorph>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="border-t border-dashed border-t-[rgba(92,92,92,0.4)]"></div>

          <div className="flex flex-col gap-2">
            <p className="text-[#F9F9F9E5] tracking-[-0.003em] text-[10px]">
              Min. Deposit Value - 10 USDC
            </p>
            <p className="text-[#F9F9F9E5] tracking-[-0.003em] text-[10px]">
              Confirmations Required - 13
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
