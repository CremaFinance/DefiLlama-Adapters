import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import { Pool } from "../../domain/pool";

import {
  lendingPortPoolAddress,
  LendingPortPoolAddress,
} from "./lendingPortPoolAddress";
import { lendingPortPoolIds, LendingPortPoolIds } from "./lendingPortPoolIds";
import { lendingPortPoolTokens } from "./lendingPortPoolTokens";
import { PortPool } from "./portPool";

const provider = "Port";
const actions = [
  { text: "Supply", url: "https://mainnet.port.finance/#/supply" },
  { text: "Borrow", url: "https://mainnet.port.finance/#/borrow" },
];

export type PortPoolsResponse = Record<LendingPortPoolIds, PortPool>;

export const portPools: Record<LendingPortPoolAddress, Pool> = {
  [lendingPortPoolAddress.PORT_mSOL]: {
    ...lendingPortPoolTokens[lendingPortPoolAddress.PORT_mSOL],
    ...{
      provider,
      marketType: marketTypes.Lending,
      providerId: lendingPortPoolIds.PORT_mSOL,
      tokenA: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.MNDE]: { dailyRate: 13736 },
        [coinSymbols.PORT]: { dailyRate: 1000 },
      },
      actions,
    },
  },
};
