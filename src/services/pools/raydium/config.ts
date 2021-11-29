import { coinSymbols } from "../../domain/coinSymbols";
import {
  LiquidityPoolAddressRaydium,
  liquidityPoolAddressRaydium,
} from "../../domain/liquidityPoolAddress";
import {
  LiquidityPoolRaydiumIds,
  liquidityPoolRaydiumIds,
} from "../../domain/liquidityPoolIds";
import { liquidityPoolTokensRaydium } from "../../domain/liquidityPoolTokens";
import { marketTypes } from "../../domain/marketTypes";
import { Pool } from "../../domain/pool";

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

export const raydiumPools: Record<LiquidityPoolAddressRaydium, Pool> = {
  [liquidityPoolAddressRaydium.RAYDIUM_mSOL_SOL]: {
    ...liquidityPoolTokensRaydium[liquidityPoolAddressRaydium.RAYDIUM_mSOL_SOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolRaydiumIds.RAYDIUM_mSOL_SOL,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.SOL,
      rewards: {
        [coinSymbols.RAYDIUM]: undefined,
        [coinSymbols.MNDE]: undefined,
      },
      actions,
    },
  },
  [liquidityPoolAddressRaydium.RAYDIUM_mSOL_USDC]: {
    ...liquidityPoolTokensRaydium[
      liquidityPoolAddressRaydium.RAYDIUM_mSOL_USDC
    ],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolRaydiumIds.RAYDIUM_mSOL_USDC,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.USDC,
      rewards: {
        [coinSymbols.RAYDIUM]: undefined,
        [coinSymbols.MNDE]: undefined,
      },
      actions,
    },
  },
  [liquidityPoolAddressRaydium.RAYDIUM_mSOL_USDT]: {
    ...liquidityPoolTokensRaydium[
      liquidityPoolAddressRaydium.RAYDIUM_mSOL_USDT
    ],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolRaydiumIds.RAYDIUM_mSOL_USDT,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.USDT,
      rewards: {
        [coinSymbols.RAYDIUM]: undefined,
        [coinSymbols.MNDE]: undefined,
      },
      actions,
    },
  },
  // [liquidityPoolAddressRaydium.RAYDIUM_ETH_mSOL]: {
  //   ...liquidityPoolTokensRaydium[liquidityPoolAddressRaydium.RAYDIUM_ETH_mSOL],
  //   ...{
  //     provider,
  //     marketType: marketTypes.LP,
  //     providerId: liquidityPoolRaydiumIds.RAYDIUM_ETH_mSOL,
  //     tokenA: coinSymbols.ETH,
  //     tokenB: coinSymbols.mSOL,
  //     rewards: {
  //       [coinSymbols.RAYDIUM]: undefined,
  //       [coinSymbols.MNDE]: undefined,
  //     },
  //     actions,
  //   },
  // },
  [liquidityPoolAddressRaydium.RAYDIUM_BTC_mSOL]: {
    ...liquidityPoolTokensRaydium[liquidityPoolAddressRaydium.RAYDIUM_BTC_mSOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolRaydiumIds.RAYDIUM_BTC_mSOL,
      tokenA: coinSymbols.BTC,
      tokenB: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.RAYDIUM]: undefined,
        [coinSymbols.MNDE]: undefined,
      },
      actions,
    },
  },
  [liquidityPoolAddressRaydium.RAYDIUM_mSOL_RAY]: {
    ...liquidityPoolTokensRaydium[liquidityPoolAddressRaydium.RAYDIUM_mSOL_RAY],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolRaydiumIds.RAYDIUM_mSOL_RAY,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.RAYDIUM,
      rewards: {
        [coinSymbols.RAYDIUM]: undefined,
        [coinSymbols.MNDE]: undefined,
      },
      actions,
    },
  },
  [liquidityPoolAddressRaydium.RAYDIUM_MNDE_mSOL]: {
    ...liquidityPoolTokensRaydium[
      liquidityPoolAddressRaydium.RAYDIUM_MNDE_mSOL
    ],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolRaydiumIds.RAYDIUM_MNDE_mSOL,
      tokenA: coinSymbols.MNDE,
      tokenB: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.RAYDIUM]: undefined,
        [coinSymbols.MNDE]: undefined,
      },
      actions,
    },
  },
};
