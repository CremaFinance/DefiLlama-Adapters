import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import type { PoolConfig } from "../../domain/pool";

import type { LendingSolendPoolAddress } from "./lendingSolendPoolAddress";
import { lendingSolendPoolAddress } from "./lendingSolendPoolAddress";
import type { LendingSolendPoolIds } from "./lendingSolendPoolIds";
import { lendingSolendPoolIds } from "./lendingSolendPoolIds";
import { lendingSolendPoolTokens } from "./lendingSolendPoolTokens";
import type { SolendReserveResponse } from "./solendPool";

const provider = "Solend";
const actions = [
  {
    text: "Supply",
    url: "https://solend.fi/dashboard",
    isExternal: true,
  },
  {
    text: "Borrow",
    url: "https://solend.fi/dashboard",
    isExternal: true,
  },
];

export type SolendPoolsResponse = Record<
  LendingSolendPoolIds,
  SolendReserveResponse
>;

export const solendPools: Record<LendingSolendPoolAddress, PoolConfig> = {
  [lendingSolendPoolAddress.SOLEND_mSOL]: {
    ...lendingSolendPoolTokens[lendingSolendPoolAddress.SOLEND_mSOL],
    ...{
      provider,
      marketType: marketTypes.Lending,
      providerId: lendingSolendPoolIds.SOLEND_mSOL,
      tokenA: coinSymbols.mSOL,
      rewards: {
        // 0 for now. to be read from solend api later
        [coinSymbols.MNDE]: { aprDescription: "Emission", dailyRate: 0 },
        [coinSymbols.SLND]: {
          aprDescription: "Liquidity Mining",
          dailyRate: 0,
        },
      },
      actions,
    },
  },
};
