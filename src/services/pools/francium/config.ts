import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import { PoolConfig } from "../../domain/pool";

import { FranciumPool } from "./franciumPool";
import {
  lendingFranciumPoolAddress,
  LendingFranciumPoolAddress,
} from "./lendingFranciumPoolAddress";
import {
  lendingFranciumPoolIds,
  LendingFranciumPoolIds,
} from "./lendingFranciumPoolIds";
import { lendingFranciumPoolTokens } from "./lendingFranciumPoolTokens";

const provider = "Francium";
const actions = [
  { text: "Supply", url: "https://francium.io/", isExternal: true },
  { text: "Borrow", url: "https://francium.io/", isExternal: true },
];

export type FranciumPoolsResponse = Record<
  LendingFranciumPoolIds,
  FranciumPool
>;

export const franciumPools: Record<LendingFranciumPoolAddress, PoolConfig> = {
  [lendingFranciumPoolAddress.FRANCIUM_mSOL]: {
    ...lendingFranciumPoolTokens[lendingFranciumPoolAddress.FRANCIUM_mSOL],
    ...{
      provider,
      marketType: marketTypes.Lending,
      providerId: lendingFranciumPoolIds.FRANCIUM_mSOL,
      tokenA: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.MNDE]: { aprDescription: "Emission", dailyRate: 13736 },
      },
      actions,
    },
  },
};
