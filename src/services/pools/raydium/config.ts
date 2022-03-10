import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import type { PoolConfig } from "../../domain/pool";

import type { LiquidityRaydiumPoolAddress } from "./liquidityRaydiumPoolAddress";
import { liquidityRaydiumPoolAddress } from "./liquidityRaydiumPoolAddress";
import type { LiquidityPoolRaydiumIds } from "./liquidityRaydiumPoolIds";
import { liquidityPoolRaydiumIds } from "./liquidityRaydiumPoolIds";
import { liquidityPoolTokensRaydium } from "./liquidityRaydiumPoolTokens";
import type { RaydiumPool } from "./raydiumPool";

const provider = "Raydium";
const actions = [
  {
    text: "Add Liquidity",
    url: "https://raydium.io/liquidity/?ammId=EGyhb2uLAsRUbRx9dNFBjMVYnFaASWMvD6RE1aEf2LxL",
    isExternal: true,
  },
  {
    text: "Swap",
    url: "https://raydium.io/swap/?ammId=EGyhb2uLAsRUbRx9dNFBjMVYnFaASWMvD6RE1aEf2LxL",
    isExternal: true,
  },
];

export type RaydiumPoolsResponse = Record<LiquidityPoolRaydiumIds, RaydiumPool>;

const mndeReward = "daily MNDE";

export const raydiumPools: Record<LiquidityRaydiumPoolAddress, PoolConfig> = {
  [liquidityRaydiumPoolAddress.RAYDIUM_mSOL_SOL]: {
    ...liquidityPoolTokensRaydium[liquidityRaydiumPoolAddress.RAYDIUM_mSOL_SOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolRaydiumIds.RAYDIUM_mSOL_SOL,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.SOL,
      rewards: {
        // [coinSymbols.RAYDIUM]: undefined,
        // [coinSymbols.MNDE]: undefined,
      },
      actions,
    },
  },
  [liquidityRaydiumPoolAddress.RAYDIUM_mSOL_USDC]: {
    ...liquidityPoolTokensRaydium[
      liquidityRaydiumPoolAddress.RAYDIUM_mSOL_USDC
    ],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolRaydiumIds.RAYDIUM_mSOL_USDC,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.USDC,
      rewards: {
        [coinSymbols.MNDE]: {
          aprDescription: mndeReward,
          dailyRate: 43013.46801 / 7,
        },
      },
      actions,
    },
  },
  [liquidityRaydiumPoolAddress.RAYDIUM_mSOL_USDT]: {
    ...liquidityPoolTokensRaydium[
      liquidityRaydiumPoolAddress.RAYDIUM_mSOL_USDT
    ],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolRaydiumIds.RAYDIUM_mSOL_USDT,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.USDT,
      rewards: {
        [coinSymbols.MNDE]: {
          aprDescription: mndeReward,
          dailyRate: 8602.693603 / 7,
        },
      },
      actions,
    },
  },
  [liquidityRaydiumPoolAddress.RAYDIUM_ETH_mSOL]: {
    ...liquidityPoolTokensRaydium[liquidityRaydiumPoolAddress.RAYDIUM_ETH_mSOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolRaydiumIds.RAYDIUM_ETH_mSOL,
      tokenA: coinSymbols.ETH,
      tokenB: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.MNDE]: {
          aprDescription: mndeReward,
          dailyRate: 8602.693603 / 7,
        },
      },
      actions,
    },
  },
  [liquidityRaydiumPoolAddress.RAYDIUM_BTC_mSOL]: {
    ...liquidityPoolTokensRaydium[liquidityRaydiumPoolAddress.RAYDIUM_BTC_mSOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolRaydiumIds.RAYDIUM_BTC_mSOL,
      tokenA: coinSymbols.BTC,
      tokenB: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.MNDE]: {
          aprDescription: mndeReward,
          dailyRate: 8602.693603 / 7,
        },
      },
      actions,
    },
  },
  [liquidityRaydiumPoolAddress.RAYDIUM_mSOL_RAY]: {
    ...liquidityPoolTokensRaydium[liquidityRaydiumPoolAddress.RAYDIUM_mSOL_RAY],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolRaydiumIds.RAYDIUM_mSOL_RAY,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.RAYDIUM,
      rewards: {
        // [coinSymbols.RAYDIUM]: undefined,
        // [coinSymbols.MNDE]: undefined,
      },
      actions,
    },
  },
  [liquidityRaydiumPoolAddress.RAYDIUM_MNDE_mSOL]: {
    ...liquidityPoolTokensRaydium[
      liquidityRaydiumPoolAddress.RAYDIUM_MNDE_mSOL
    ],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolRaydiumIds.RAYDIUM_MNDE_mSOL,
      tokenA: coinSymbols.MNDE,
      tokenB: coinSymbols.mSOL,
      rewards: {
        // [coinSymbols.RAYDIUM]: undefined,
        // [coinSymbols.MNDE]: undefined,
      },
      actions,
    },
  },
};
