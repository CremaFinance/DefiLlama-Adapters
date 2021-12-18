export const liquidityMarinadePoolAddress = {
  MNDE_mSOL_SOL_LP: "Ce9AfYapbQRzJKLjvfXbKLivrjmcrvZgYfGo8uyCARLB",
} as const;

export type LiquidityMarinadePoolAddress =
  typeof liquidityMarinadePoolAddress[keyof typeof liquidityMarinadePoolAddress];
