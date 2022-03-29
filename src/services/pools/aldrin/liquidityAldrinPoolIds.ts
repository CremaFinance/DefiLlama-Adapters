export const liquidityPoolAldrinIds = {
  ALDRIN_mSOL_SOL: "mSOL-SOL",
  ALDRIN_mSOL_USDC: "mSOL-USDC",
  ALDRIN_mSOL_USDT: "mSOL-USDT",
  ALDRIN_mSOL_MNGO: "mSOL-MNGO",
  ALDRIN_mSOL_ETH: "mSOL-ETH",
  ALDRIN_mSOL_BTC: "mSOL-BTC",
  ALDRIN_mSOL_NEAR: "NEAR-mSOL",
} as const;

export type LiquidityPoolAldrinIds =
  typeof liquidityPoolAldrinIds[keyof typeof liquidityPoolAldrinIds];
