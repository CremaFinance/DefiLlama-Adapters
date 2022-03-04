export const liquidityPoolMarinadeIds = {
  MNDE_mSOL_SOL_LP: "mSOL_SOL_LP",
  MSOL_FARM: "mSOL_FARM",
  MNDE_mSOL_SOL_LP_FARM: "mSOL_SOL_LP_FARM",
} as const;

export type LiquidityPoolMarinadeIds =
  typeof liquidityPoolMarinadeIds[keyof typeof liquidityPoolMarinadeIds];
