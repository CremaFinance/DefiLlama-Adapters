export const liquidityOrcaPoolIds = {
  ORCA_mSOL_SOL: "mSOL/SOL[stable][aquafarm]",
  ORCA_BTC_mSOL: "BTC/mSOL[aquafarm]",
  ORCA_MNDE_mSOL: "MNDE/mSOL[aquafarm]",
  ORCA_mSOL_USDT: "mSOL/USDT[aquafarm]",
  ORCA_mSOL_USDC: "mSOL/USDC[aquafarm]",
  ORCA_ORCA_mSOL: "ORCA/mSOL[aquafarm]",
  ORCA_mSOL_whETH: "mSOL/whETH[aquafarm]",
} as const;

export type LiquidityOrcaPoolIds =
  typeof liquidityOrcaPoolIds[keyof typeof liquidityOrcaPoolIds];
