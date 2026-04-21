import { atom } from "jotai";

export const tokens = [
  {
    id: 1,
    label: "Ethereum",
    symbol: "ETH",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  },
  {
    id: 2,
    label: "USD Coin",
    symbol: "USDC",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
  {
    id: 3,
    label: "Tether",
    symbol: "USDT",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    imageClassName: "mix-blend-multiply rounded-[16px]",
  },
  {
    id: 4,
    label: "Wrapped Bitcoin",
    symbol: "WBTC",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
  },
  {
    id: 5,
    label: "Dai",
    symbol: "DAI",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
  },
  {
    id: 6,
    label: "Chainlink",
    symbol: "LINK",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png",
    imageClassName: "rounded-[16px]",
  },
  {
    id: 7,
    label: "Uniswap",
    symbol: "UNI",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png",
  },
  {
    id: 9,
    label: "Maker",
    symbol: "MKR",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png",
  },
  {
    id: 10,
    label: "Synthetix",
    symbol: "SNX",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC011A72400E58ecD99Ee497CF89E3775d4bd732F/logo.png",
  },
];

export type Token = (typeof tokens)[number] & { imageClassName?: string };

export const selectedTokenAtom = atom<Token>(tokens[1]);

export const networks = [
  {
    id: 1,
    label: "Ethereum",
    symbol: "ERC-20",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  },
  {
    id: 2,
    label: "BNB Smart Chain",
    symbol: "BEP-20",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png",
  },
  {
    id: 3,
    label: "Polygon",
    symbol: "MATIC",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png",
  },
  {
    id: 4,
    label: "Arbitrum",
    symbol: "ARB",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
  },
  {
    id: 5,
    label: "Optimism",
    symbol: "OP",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png",
  },
  {
    id: 6,
    label: "Avalanche",
    symbol: "AVAX",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/info/logo.png",
  },
  {
    id: 7,
    label: "Solana",
    symbol: "SOL",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png",
  },
];

export type Network = (typeof networks)[number];

export const selectedNetworkAtom = atom<Network>(networks[0]);
