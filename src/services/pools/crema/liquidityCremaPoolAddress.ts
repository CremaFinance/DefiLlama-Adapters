export const liquidityCremaPoolAddress = {
  CREMA_mSOL_SOL: "GL2LxzsNLkttgaD46dQjSWycQSmf252TAPfK4tTuqjg7",
} as const;

export type LiquidityCremaPoolAddress =
  typeof liquidityCremaPoolAddress[keyof typeof liquidityCremaPoolAddress];
