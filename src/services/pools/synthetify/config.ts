import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import type { PoolConfig } from "../../domain/pool";

import type { SynthetifyPoolAddress } from "./poolAddress";
import { synthetifyPoolAddress } from "./poolAddress";
import { synthetifyPoolIds } from "./poolIds";
import { synthetifyPoolTokens } from "./poolTokens";

const provider = "Synthetify";
const actions = [
  {
    text: "Deposit",
    url: "https://app.synthetify.io/staking",
    isExternal: true,
  },
  { text: "Swap", url: "https://app.synthetify.io/swapline", isExternal: true },
];

export const synthetifyPools: Record<SynthetifyPoolAddress, PoolConfig> = {
  [synthetifyPoolAddress.SNY_mSOL]: {
    ...synthetifyPoolTokens[synthetifyPoolAddress.SNY_mSOL],
    ...{
      provider,
      marketType: marketTypes.Lending,
      providerId: synthetifyPoolIds.SNY_mSOL,
      tokenA: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.MNDE]: {
          aprDescription: "MNDE rewards",
          dailyRate: 9700 / 7,
        },
        [coinSymbols.SNY]: {
          // added only to make app fetch SNY price, it's basicly trading apy
          aprDescription: "SNY rewards",
          dailyRate: 10000 / 7,
        },
      },
      actions,
    },
  },
};
