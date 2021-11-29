export const liquidityPoolOrcaIds = {
  ORCA_mSOL_SOL: "mSOL/SOL[stable][aquafarm]",
  ORCA_BTC_mSOL: "BTC/mSOL[aquafarm]",
  ORCA_MNDE_mSOL: "MNDE/mSOL[aquafarm]",
  ORCA_mSOL_USDT: "mSOL/USDT[aquafarm]",
  ORCA_mSOL_USDC: "mSOL/USDC[aquafarm]",
} as const;

export type LiquidityPoolOrcaIds =
  typeof liquidityPoolOrcaIds[keyof typeof liquidityPoolOrcaIds];

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
