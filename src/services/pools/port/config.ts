import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import { PoolConfig } from "../../domain/pool";

import {
  lendingPortPoolAddress,
  LendingPortPoolAddress,
} from "./lendingPortPoolAddress";
import { lendingPortPoolIds, LendingPortPoolIds } from "./lendingPortPoolIds";
import { lendingPortPoolTokens } from "./lendingPortPoolTokens";
import { PortPool } from "./portPool";

const provider = "Port";
const actions = [
  {
    text: "Supply",
    url: "https://mainnet.port.finance/#/supply",
    isExternal: true,
  },
  {
    text: "Borrow",
    url: "https://mainnet.port.finance/#/borrow",
    isExternal: true,
  },
];

export type PortPoolsResponse = Record<LendingPortPoolIds, PortPool>;

export const portPools: Record<LendingPortPoolAddress, PoolConfig> = {
  [lendingPortPoolAddress.PORT_mSOL]: {
    ...lendingPortPoolTokens[lendingPortPoolAddress.PORT_mSOL],
    ...{
      provider,
      marketType: marketTypes.Lending,
      providerId: lendingPortPoolIds.PORT_mSOL,
      tokenA: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.MNDE]: {
          aprDescription: "Emission",
          dailyRate: 57692 / 7,
        },
        [coinSymbols.PORT]: { aprDescription: "Double Dip", dailyRate: 1000 },
      },
      actions,
    },
  },
};
