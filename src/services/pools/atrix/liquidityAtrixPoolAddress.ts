export const liquidityAtrixPoolAddress = {
  ATRIX_mSOL_USDC: "J55atXt8BnF99YUC4AmpHY2VuxZ6XbBTjL7dHaePid42",
  ATRIX_mSOL_USDT: "HErPZEJhW5uXYcmfLHiuKPebBc2Gu5UJTTyPiZnmJXW4",
} as const;

export type LiquidityAtrixPoolAddress =
  typeof liquidityAtrixPoolAddress[keyof typeof liquidityAtrixPoolAddress];
