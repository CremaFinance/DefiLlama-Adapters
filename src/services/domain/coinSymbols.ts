import { Price } from "./currency";

export const coinSymbols: { [key: string]: string } = {
  mSOL: "msol",
  MNDE: "mnde",
  SOL: "sol",
  ORCA: "orca",
  USDT: "usdt",
  whETH: "ethereum",
  BTC: "btc",
  USDC: "usdc",
  PORT: "port",
  RAYDIUM: "ray",
  ETH: "eth",
  LARIX: "larix",
  ATRIX: "atrix",
} as const;

export type CoinSymbols = typeof coinSymbols[keyof typeof coinSymbols];
export type Prices = {
  [key in CoinSymbols]?: Price;
};
