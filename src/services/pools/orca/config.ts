import { coinSymbols } from "../../domain/coinSymbols";
import {
  LiquidityPoolAddress,
  liquidityPoolAddress,
} from "../../domain/liquidityPoolAddress";
import {
  LiquidityPoolIds,
  liquidityPoolIds,
} from "../../domain/liquidityPoolIds";
import { liquidityPoolTokens } from "../../domain/liquidityPoolTokens";
import { marketTypes } from "../../domain/marketTypes";
import { Pool } from "../../domain/pool";

import { OrcaPool } from "./orcaPool";

const provider = "Orca";
const orcaReward = "Emission";
const mndeReward = "Double Dip";
const actions = [
  { text: "Add Liquidity", url: "https://www.orca.so/pools" },
  { text: "Swap", url: "https://www.orca.so/pools" },
];

export type OrcaPoolsResponse = Record<LiquidityPoolIds, OrcaPool>;

export const orcaPools: Record<LiquidityPoolAddress, Pool> = {
  [liquidityPoolAddress.ORCA_mSOL_SOL]: {
    ...liquidityPoolTokens[liquidityPoolAddress.ORCA_mSOL_SOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolIds.ORCA_mSOL_SOL,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.SOL,
      rewards: {
        [coinSymbols.ORCA]: {
          aprDescription: orcaReward,
          dailyRate: 2817 / 7,
        },
        [coinSymbols.MNDE]: { aprDescription: mndeReward, dailyRate: 6144 },
      },
      actions,
    },
  },
  [liquidityPoolAddress.ORCA_BTC_mSOL]: {
    ...liquidityPoolTokens[liquidityPoolAddress.ORCA_BTC_mSOL],
    ...{
      marketType: marketTypes.LP,
      provider,
      providerId: liquidityPoolIds.ORCA_BTC_mSOL,
      tokenA: coinSymbols.BTC,
      tokenB: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.ORCA]: {
          aprDescription: orcaReward,
          dailyRate: 2817 / 7,
        },
        [coinSymbols.MNDE]: { aprDescription: mndeReward, dailyRate: 9831 },
      },
      actions,
    },
  },
  [liquidityPoolAddress.ORCA_MNDE_mSOL]: {
    ...liquidityPoolTokens[liquidityPoolAddress.ORCA_MNDE_mSOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolIds.ORCA_MNDE_mSOL,
      tokenA: coinSymbols.MNDE,
      tokenB: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.ORCA]: {
          aprDescription: orcaReward,
          dailyRate: 1408 / 7,
        },
        [coinSymbols.MNDE]: { aprDescription: mndeReward, dailyRate: 2457 },
      },
      actions,
    },
  },
  [liquidityPoolAddress.ORCA_mSOL_USDT]: {
    ...liquidityPoolTokens[liquidityPoolAddress.ORCA_mSOL_USDT],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolIds.ORCA_mSOL_USDT,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.USDT,
      rewards: {
        [coinSymbols.ORCA]: {
          aprDescription: orcaReward,
          dailyRate: 2817 / 7,
        },
        [coinSymbols.MNDE]: { aprDescription: mndeReward, dailyRate: 29494 },
      },
      actions,
    },
  },
  [liquidityPoolAddress.ORCA_mSOL_USDC]: {
    ...liquidityPoolTokens[liquidityPoolAddress.ORCA_mSOL_USDC],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolIds.ORCA_mSOL_USDC,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.USDC,
      rewards: {
        [coinSymbols.ORCA]: {
          aprDescription: orcaReward,
          dailyRate: 5634 / 7,
        },
        [coinSymbols.MNDE]: { aprDescription: mndeReward, dailyRate: 29494 },
      },
      actions,
    },
  },
};
