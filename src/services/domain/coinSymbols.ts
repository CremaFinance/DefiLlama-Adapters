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
};

export type CoinSymbols = typeof coinSymbols[keyof typeof coinSymbols];
