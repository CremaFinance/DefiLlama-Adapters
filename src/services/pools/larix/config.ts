import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import { Pool } from "../../domain/pool";

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
  { text: "Supply", url: "https://projectlarix.com/" },
  { text: "Borrow", url: "https://projectlarix.com/" },
];

export type LarixPoolsResponse = Record<LendingLarixPoolIds, LarixPool>;

export const larixPools: Record<LendingLarixPoolAddress, Pool> = {
  [lendingLarixPoolAddress.LARIX_mSOL]: {
    ...lendingLarixPoolTokens[lendingLarixPoolAddress.LARIX_mSOL],
    ...{
      provider,
      marketType: marketTypes.Lending,
      providerId: lendingLarixPoolIds.LARIX_mSOL,
      tokenA: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.MNDE]: { aprDescription: "Emission", dailyRate: 13736 },
        [coinSymbols.PORT]: { aprDescription: "Double Dip", dailyRate: 1000 },
      },
      actions,
    },
  },
};
