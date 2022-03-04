import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import type { PoolConfig } from "../../domain/pool";

import type { LarixPool } from "./larixPool";
import type { LendingLarixPoolAddress } from "./lendingLarixPoolAddress";
import { lendingLarixPoolAddress } from "./lendingLarixPoolAddress";
import type { LendingLarixPoolIds } from "./lendingLarixPoolIds";
import { lendingLarixPoolIds } from "./lendingLarixPoolIds";
import { lendingLarixPoolTokens } from "./lendingLarixPoolTokens";

const provider = "Larix";
const actions = [
  { text: "Supply/Borrow", url: "https://projectlarix.com/", isExternal: true },
];

export type LarixPoolsResponse = Record<LendingLarixPoolIds, LarixPool>;

export const larixPools: Record<LendingLarixPoolAddress, PoolConfig> = {
  [lendingLarixPoolAddress.LARIX_mSOL]: {
    ...lendingLarixPoolTokens[lendingLarixPoolAddress.LARIX_mSOL],
    ...{
      provider,
      marketType: marketTypes.Lending,
      providerId: lendingLarixPoolIds.LARIX_mSOL,
      tokenA: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.MNDE]: {
          aprDescription: "Emission",
          dailyRate: 57692 / 7,
        },
      },
      actions,
    },
  },
};
