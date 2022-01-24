import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import { PoolConfig } from "../../domain/pool";

import { farmPoolAddress, FarmPoolAddress } from "./PoolAddress";
import { farmPoolTokens } from "./PoolTokens";

export type SaberPoolResponse =
  | {
      solBalance: number;
      mSolBalance: number;
    }
  | undefined;

const provider = "Saber";
const actions = [
  {
    text: "Manage deposit",
    url: "https://app.saber.so/#/pools/msol_sol/deposit",
    isExternal: true,
  },
];

export const saberPools: Record<FarmPoolAddress, PoolConfig> = {
  [farmPoolAddress.saber_mSOL_SOL]: {
    ...farmPoolTokens[farmPoolAddress.saber_mSOL_SOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: farmPoolAddress.saber_mSOL_SOL,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.SOL,
      rewards: {
        [coinSymbols.MNDE]: {
          aprDescription: "Emission",
          dailyRate: 34410.77441 / 7,
        },
      },
      actions,
    },
  },
};
