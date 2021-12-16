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
} from "./liquidityRaydiumPoolIds";
import { liquidityPoolTokensAtrix } from "./liquidityRaydiumPoolTokens";

const provider = "Atrix";
const actions = [
  {
    text: "Add Liquidity",
    url: "https://app.atrix.finance/#/pools",
  },
  {
    text: "Swap",
    url: "https://app.atrix.finance/#/swap",
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
        // [coinSymbols.RAYDIUM]: undefined,
        // [coinSymbols.MNDE]: undefined,
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
        // [coinSymbols.RAYDIUM]: undefined,
        // [coinSymbols.MNDE]: undefined,
      },
      actions,
    },
  },
};
