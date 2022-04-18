export const liquidityPoolCremaIds = {
  CREMA_mSOL_SOL: "mSOL-SOL",
} as const;

export type LiquidityPoolCremaIds =
  typeof liquidityPoolCremaIds[keyof typeof liquidityPoolCremaIds];
