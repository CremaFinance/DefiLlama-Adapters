export const liquidityPoolRaydiumIds = {
  RAYDIUM_mSOL_SOL: "mSOL-SOL",
  RAYDIUM_mSOL_USDC: "mSOL-USDC",
  RAYDIUM_mSOL_USDT: "mSOL-USDT",
  RAYDIUM_ETH_mSOL: "ETH-mSOL",
  RAYDIUM_BTC_mSOL: "BTC-mSOL",
  RAYDIUM_mSOL_RAY: "mSOL-RAY",
  RAYDIUM_MNDE_mSOL: "MNDE-mSOL",
} as const;

export type LiquidityPoolRaydiumIds =
  typeof liquidityPoolRaydiumIds[keyof typeof liquidityPoolRaydiumIds];
