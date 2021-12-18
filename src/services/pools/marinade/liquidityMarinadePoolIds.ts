export const liquidityPoolMarinadeIds = {
  MNDE_mSOL_SOL_LP: "mSOL_SOL_LP",
} as const;

export type LiquidityPoolMarinadeIds =
  typeof liquidityPoolMarinadeIds[keyof typeof liquidityPoolMarinadeIds];
