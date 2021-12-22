// todo find and replace values here with actual pool token addresses
export const farmPoolAddress = {
  FRANCIUM_ORCA_mSOL_SOL: "FRANCIUM_ORCA_mSOL_SOL",
  // FRANCIUM_ORCA_mSOL_whETH: "FRANCIUM_ORCA_mSOL-whETH",
  FRANCIUM_ORCA_BTC_mSOL: "FRANCIUM_ORCA_BTC_mSOL",
  FRANCIUM_ORCA_mSOL_USDT: "FRANCIUM_ORCA_mSOL_USDT",
  FRANCIUM_ORCA_mSOL_USDC: "FRANCIUM_ORCA_mSOL_USDC",
  // FRANCIUM_ORCA_ORCA_mSOL: "FRANCIUM_ORCA_ORCA-mSOL",
} as const;

export type FarmPoolAddress =
  typeof farmPoolAddress[keyof typeof farmPoolAddress];

export const lendingPoolAddress = {
  FRANCIUM_mSOL: "ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1",
} as const;

export type LendingPoolAddress =
  typeof lendingPoolAddress[keyof typeof lendingPoolAddress];
