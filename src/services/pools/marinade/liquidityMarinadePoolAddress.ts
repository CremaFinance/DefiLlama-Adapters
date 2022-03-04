export const liquidityMarinadePoolAddress = {
  MNDE_mSOL_SOL_LP: "Ce9AfYapbQRzJKLjvfXbKLivrjmcrvZgYfGo8uyCARLB",
  MSOL_FARM: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7SoFARM",
  MNDE_mSOL_SOL_LP_FARM: "Ce9AfYapbQRzJKLjvfXbKLivrjmcrvZgYfGo8uyCARLBFARM",
} as const;

export type LiquidityMarinadePoolAddress =
  typeof liquidityMarinadePoolAddress[keyof typeof liquidityMarinadePoolAddress];
