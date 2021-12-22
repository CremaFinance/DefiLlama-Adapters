export const farmPoolIds = {
  FRANCIUM_ORCA_mSOL_SOL: {
    liquidityId: "mSOL-SOL[Orca Double-Dip]",
    infoId: "55",
  },
  // FRANCIUM_ORCA_mSOL_whETH: {
  //   liquidityId: "mSOL-whETH[Orca Double-Dip]",
  //   infoId: "39",
  // },
  FRANCIUM_ORCA_BTC_mSOL: {
    liquidityId: "BTC-mSOL[Orca Double-Dip]",
    infoId: "36",
  },
  FRANCIUM_ORCA_mSOL_USDT: {
    liquidityId: "mSOL-USDT[Orca Double-Dip]",
    infoId: "35",
  },
  FRANCIUM_ORCA_mSOL_USDC: {
    liquidityId: "mSOL-USDC[Orca Double-Dip]",
    infoId: "34",
  },
  // FRANCIUM_ORCA_ORCA_mSOL: {
  //   liquidityId: "ORCA-mSOL[Orca Double-Dip]",
  //   infoId: "33",
  // },
} as const;

export type FarmPoolIds = keyof typeof farmPoolIds;

export const lendingPoolIds = {
  FRANCIUM_mSOL: "mSOL",
} as const;

export type LendingPoolIds = typeof lendingPoolIds[keyof typeof lendingPoolIds];
