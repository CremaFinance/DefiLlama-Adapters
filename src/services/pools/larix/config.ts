import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import { PoolConfig } from "../../domain/pool";

import { LarixPool } from "./larixPool";
import {
  lendingLarixPoolAddress,
  LendingLarixPoolAddress,
} from "./lendingLarixPoolAddress";
import {
  lendingLarixPoolIds,
  LendingLarixPoolIds,
} from "./lendingLarixPoolIds";
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
