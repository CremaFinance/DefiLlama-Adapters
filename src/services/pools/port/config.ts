import { coinSymbols } from "../../domain/coinSymbols";
import {
  lendingPoolAddress,
  LendingPoolAddress,
} from "../../domain/lendingPoolAddress";
import { lendingPoolIds, LendingPoolIds } from "../../domain/lendingPoolIds";
import { lendingPoolTokens } from "../../domain/lendingPoolTokens";
import { marketTypes } from "../../domain/marketTypes";
import { Pool } from "../../domain/pool";

import { PortPool } from "./portPool";

const provider = "Port";
const actions = [
  { text: "Supply", url: "https://mainnet.port.finance/#/supply" },
  { text: "Borrow", url: "https://mainnet.port.finance/#/borrow" },
];

export type PortPoolsResponse = Record<LendingPoolIds, PortPool>;

export const portPools: Record<LendingPoolAddress, Pool> = {
  [lendingPoolAddress.PORT_mSOL]: {
    ...lendingPoolTokens[lendingPoolAddress.PORT_mSOL],
    ...{
      provider,
      marketType: marketTypes.Lending,
      providerId: lendingPoolIds.PORT_mSOL,
      tokenA: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.MNDE]: { dailyRate: 13736 },
        [coinSymbols.PORT]: { dailyRate: 1000 },
      },
      actions,
    },
  },
};
