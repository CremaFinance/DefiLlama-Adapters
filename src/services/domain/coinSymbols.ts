import { Price } from "./currency";

export const coinSymbols: { [key: string]: string } = {
  mSOL: "mSOL",
  MNDE: "MNDE",
  SOL: "SOL",
  ORCA: "ORCA",
  USDT: "USDT",
  ETH: "ETH",
  whETH: "whETH",
  BTC: "BTC",
  USDC: "USDC",
  PORT: "PORT",
  RAYDIUM: "RAY",
  LARIX: "LARIX",
  ATRIX: "ATRIX",
  FRANCIUM: "FRANCIUM",
  ALDRIN: "RIN",
  MNGO: "MNGO",
  SNY: "SNY",
} as const;

export type CoinSymbols = typeof coinSymbols[keyof typeof coinSymbols];
export type Prices = {
  [key in CoinSymbols]?: Price;
};
