export const liquidityPoolAtrixIds = {
  ATRIX_mSOL_USDC: "mSOL-USDC",
  ATRIX_mSOL_USDT: "mSOL-USDT",
} as const;

export type LiquidityPoolAtrixIds =
  typeof liquidityPoolAtrixIds[keyof typeof liquidityPoolAtrixIds];
