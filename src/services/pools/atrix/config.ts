import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import { PoolConfig } from "../../domain/pool";

import { AtrixPool } from "./atrixPool";
import {
  LiquidityAtrixPoolAddress,
  liquidityAtrixPoolAddress,
} from "./liquidityAtrixPoolAddress";
import {
  LiquidityPoolAtrixIds,
  liquidityPoolAtrixIds,
} from "./liquidityAtrixPoolIds";
import { liquidityPoolTokensAtrix } from "./liquidityAtrixPoolTokens";

const provider = "Atrix";
const actions = [
  {
    text: "Add Liquidity",
    url: "https://app.atrix.finance/#/pools",
    isExternal: true,
  },
  {
    text: "Swap",
    url: "https://app.atrix.finance/#/swap",
    isExternal: true,
  },
];

export type AtrixPoolsResponse = Record<LiquidityPoolAtrixIds, AtrixPool>;

export const atrixPools: Record<LiquidityAtrixPoolAddress, PoolConfig> = {
  [liquidityAtrixPoolAddress.ATRIX_mSOL_USDC]: {
    ...liquidityPoolTokensAtrix[liquidityAtrixPoolAddress.ATRIX_mSOL_USDC],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolAtrixIds.ATRIX_mSOL_USDC,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.USDC,
      rewards: {
        [coinSymbols.MNDE]: {
          aprDescription: "daily MNDE",
          dailyRate: 68821.54882 / 7,
        },
      },
      actions,
    },
  },
  [liquidityAtrixPoolAddress.ATRIX_mSOL_USDT]: {
    ...liquidityPoolTokensAtrix[liquidityAtrixPoolAddress.ATRIX_mSOL_USDT],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolAtrixIds.ATRIX_mSOL_USDT,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.USDT,
      rewards: {
        [coinSymbols.MNDE]: {
          aprDescription: "daily MNDE",
          dailyRate: 34410.77441 / 7,
        },
      },
      actions,
    },
  },
};
