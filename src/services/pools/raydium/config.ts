import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import { PoolConfig } from "../../domain/pool";

import {
  LiquidityRaydiumPoolAddress,
  liquidityRaydiumPoolAddress,
} from "./liquidityRaydiumPoolAddress";
import {
  LiquidityPoolRaydiumIds,
  liquidityPoolRaydiumIds,
} from "./liquidityRaydiumPoolIds";
import { liquidityPoolTokensRaydium } from "./liquidityRaydiumPoolTokens";
import { RaydiumPool } from "./raydiumPool";

const provider = "Raydium";
const actions = [
  {
    text: "Add Liquidity",
    url: "https://raydium.io/liquidity/?ammId=EGyhb2uLAsRUbRx9dNFBjMVYnFaASWMvD6RE1aEf2LxL",
  },
  {
    text: "Swap",
    url: "https://raydium.io/swap/?ammId=EGyhb2uLAsRUbRx9dNFBjMVYnFaASWMvD6RE1aEf2LxL",
  },
];

export type RaydiumPoolsResponse = Record<LiquidityPoolRaydiumIds, RaydiumPool>;

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
        // [coinSymbols.RAYDIUM]: undefined,
        // [coinSymbols.MNDE]: undefined,
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
        // [coinSymbols.RAYDIUM]: undefined,
        // [coinSymbols.MNDE]: undefined,
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
        // [coinSymbols.RAYDIUM]: undefined,
        // [coinSymbols.MNDE]: undefined,
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
        // [coinSymbols.RAYDIUM]: undefined,
        // [coinSymbols.MNDE]: undefined,
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
